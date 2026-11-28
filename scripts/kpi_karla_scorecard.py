#!/usr/bin/env python3
"""Escribe los dos números de Karla en la scorecard EOS (~/log-diario/scorecard.json).

Lo llama ~/log-diario/correr.sh cada mañana (launchd 07:00), antes de construir.py.
Toca SOLO estas claves de semanas["<viernes>"]:
  gestiones_jie  gestiones con Jie en por_enviar o enviado con más de 2 días hábiles (meta ≤ 5)
  conteo_stock   días hábiles desde el último conteo de Jie de AlbaMed en el Sheet (meta ≤ 2)
  reporte_karla  roca R2: ✅/❌ del «📊 Reporte semanal» + racha «N/8» (desde el viernes 4-dic; el 27-nov no cuenta).
                 Lo revisa n8n el viernes 18:05 (flujo cbTU6E1AG6yj5wOD → ops_alegres_kpi_reporte). Se reescribe
                 cada viernes revisado; el de esta semana queda «⏳ pendiente» hasta la revisión.

Fuente: webhook de n8n «[SAC] KPIs de Karla para la scorecard EOS» (x7eMb0NOMG7wVMVi), que llama a
ops_alegres_kpi_karla() en Supabase SAC. Así no hay claves de Supabase en este Mac. La dirección del webhook
está en ~/log-diario/.kpi_karla_url (se ve en el nodo «Webhook scorecard» de ese flujo).
Si falla o el dato está viejo, escribe «⚠️ sin dato: motivo» o «⚠️ dato viejo (fecha)», nunca un número viejo.
Uso: python3 kpi_karla_scorecard.py [--seco]
"""
import json, os, sys, tempfile, urllib.request, datetime as dt
from zoneinfo import ZoneInfo

# La dirección del webhook vive solo en este Mac (no en el repo): ~/log-diario/.kpi_karla_url
URL_FILE = os.path.expanduser('~/log-diario/.kpi_karla_url')
SC = os.path.expanduser('~/log-diario/scorecard.json')
TZ = ZoneInfo('America/Santiago')
AHORA = dt.datetime.now(TZ)
HOY = AHORA.date()
F = HOY + dt.timedelta(days=(4 - HOY.weekday()) % 7)  # viernes de esta semana (hoy si es viernes)
SECO = '--seco' in sys.argv
INICIO_R2 = dt.date(2026, 12, 4)  # primer viernes de la roca R2 (el 27-nov no cuenta: el motor no creó la fila; CEO/Martin 27-nov)


def fecha_corta(iso):
    d = dt.datetime.fromisoformat(iso.replace('Z', '+00:00')).astimezone(TZ)
    return d.strftime('%d-%m %H:%M')


def coma(x):
    return f'{x:.1f}'.replace('.', ',')


try:
    URL = open(URL_FILE).read().strip()
    with urllib.request.urlopen(URL, timeout=30) as r:
        k = json.loads(r.read().decode())
    if isinstance(k, list):
        k = k[0] if k else {}
    if not isinstance(k, dict) or 'gestiones_jie' not in k:
        raise ValueError('respuesta sin datos')
except Exception as e:  # noqa: BLE001
    k = None
    motivo = f'⚠️ sin dato: {type(e).__name__}'

out = {}
if k is None:
    out = {'gestiones_jie': motivo, 'conteo_stock': motivo}
else:
    g = k.get('gestiones_jie')
    out['gestiones_jie'] = str(g) if isinstance(g, int) else '⚠️ sin dato: no vino el número'
    s, leido, ojo = k.get('conteo_stock'), k.get('conteo_leido_at'), k.get('conteo_ojo')
    viejo = False
    if leido:
        viejo = AHORA - dt.datetime.fromisoformat(leido.replace('Z', '+00:00')) > dt.timedelta(hours=36)
    if s is None or not leido:
        out['conteo_stock'] = '⚠️ sin dato: el Sheet no se ha leído'
    elif ojo or viejo:
        out['conteo_stock'] = f'⚠️ dato viejo ({fecha_corta(leido)})'
    else:
        out['conteo_stock'] = coma(float(s))

# Roca R2: reporte semanal de Karla, una entrada por viernes revisado + la semana en curso
por_semana = {}
if k is not None:
    hist = {}
    for x in (k.get('reportes') or []):
        try:
            v = dt.date.fromisoformat(str(x['viernes'])[:10])
        except Exception:  # noqa: BLE001
            continue
        if v >= INICIO_R2:
            hist[v] = x
    for v in sorted(hist):
        racha, w = 0, v
        while w in hist and hist[w].get('ok'):
            racha += 1
            w -= dt.timedelta(days=7)
        x = hist[v]
        por_semana[v] = f'✅ {racha}/8' if x.get('ok') else f'❌ 0/8 ({x.get("falta") or "incompleto"})'
    if F >= INICIO_R2 and F not in hist:
        cierre = dt.datetime.combine(F, dt.time(18, 30), TZ)
        por_semana[F] = '⏳ pendiente (vence vie 18:00)' if AHORA < cierre else '⚠️ sin dato: no se revisó el viernes'
elif F >= INICIO_R2:
    por_semana[F] = motivo

if SECO:
    print(F.isoformat(), out, {v.isoformat(): t for v, t in por_semana.items()})
    sys.exit(0)

d = json.load(open(SC))
d.setdefault('semanas', {}).setdefault(F.isoformat(), {}).update(out)
for v, t in por_semana.items():
    d['semanas'].setdefault(v.isoformat(), {})['reporte_karla'] = t
fd, tmp = tempfile.mkstemp(dir=os.path.dirname(SC), suffix='.json')
with os.fdopen(fd, 'w') as f:
    json.dump(d, f, ensure_ascii=False, indent=1)
os.replace(tmp, SC)
print('kpi_karla', F.isoformat(), out, {v.isoformat(): t for v, t in por_semana.items()})

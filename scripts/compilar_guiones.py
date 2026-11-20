#!/usr/bin/env python3
"""Compila las reglas del motor en los guiones que usa el redactor con IA (n8n WF-R1).

Fuente única: 00-REGLAS/voz.md + 00-REGLAS/soluciones.md + 10-FLUJOS/guiones-por-motivo.md + moldes de 20-CASOS/ (los de fecha).

En Supabase cada parte vive por separado en `ops_alegres_guion_partes` (clave, texto, huella) y la función
`ops_alegres_compilar_guiones(huella)` arma con ellas un guion por motivo en `sac_bot_guiones` (store Alegres).
Así, cuando cambia una regla, solo se sube la parte que cambió.

Uso:
  python3 scripts/compilar_guiones.py --huella        # huella total de las fuentes (la cargada está en sac_bot_guiones.nota)
  python3 scripts/compilar_guiones.py --partes        # clave y huella de cada parte (comparar con la tabla)
  SALIDA=<carpeta> python3 scripts/compilar_guiones.py [clave ...]
      # escribe <carpeta>/guiones_<huella>.sql con las partes pedidas (todas si no se nombra ninguna) + la llamada que recompila
"""
import glob
import hashlib
import os
import re
import sys

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PLANTILLA = """Eres Mariana, de atención a clientas de Alegres México. Redactas la respuesta a UN correo. Devuelves SOLO el JSON pedido.

# Cómo trabajar
{{GENERAL}}

# Este caso: {{MOTIVO}}
{{ESPECIFICO}}

# La voz (obligatoria, se revisa con un revisor automático antes de enviar)
En tus borradores usa comillas rectas "así". Las « » de este texto son solo para citar ejemplos.

{{VOZ}}

# Criterio de soluciones
{{SOLUCIONES}}

# Moldes aprobados por Martin (copiar el tono, no la letra)
{{MOLDES}}

# Salida
borrador = el correo completo listo para enviar (saludo con nombre, cuerpo, cierre fijo de Mariana).
puede_responder = true solo si el correo no necesita ninguna gestión ni decisión. Si necesita algo, false y en motivo_no
qué hay que hacer, en una línea simple para una persona (ej. «Cargar cambio a Jie; enviar cuando confirme»)."""


def leer(rel):
    with open(os.path.join(BASE, rel), encoding='utf-8') as f:
        return f.read()


def moldes_archivos():
    return sorted(os.path.relpath(p, BASE) for p in glob.glob(os.path.join(BASE, '20-CASOS', '20??-??-??-*.md')))


def secciones_guiones():
    txt = leer('10-FLUJOS/guiones-por-motivo.md')
    partes = re.split(r'^## motivo:\s*(\S+)\s*$', txt, flags=re.M)
    return {partes[i]: partes[i + 1].strip() for i in range(1, len(partes), 2)}


def partes():
    g = secciones_guiones()
    out = {
        'plantilla': PLANTILLA,
        'general': g.pop('_general'),
        'voz': leer('00-REGLAS/voz.md'),
        'soluciones': leer('00-REGLAS/soluciones.md'),
        'moldes': '\n\n'.join(leer(a) for a in moldes_archivos()),
    }
    for motivo, esp in g.items():
        out['motivo:' + motivo] = esp
    return out


def h(texto):
    return hashlib.sha256(texto.encode()).hexdigest()[:12]


def huella_total(p):
    return h(''.join(k + v for k, v in sorted(p.items())))


def sql(p, claves, hue):
    def q(s):
        return "'" + s.replace("'", "''") + "'"
    filas = [
        f"insert into ops_alegres_guion_partes (clave, texto, huella, updated_at) values ({q(k)}, {q(p[k])}, {q(h(p[k]))}, now()) "
        "on conflict (clave) do update set texto = excluded.texto, huella = excluded.huella, updated_at = now();"
        for k in claves
    ]
    filas.append(f"select ops_alegres_compilar_guiones({q(hue)}) as guiones_compilados;")
    return '\n'.join(filas)


if __name__ == '__main__':
    p = partes()
    hue = huella_total(p)
    if '--huella' in sys.argv:
        print(hue)
    elif '--partes' in sys.argv:
        for k in sorted(p):
            print(k, h(p[k]))
    else:
        pedidas = [a for a in sys.argv[1:] if not a.startswith('--')] or sorted(p)
        ruta = os.path.join(os.environ.get('SALIDA', '/tmp'), f'guiones_{hue}.sql')
        with open(ruta, 'w', encoding='utf-8') as f:
            f.write(sql(p, pedidas, hue))
        print(f'huella {hue} · {len(pedidas)} partes · {os.path.getsize(ruta)} bytes')
        print(ruta)

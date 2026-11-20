#!/usr/bin/env python3
"""Revisor de borradores para clientas de Alegres (voz Mariana).

Uso:
  python3 revisar_borrador.py borrador.txt [mensaje_de_la_clienta.txt]
  echo "texto" | python3 revisar_borrador.py -

Sale con código 0 si pasa y 1 si hay errores (ERROR bloquea; AVISO es para revisar a mano).
Las reglas salen de 00-REGLAS/voz.md. Si cambia una regla allá, se cambia aquí también.
"""
import re
import sys
import unicodedata

PROHIBIDAS = {
    r'\binternacional(es)?\b': 'no se dice "internacional" (predispone en contra del origen)',
    r'\bautom[aá]tic[oa]s?\b': 'nunca "automático": delata que no hay una persona',
    r'\bsistema\b': 'nunca "sistema": delata robot',
    r'\bplantilla\b': 'nunca "plantilla"',
    r'\brobot\b|\bbot\b': 'nunca mencionar bot o robot',
    r'yun\s?express|sunyou|\b4px\b|cainiao|yanwen|aliexpress': 'no se nombra el transportista de origen',
    r'estimad[oa]s?\s+client': 'nada de "Estimado cliente": suena a corporación',
    r'«|»': 'comillas rectas "así", nunca « »',
    r'oftalm[oó]log|consulte?\s+(a\s+)?(un|su)\s+m[eé]dico': 'en preguntas de uso no se manda al médico: solo la forma de uso',
    r'entregado y firmado': 'no tenemos el dato de quién firmó',
    r'(ya )?(estoy|estamos) revisando tu (caso|pedido)|te (escribo|aviso) en cuanto tenga': 'acuse vacío: se llega con el resultado, no con "lo vamos a ver" (regla 4c)',
    r'conf[ií]a(n|r)? en nosotros|somos una (empresa|tienda) seria': 'claim sin prueba: la confianza la dan los hechos (qué hacemos, cuándo, cómo lo ve ella), regla 13',
    r'(tu|el) reembolso (ya )?(est[aá]|qued[oó]|fue) (hecho|realizado|procesado)|procederemos a (realizar )?(el|tu)? ?reembolso|ya (te )?(reembolsamos|cancelamos|devolvimos)|cancelaci[oó]n definitiva': 'dice que el reembolso o la cancelación ya están hechos: solo vale si la devolución está registrada en Shopify (el freno de Supabase lo revisa); si no, no se escribe',
    r'se (nos )?agot[oó]|estamos fabricando|sin stock|fuera de stock|problema con (el|nuestro) proveedor': 'en un atraso no se dice que se agotó ni que se está fabricando: suena a que su producto no existe (regla 5, atraso por stock)',
    r'(yo )?(tambi[eé]n )?lo sigo de cerca|te hago (el )?seguimiento': 'no prometer un seguimiento que no podemos hacer: si lo resuelve con J&T, se le dan los pasos y listo (Martin, 17-nov)',
    r'le informamos que|permíteme contarte|lamento que est[eé]s pasando': 'molde corporativo o de traducción gringa',
    r'(todav[ií]a|a[uú]n) no (ha )?(sale|salido|se (ha )?enviado|se env[ií]a|se despacha|se ha despachado)': 'suena a que estamos atrasados: decir lo que hicimos por ella ("Alcanzamos a retener tu pedido y pedimos que cambiara de dirección")',
}

# Frases que casi siempre le relatan a la clienta lo que ya sabe.
OBVIO = {
    r'\bnos (avisaste|escribiste|pediste|contaste|comentaste)\b': 'le relata a la clienta lo que ella hizo',
    r'\bno (lo )?has recibido\b|\bno te ha llegado\b|\bno te lleg[oó]\b': 'le dice algo que ella ya sabe (que no le llegó)',
    r'\bcomo (ya )?sabes\b|\bcomo te coment[eé]\b': 'relleno: lo que ya sabe',
    r'\brecibimos tu (mensaje|correo|solicitud)\b': 'relleno: obvio que lo recibimos',
    r'\bsi para el .{1,30} no ves\b': 'nada de fechas de control condicionales (asustan)',
}

CIERRE = ['para lo que necesites', 'quedo atenta', 'mariana']


def sin_acentos(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')


def revisar(texto, clienta=''):
    errores, avisos = [], []
    t = texto.strip()
    low = t.lower()

    # 1. Dos puntos dentro de una frase (se permiten links, horas y líneas de formulario "Campo:")
    for n, linea in enumerate(t.splitlines(), 1):
        l = linea.strip()
        if not l or ':' not in l:
            continue
        limpia = re.sub(r'https?://\S+', '', l)
        limpia = re.sub(r'\b\d{1,2}:\d{2}\b', '', limpia)
        if re.fullmatch(r'[^:]{1,45}:\s*', limpia):   # formulario: "Calle y número:"
            continue
        if ':' in limpia:
            errores.append(f'línea {n}: dos puntos dentro de una frase → unir con coma, "pero" o "porque", o partir en dos ("{l[:60]}")')

    # 2. Exclamaciones: una sola, en la buena noticia
    n_excl = t.count('!')
    if n_excl > 1:
        errores.append(f'{n_excl} exclamaciones: va UNA sola, en la buena noticia')

    # 3. Palabras y moldes prohibidos
    for pat, por_que in PROHIBIDAS.items():
        m = re.search(pat, low)
        if m:
            errores.append(f'"{m.group(0)}": {por_que}')

    # 4. Lo obvio
    for pat, por_que in OBVIO.items():
        m = re.search(pat, low)
        if m:
            errores.append(f'"{m.group(0)}": {por_que}. Tachar y dejar solo lo NUEVO para ella')

    # 5. Saludo con nombre y hora del día
    primera = t.splitlines()[0].strip().lower() if t else ''
    if not primera.startswith(('hola', 'muy buen', 'buen')):
        errores.append('falta el saludo ("Hola {nombre}, buenas tardes.")')
    elif not re.search(r'buen(os|as)\s+(d[ií]as|tardes|noches)', primera):
        errores.append('el saludo va con la hora del día en México ("buenos días / buenas tardes / buenas noches")')

    # 6. Agradecer
    if not re.search(r'muchas gracias|gracias por', low):
        avisos.append('no agradece ("Muchas gracias por escribirnos" / "por tu compra" / "por tu paciencia")')

    # 7. Cierre de Mariana
    falta = [c for c in CIERRE if c not in low]
    if falta:
        errores.append('falta el cierre "Para lo que necesites, aquí estoy para servirte. / Quedo atenta, / Mariana" (no aparece: ' + ', '.join(falta) + ')')

    # 8. Disculpa sin razón
    if re.search(r'disculp', low) and not re.search(r'volumen|porque|ya que|pero estos d[ií]as|se nos agot|tanto [eé]xito|pico de pedidos', low):
        avisos.append('hay una disculpa sin su razón: toda disculpa lleva su porqué ("estos días hemos tenido un volumen de pedidos muy grande")')

    # 8b. Expectativa de entrega inmediata (Martin, 17-nov)
    m = re.search(r'\bmensajero\b|tu puerta|ma[ñn]ana (te )?llega|en cualquier momento', low)
    if m:
        avisos.append(f'"{m.group(0)}" hace esperar la entrega al otro día: solo si J&T ya está repartiendo')

    # 9. Origen solo si lo preguntan
    if re.search(r'\bchina\b', low) and not re.search(r'\bchina\b', clienta.lower()):
        avisos.append('menciona China sin que la clienta lo haya preguntado')

    # 10. Repetirle sus propios datos (4+ palabras seguidas de su mensaje)
    if clienta:
        pal_c = re.findall(r'\w+', sin_acentos(clienta.lower()))
        pal_t = sin_acentos(low)
        vistos = set()
        for i in range(len(pal_c) - 3):
            trozo = ' '.join(pal_c[i:i + 4])
            if len(trozo) > 14 and trozo in ' '.join(re.findall(r'\w+', pal_t)) and trozo not in vistos:
                vistos.add(trozo)
        # Direcciones y números: "plaza mayor 9", "lote 127", "cp 77727" (palabra + número que ella escribió)
        texto_t = ' '.join(re.findall(r'\w+', pal_t))
        for i in range(len(pal_c) - 1):
            par = ' '.join(pal_c[i:i + 2])
            if re.search(r'\d', par) and re.search(r'[a-z]{3,}', par) and re.search(r'\b' + re.escape(par) + r'\b', texto_t):
                vistos.add(par)
        if vistos:
            errores.append('le repite su propio mensaje o sus datos (' + '; '.join(list(vistos)[:3]) + '). Ella ya lo sabe')

    return errores, avisos


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    texto = sys.stdin.read() if sys.argv[1] == '-' else open(sys.argv[1], encoding='utf-8').read()
    clienta = open(sys.argv[2], encoding='utf-8').read() if len(sys.argv) > 2 else ''
    errores, avisos = revisar(texto, clienta)
    for e in errores:
        print('ERROR  ' + e)
    for a in avisos:
        print('AVISO  ' + a)
    if not errores and not avisos:
        print('OK, pasa todas las reglas')
    sys.exit(1 if errores else 0)


if __name__ == '__main__':
    main()

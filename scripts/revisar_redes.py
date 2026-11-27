#!/usr/bin/env python3
"""Revisor de textos para REDES SOCIALES de Alegres (comentarios públicos y mensajes privados).

BORRADOR del 18-nov-2026: las reglas salen de 30-PROPUESTAS/2026-11-18-redes/03-reglas-redes.md
y todavía no las aprueba Martin.

Uso:
  python3 revisar_redes.py comentario texto.txt
  python3 revisar_redes.py privado texto.txt

Sale con código 0 si pasa y 1 si hay errores.
Hereda las reglas de voz del correo (revisar_borrador.py) y agrega las de redes.
"""
import re
import sys

sys.path.insert(0, __file__.rsplit('/', 1)[0])
from revisar_borrador import PROHIBIDAS, OBVIO  # mismas palabras prohibidas que en el correo

MAX_COMENTARIO = 420
MAX_PRIVADO = 900

# Promesas de salud o de resultado, y frases que nadie puede probar. En un comentario público son
# además un riesgo con Meta y con la autoridad sanitaria.
CLAIMS = {
    r'100 ?% ?(segur|natural|efectiv|real|garantiz|confiable)': 'nada de "100 % seguro / natural / efectivo": es un claim sin prueba ("100 % original" sí se puede, regla 9 de voz)',
    r'desde la primera noche|9 de cada 10|\d+ ?% de (los|las) (usuari|client|person)': 'no se promete un resultado ni se cita una cifra de resultados',
    r'\bgarantizad[oa]s?\b|\bte garantizo\b': 'no se garantiza un resultado',
    r'\b(cura|curar|sana|sanar|elimina|eliminar|revierte|revertir|desinflama|desinflamar|regenera|regenerar|disuelve)\b':
        'promesa de salud: no se dice que cura, elimina, revierte, desinflama ni regenera',
    r'\bte sirve perfectamente\b|\bs[ií],? (te|le) (sirve|funciona)\b|\btotalmente real\b':
        'no se le promete a una persona que a ella le va a servir',
    r'grado m[eé]dico|certificad[oa]|certificaci[oó]n|laboratorios independientes|avalad[oa]|aprobad[oa] por':
        'no se nombra una certificación o aval que no esté documentado',
    r'miles de clientes|rese[ñn]as verificadas|\d[\d.,]* rese[ñn]as|clientes satisfechos':
        'no se citan cifras de clientes o reseñas sin fuente',
    r'no es (ning[uú]n )?fraude|no somos (un )?fraude|somos (una empresa|una tienda) (seria|real|confiable)':
        'no se discute la palabra fraude: se responde con hechos',
    r'qu[eé]date (totalmente |completamente )?tranquil[oa]|no te preocupes, es segur':
        'no se pide tranquilidad sin dar un hecho que ella pueda comprobar',
    r'los especialistas recomiendan|recomendado por (m[eé]dicos|especialistas|doctores)':
        'no se atribuye una recomendación médica',
}

# Plazos: el único plazo que se da es el del motor (compra + 18 días; reenvío, salida + 11).
PLAZOS = r'\b(\d+ a \d+|\d+) d[ií]as (h[aá]biles|naturales)\b'

# En un comentario público nunca van datos de un pedido o de una persona.
PRIVADOS = {
    r'#\s?\d{4,6}\b|\bpedido \d{4,6}\b': 'número de pedido en público',
    r'\b(JMX|YT)\d{6,}\b': 'número de guía en público',
    r'[\w.+-]+@[\w-]+\.[\w.]+': 'correo en público',
    r'\b\d{10}\b': 'teléfono en público',
    r'\bC\.?P\.? ?\d{5}\b|\bcolonia\b|\bcalle\b': 'dirección en público',
}

LINK_OK = r'https://alegrestiendamexico\.com/[\w/\-]*'


def revisar(tipo, texto):
    errores, avisos = [], []
    t = texto.strip()
    low = t.lower()

    if not t:
        return ['texto vacío'], []

    limite = MAX_COMENTARIO if tipo == 'comentario' else MAX_PRIVADO
    if len(t) > limite:
        errores.append(f'muy largo: {len(t)} caracteres (máximo {limite} en un {tipo})')

    # Saludo con nombre. En redes no va la hora del día: no sabemos cuándo lo lee.
    if not re.match(r'^hola[ ,]', low):
        errores.append('parte con "Hola {nombre}," (sin "estimado", sin hora del día)')
    if re.search(r'estimad[oa]', low):
        errores.append('nada de "estimado/a": suena a corporación')
    if re.search(r'buen(os|as) (d[ií]as|tardes|noches)', low):
        avisos.append('en redes no va la hora del día: no sabemos cuándo lo lee')

    # Tuteo siempre, nunca "usted".
    if re.search(r'\busted\b|\bsu (pedido|compra|tarjeta|n[uú]mero)\b|\ble (enviamos|explico|comparto)\b', low):
        errores.append('se tutea siempre: nada de "usted", "su pedido", "le explico"')

    # Comillas pegadas de otra herramienta.
    if t.startswith('"') or t.startswith("'") or '\\"' in t:
        errores.append('el texto parte con comillas: quedó pegado de otra herramienta')

    # Una sola exclamación y un emoji como máximo.
    if t.count('!') > 1:
        errores.append(f'{t.count("!")} exclamaciones: va una sola')
    emojis = re.findall(r'[\U0001F300-\U0001FAFF☀-➿]', t)
    if len(emojis) > 1:
        errores.append(f'{len(emojis)} emojis: va uno como máximo')

    # Dos puntos dentro de una frase (se permiten los links).
    sin_links = re.sub(r'https?://\S+', '', t)
    if ':' in sin_links:
        errores.append('dos puntos dentro de una frase: unir con coma o partir en dos')

    for pat, por_que in list(PROHIBIDAS.items()) + list(OBVIO.items()):
        m = re.search(pat, low)
        if m:
            errores.append(f'"{m.group(0)}": {por_que}')

    for pat, por_que in CLAIMS.items():
        m = re.search(pat, low)
        if m:
            errores.append(f'"{m.group(0)}": {por_que}')

    m = re.search(PLAZOS, low)
    if m:
        errores.append(f'"{m.group(0)}": el único plazo es "a más tardar en 18 días" desde la compra')

    # Links: solo el de la tienda, limpio.
    for link in re.findall(r'https?://\S+', t):
        # 27-nov (Martin): en privado sí va el enlace de rastreo, que lleva ?nums=.
        if tipo == 'privado' and re.fullmatch(r'https://alegrestiendamexico\.com/apps/parcelpanel\?nums=[\w{}]+', link.rstrip('.,')):
            continue
        if not re.fullmatch(LINK_OK, link.rstrip('.,')):
            errores.append(f'link no permitido o con parámetros ({link[:50]}…): solo alegrestiendamexico.com, sin "?"')
    if len(re.findall(r'https?://\S+', t)) > 1:
        errores.append('más de un link')

    if tipo == 'comentario':
        for pat, por_que in PRIVADOS.items():
            if re.search(pat, t, re.I):
                errores.append(f'{por_que}: eso va por mensaje privado')
        if re.search(r'reembols|devolver(te)? (el|tu) dinero|te devolvemos', low):
            avisos.append('habla de devolver plata en público: confirmar que es la garantía y no un caso')

    # Firma corta.
    if not re.search(r'\bmariana\b', low):
        errores.append('falta la firma "Mariana"')

    return errores, avisos


def main():
    if len(sys.argv) < 3 or sys.argv[1] not in ('comentario', 'privado'):
        print(__doc__)
        sys.exit(2)
    texto = open(sys.argv[2]).read()
    errores, avisos = revisar(sys.argv[1], texto)
    for e in errores:
        print('ERROR ', e)
    for a in avisos:
        print('AVISO ', a)
    if not errores and not avisos:
        print('OK, pasa todas las reglas de redes')
    sys.exit(1 if errores else 0)


if __name__ == '__main__':
    main()

# Design System · Sistema Eléctrico Argentino

Fuente de verdad del diseño del sitio (Unidad 01, IMRSC). Basado en **Material 3 Expressive**.
Los valores viven como variables CSS en `:root` dentro de `index.html`. Ningún componente usa hex sueltos: siempre tokens.

## 1. Principios

1. **El mapa es la navegación.** Todo módulo se abre desde el diagrama de energía (INICIO → ARCOS → NODOS → FINAL) y el mini-recorrido (`.trail`) recuerda en qué punto del diagrama está el estudiante.
2. **La tensión se ve.** El grosor y el color de cada cable representan el nivel de tensión (B.T., M.T., A.T., E.A.T.).
3. **Ancho completo.** Párrafos, callouts, tablas y bloques ocupan todo el ancho de su contenedor. No se usa `max-width` en texto (`.prose { width: 100% }`). La única excepción son imágenes verticales (`.figure.narrow`, imagen centrada hasta 640px, la figura sigue ocupando el ancho).
4. **Accesible por defecto.** Contraste AA, foco visible, objetivos táctiles de 40px o más, `prefers-reduced-motion` respetado.

## 2. Color

### Roles M3 (claro / oscuro)

| Rol | Claro | Oscuro | Uso |
|---|---|---|---|
| primary | `#1F55C7` | `#B1C5FF` | Acción principal, enlaces, "Siguiente" |
| primary-container | `#DAE2FF` | `#0F3E99` | Íconos de cabecera, tarjeta de progreso (mezcla 55%) |
| secondary | `#535E78` | `#BCC6E3` | Neutro azulado |
| secondary-container | `#D7E2FF` | `#3B4660` | Ítem activo del menú, chip activo, botón tonal, "Anterior" |
| tertiary | `#006874` | `#82D3DF` | Energía limpia, flujo |
| surface | `#F8F9FF` | `#10131A` | Fondo de página |
| surface-container-low | `#F2F3FA` | `#181B22` | Drawer, bloques secundarios |
| surface-container-lowest | `#FFFFFF` | `#0B0E14` | Tarjetas sobre el mapa y la grilla |
| outline-variant | `#C4C6D0` | `#44474F` | Bordes de tarjetas |

> No se usa el ámbar como color de interfaz (contenedores, ítems activos). El ámbar es **solo acento de energía**.

### Roles semánticos

| Rol | Token | Claro (color / contenedor) | Oscuro (color / contenedor) | Uso |
|---|---|---|---|---|
| Atención | `--md-warning*` | `#8B5000` / `#FFDCBE` | `#FFB870` / `#6A3C00` | `.alert` (distinciones clave, advertencias) |
| Problema / error / eliminar | `--md-error*` | `#BA1A1A` / `#FFDAD6` | `#FFB4AB` / `#93000A` | `.btn-danger`, `.btn-danger-outlined` (Reiniciar progreso) |
| Correcto / permitido | `--md-success*` | `#1E6C2E` / `#A6F5A6` | `#8BD88C` / `#00531D` | Checks de "Visto", `.btn-success` |

### Acento de energía (gráficos, nunca texto largo)

`--volt-amber #FFB300` · `--volt-yellow #FFD54F` · `--volt-cyan #29B6F6` · `--volt-blue #2F6BFF` · `--energy-gradient` (barras de progreso).
`--energy-accent` (`#8A5300` / `#FFB95C`) para íconos chicos sobre superficie. CTA del hero: `.btn-volt`.

### Colores de etapa (`--s-*` ícono, `--s-*-c` contenedor)

| Etapa | Token | Módulo |
|---|---|---|
| Coordinación | `mem` | Intro: MEM / CAMMESA |
| Inicio | `gen` | Paso 1, Generación |
| Arcos | `cab`, `tor`, `tra` | Pasos 2 a 4 |
| Nodos | `sub` | Paso 5, Subestaciones |
| Final | `dis` | Paso 6, Distribución |
| Regulación | `reg` | MEM 02 |

El mismo color se repite en mapa, menú, tarjetas, mini-recorrido y cabecera del módulo.

## 3. Tipografía

- **Google Sans Flex** para todo. **Roboto Mono** para valores técnicos (kV, fórmulas, códigos de estructura).
- Base 16px, cuerpo de módulo 16.5px / 1.75. Mínimo absoluto 11px (solo rótulos en mayúscula con tracking).
- Títulos de módulo: `clamp(1.6rem, 3.2vw, 2.4rem)`, peso 400 con `<strong>` en 750.

## 4. Espaciado

Escala base 4px: `--sp-1` 4 · `--sp-2` 8 · `--sp-3` 12 · `--sp-4` 16 · `--sp-5` 20 · `--sp-6` 24 · `--sp-8` 32 · `--sp-10` 40 · `--sp-12` 48 · `--sp-16` 64.

| Tipo | Token | Escritorio | ≤720px |
|---|---|---|---|
| Entre secciones de una vista | `--gap-section` | 48 | 40 |
| Entre bloques (callout, figura, tabla, flujo) | `--gap-block` | 24 | 20 |
| Entre párrafos | `--gap-text` | 16 | 16 |
| Padding de tarjeta grande (mapa, cabecera, torre, profundizá) | `--pad-card` | 24 | 20 |
| Padding de tarjeta chica | `--pad-card-sm` | 16 | 16 |
| Margen lateral de página | `--pad-page` | 32 (24 hasta 1100px) | 16 |
| Figuras | `--sp-8` arriba y abajo | 32 | 32 |
| Callout | `--sp-5` vertical, `--sp-6` horizontal, 64px a la izquierda por el ícono | | |

Reglas: dentro de `.prose` el ritmo vertical lo da `> * + *` (no márgenes sueltos). Nunca `overflow: hidden` en un contenedor cuyo hijo tenga sombra o brillo (ej. el logo): se recorta.

## 5. Forma y elevación

Shape M3: `xs 4 · sm 8 · md 12 · lg 16 · lg-inc 20 · xl 28 · full`. Botones `full`. Al presionar, el botón morfea a `md` (rasgo Expressive). Elevación `--elev-1..3`.

## 6. Componentes

### Botones

| Variante | Uso |
|---|---|
| `.btn-filled` | Acción primaria |
| `.btn-volt` | CTA del hero (sobre fondo oscuro) |
| `.btn-tonal` | Secundaria |
| `.btn-outlined` / `.btn-text` | Terciaria |
| `.btn-danger` / `.btn-danger-outlined` | Destructiva (outlined si es menor) |
| `.btn-success` | Confirmación |
| `.icon-btn` | Solo ícono, siempre con `aria-label` |

**Orden:** secundarios a la izquierda, **primario a la derecha** (`justify-content: flex-end`). En ≤720px se apilan a ancho completo con el primario arriba (`column-reverse`). En la navegación de módulo: "Anterior" (tonal) a la izquierda y "Siguiente" (filled) a la derecha.

**Hover obligatorio y visible:** cambio de color (mezcla 12 a 22%), `translateY(-1px)` y `--elev-2`. Íconos, chips, ítems de menú y links del glosario reciben fondo al 8 a 12%. `:active` vuelve a 0 y morfea la forma. `:focus-visible` con anillo de 3px `primary`.

### Mapa de energía (`.energy-map`)

- Bandas `.band` arriba (MEM) y abajo (Regulación).
- `.flowline` con `.stage` (INICIO, ARCOS agrupado en `.stage-group`, NODOS, FINAL), `.node` y `.wire`.
- **Horizontal desde 960px de contenedor** (container query). Debajo, vertical.
- Geometría fija: `--node-top: 42px`, `--line-y` = centro del ícono. La etiqueta del cable va **sobre la línea** y el cable crece al ancho de la etiqueta (`flex: 1 0 auto`), así nunca desborda ni se superpone.
- Estados del nodo: `.is-visited` (check `success`), `.is-next` (anillo pulsante + "Seguí acá").

### Otros

`.hero` (siempre oscuro), `.mcard` (grilla de módulos), `.chip` (filtros), `.trail` (mini-recorrido sticky, los círculos se aplican solo a `li a`), `.mod-head`, `.hbox` (callout con ícono por variante), `.alert` (warning), `.table-wrap` (scroll horizontal interno), `.zoomable` + `<dialog>`, `.deepdive` (acordeón con `aria-expanded`), `.sheet` (glosario: superpuesto, o fijo desde 1480px), `.progress-card` (azul tonal + reinicio outlined error).

## 7. Movimiento

Easing M3: `--ease-emph`, `--ease-emph-decel`, `--ease-spring` (Expressive). Duraciones 150 / 300 / 500ms. Corriente animada en cables, entrada de vistas y tarjetas escalonadas. Todo se desactiva con `prefers-reduced-motion`.

## 8. Redacción (copy)

- **Sin guiones largos (—) ni guiones medios (–).** Usar dos puntos, comas o punto seguido. Rangos numéricos con "a": "13,2 a 33 kV".
- **Sin punto y coma.** Partir en dos oraciones o usar "y".
- Separador de títulos y metadatos: `·`. Secuencias: `→`.
- Voseo rioplatense ("Tocá", "Seguí acá", "Profundizá").

## 9. Verificación (checklist antes de publicar)

Correr la auditoría en 375, 768, 1024 y 1440px, claro y oscuro, recorriendo mapa + 8 módulos (con "Profundizá" abierto y el glosario abierto):

- [ ] Sin scroll horizontal de página ni elementos recortados (salvo `.table-wrap` y chips en mobile).
- [ ] Etiquetas del diagrama sin superposición con nodos ni rótulos.
- [ ] Sin `—`, `–` ni `;` en texto visible, `alt`, `aria-label`, `title` y `placeholder`.
- [ ] Imágenes cargadas y con `alt`.
- [ ] Todo control con nombre accesible.
- [ ] Contraste ≥ 4.5:1 (≥ 3:1 en texto grande).
- [ ] Objetivos táctiles ≥ 30px (≥ 40px en botones).
- [ ] Hover visible en todo elemento interactivo.

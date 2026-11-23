# Sistema Eléctrico Argentino · Guion didáctico interactivo

**Lenguajes y entorno**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-663399?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![SVG](https://img.shields.io/badge/SVG-FFB13B?style=for-the-badge&logo=svg&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

**Sistemas de diseño**

![Material 3 Expressive](https://img.shields.io/badge/Material_3-Expressive-1F55C7?style=for-the-badge&logo=materialdesign&logoColor=white)
![Material Symbols](https://img.shields.io/badge/Material_Symbols-Rounded-535E78?style=for-the-badge&logo=google&logoColor=white)
![Google Fonts](https://img.shields.io/badge/Google_Fonts-Sans_Flex-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white)
![Design tokens](https://img.shields.io/badge/Design-Tokens-006874?style=for-the-badge&logo=stylelint&logoColor=white)

**Metodologías**

![WCAG 2.2 AA](https://img.shields.io/badge/WCAG_2.2-AA-005A9C?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxjaXJjbGUgY3g9IjEyIiBjeT0iNCIgcj0iMi4yIi8+PHBhdGggZD0iTTQgNy41YzIuNi44IDUuMyAxLjIgOCAxLjJzNS40LS40IDgtMS4ybC41IDEuOWMtMiAuNi00IDEtNiAxLjJWMTRsMi42IDcuMy0xLjkuN0wxMi44IDE2aC0xLjZMOC44IDIybC0xLjktLjdMOS41IDE0di0zLjRjLTItLjItNC0uNi02LTEuMnoiLz48L3N2Zz4=)
![Mobile first](https://img.shields.io/badge/Responsive-Mobile_first-2E7D32?style=for-the-badge&logo=googlechrome&logoColor=white)
![UX/UI](https://img.shields.io/badge/UX%2FUI-Diseño_centrado_en_el_usuario-6A3FB5?style=for-the-badge&logo=figma&logoColor=white)
![Diseño instruccional](https://img.shields.io/badge/Diseño_instruccional-Organizador_previo-8A5300?style=for-the-badge&logo=bookstack&logoColor=white)

Recorrido web por el sistema eléctrico argentino, de la central generadora al consumidor final. Material de la **Unidad 01 de IMRSC** (Instalación, Mantenimiento y Reparación de Sistemas Computacionales), 7° año Informática, Instituto Leonardo Murialdo.

El sitio convierte el diagrama **MEM 01** en la puerta de entrada al contenido: cada etapa del diagrama es un módulo, y el estudiante recorre la energía en el mismo orden en que viaja por la red.

---

## Índice

1. [Puesta en marcha](#1-puesta-en-marcha)
2. [Diseño instruccional](#2-diseño-instruccional)
3. [Experiencia de usuario](#3-experiencia-de-usuario)
4. [Interfaz y design system](#4-interfaz-y-design-system)
5. [Accesibilidad](#5-accesibilidad)
6. [Estructura del proyecto](#6-estructura-del-proyecto)
7. [Cómo editar contenido](#7-cómo-editar-contenido)
8. [Control de calidad](#8-control-de-calidad)
9. [Publicación](#9-publicación)
10. [Créditos y fuentes](#10-créditos-y-fuentes)

---

## 1. Puesta en marcha

Requisito: [Node.js](https://nodejs.org) 18 o superior. No hay dependencias que instalar.

```powershell
npm run dev
```

Abrir **http://localhost:5173**. El servidor recarga el navegador al guardar cualquier archivo (si solo cambia un `.css`, refresca los estilos sin recargar). Si el puerto 5173 está ocupado, usa el siguiente libre. Para elegir otro puerto:

```powershell
$env:PORT=8080; npm run dev
```

> El sitio es HTML, CSS y JavaScript sin compilación. También se puede abrir `index.html` directo en el navegador, pero el servidor es recomendable: algunas vistas previas bloquean imágenes locales abiertas como archivo.

---

## 2. Diseño instruccional

### Destinatarios

Estudiantes de 7° año de la orientación Informática (17 a 18 años), que ya manejan conceptos básicos de electricidad y van a instalar y mantener equipos conectados a la red. Uso previsto: en clase con proyector, y de forma autónoma en computadora o celular.

### Objetivos de aprendizaje

Al finalizar el recorrido, el estudiante podrá:

1. **Describir** el camino de la energía eléctrica desde la generación hasta el usuario final.
2. **Identificar** los actores del sistema (CAMMESA, Transener, transportistas troncales, distribuidoras, Secretaría de Energía, ENRE) y su función.
3. **Explicar** por qué la energía se transporta en alta tensión, a partir de la ley de Joule (P = I² × R).
4. **Reconocer** los componentes físicos de la red: conductores, torres, aisladores y subestaciones.
5. **Distinguir** entre quien define la política del sector y quien controla a las concesionarias.

### Secuencia didáctica

La secuencia replica el flujo físico de la energía. El diagrama MEM 01 funciona como **organizador previo** (Ausubel): da la estructura completa antes del detalle.

| # | Módulo | Etapa del diagrama | Contenido clave |
|---|---|---|---|
| 0 | Intro: MEM | Coordinación | Mercado Eléctrico Mayorista, CAMMESA, despacho en tiempo real |
| 1 | Generación | INICIO | Matriz energética, tipos de centrales, salida en media tensión |
| 2 | Cables | ARCOS | Aluminio, acero y cobre, cable ACSR, niveles de tensión |
| 3 | Torres | ARCOS | Partes de la torre, aisladores, tipos de estructura (con "Profundizá") |
| 4 | Transporte | ARCOS | SADI, Transener (500 kV), red troncal (132 kV), interconexiones |
| 5 | Subestaciones | NODOS | Transformación por etapas, de 500 kV a 220 V |
| 6 | Distribución | FINAL | Distribuidoras, cooperativas, grandes usuarios y residenciales |
| 7 | Regulación | MEM 02 | Secretaría de Energía (política) y ENRE (control) |

### Estrategias aplicadas

- **Andamiaje visual.** El grosor de cada cable del mapa representa su nivel de tensión: el concepto de "más tensión, menos pérdidas" se ve antes de leerlo.
- **Orientación constante.** Dentro de cada módulo, el mini-recorrido superior muestra en qué punto del diagrama está el estudiante.
- **Progresión sugerida, no forzada.** El mapa marca el siguiente módulo con "Seguí acá", pero todos los módulos están abiertos. El docente puede saltar según la clase.
- **Divulgación progresiva.** El contenido base es breve. El detalle técnico vive en bloques "Profundizá" desplegables y en el panel de glosario.
- **Señalización.** Los callouts tienen ícono y color por tipo: dato, idea clave, atención.
- **Retroalimentación de avance.** Los módulos vistos se marcan con un check y la barra de progreso se guarda en el navegador de cada estudiante.
- **Recursos complementarios.** Glosario rápido, "¿Sabías que…?", fórmula clave y enlaces a videos, artículos y fuentes oficiales (CAMMESA, ENRE, GeoSADI).

### Sugerencias de uso en clase

- **Apertura (proyector):** recorrer el mapa completo sin entrar a los módulos y preguntar "¿por dónde pasa la energía antes de llegar al aula?".
- **Desarrollo:** un módulo por bloque de clase, en orden. El módulo 3 (Torres) admite trabajo autónomo con el "Profundizá" y el PDF de la UTN.
- **Cierre:** volver al mapa y pedir que expliquen oralmente una etapa usando el vocabulario del diagrama (arcos, nodos, tensión).
- **Evaluación sugerida:** completar un diagrama MEM 01 en blanco con actores y niveles de tensión.

---

## 3. Experiencia de usuario

### Arquitectura de información

```
Mapa de la energía (inicio)
├── Hero: progreso del recorrido + "Continuar"
├── Diagrama interactivo MEM 01  ← navegación principal
│   ├── Banda superior: MEM / CAMMESA
│   ├── INICIO → ARCOS → NODOS → FINAL
│   └── Banda inferior: Regulación
└── Todos los módulos (filtros + buscador)

Módulo (#/paso/0 … #/paso/7)
├── Mini-recorrido (sticky)
├── Cabecera con color de etapa
├── Contenido
└── Anterior / Siguiente

Glosario y recursos (panel lateral, accesible desde cualquier vista)
```

### Decisiones clave

| Decisión | Por qué |
|---|---|
| El diagrama es la navegación | Une el modelo mental del contenido con el modelo de navegación: aprender el recorrido y moverse por el sitio son la misma acción. |
| Rutas con `#/paso/N` | Cada módulo se puede compartir por link, y el botón "atrás" del navegador funciona. |
| Progreso en `localStorage` | Sin cuentas ni servidor. Cada estudiante ve su avance. Se puede reiniciar. |
| Filtros por tipo de contenido | "Recorrido físico", "Infraestructura" y "Actores y regulación" permiten repasar por eje temático. |
| Glosario en panel lateral | Se consulta sin perder el lugar de lectura. Fijo en pantallas muy anchas (≥ 1480 px). |
| Saludo según la hora y tiempo de lectura | Bajan la carga percibida y ayudan a planificar la sesión. |

### Responsive

| Ancho | Comportamiento |
|---|---|
| ≥ 1101 px | Menú lateral fijo. Diagrama horizontal si el contenedor mide 960 px o más. |
| 721 a 1100 px | Menú como panel modal (botón ☰). Diagrama vertical. |
| ≤ 720 px | Márgenes y espaciados compactos. Botones apilados con el primario arriba. Tablas con scroll interno. |

---

## 4. Interfaz y design system

La fuente de verdad es **[`design-system/sistema-electrico/MASTER.md`](design-system/sistema-electrico/MASTER.md)**. Resumen:

- **Base:** Material 3 Expressive (roles de color, escala de forma, easing con resorte, morfología de botones al presionar).
- **Paleta de energía:** azul eléctrico (red), ámbar solo como acento de energía, cian (flujo). Modo claro y oscuro completos.
- **Colores semánticos:** atención (naranja), error o eliminar (rojo), correcto (verde).
- **Colores de etapa:** cada etapa del recorrido tiene un par color/contenedor que se repite en mapa, menú, tarjetas y cabeceras.
- **Tipografía:** Google Sans Flex. Roboto Mono para valores técnicos.
- **Espaciado:** escala de 4 px con tokens por tipo de bloque (`--gap-section`, `--gap-block`, `--gap-text`, `--pad-card`, `--pad-page`).
- **Íconos:** Material Symbols Rounded para la interfaz. Íconos de dominio propios en SVG (central, cable ACSR en corte, torre, red, transformador, casa, balanza).

### Reglas que no se negocian

- Texto y bloques al **ancho completo** del contenedor.
- Botones: **secundario a la izquierda, primario a la derecha**.
- **Hover visible** en todo elemento interactivo.
- Redacción **sin guiones largos (—), sin guiones medios (–) y sin punto y coma**. Rangos con "a": "13,2 a 33 kV".
- Nada de colores sueltos en componentes: siempre tokens.

---

## 5. Accesibilidad

Objetivo: **WCAG 2.2 nivel AA**.

- Contraste de texto ≥ 4.5:1 (≥ 3:1 en texto grande), verificado en claro y oscuro.
- Navegación completa con teclado, foco visible de 3 px, enlace "Saltar al contenido".
- Al cambiar de módulo, el foco va al título y se actualiza el `<title>` de la página.
- `Esc` cierra el menú, el glosario y el visor de imágenes.
- Imágenes con texto alternativo descriptivo. Íconos decorativos ocultos a lectores de pantalla.
- Los cambios de progreso se anuncian con una región `aria-live`.
- Objetivos táctiles de 40 px o más en botones.
- `prefers-reduced-motion` desactiva la corriente animada y las transiciones.
- El color nunca es el único indicador: los estados "visto" y "siguiente" llevan ícono y texto.

---

## 6. Estructura del proyecto

```
.
├── index.html                      Estructura y contenido de los 8 módulos, mapa, glosario
├── css/styles.css                  Estilos: tokens M3 (claro y oscuro), componentes, responsive
├── js/app.js                       Lógica: router, progreso, mapa, filtros, glosario, tema, zoom
├── assets/pictures/                Imágenes de los módulos (diagramas MEM, fotos, figuras UTN)
├── design-system/
│   └── sistema-electrico/MASTER.md Design system: tokens, componentes, reglas, checklist
├── scripts/dev-server.mjs          Servidor de desarrollo con recarga automática (sin dependencias)
├── .claude/launch.json             Configuración del servidor para la vista previa de Claude Code
└── package.json                    Scripts: npm run dev
```

---

## 7. Cómo editar contenido

| Quiero… | Archivo | Dónde |
|---|---|---|
| Cambiar el texto de un módulo | `index.html` | `<section class="step-panel" id="panel-N">` |
| Cambiar título, descripción, etapa o filtros de un módulo en el mapa y las tarjetas | `js/app.js` | Arreglo `STEPS` al inicio |
| Agregar un término al glosario | `index.html` | `<aside class="sheet">`, bloque "Glosario rápido" |
| Agregar un recurso externo | `index.html` | `<aside class="sheet">`, usar `.aside-link` con `target="_blank" rel="noopener"` |
| Cambiar un color o un espaciado | `css/styles.css` | Tokens en `:root` (y su par en los dos bloques de modo oscuro) |
| Cambiar un componente | `css/styles.css` | Cada bloque está titulado con un comentario (`APP SHELL`, `VIEW: MAPA`, `VIEW: MÓDULO`, etc.) |

> El pequeño script del `<head>` de `index.html` aplica el tema guardado antes del primer pintado. Queda en línea a propósito para evitar un destello de color al cargar.

### Componentes de contenido disponibles

| Clase | Uso |
|---|---|
| `.body-text` | Párrafos |
| `.hbox` + `blue`, `amber`, `teal`, `purple`, `red`, `gray` | Callout con ícono según la etapa |
| `.alert` | Atención (distinciones clave) |
| `.flow` + `.flow-node` + `.flow-arrow` | Secuencia de etapas |
| `.table-wrap` + `.data-table` | Tabla comparativa con scroll en mobile |
| `.figure` + `.zoomable` | Imagen ampliable (con `figcaption`) |
| `.deepdive` | Bloque "Profundizá" desplegable |

Antes de guardar, revisar la redacción: sin guiones largos, sin guiones medios y sin punto y coma.

---

## 8. Control de calidad

Checklist completo en la sección 9 de [`MASTER.md`](design-system/sistema-electrico/MASTER.md). Mínimo antes de publicar:

- [ ] Probar en 375, 768, 1024 y 1440 px, en modo claro y oscuro.
- [ ] Recorrer los 8 módulos con "Profundizá" y el glosario abiertos.
- [ ] Sin scroll horizontal ni elementos recortados. Etiquetas del diagrama sin superposiciones.
- [ ] Imágenes cargadas y con `alt`.
- [ ] Navegar todo con teclado (Tab, Enter, Esc).
- [ ] Redacción sin `—`, `–` ni `;`.

---

## 9. Publicación

Es un sitio estático: alcanza con subir `index.html`, `css/`, `js/` y `assets/` a cualquier hosting (GitHub Pages, Netlify, Google Sites con incrustación, el servidor de la escuela). No hace falta compilar. Las fuentes e íconos se cargan desde Google Fonts.

---

## 10. Créditos y fuentes

- **Contenido y diseño didáctico:** Prof. Lourdes Pedaci · Instituto Leonardo Murialdo.
- **Fuentes:** CAMMESA · Secretaría de Energía de la Nación · ENRE · UTN Facultad Regional Reconquista (Ing. Claudio Cendra, *Líneas aéreas de Media y Alta Tensión*).
- **Diseño:** Material 3 de Google · Material Symbols · Google Sans Flex.

Material didáctico de uso educativo.

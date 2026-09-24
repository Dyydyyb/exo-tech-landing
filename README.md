# 🦷 Laboratorio Dental EXO-TECH | Flujo 100% Digital

Landing page de alta conversión para **Laboratorio Dental EXO-TECH**, especializado en flujo 100% digital, prótesis sobre implantes y fresado CAD/CAM de máxima precisión.

![EXO-TECH Preview](assets/logo.png)

---

## 🚀 Características Principales

* **Adaptación Móvil 100%**: Diseñada con enfoque *mobile-first*, compatible con todos los smartphones (desde 320px de ancho), tablets y monitores de escritorio.
  * Inputs optimizados sin auto-zoom indeseado en iOS Safari (`font-size: 16px`).
  * Controles táctiles adaptados con áreas de pulsación mínimas de 44px.
  * Soporte para `viewport-fit=cover` y notch/safe-areas en iPhone.
* **Modelo Dental 3D Anatómico Interactivo (Three.js)**:
  * Anatomía coronal con incisivos esculpidos, caninos, premolares y molares con cúspides.
  * Collar cervical festoneado y encía anatómica.
  * Sistema de **Ensamblado CAD/CAM con Fijación de Despiece**: permite al usuario controlar el porcentaje exacto de explosión de la corona, tornillo de retención, pilar Ti-Base y análogo/implante.
  * Modo de visualización **Malla Exocad Wireframe** y botón de animación automática.
  * Vistas predeterminadas: Oclusión Completa, Arcada Superior y Despiece CAD/CAM.
* **Canal de Contacto Inteligente**:
  * Formulario categorizado por especialidad clínica: *Zirconio y Disilicato*, *Prótesis sobre implantes*, *Modelos 3D*, *Diseño CAD/CAM* y *Lista de Precios*.
  * Botón y modal flotante de WhatsApp que pre-redacta el mensaje técnico listo para enviar.
  * Email oficial para recepción de archivos STL/PLY: `Labmazzaraexocad@gmail.com`.
  * Línea directa telefónica y WhatsApp: `1169751973` (`+54 9 11 6975-1973`).
* **Estética Médica y Sobria**:
  * Paleta en blanco clínico y azul oscuro casi negro sólido mate (`#0D1527`), sin brillos de neón ni degradados exagerados, acorde a la identidad institucional de la marca.

---

## 📂 Estructura del Proyecto

```text
├── index.html        # Estructura semántica, SEO y metadatos Open Graph
├── styles.css        # Sistema de diseño, CSS variables y media queries 100% mobile
├── app.js            # Lógica Three.js, OrbitControls, slider CAD/CAM y WhatsApp inteligente
├── vercel.json       # Configuración de headers de seguridad y caché para Vercel
├── assets/
│   └── logo.png      # Isotipo y logotipo oficial de Laboratorio EXO-TECH
├── .gitignore        # Exclusiones de Git
└── README.md         # Documentación del proyecto
```

---

## ⚡ Despliegue Inmediato en Vercel

Este proyecto está 100% listo para ser desplegado en **Vercel**:

### Opción 1: Desde la Web de Vercel (Recomendado)
1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New Project"** e importa el repositorio `exo-tech-landing`.
3. Vercel detectará automáticamente que es un proyecto web estático.
4. Haz clic en **"Deploy"**. En 10 segundos tu sitio estará en vivo con HTTPS automático y CDN global.

### Opción 2: Usando Vercel CLI
```bash
npx vercel
```
Sigue los pasos rápidos en la terminal y confirma el despliegue a producción con:
```bash
npx vercel --prod
```

---

## 🛠️ Ejecución Local

Para probarlo localmente en cualquier momento:

```bash
# Con Node.js:
npx serve .

# O con Python:
python -m http.server 8080
```
Luego abre tu navegador en `http://localhost:8080`.

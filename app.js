/**
 * LABORATORIO DENTAL EXO-TECH
 * Script Principal: Modelo 3D Dental Anatómico de Alta Precisión (Three.js),
 * Sistema de Ensamblado CAD/CAM con Fijación de Porcentaje y WhatsApp Inteligente
 */

document.addEventListener('DOMContentLoaded', () => {
  const LAB_PHONE = '5491169751973';
  const LAB_EMAIL = 'Labmazzaraexocad@gmail.com';

  // --------------------------------------------------------------------------
  // 1. SISTEMA DE CONTACTO INTELIGENTE (MENSAJES PRE-CONFIGURADOS)
  // --------------------------------------------------------------------------
  const categoryTemplates = {
    'Zirconio y Disilicato': {
      title: 'Zirconio y Disilicato',
      summary: 'Hola Laboratorio EXO-TECH. Me contacto para coordinar un caso de *Zirconio y Disilicato* (coronas/puentes/carillas). Quisiera consultar tiempos de fresado, disponibilidad de multicapa 4D y tarifas de laboratorio.'
    },
    'Prótesis sobre implantes': {
      title: 'Prótesis sobre implantes',
      summary: 'Hola Laboratorio EXO-TECH. Me contacto para cotizar un caso de *Prótesis sobre implantes* (pilares Ti-Base personalizados / barras híbridas). Cuento con escaneo digital con scan body para enviar.'
    },
    'Modelos 3D': {
      title: 'Modelos 3D y Guías Quirúrgicas',
      summary: 'Hola Laboratorio EXO-TECH. Deseo información y cotización sobre *Modelos 3D / Guías Quirúrgicas* planificadas con CBCT y escaneo intraoral.'
    },
    'Diseño CAD/CAM': {
      title: 'Diseño CAD/CAM Exocad',
      summary: 'Hola Laboratorio EXO-TECH. Me interesa su servicio de *Diseño CAD/CAM en Exocad* y fresado de 5 ejes para casos clínicos de mi consultorio.'
    },
    'Lista de Precios y Nuevas Cuentas': {
      title: 'Lista de Precios Oficial',
      summary: 'Hola Laboratorio EXO-TECH. Quisiera solicitar su *Lista de Precios Oficial* para clínicas y conocer las condiciones para dar de alta mi cuenta en su flujo digital.'
    }
  };

  const smartContactForm = document.getElementById('smartContactForm');
  const formCategory = document.getElementById('formCategory');
  const doctorName = document.getElementById('doctorName');
  const doctorPhone = document.getElementById('doctorPhone');
  const doctorEmail = document.getElementById('doctorEmail');
  const scannerBrand = document.getElementById('scannerBrand');
  const caseDetails = document.getElementById('caseDetails');
  const messagePreviewText = document.getElementById('messagePreviewText');
  const btnSubmitWhatsApp = document.getElementById('btnSubmitWhatsApp');
  const formFeedback = document.getElementById('formFeedback');

  function buildCategorizedMessage() {
    const selectedCat = (formCategory && formCategory.value) || 'Zirconio y Disilicato';
    const baseTemplate = categoryTemplates[selectedCat] || categoryTemplates['Zirconio y Disilicato'];
    
    let message = baseTemplate.summary;
    const name = doctorName ? doctorName.value.trim() : '';
    const phone = doctorPhone ? doctorPhone.value.trim() : '';
    const email = doctorEmail ? doctorEmail.value.trim() : '';
    const scanner = scannerBrand ? scannerBrand.value : '';
    const details = caseDetails ? caseDetails.value.trim() : '';

    let extraInfo = [];
    if (name) extraInfo.push(`\n*Profesional / Clínica:* ${name}`);
    if (phone) extraInfo.push(`*Contacto:* ${phone}`);
    if (email) extraInfo.push(`*Email:* ${email}`);
    if (scanner && scanner !== 'No especificado') extraInfo.push(`*Escáner:* ${scanner}`);
    if (details) extraInfo.push(`*Detalle del Caso:* ${details}`);

    if (extraInfo.length > 0) {
      message += '\n' + extraInfo.join('\n');
    }
    return message;
  }

  function updateMessagePreview() {
    if (!messagePreviewText) return;
    const msg = buildCategorizedMessage();
    messagePreviewText.textContent = `"${msg.replace(/\*/g, '')}"`;
  }

  if (formCategory) formCategory.addEventListener('change', updateMessagePreview);
  if (doctorName) doctorName.addEventListener('input', updateMessagePreview);
  if (doctorPhone) doctorPhone.addEventListener('input', updateMessagePreview);
  if (doctorEmail) doctorEmail.addEventListener('input', updateMessagePreview);
  if (scannerBrand) scannerBrand.addEventListener('change', updateMessagePreview);
  if (caseDetails) caseDetails.addEventListener('input', updateMessagePreview);

  updateMessagePreview();

  if (btnSubmitWhatsApp) {
    btnSubmitWhatsApp.addEventListener('click', () => {
      if (formCategory && !formCategory.value) {
        showFeedback('Por favor selecciona una especialidad en el formulario antes de enviar.', 'error');
        formCategory.focus();
        return;
      }
      const finalMsg = buildCategorizedMessage();
      const waUrl = `https://wa.me/${LAB_PHONE}?text=${encodeURIComponent(finalMsg)}`;
      window.open(waUrl, '_blank');
      showFeedback('¡Abriendo WhatsApp con tu caso categorizado!', 'success');
    });
  }

  if (smartContactForm) {
    smartContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!formCategory.value) {
        showFeedback('Por favor selecciona la especialidad de la consulta.', 'error');
        formCategory.focus();
        return;
      }
      if (!doctorName.value.trim() || !doctorPhone.value.trim()) {
        showFeedback('Por favor completa el nombre del profesional y teléfono de contacto.', 'error');
        return;
      }
      showFeedback('Procesando solicitud técnica de laboratorio...', 'success');
      setTimeout(() => {
        showFeedback('¡Solicitud recibida con éxito! Un especialista de EXO-TECH se comunicará en breve con tu clínica.', 'success');
        smartContactForm.reset();
        updateMessagePreview();
      }, 1200);
    });
  }

  function showFeedback(text, type) {
    if (!formFeedback) return;
    formFeedback.textContent = text;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.style.display = 'block';
    setTimeout(() => {
      if (type === 'success') formFeedback.style.display = 'none';
    }, 6000);
  }

  // --------------------------------------------------------------------------
  // 2. WHATSAPP FLOTANTE Y POPUP
  // --------------------------------------------------------------------------
  const floatingWaBtn = document.getElementById('floatingWaBtn');
  const waPopupModal = document.getElementById('waPopupModal');
  const waCloseBtn = document.getElementById('waCloseBtn');
  const heroOpenWaSmart = document.getElementById('heroOpenWaSmart');

  function openWaModal() {
    if (waPopupModal) {
      waPopupModal.classList.add('active');
      waPopupModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeWaModal() {
    if (waPopupModal) {
      waPopupModal.classList.remove('active');
      waPopupModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (floatingWaBtn) {
    floatingWaBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (waPopupModal && waPopupModal.classList.contains('active')) {
        closeWaModal();
      } else {
        openWaModal();
      }
    });
  }

  if (heroOpenWaSmart) {
    heroOpenWaSmart.addEventListener('click', (e) => {
      e.preventDefault();
      openWaModal();
    });
  }

  if (waCloseBtn) {
    waCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeWaModal();
    });
  }

  document.addEventListener('click', (e) => {
    if (waPopupModal && waPopupModal.classList.contains('active')) {
      if (!waPopupModal.contains(e.target) && e.target !== floatingWaBtn) {
        closeWaModal();
      }
    }
  });

  const waOptionCards = document.querySelectorAll('.wa-option-card');
  waOptionCards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.category;
      const tpl = categoryTemplates[cat] || categoryTemplates['Zirconio y Disilicato'];
      const textToSend = `${tpl.summary}\n(Enviado desde el canal directo web de Laboratorio EXO-TECH)`;
      const url = `https://wa.me/${LAB_PHONE}?text=${encodeURIComponent(textToSend)}`;
      window.open(url, '_blank');
      closeWaModal();
    });
  });

  const categorySelectButtons = document.querySelectorAll('.btn-category-select, .btn-quick-cat');
  categorySelectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedCategory = btn.dataset.category || btn.dataset.cat;
      if (formCategory && selectedCategory) {
        formCategory.value = selectedCategory;
        updateMessagePreview();
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          smartContactForm.style.transition = 'box-shadow 0.3s ease';
          smartContactForm.style.boxShadow = '0 0 0 3px #0F172A';
          setTimeout(() => { smartContactForm.style.boxShadow = ''; }, 1500);
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. MENÚ MÓVIL
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-action-btn');

  function openDrawer() {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.add('open');
      mobileBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    }
  }

  function closeDrawer() {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.remove('open');
      mobileBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

  // --------------------------------------------------------------------------
  // 4. THREE.JS: MODELO DENTAL 3D DE ALTA DEFINICIÓN ANATÓMICA
  // --------------------------------------------------------------------------
  initHighDefDentalViewer();
});

/**
 * Inicializador del Modelo Dental 3D de Alta Fidelidad
 */
function initHighDefDentalViewer() {
  const mountPoint = document.getElementById('dentalCanvasMount');
  if (!mountPoint) return;

  if (typeof THREE === 'undefined') {
    mountPoint.innerHTML = '<div style="padding:20px;text-align:center;color:#64748B;">Cargando motor 3D...</div>';
    return;
  }

  // 1. Escena, Cámara y Renderizador
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xF8FAFC);

  const width = mountPoint.clientWidth || 500;
  const height = mountPoint.clientHeight || 420;
  const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
  camera.position.set(0, 2.4, 13);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  mountPoint.appendChild(renderer.domElement);

  // 2. Controles de Órbita Suaves
  let controls;
  if (typeof THREE.OrbitControls !== 'undefined') {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.75;
    controls.zoomSpeed = 0.85;
    controls.minDistance = 5;
    controls.maxDistance = 24;
    controls.maxPolarAngle = Math.PI / 1.7;
    controls.target.set(0, 0, 0.6);
  }

  // 3. Sistema de Iluminación de Estudio Clínico
  // Luz de relleno ambiental
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.65);
  scene.add(ambientLight);

  // Luz principal derecha (Key light) que genera volumen y resalta las cúspides
  const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.25);
  keyLight.position.set(7, 12, 11);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.bias = -0.0001;
  scene.add(keyLight);

  // Luz de relleno izquierda (Fill light) suave
  const fillLight = new THREE.DirectionalLight(0xE2E8F0, 0.75);
  fillLight.position.set(-8, 6, 8);
  scene.add(fillLight);

  // Luz cenital posterior para contorno de incisivos (Rim light)
  const rimLight = new THREE.DirectionalLight(0xCBD5E1, 0.6);
  rimLight.position.set(0, 10, -6);
  scene.add(rimLight);

  // 4. Materiales Clínicos Certificados
  // Cerámica Zirconio Multicapa VITA A1 con brillo glaseado
  const matZirconia = new THREE.MeshStandardMaterial({
    color: 0xFCFAF4,
    roughness: 0.16,
    metalness: 0.05
  });

  // Encía / Mucosa Gingival Saludable con festoneado
  const matGingiva = new THREE.MeshStandardMaterial({
    color: 0xD66E7C,
    roughness: 0.58,
    metalness: 0.01
  });

  // Titanio Grado 5 Médico Fresado
  const matTitanium = new THREE.MeshStandardMaterial({
    color: 0x546274,
    roughness: 0.22,
    metalness: 0.92
  });

  // Tornillo Clínico Dorado (Gold prosthetic hex screw)
  const matGoldScrew = new THREE.MeshStandardMaterial({
    color: 0xD4AF37,
    roughness: 0.2,
    metalness: 0.85
  });

  // Modo Exocad DentalCAD (Malla Alámbrica Azul)
  const matCadWireframe = new THREE.MeshStandardMaterial({
    color: 0x0284C7,
    roughness: 0.25,
    metalness: 0.1,
    wireframe: true
  });

  // Línea guía de eje de inserción protésica
  const matGuideLine = new THREE.LineDashedMaterial({
    color: 0x0284C7,
    dashSize: 0.2,
    gapSize: 0.12,
    linewidth: 2
  });

  // Grupo Maestro de la Dentadura
  const dentalRig = new THREE.Group();
  scene.add(dentalRig);

  const toothMeshes = [];
  const gingivaMeshes = [];
  const titaniumMeshes = [];

  // --------------------------------------------------------------------------
  // 5. CONSTRUCTORES DE DIENTES INDIVIDUALES ALTAMENTE DEFINIDOS
  // --------------------------------------------------------------------------

  // Incisivo Central: Corona ancha, cara vestibular convexa, borde incisal recto/biselado
  function createCentralIncisorCrown(isUpper) {
    const group = new THREE.Group();
    const w = 1.18, h = 1.48, d = 0.68;
    // Corona con bisel anatómico suave
    const geom = new THREE.CylinderGeometry(w * 0.46, w * 0.38, h, 24);
    geom.scale(1.15, 1.0, 0.65);
    const mesh = new THREE.Mesh(geom, matZirconia);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    toothMeshes.push(mesh);
    return group;
  }

  // Incisivo Lateral: Proporción armónica, ligeramente más estrecho y delicado
  function createLateralIncisorCrown(isUpper) {
    const group = new THREE.Group();
    const w = 0.95, h = 1.36, d = 0.62;
    const geom = new THREE.CylinderGeometry(w * 0.45, w * 0.36, h, 22);
    geom.scale(1.1, 1.0, 0.68);
    const mesh = new THREE.Mesh(geom, matZirconia);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    toothMeshes.push(mesh);
    return group;
  }

  // Canino: Cúspide piramidal redondeada natural con cresta central vestibular
  function createCanineCrown(isUpper) {
    const group = new THREE.Group();
    const w = 1.08, h = 1.55, d = 0.88;
    // Cuerpo cónico con punta suavemente redondeada (no puntiaguda como aguja)
    const geom = new THREE.CylinderGeometry(w * 0.22, w * 0.46, h, 22);
    geom.scale(1.05, 1.0, 0.9);
    if (!isUpper) geom.rotateX(Math.PI);
    const mesh = new THREE.Mesh(geom, matZirconia);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    toothMeshes.push(mesh);
    return group;
  }

  // Premolar: Corona bicúspide con dos montículos redondeados anatómicos y surco central
  function createPremolarCrown(isUpper) {
    const group = new THREE.Group();
    const w = 1.08, h = 1.15, d = 1.12;

    // Cuerpo base cervical
    const baseGeom = new THREE.CylinderGeometry(w * 0.48, w * 0.42, h * 0.65, 20);
    baseGeom.scale(1.0, 1.0, 1.08);
    const baseMesh = new THREE.Mesh(baseGeom, matZirconia);
    baseMesh.position.y = isUpper ? h * 0.16 : -h * 0.16;
    baseMesh.castShadow = true;
    group.add(baseMesh);

    // Cúspides redondeadas en semiesfera (vestibular y lingual)
    const cuspRad = w * 0.26;
    const cuspVGeom = new THREE.SphereGeometry(cuspRad, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2);
    if (isUpper) cuspVGeom.rotateX(Math.PI);
    const cuspVMesh = new THREE.Mesh(cuspVGeom, matZirconia);
    cuspVMesh.position.set(0, isUpper ? -h * 0.16 : h * 0.16, d * 0.2);
    group.add(cuspVMesh);

    const cuspLGeom = new THREE.SphereGeometry(cuspRad * 0.9, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2);
    if (isUpper) cuspLGeom.rotateX(Math.PI);
    const cuspLMesh = new THREE.Mesh(cuspLGeom, matZirconia);
    cuspLMesh.position.set(0, isUpper ? -h * 0.14 : h * 0.14, -d * 0.18);
    group.add(cuspLMesh);

    toothMeshes.push(baseMesh, cuspVMesh, cuspLMesh);
    return group;
  }

  // Molar: Corona quadricúspide con 4 cúspides redondeadas y fosa oclusal anatómica
  function createMolarCrown(isUpper, isSecond = false) {
    const group = new THREE.Group();
    const s = isSecond ? 0.92 : 1.0;
    const w = 1.48 * s, h = 1.15 * s, d = 1.42 * s;

    // Cuerpo base del molar
    const baseGeom = new THREE.CylinderGeometry(w * 0.48, w * 0.44, h * 0.65, 22);
    baseGeom.scale(1.08, 1.0, 1.05);
    const baseMesh = new THREE.Mesh(baseGeom, matZirconia);
    baseMesh.position.y = isUpper ? h * 0.16 : -h * 0.16;
    baseMesh.castShadow = true;
    group.add(baseMesh);

    // 4 Cúspides redondeadas en semiesferas anatómicas
    const rC = w * 0.22;
    const cuspOffsets = [
      { x: -w * 0.22, z: d * 0.22 }, // Mesio-vestibular
      { x:  w * 0.22, z: d * 0.22 }, // Disto-vestibular
      { x: -w * 0.20, z:-d * 0.20 }, // Mesio-palatina
      { x:  w * 0.20, z:-d * 0.20 }  // Disto-palatina
    ];

    cuspOffsets.forEach(c => {
      const cGeom = new THREE.SphereGeometry(rC, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2);
      if (isUpper) cGeom.rotateX(Math.PI);
      const cMesh = new THREE.Mesh(cGeom, matZirconia);
      cMesh.position.set(c.x, isUpper ? -h * 0.16 : h * 0.16, c.z);
      group.add(cMesh);
      toothMeshes.push(cMesh);
    });

    toothMeshes.push(baseMesh);
    return group;
  }

  // --------------------------------------------------------------------------
  // 6. ESTRUCTURA PARA EL DESPIECE DEL IMPLANTE CAD/CAM (Exploded Assembly)
  // --------------------------------------------------------------------------
  const implantAssembly = {
    rootGroup: new THREE.Group(),
    fixtureScrew: null,
    tiBase: null,
    fixScrew: null,
    zirconiaCrown: null,
    guideLine: null,
    currentExplosion: 0
  };

  // --------------------------------------------------------------------------
  // 7. CONSTRUCCIÓN DE LAS ARCADAS (MAXILAR Y MANDÍBULA CON FESTONEO GINGIVAL)
  // --------------------------------------------------------------------------

  // Curva de la arcada dental (orientada frontalmente: incisivos en +Z)
  function getArchPoint(theta, a = 3.35, b = 3.8) {
    const x = a * Math.sin(theta);
    const z = b * Math.cos(theta) - (b * 0.42);
    const normalAngle = theta; // Rotación para mirar hacia afuera
    return { x, z, normalAngle };
  }

  function buildDentalArch(isUpper = true) {
    const archGroup = new THREE.Group();
    const sign = isUpper ? 1 : -1;
    const yBase = isUpper ? 0.72 : -0.72;
    const archA = isUpper ? 3.4 : 3.15; // Ligero overjet anatómico
    const archB = isUpper ? 3.8 : 3.55;

    // A) Base Ósea Alveolar (Delicada y esbelta, ubicada detrás de los cuellos dentales)
    const curvePoints = [];
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const theta = -Math.PI / 2.1 + (i / steps) * (Math.PI / 1.05);
      const pt = getArchPoint(theta, archA, archB);
      // El reborde óseo se sitúa por encima/debajo de las coronas
      curvePoints.push(new THREE.Vector3(pt.x, yBase + sign * 0.55, pt.z));
    }
    const archCurve = new THREE.CatmullRomCurve3(curvePoints);
    const gingivaGeom = new THREE.TubeGeometry(archCurve, 50, 0.48, 16, false);
    const gingivaMesh = new THREE.Mesh(gingivaGeom, matGingiva);
    gingivaMesh.castShadow = true;
    gingivaMesh.receiveShadow = true;
    archGroup.add(gingivaMesh);
    gingivaMeshes.push(gingivaMesh);

    // B) Distribución de los 14 dientes por arcada con ángulos espaciados sin solaparse
    const toothSpecs = [
      { id: '11', type: 'incisorCentral', theta: 0.07,  w: 1.15, h: 1.45, d: 0.68 },
      { id: '12', type: 'incisorLateral', theta: 0.23,  w: 0.92, h: 1.35, d: 0.62 },
      { id: '13', type: 'canine',         theta: 0.41,  w: 1.05, h: 1.55, d: 0.88 },
      { id: '14', type: 'premolar1',      theta: 0.60,  w: 1.05, h: 1.25, d: 1.10 },
      { id: '15', type: 'premolar2',      theta: 0.81,  w: 1.10, h: 1.25, d: 1.15 },
      { id: '16', type: 'molar1',         theta: 1.06,  w: 1.45, h: 1.25, d: 1.40 },
      { id: '17', type: 'molar2',         theta: 1.32,  w: 1.35, h: 1.20, d: 1.35, isSecond: true }
    ];

    toothSpecs.forEach(spec => {
      // Lado derecho
      mountSingleTooth(spec, spec.theta, isUpper, archA, archB, yBase, archGroup);
      // Lado izquierdo (simétrico)
      mountSingleTooth(spec, -spec.theta, isUpper, archA, archB, yBase, archGroup);
    });

    return archGroup;
  }

  function mountSingleTooth(spec, theta, isUpper, archA, archB, yBase, parentGroup) {
    const pt = getArchPoint(theta, archA, archB);
    const sign = isUpper ? 1 : -1;
    // Curva de Spee suave
    const speeCurveY = Math.abs(theta) * (isUpper ? 0.06 : -0.06);
    const toothY = yBase - sign * (spec.h * 0.42) + speeCurveY;

    // Festón gingival (Cuello / Zenith individual para cada diente que delimita la encía)
    const collarGeom = new THREE.CylinderGeometry(spec.w * 0.44, spec.w * 0.48, 0.32, 16);
    collarGeom.scale(1.1, 1, 0.85);
    const collarMesh = new THREE.Mesh(collarGeom, matGingiva);
    collarMesh.position.set(pt.x, yBase + sign * 0.12 + speeCurveY, pt.z);
    collarMesh.rotation.y = pt.normalAngle;
    parentGroup.add(collarMesh);
    gingivaMeshes.push(collarMesh);

    // DEMOSTRACIÓN DE DESPIECE CAD/CAM: Primer Premolar Superior Derecho (#14)
    const isSpecialImplantSite = isUpper && Math.abs(theta - 0.60) < 0.05 && theta > 0;

    if (isSpecialImplantSite) {
      const impRoot = implantAssembly.rootGroup;
      impRoot.position.set(pt.x, yBase + speeCurveY, pt.z);
      impRoot.rotation.y = pt.normalAngle;

      // 1. Fixture de Titanio (Tornillo autorroscante en hueso)
      const fixtureGroup = new THREE.Group();
      const screwGeom = new THREE.CylinderGeometry(0.32, 0.18, 1.7, 16);
      const screwMesh = new THREE.Mesh(screwGeom, matTitanium);
      fixtureGroup.add(screwMesh);

      // Espiras de rosca de precisión
      for (let s = -0.55; s <= 0.55; s += 0.28) {
        const ringGeom = new THREE.TorusGeometry(0.33, 0.035, 8, 16);
        ringGeom.rotateX(Math.PI / 2);
        const ringMesh = new THREE.Mesh(ringGeom, matTitanium);
        ringMesh.position.y = s;
        fixtureGroup.add(ringMesh);
      }
      // Conexión hexagonal interna
      const hexGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.25, 6);
      const hexMesh = new THREE.Mesh(hexGeom, matTitanium);
      hexMesh.position.y = -0.9;
      fixtureGroup.add(hexMesh);

      fixtureGroup.position.y = 1.0;
      impRoot.add(fixtureGroup);
      implantAssembly.fixtureScrew = fixtureGroup;
      titaniumMeshes.push(screwMesh);

      // 2. Ti-Base Abutment de Titanio
      const tiBaseGeom = new THREE.CylinderGeometry(0.42, 0.32, 0.75, 18);
      const tiBaseMesh = new THREE.Mesh(tiBaseGeom, matTitanium);
      tiBaseMesh.position.y = -0.05;
      impRoot.add(tiBaseMesh);
      implantAssembly.tiBase = tiBaseMesh;
      titaniumMeshes.push(tiBaseMesh);

      // 3. Tornillo Protésico Dorado de Fijación
      const screwProtGeom = new THREE.CylinderGeometry(0.11, 0.11, 1.05, 12);
      const screwProtMesh = new THREE.Mesh(screwProtGeom, matGoldScrew);
      screwProtMesh.position.y = 0.15;
      impRoot.add(screwProtMesh);
      implantAssembly.fixScrew = screwProtMesh;

      // 4. Corona de Zirconio Fresada Multicapa
      const crownGroup = createPremolarCrown(true);
      crownGroup.position.y = -0.72;
      impRoot.add(crownGroup);
      implantAssembly.zirconiaCrown = crownGroup;

      // 5. Línea Guía Vertical de Inserción
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 2.8, 0),
        new THREE.Vector3(0, -3.2, 0)
      ]);
      const guideLine = new THREE.Line(lineGeom, matGuideLine);
      guideLine.computeLineDistances();
      guideLine.visible = false;
      impRoot.add(guideLine);
      implantAssembly.guideLine = guideLine;

      parentGroup.add(impRoot);
      return;
    }

    // Pieza dental anatómica estándar
    let toothGroup;
    if (spec.type === 'incisorCentral') toothGroup = createCentralIncisorCrown(isUpper);
    else if (spec.type === 'incisorLateral') toothGroup = createLateralIncisorCrown(isUpper);
    else if (spec.type === 'canine') toothGroup = createCanineCrown(isUpper);
    else if (spec.type === 'premolar1' || spec.type === 'premolar2') toothGroup = createPremolarCrown(isUpper);
    else toothGroup = createMolarCrown(isUpper, spec.isSecond);

    toothGroup.position.set(pt.x, toothY, pt.z);
    toothGroup.rotation.y = pt.normalAngle;

    parentGroup.add(toothGroup);
  }

  // Generamos Maxilar Superior y Mandíbula Inferior
  const upperArch = buildDentalArch(true);
  const lowerArch = buildDentalArch(false);

  dentalRig.add(upperArch);
  dentalRig.add(lowerArch);

  // Inclinación anatómica frontal
  dentalRig.position.set(0, 0, 0);
  dentalRig.rotation.x = 0.06;

  // --------------------------------------------------------------------------
  // 8. CONTROL DEL DESPIECE Y SOLUCIÓN DEL SLIDER
  // --------------------------------------------------------------------------
  let isAutoRotating = true;
  let isCadMode = false;
  let currentViewMode = 'full';

  // Variables para la animación fluida y slider fijo
  let targetExplosion = 0;
  let isTransitioningExplosion = false;
  let isAutoPlayingAssembly = false;
  let autoPlayProgress = 0;

  const tabFullArch = document.getElementById('tabFullArch');
  const tabUpperArch = document.getElementById('tabUpperArch');
  const tabExploded = document.getElementById('tabExploded');
  const btnToggleShading = document.getElementById('btnToggleShading');
  const shadingBtnText = document.getElementById('shadingBtnText');
  const btnToggleRotate = document.getElementById('btnToggleRotate');
  const rotateBtnText = document.getElementById('rotateBtnText');
  const btnPlayAssembly = document.getElementById('btnPlayAssembly');
  const playAssemblyText = document.getElementById('playAssemblyText');
  const btnResetView = document.getElementById('btnResetView');
  const assemblySlider = document.getElementById('assemblySlider');
  const sliderValDisplay = document.getElementById('sliderValDisplay');
  const cadModeLabel = document.getElementById('cadModeLabel');
  const gestureHint = document.getElementById('gestureHint');

  // Función de actualización de posiciones de despiece
  function applyExplosionPositions(factor) {
    implantAssembly.currentExplosion = factor;

    if (implantAssembly.fixtureScrew) {
      // El implante de titanio sube hacia el hueso
      implantAssembly.fixtureScrew.position.y = 1.0 + factor * 1.7;
    }
    if (implantAssembly.tiBase) {
      implantAssembly.tiBase.position.y = -0.05 + factor * 0.45;
    }
    if (implantAssembly.fixScrew) {
      implantAssembly.fixScrew.position.y = 0.15 - factor * 0.85;
    }
    if (implantAssembly.zirconiaCrown) {
      // La corona de zirconio baja para revelar el ajuste pasivo con el pilar
      implantAssembly.zirconiaCrown.position.y = -0.72 - factor * 2.2;
    }
    if (implantAssembly.guideLine) {
      implantAssembly.guideLine.visible = factor > 0.05;
    }

    const pct = Math.round(factor * 100);
    if (sliderValDisplay) {
      sliderValDisplay.textContent = `${pct}%`;
    }
    if (assemblySlider && Math.abs(parseInt(assemblySlider.value, 10) - pct) > 1) {
      assemblySlider.value = pct;
    }
  }

  // --- SOLUCIÓN CLAVE DEL SLIDER: EL PORCENTAJE SE QUEDA EXACTO ---
  if (assemblySlider) {
    assemblySlider.addEventListener('input', (e) => {
      // Detener cualquier animación automática en curso para respetar al usuario
      isTransitioningExplosion = false;
      isAutoPlayingAssembly = false;
      if (btnPlayAssembly) btnPlayAssembly.classList.remove('active');
      if (playAssemblyText) playAssemblyText.textContent = 'Animar Despiece';

      const val = parseFloat(e.target.value) / 100;
      targetExplosion = val; // Se fija la meta en el valor exacto del usuario
      applyExplosionPositions(val);

      if (val > 0.05 && currentViewMode !== 'exploded') {
        lowerArch.visible = false;
        if (tabExploded) {
          [tabFullArch, tabUpperArch].forEach(b => b && b.classList.remove('active'));
          tabExploded.classList.add('active');
        }
      } else if (val === 0 && currentViewMode === 'exploded') {
        lowerArch.visible = true;
      }
    });
  }

  // Animación Automática de Ensamblado (Play Loop)
  if (btnPlayAssembly) {
    btnPlayAssembly.addEventListener('click', () => {
      isAutoPlayingAssembly = !isAutoPlayingAssembly;
      isTransitioningExplosion = false;

      if (isAutoPlayingAssembly) {
        btnPlayAssembly.classList.add('active');
        if (playAssemblyText) playAssemblyText.textContent = 'Pausar Ensamblado';
        lowerArch.visible = false;
        animateCameraTo(4.2, 1.2, 8.5, 1.8, 0.2, 1.5);
      } else {
        btnPlayAssembly.classList.remove('active');
        if (playAssemblyText) playAssemblyText.textContent = 'Animar Despiece';
      }
    });
  }

  // Cambio de Pestañas
  function switchView(mode) {
    currentViewMode = mode;
    isAutoPlayingAssembly = false;
    if (btnPlayAssembly) btnPlayAssembly.classList.remove('active');
    if (playAssemblyText) playAssemblyText.textContent = 'Animar Despiece';

    [tabFullArch, tabUpperArch, tabExploded].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });

    if (mode === 'full') {
      if (tabFullArch) tabFullArch.classList.add('active');
      upperArch.visible = true;
      lowerArch.visible = true;
      targetExplosion = 0;
      isTransitioningExplosion = true;
      animateCameraTo(0, 2.4, 13, 0, 0, 0.6);
    } else if (mode === 'upper') {
      if (tabUpperArch) tabUpperArch.classList.add('active');
      upperArch.visible = true;
      lowerArch.visible = false;
      targetExplosion = 0;
      isTransitioningExplosion = true;
      animateCameraTo(0, 8.5, 5, 0, 0.5, 0);
    } else if (mode === 'exploded') {
      if (tabExploded) tabExploded.classList.add('active');
      upperArch.visible = true;
      lowerArch.visible = false;
      targetExplosion = 0.85;
      isTransitioningExplosion = true;
      animateCameraTo(4.2, 1.2, 8.5, 1.8, 0.2, 1.5);
    }
  }

  if (tabFullArch) tabFullArch.addEventListener('click', () => switchView('full'));
  if (tabUpperArch) tabUpperArch.addEventListener('click', () => switchView('upper'));
  if (tabExploded) tabExploded.addEventListener('click', () => switchView('exploded'));

  // Modo Malla CAD
  if (btnToggleShading) {
    btnToggleShading.addEventListener('click', () => {
      isCadMode = !isCadMode;
      const targetMat = isCadMode ? matCadWireframe : matZirconia;
      
      toothMeshes.forEach(mesh => {
        mesh.material = targetMat;
      });

      if (shadingBtnText) shadingBtnText.textContent = isCadMode ? 'Ver Cerámica Real' : 'Ver Malla CAD';
      if (cadModeLabel) cadModeLabel.textContent = isCadMode ? 'MODO EXOCAD WIREFRAME' : 'MODO ZIRCONIO PBR';
      btnToggleShading.classList.toggle('active', isCadMode);
    });
  }

  // Rotación Automática
  if (btnToggleRotate) {
    btnToggleRotate.addEventListener('click', () => {
      isAutoRotating = !isAutoRotating;
      if (rotateBtnText) rotateBtnText.textContent = isAutoRotating ? 'Pausar' : 'Rotar';
      btnToggleRotate.classList.toggle('active', isAutoRotating);
    });
  }

  // Reset / Centrar
  if (btnResetView) {
    btnResetView.addEventListener('click', () => {
      switchView('full');
      dentalRig.rotation.y = 0;
    });
  }

  // Interpolación de Cámara
  let targetCamPos = { x: 0, y: 2.4, z: 13 };
  let targetControlsTarget = { x: 0, y: 0, z: 0.6 };
  let isTransitioningCamera = false;

  function animateCameraTo(cx, cy, cz, tx, ty, tz) {
    targetCamPos = { x: cx, y: cy, z: cz };
    targetControlsTarget = { x: tx, y: ty, z: tz };
    isTransitioningCamera = true;
  }

  function dismissGestureHint() {
    if (gestureHint) {
      gestureHint.style.opacity = '0';
      setTimeout(() => { gestureHint.style.display = 'none'; }, 400);
    }
  }

  mountPoint.addEventListener('pointerdown', dismissGestureHint, { once: true });
  mountPoint.addEventListener('wheel', dismissGestureHint, { once: true });

  // --------------------------------------------------------------------------
  // 9. BUCLE DE RENDERIZADO Y CONTROL DE TIEMPO
  // --------------------------------------------------------------------------
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    // Rotación suave del modelo
    if (isAutoRotating && !isAutoPlayingAssembly) {
      dentalRig.rotation.y += 0.005;
    }

    // Interpolación de cámara
    if (isTransitioningCamera) {
      camera.position.lerp(new THREE.Vector3(targetCamPos.x, targetCamPos.y, targetCamPos.z), 0.07);
      if (controls) {
        controls.target.lerp(new THREE.Vector3(targetControlsTarget.x, targetControlsTarget.y, targetControlsTarget.z), 0.07);
      }
      if (camera.position.distanceTo(new THREE.Vector3(targetCamPos.x, targetCamPos.y, targetCamPos.z)) < 0.04) {
        isTransitioningCamera = false;
      }
    }

    // Modo Auto-Play de Ensamblado CAD/CAM (Onda senoidal continua)
    if (isAutoPlayingAssembly) {
      autoPlayProgress += delta * 0.9;
      // Oscila suavemente entre 0.0 y 0.95
      const waveVal = (Math.sin(autoPlayProgress) + 1) / 2 * 0.95;
      applyExplosionPositions(waveVal);
    } 
    // Transición suave programática (solo cuando se hace clic en tabs)
    else if (isTransitioningExplosion) {
      const diff = targetExplosion - implantAssembly.currentExplosion;
      if (Math.abs(diff) > 0.003) {
        const newFactor = implantAssembly.currentExplosion + diff * 0.1;
        applyExplosionPositions(newFactor);
      } else {
        applyExplosionPositions(targetExplosion);
        isTransitioningExplosion = false;
      }
    }

    if (controls) {
      controls.update();
    }

    renderer.render(scene, camera);
  }

  animate();

  // --------------------------------------------------------------------------
  // 10. MANEJO RESPONSIVO
  // --------------------------------------------------------------------------
  function handleResize() {
    if (!mountPoint || !renderer || !camera) return;
    const w = mountPoint.clientWidth;
    const h = mountPoint.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', handleResize);
}

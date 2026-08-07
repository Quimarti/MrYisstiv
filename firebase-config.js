// ============================================================
// CONFIGURACIÓN DE FIREBASE
// ============================================================
// 1. Ve a https://console.firebase.google.com
// 2. Crea un proyecto (o usa uno existente)
// 3. Ve a "Configuración del proyecto" (⚙️) → sección "Tus apps" → agrega una app web
// 4. Copia los valores que te da Firebase y pégalos abajo, reemplazando cada "..."
// 5. Guarda este archivo TAL CUAL en la raíz de tu repositorio (junto a index.html)
//
// Este archivo se puede subir a GitHub sin problema: estas claves son públicas
// por diseño (identifican tu proyecto, no dan acceso a nada por sí solas).
// La seguridad real se controla con las "Reglas de Firestore" (ver la guía).
// ============================================================

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Instancias que usaremos en toda la app (admin.js y también tu sitio público)
const auth = firebase.auth();
const db = firebase.firestore();

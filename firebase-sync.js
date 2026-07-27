// ============================================================
// firebase-sync.js — MR YISSTIV cholados
// ============================================================
// Capa de sincronización entre tu app (que guarda todo en
// localStorage, por lo que solo vivía en el navegador de cada
// persona) y Firestore (una base de datos compartida en la nube).
//
// Cómo funciona:
// 1) Cuando algo se guarda localmente (un pedido, una reserva, un
//    producto editado, puntos de un cliente...) esta capa también
//    lo sube a Firestore, en segundo plano, sin bloquear la app.
// 2) Firestore avisa en tiempo real cuando algo cambia (en
//    cualquier dispositivo) y esta capa actualiza el localStorage
//    local y vuelve a pintar en pantalla lo que corresponda.
//
// Así, todas las pantallas de administrador que ya tenías
// (Gestionar pedidos, Precios y promos, Sabores, Info del negocio)
// siguen funcionando exactamente igual, pero ahora los datos se
// comparten entre el celular, el computador de la tienda, etc.
//
// Requiere que firebase-config.js se haya cargado ANTES que este
// archivo (define `db` = firebase.firestore()).
// ============================================================

// ------------------------------------------------------------
// PRODUCTOS DEL MENÚ (los que gestiona "Precios y promos" /
// el editor de menú en index.html)
// ------------------------------------------------------------
function subirProductoPersonalizadoAFirestore(producto) {
    db.collection('productos_personalizados').doc(String(producto.id)).set(producto)
        .catch(err => console.error('No se pudo sincronizar el producto:', err));
}

function eliminarProductoPersonalizadoDeFirestore(id) {
    db.collection('productos_personalizados').doc(String(id)).delete()
        .catch(err => console.error('No se pudo eliminar el producto en la nube:', err));
}

function marcarProductoOriginalEliminadoEnFirestore(id) {
    db.collection('productos_eliminados').doc(String(id)).set({ eliminado: true })
        .catch(err => console.error('No se pudo sincronizar la eliminación:', err));
}

// ------------------------------------------------------------
// SABORES DE HELADO (página sabores.html)
// ------------------------------------------------------------
function subirSaborAFirestore(sabor) {
    db.collection('sabores_helado').doc(String(sabor.id)).set(sabor)
        .catch(err => console.error('No se pudo sincronizar el sabor:', err));
}

function eliminarSaborDeFirestore(id) {
    db.collection('sabores_helado').doc(String(id)).delete()
        .catch(err => console.error('No se pudo eliminar el sabor en la nube:', err));
}

// ------------------------------------------------------------
// RESERVAS
// ------------------------------------------------------------
function subirReservaAFirestore(reserva) {
    db.collection('reservas').doc(String(reserva.id)).set(reserva)
        .catch(err => console.error('No se pudo sincronizar la reserva:', err));
}

function cancelarReservaEnFirestore(id) {
    db.collection('reservas').doc(String(id)).delete()
        .catch(err => console.error('No se pudo cancelar la reserva en la nube:', err));
}

// ------------------------------------------------------------
// PEDIDOS
// ------------------------------------------------------------
function subirPedidoAFirestore(pedido) {
    db.collection('pedidos').doc(String(pedido.id)).set(pedido)
        .catch(err => console.error('No se pudo sincronizar el pedido:', err));
}

function actualizarEstadoPedidoEnFirestore(id, estado) {
    db.collection('pedidos').doc(String(id)).update({ estado })
        .catch(err => console.error('No se pudo actualizar el estado del pedido:', err));
}

// ------------------------------------------------------------
// CLIENTES / CLUB DE PUNTOS
// ------------------------------------------------------------
function subirClienteAFirestore(cliente) {
    db.collection('clientes').doc(cliente.documento).set(cliente)
        .catch(err => console.error('No se pudo sincronizar el cliente:', err));
}

// ------------------------------------------------------------
// PROMOCIÓN E INFORMACIÓN DEL NEGOCIO (documentos únicos)
// ------------------------------------------------------------
function subirPromoAFirestore(promo) {
    db.collection('configuracion').doc('promo').set(promo)
        .catch(err => console.error('No se pudo sincronizar la promoción:', err));
}

function subirInfoNegocioAFirestore(info) {
    db.collection('configuracion').doc('info_negocio').set(info)
        .catch(err => console.error('No se pudo sincronizar la información del negocio:', err));
}

// ------------------------------------------------------------
// ARRANQUE: escucha en tiempo real y mantiene todo sincronizado
// ------------------------------------------------------------
function iniciarSincronizacionFirestore() {
    if (typeof db === 'undefined') {
        console.warn('Firestore no está configurado (revisa firebase-config.js). La app seguirá funcionando solo en este navegador.');
        return;
    }

    // ----- Productos personalizados del menú -----
    db.collection('productos_personalizados').onSnapshot((snapshot) => {
        const lista = snapshot.docs.map(doc => doc.data());
        localStorage.setItem('saboresPersonalizados', JSON.stringify(lista));
        refrescarVistaMenu();
    }, err => console.error('Error escuchando productos_personalizados:', err));

    // ----- Productos originales ocultos/eliminados -----
    db.collection('productos_eliminados').onSnapshot((snapshot) => {
        const ids = snapshot.docs.map(doc => Number(doc.id));
        localStorage.setItem('saboresEliminados', JSON.stringify(ids));
        refrescarVistaMenu();
    }, err => console.error('Error escuchando productos_eliminados:', err));

    // ----- Sabores de helado -----
    // La primera vez que alguien abre sabores.html en cualquier dispositivo,
    // si Firestore todavía no tiene sabores, sube los que ya sembró
    // SaborHeladoDAO localmente para que todos partan del mismo catálogo.
    db.collection('sabores_helado').get().then((snapshot) => {
        if (!snapshot.empty) return;
        const localesGuardados = JSON.parse(localStorage.getItem('saboresHelado') || '[]');
        localesGuardados.forEach(sabor => subirSaborAFirestore(sabor));
    }).catch(err => console.error('No se pudo revisar la siembra de sabores:', err));

    db.collection('sabores_helado').onSnapshot((snapshot) => {
        if (snapshot.empty) return; // evita borrar la siembra inicial antes de que se suba por primera vez
        const lista = snapshot.docs.map(doc => doc.data());
        localStorage.setItem('saboresHelado', JSON.stringify(lista));
        if (typeof renderizarGridSabores === 'function') renderizarGridSabores();
    }, err => console.error('Error escuchando sabores_helado:', err));

    // ----- Reservas -----
    db.collection('reservas').onSnapshot((snapshot) => {
        const lista = snapshot.docs.map(doc => doc.data());
        localStorage.setItem('reservas', JSON.stringify(lista));
        if (typeof reservaDAO !== 'undefined' && reservaDAO) reservaDAO.reservas = lista;
        if (typeof renderizarMisReservas === 'function') renderizarMisReservas();
    }, err => console.error('Error escuchando reservas:', err));

    // ----- Pedidos -----
    db.collection('pedidos').onSnapshot((snapshot) => {
        const lista = snapshot.docs.map(doc => doc.data());
        localStorage.setItem('pedidos', JSON.stringify(lista));
        refrescarVistaPedidos();
    }, err => console.error('Error escuchando pedidos:', err));

    // ----- Clientes / puntos -----
    db.collection('clientes').onSnapshot((snapshot) => {
        const lista = snapshot.docs.map(doc => doc.data());
        localStorage.setItem('clientes', JSON.stringify(lista));
        if (typeof clienteDAO !== 'undefined' && clienteDAO) clienteDAO.clientes = lista;
        refrescarVistaPuntos();
    }, err => console.error('Error escuchando clientes:', err));

    // ----- Promoción general -----
    db.collection('configuracion').doc('promo').onSnapshot((doc) => {
        if (!doc.exists) return;
        localStorage.setItem('promoGeneral', JSON.stringify(doc.data()));
        if (typeof renderizarPromoBanner === 'function') renderizarPromoBanner();
    }, err => console.error('Error escuchando la promoción:', err));

    // ----- Información del negocio -----
    db.collection('configuracion').doc('info_negocio').onSnapshot((doc) => {
        if (!doc.exists) return;
        localStorage.setItem('infoNegocio', JSON.stringify(doc.data()));
        if (typeof renderizarInfoNegocio === 'function') renderizarInfoNegocio();
    }, err => console.error('Error escuchando la información del negocio:', err));
}

// Vuelve a pintar el catálogo de la tienda (index.html) tras recibir cambios remotos.
function refrescarVistaMenu() {
    if (typeof renderizarProductosPersonalizados === 'function') renderizarProductosPersonalizados();
    if (typeof actualizarControlesGestorMenu === 'function') actualizarControlesGestorMenu();
    if (typeof reaplicarFiltroActual === 'function') reaplicarFiltroActual();
}

// Vuelve a pintar la vista de pedidos abierta en ese momento (perfil de cliente o de staff).
function refrescarVistaPedidos() {
    const detalle = document.getElementById('perfil-detalle');
    if (!detalle || !detalle.innerHTML.trim()) return;
    const sesion = typeof obtenerSesionActual === 'function' ? obtenerSesionActual() : null;
    if (!sesion) return;
    if ((sesion.rol === 'admin' || sesion.rol === 'trabajador') && typeof renderizarPedidosStaff === 'function') {
        renderizarPedidosStaff(detalle);
    } else if (sesion.rol === 'cliente' && typeof manejarAccionPerfil === 'function') {
        // Solo refresca si el cliente tiene abierta la vista de "Mis pedidos"
        if (detalle.querySelector('.perfil-detalle-fila, .perfil-detalle-vacio')) {
            manejarAccionPerfil('pedidos');
        }
    }
}

// Vuelve a pintar el saldo de puntos si la persona lo tiene abierto en su perfil.
function refrescarVistaPuntos() {
    const detalle = document.getElementById('perfil-detalle');
    if (detalle && detalle.innerHTML.includes('puntos')) {
        if (typeof manejarAccionPerfil === 'function') manejarAccionPerfil('puntos');
    }
}

// Arranca la sincronización en cuanto el resto de la app ya inicializó sus DAOs.
document.addEventListener('DOMContentLoaded', () => {
    // Se ejecuta después de que app.js cree carrito/productoDAO/etc.,
    // porque este script se carga DESPUÉS de app.js en el HTML.
    iniciarSincronizacionFirestore();
});

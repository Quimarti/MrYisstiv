// ============================================
// PATRÓN STRATEGY - Métodos de Pago
// ============================================
class PagoEstrategia {
    procesar(monto) {
        throw new Error('Método procesar debe ser implementado');
    }
}

class PagoEfectivo extends PagoEstrategia {
    procesar(monto) {
        return {
            exito: true,
            mensaje: `Pago en efectivo de $${monto.toLocaleString()} procesado correctamente`,
            metodo: 'Efectivo'
        };
    }
}

class PagoTarjeta extends PagoEstrategia {
    procesar(monto) {
        return {
            exito: true,
            mensaje: `Pago con tarjeta de $${monto.toLocaleString()} procesado correctamente`,
            metodo: 'Tarjeta'
        };
    }
}

class PagoNequi extends PagoEstrategia {
    procesar(monto) {
        return {
            exito: true,
            mensaje: `Pago con Nequi de $${monto.toLocaleString()} procesado correctamente`,
            metodo: 'Nequi'
        };
    }
}

class PagoDaviplata extends PagoEstrategia {
    procesar(monto) {
        return {
            exito: true,
            mensaje: `Pago con Daviplata de $${monto.toLocaleString()} procesado correctamente`,
            metodo: 'Daviplata'
        };
    }
}

// Contexto del patrón Strategy
class ContextoPago {
    constructor(estrategia) {
        this.estrategia = estrategia;
    }

    setEstrategia(estrategia) {
        this.estrategia = estrategia;
    }

    ejecutarPago(monto) {
        return this.estrategia.procesar(monto);
    }
}

// ============================================
// REPOSITORY/DAO - Gestión de Datos
// ============================================
class ProductoDAO {
  constructor() {
    this.productos = this.cargarProductos();
  }

  cargarProductos() {
    return [
      // 1. 🍨 CHOLADOS Y BEBIDAS ESPECIALES
      { id: 1, nombre: 'Yisstiv Cholao', precio: 10000, categoria: 'cholados' },
      { id: 2, nombre: 'Maracuyazo', precio: 10000, categoria: 'cholados' },
      { id: 3, nombre: 'Guanabanazo', precio: 10000, categoria: 'cholados' },
      { id: 4, nombre: 'Lulada', precio: 10000, categoria: 'cholados' },
      { id: 5, nombre: 'Salpiqueso', precio: 10000, categoria: 'cholados' },
      { id: 6, nombre: 'Maracumango', precio: 10000, categoria: 'cholados' },
      { id: 7, nombre: 'Mangazo', precio: 10000, categoria: 'cholados' },
      { id: 8, nombre: 'Malteada', precio: 13000, categoria: 'cholados' },
      { id: 9, nombre: 'Banana Split', precio: 13000, categoria: 'cholados' },

      // 2. 🍦 CONOS
      { id: 10, nombre: 'Cono Volteado', precio: 10000, categoria: 'conos' },
      { id: 11, nombre: 'Cono Sencillo', precio: 4000, categoria: 'conos' },
      { id: 12, nombre: 'Cono Doble', precio: 6000, categoria: 'conos' },

      // 3. 🥤 LIMONADAS ESPECIALES
      { id: 13, nombre: 'Limonada Brasileña', precio: 6000, categoria: 'limonadas' },
      { id: 14, nombre: 'Limonada Mango Biche', precio: 6000, categoria: 'limonadas' },
      { id: 15, nombre: 'Cerezada', precio: 7000, categoria: 'limonadas' },

      // 4. 🧇 OBLEAS
      { id: 22, nombre: 'Oblea Sencilla Arequipe', precio: 3000, categoria: 'obleas' },
      { id: 23, nombre: 'Oblea Doble', precio: 5000, categoria: 'obleas' },

      // 5. 🍰 POSTRES ESPECIALES
      { id: 16, nombre: 'Ensalada Yisstiv', precio: 10000, categoria: 'postres' },
      { id: 17, nombre: 'Brownie con Helado', precio: 10000, categoria: 'postres' },
      { id: 19, nombre: 'Fresas con Crema', precio: 15000, categoria: 'postres' },
      { id: 20, nombre: 'Tentación de Queso', precio: 13000, categoria: 'postres' },

      // 6. 🧊 RASPADOS Y GRANIZADOS
      { id: 18, nombre: 'Raspados', precio: 6000, categoria: 'raspados' },
      { id: 21, nombre: 'Yisstiv Ice Kiss', precio: 12000, categoria: 'raspados' },

      // 7. 🥪 COMIDAS RÁPIDAS
      { id: 24, nombre: 'Yisstiv Sandwich', precio: 12000, categoria: 'comidas' },
      { id: 25, nombre: 'Queso Asado', precio: 9000, categoria: 'comidas' },

      // 8. ☕ BEBIDAS
      { id: 26, nombre: 'Migao', precio: 15000, categoria: 'bebidas' },
      { id: 28, nombre: 'Aguapanela', precio: 9000, categoria: 'bebidas' },
      { id: 27, nombre: 'Jugo Natural', precio: 9000, categoria: 'bebidas' },
      { id: 29, nombre: 'Botella de Agua', precio: 3000, categoria: 'bebidas' }
    ];
  }

  obtenerPorId(id) {
    return this.productos.find(p => p.id === id);
  }

  obtenerPorCategoria(categoria) {
    if (categoria === 'todos') return this.productos;
    return this.productos.filter(p => p.categoria === categoria);
  }
}
class ReservaDAO {
    constructor() {
        this.reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    }

    guardar(reserva) {
        this.reservas.push(reserva);
        localStorage.setItem('reservas', JSON.stringify(this.reservas));
    }

    obtenerTodas() {
        return this.reservas;
    }
}

class UsuarioDAO {
    constructor() {
        this.usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    }

    guardar(usuario) {
        const index = this.usuarios.findIndex(u => u.documento === usuario.documento);
        if (index >= 0) {
            this.usuarios[index] = usuario;
        } else {
            this.usuarios.push(usuario);
        }
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }

    obtenerPorDocumento(documento) {
        return this.usuarios.find(u => u.documento === documento);
    }
}

class ClienteDAO {
    constructor() {
        this.clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    }

    guardar(cliente) {
        const index = this.clientes.findIndex(c => c.documento === cliente.documento);
        if (index >= 0) {
            this.clientes[index] = cliente;
        } else {
            this.clientes.push(cliente);
        }
        localStorage.setItem('clientes', JSON.stringify(this.clientes));
    }

    obtenerPorDocumento(documento) {
        return this.clientes.find(c => c.documento === documento);
    }

    // Suma puntos a un cliente (lo crea si no existe) y devuelve el cliente actualizado.
    // Regla: 1 punto por cada $1.000 gastados.
    sumarPuntosPorCompra(documento, totalCompra) {
        const puntosGanados = Math.floor(totalCompra / 1000);
        let cliente = this.obtenerPorDocumento(documento);

        if (!cliente) {
            cliente = {
                documento,
                nombre: 'Cliente',
                puntos: 0,
                nivel: 'Bronce',
                fechaRegistro: new Date().toISOString()
            };
        }

        cliente.puntos += puntosGanados;
        cliente.nivel = this.calcularNivel(cliente.puntos);
        this.guardar(cliente);

        return { cliente, puntosGanados };
    }

    calcularNivel(puntos) {
        if (puntos >= 1000) return 'Oro';
        if (puntos >= 500) return 'Plata';
        return 'Bronce';
    }
}

// ============================================
// CARRITO DE COMPRAS (DOMICILIOS)
// ============================================
class Carrito {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('carrito') || '[]');
        this.actualizarContador();
    }

    agregar(productoId, nombre, precio) {
        const itemExistente = this.items.find(item => item.id === productoId);
        
        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            this.items.push({
                id: productoId,
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });
        }
        
        this.guardar();
        this.actualizarVista();
        this.actualizarContador();
        this.mostrarNotificacion(`${nombre} agregado al domicilio`, 'exito');
    }

    eliminar(productoId) {
        this.items = this.items.filter(item => item.id !== productoId);
        this.guardar();
        this.actualizarVista();
        this.actualizarContador();
        this.mostrarNotificacion('Producto eliminado del pedido', 'info');
    }

    cambiarCantidad(productoId, cambio) {
        const item = this.items.find(item => item.id === productoId);
        if (item) {
            item.cantidad += cambio;
            if (item.cantidad <= 0) {
                this.eliminar(productoId);
            } else {
                this.guardar();
                this.actualizarVista();
                this.actualizarContador();
            }
        }
    }

    obtenerTotal() {
        return this.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }

    guardar() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
    }

    actualizarContador() {
        const contador = document.getElementById('contador-carrito');
        if (contador) {
            const totalItems = this.items.reduce((sum, item) => sum + item.cantidad, 0);
            contador.textContent = totalItems;
        }
    }

    actualizarVista() {
        const contenedorCarrito = document.getElementById('items-carrito');
        const totalValor = document.getElementById('total-valor');

        // En la landing ya no existe el resumen de pedido (se movió a Domicilios
        // informativo). El carrito sigue funcionando como contador de interés
        // en el nav; esto solo se activará cuando exista una página de Tienda/checkout.
        if (!contenedorCarrito || !totalValor) return;
        
        if (this.items.length === 0) {
            contenedorCarrito.innerHTML = '<p class="carrito-vacio">Tu pedido está vacío. ¡Agrega productos deliciosos del menú!</p>';
            totalValor.textContent = '0';
            return;
        }

        contenedorCarrito.innerHTML = this.items.map(item => `
            <div class="item-carrito">
                <div class="item-info">
                    <div class="item-nombre">${item.nombre}</div>
                    <div class="item-precio">$${(item.precio * item.cantidad).toLocaleString()}</div>
                </div>
                <div class="item-controles">
                    <button class="btn-cantidad" onclick="carrito.cambiarCantidad(${item.id}, -1)">-</button>
                    <span>${item.cantidad}</span>
                    <button class="btn-cantidad" onclick="carrito.cambiarCantidad(${item.id}, 1)">+</button>
                    <button class="btn-eliminar" onclick="carrito.eliminar(${item.id})">Eliminar</button>
                </div>
            </div>
        `).join('');

        totalValor.textContent = this.obtenerTotal().toLocaleString();
    }

    mostrarNotificacion(mensaje, tipo = '') {
        const notificacion = document.getElementById('notificacion');
        notificacion.textContent = mensaje;
        notificacion.className = `notificacion mostrar ${tipo}`;
        
        setTimeout(() => {
            notificacion.classList.remove('mostrar');
        }, 3000);
    }

    vaciar() {
        this.items = [];
        this.guardar();
        this.actualizarVista();
        this.actualizarContador();
    }
}

// ============================================
// FUNCIONES GLOBALES
// ============================================
let carrito;
let productoDAO;
let reservaDAO;
let clienteDAO;
let usuarioDAO;
let modalErrorContexto = null;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    carrito = new Carrito();
    productoDAO = new ProductoDAO();
    reservaDAO = new ReservaDAO();
    clienteDAO = new ClienteDAO();
    usuarioDAO = new UsuarioDAO();
    
    inicializarFiltros();
    inicializarSelectorCategorias();
    inicializarFormularioReserva();
    inicializarFormularioDomicilio();
    inicializarFormularioLogin();
    inicializarFormularioRegistro();
    establecerFechaMinima();
    actualizarNavSesion();
});

// Selector visual de categorías (landing) — cambia la imagen grande al elegir una categoría
function inicializarSelectorCategorias() {
    const items = document.querySelectorAll('.cat-visual');
    const imagenes = document.querySelectorAll('.imagen-categoria');

    if (!items.length) return;

    items.forEach(item => {
        item.addEventListener('click', () => {
            const categoria = item.dataset.cat;

            items.forEach(i => i.classList.remove('activa'));
            item.classList.add('activa');

            imagenes.forEach(img => {
                img.classList.toggle('activa', img.dataset.cat === categoria);
            });
        });
    });
}

// Filtros de categorías
function inicializarFiltros() {
    const botonesCategoria = document.querySelectorAll('.btn-categoria');
    const tarjetas = document.querySelectorAll('#contenedor-productos .tarjeta-producto');
    
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesCategoria.forEach(btn => btn.classList.remove('activa'));
            boton.classList.add('activa');
            
            const categoria = boton.dataset.categoria;
            
            tarjetas.forEach(tarjeta => {
                if (categoria === 'todos' || tarjeta.dataset.categoria === categoria) {
                    tarjeta.style.display = 'block';
                    setTimeout(() => {
                        tarjeta.style.opacity = '1';
                        tarjeta.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    tarjeta.style.opacity = '0';
                    tarjeta.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        tarjeta.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Agregar al carrito
function agregarAlCarrito(id, nombre, precio) {
    carrito.agregar(id, nombre, precio);
}

// Formulario de Reservas
function inicializarFormularioReserva() {
    const formulario = document.getElementById('form-reserva');
    
    if (!formulario) return;
    
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const personas = document.getElementById('personas').value;
        const tipoReserva = document.getElementById('tipo-reserva').value;
        
        if (!nombre || !telefono || !fecha || !hora) {
            mostrarResultadoReserva('Por favor completa todos los campos', 'error');
            return;
        }
        
        const reserva = {
            id: Date.now(),
            nombre,
            telefono,
            fecha,
            hora,
            personas,
            tipoReserva,
            fechaCreacion: new Date().toISOString()
        };
        
        reservaDAO.guardar(reserva);
        
        mostrarResultadoReserva(
            `¡Reserva confirmada!\n\nNombre: ${nombre}\nFecha: ${fecha}\nHora: ${hora}\nPersonas: ${personas}\nTipo: ${tipoReserva}\n\nTe esperamos en MR YISSTIV cholados.`,
            'exito'
        );
        
        formulario.reset();
    });
}

function mostrarResultadoReserva(mensaje, tipo) {
    const resultado = document.getElementById('resultado-reserva');
    if (!resultado) return;
    resultado.textContent = mensaje;
    resultado.className = `resultado-reserva ${tipo}`;
    
    setTimeout(() => {
        resultado.className = 'resultado-reserva';
    }, 5000);
}

// Formulario de Domicilios
function inicializarFormularioDomicilio() {
    const formulario = document.getElementById('form-domicilio');
    
    if (!formulario) return;
    
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (carrito.items.length === 0) {
            carrito.mostrarNotificacion('Agrega productos antes de confirmar el domicilio', 'error');
            return;
        }
        
        const nombre = document.getElementById('nombre-entrega').value;
        const telefono = document.getElementById('telefono-entrega').value;
        const direccion = document.getElementById('direccion-entrega').value;
        const barrio = document.getElementById('barrio-entrega').value;
        const documento = document.getElementById('documento-entrega').value.trim();
        const notas = document.getElementById('notas-entrega').value;
        const metodoPago = document.getElementById('estrategia-pago').value;
        const total = carrito.obtenerTotal();
        
        if (!nombre || !telefono || !direccion || !barrio) {
            carrito.mostrarNotificacion('Completa todos los datos de entrega', 'error');
            return;
        }
        
        // Crear estrategia de pago
        let estrategia;
        switch(metodoPago) {
            case 'PagoEfectivo':
                estrategia = new PagoEfectivo();
                break;
            case 'PagoTarjeta':
                estrategia = new PagoTarjeta();
                break;
            case 'PagoNequi':
                estrategia = new PagoNequi();
                break;
            case 'PagoDaviplata':
                estrategia = new PagoDaviplata();
                break;
            default:
                estrategia = new PagoEfectivo();
        }
        
        const contextoPago = new ContextoPago(estrategia);
        const resultadoPago = contextoPago.ejecutarPago(total);

        // Club de Puntos: si el cliente dio su documento, se le suman puntos por esta compra
        let puntosGanados = 0;
        let nivelActual = null;
        if (documento) {
            const resultadoPuntos = clienteDAO.sumarPuntosPorCompra(documento, total);
            puntosGanados = resultadoPuntos.puntosGanados;
            nivelActual = resultadoPuntos.cliente.nivel;
        }
        
        // Guardar pedido
        const pedido = {
            id: Date.now(),
            cliente: { nombre, telefono, direccion, barrio, notas, documento: documento || null },
            items: [...carrito.items],
            total: total,
            metodoPago: resultadoPago.metodo,
            puntosGanados,
            estado: 'Confirmado',
            fecha: new Date().toISOString()
        };
        
        const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
        pedidos.push(pedido);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));

        const mensajePuntos = documento
            ? ` Ganaste ${puntosGanados} puntos (nivel ${nivelActual}).`
            : '';
        carrito.mostrarNotificacion(`¡Domicilio confirmado!${mensajePuntos}`, 'exito');
        carrito.vaciar();
        formulario.reset();
        
        setTimeout(() => {
            const detallePuntos = documento
                ? `\n\nPuntos ganados: ${puntosGanados}\nNivel actual: ${nivelActual}`
                : '';
            alert(`¡Domicilio Confirmado!\n\nCliente: ${nombre}\nDirección: ${direccion}, ${barrio}\nTeléfono: ${telefono}\n\nTotal: $${total.toLocaleString()}\nMétodo de pago: ${resultadoPago.metodo}${detallePuntos}\n\nRecibirás una confirmación por WhatsApp/SMS.`);
        }, 500);
    });
}

function establecerFechaMinima() {
    const inputFecha = document.getElementById('fecha');
    if (inputFecha) {
        const hoy = new Date().toISOString().split('T')[0];
        inputFecha.min = hoy;
    }
}

// Club de Puntos (Fidelización)
function consultarFidelidad() {
    const documento = document.getElementById('documento-cliente').value;
    const resultado = document.getElementById('resultado-fidelizacion');
    
    if (!documento) {
        resultado.innerHTML = '<p style="color: #ff4757;">Por favor ingresa tu documento</p>';
        return;
    }
    
    let cliente = clienteDAO.obtenerPorDocumento(documento);
    
    if (!cliente) {
        cliente = {
            documento,
            nombre: 'Cliente Nuevo',
            puntos: 100,
            nivel: 'Bronce',
            fechaRegistro: new Date().toISOString()
        };
        clienteDAO.guardar(cliente);
    }
    
    let nivel = 'Bronce';
    let icono = '🥉';
    if (cliente.puntos >= 1000) {
        nivel = 'Oro';
        icono = '🥇';
    } else if (cliente.puntos >= 500) {
        nivel = 'Plata';
        icono = '🥈';
    }
    
    const descuento = cliente.puntos >= 1000 ? '20%' : cliente.puntos >= 500 ? '10%' : '0%';
    
    let mensajeProgreso = '';
    if (cliente.puntos < 500) {
        mensajeProgreso = `Te faltan ${500 - cliente.puntos} puntos para alcanzar el nivel Plata 🥈`;
    } else if (cliente.puntos < 1000) {
        mensajeProgreso = `Te faltan ${1000 - cliente.puntos} puntos para alcanzar el nivel Oro 🥇`;
    } else {
        mensajeProgreso = '¡Felicidades! Has alcanzado el nivel máximo 👑';
    }
    
    resultado.innerHTML = `
        <h3>¡Bienvenido ${cliente.nombre}! ${icono}</h3>
        <div class="puntos-display">${cliente.puntos} puntos</div>
        <p><strong>Nivel actual:</strong> ${nivel}</p>
        <p><strong>Descuento disponible:</strong> ${descuento}</p>
        <p style="margin-top: 1rem; color: #666; font-style: italic;">${mensajeProgreso}</p>
        <p style="margin-top: 1rem; color: var(--color-primario); font-weight: 600;">
            💡 Tip: Cada compra suma puntos (1 punto por cada $1.000). ¡Sigue acumulando!
        </p>
    `;
}

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Cierra el menú móvil al navegar, si está abierto
        const navegacion = document.querySelector('.navegacion');
        if (navegacion && navegacion.classList.contains('movil-abierto')) {
            navegacion.classList.remove('movil-abierto');
        }
    });
});

// Menú móvil
const btnMenuMovil = document.getElementById('btn-menu-movil');
if (btnMenuMovil) {
    btnMenuMovil.addEventListener('click', () => {
        const navegacion = document.querySelector('.navegacion');
        navegacion.classList.toggle('movil-abierto');
    });
}

// ============================================
// PANTALLAS 1, 2 y 3 DEL TALLER: SESIÓN, REGISTRO, ERROR
// ============================================

// --- Control genérico de modales ---
function abrirModal(id) {
    cerrarTodosLosModales();
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('activo');
}

function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('activo');
}

function cerrarTodosLosModales() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('activo'));
}

function cambiarModal(actualId, nuevoId) {
    cerrarModal(actualId);
    abrirModal(nuevoId);
}

// Cierra el modal si el usuario hace clic fuera de la caja (en el fondo oscuro)
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('activo');
        }
    });
});

// --- Pantalla 3: mensajes de error, reutilizable en todo el sitio ---
function mostrarError(mensaje, modalContextoId = null) {
    modalErrorContexto = modalContextoId;
    document.getElementById('modal-error-mensaje').textContent = mensaje;
    const btnReintentar = document.getElementById('btn-error-reintentar');
    btnReintentar.style.display = modalContextoId ? 'block' : 'none';
    abrirModal('modal-error');
}

function reintentarDesdeError() {
    cerrarModal('modal-error');
    if (modalErrorContexto) {
        abrirModal(modalErrorContexto);
    }
}

// --- Mostrar/ocultar contraseña (el "ojito") ---
function alternarVerPassword(inputId, boton) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        boton.textContent = '🙈';
    } else {
        input.type = 'password';
        boton.textContent = '👁️';
    }
}

// --- Sesión del usuario ---
function obtenerSesionActual() {
    return JSON.parse(localStorage.getItem('sesionActual') || 'null');
}

function guardarSesion(usuario) {
    localStorage.setItem('sesionActual', JSON.stringify({
        documento: usuario.documento,
        nombre: usuario.nombres || usuario.nombre
    }));
    actualizarNavSesion();
}

function cerrarSesion() {
    localStorage.removeItem('sesionActual');
    actualizarNavSesion();
    if (carrito) carrito.mostrarNotificacion('Sesión cerrada', 'info');
}

function alTocarBotonSesion() {
    const sesion = obtenerSesionActual();
    if (sesion) {
        cerrarSesion();
    } else {
        abrirModal('modal-login');
    }
}

function actualizarNavSesion() {
    const boton = document.getElementById('btn-nav-sesion');
    if (!boton) return;
    const sesion = obtenerSesionActual();

    if (sesion) {
        boton.textContent = `Hola, ${sesion.nombre} (salir)`;
        boton.classList.add('sesion-activa');

        // Comodidad: prellena el documento en el formulario de domicilios
        // para que sume puntos automáticamente sin tener que escribirlo.
        const campoDocumento = document.getElementById('documento-entrega');
        if (campoDocumento && !campoDocumento.value) {
            campoDocumento.value = sesion.documento;
        }
    } else {
        boton.textContent = 'Iniciar Sesión';
        boton.classList.remove('sesion-activa');
    }
}

// --- Pantalla 1: Formulario de Inicio de Sesión ---
function inicializarFormularioLogin() {
    const formulario = document.getElementById('form-login');
    if (!formulario) return;

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const documento = document.getElementById('login-documento').value.trim();
        const password = document.getElementById('login-password').value;

        const usuario = usuarioDAO.obtenerPorDocumento(documento);

        if (!usuario) {
            mostrarError('No encontramos una cuenta con ese número de documento. ¿Ya te registraste?', 'modal-login');
            return;
        }

        if (usuario.password !== password) {
            mostrarError('La contraseña es incorrecta.', 'modal-login');
            return;
        }

        guardarSesion(usuario);
        formulario.reset();
        cerrarModal('modal-login');
        carrito.mostrarNotificacion(`¡Bienvenido ${usuario.nombres}!`, 'exito');
    });
}

// --- Pantalla 2: Formulario de Registro ---
function inicializarFormularioRegistro() {
    const formulario = document.getElementById('form-registro');
    if (!formulario) return;

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombres = document.getElementById('registro-nombres').value.trim();
        const apellidos = document.getElementById('registro-apellidos').value.trim();
        const cedula = document.getElementById('registro-cedula').value.trim();
        const nacimiento = document.getElementById('registro-nacimiento').value;
        const password = document.getElementById('registro-password').value;

        if (!/^[0-9]+$/.test(cedula)) {
            mostrarError('La cédula solo debe contener números.', 'modal-registro');
            return;
        }

        if (usuarioDAO.obtenerPorDocumento(cedula)) {
            mostrarError('Esa cédula ya está registrada. Intenta iniciar sesión.', 'modal-registro');
            return;
        }

        const nuevoUsuario = {
            documento: cedula,
            nombres,
            apellidos,
            nacimiento,
            password,
            fechaRegistro: new Date().toISOString()
        };
        usuarioDAO.guardar(nuevoUsuario);

        // Vincula automáticamente la cuenta nueva con el Club de Puntos
        if (!clienteDAO.obtenerPorDocumento(cedula)) {
            clienteDAO.guardar({
                documento: cedula,
                nombre: `${nombres} ${apellidos}`,
                puntos: 0,
                nivel: 'Bronce',
                fechaRegistro: new Date().toISOString()
            });
        }

        guardarSesion(nuevoUsuario);
        formulario.reset();
        cerrarModal('modal-registro');
        carrito.mostrarNotificacion(`¡Cuenta creada! Bienvenido ${nombres}`, 'exito');
    });
}

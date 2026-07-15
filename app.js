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
    return this.obtenerTodos().find(p => p.id === id);
  }

  obtenerPorCategoria(categoria) {
    const todos = this.obtenerTodos();
    if (categoria === 'todos') return todos;
    return todos.filter(p => p.categoria === categoria);
  }

  // --- Persistencia de sabores gestionados por empleados/admin ---
  // Los sabores originales viven en código (arriba). Los que agrega/edita/borra
  // el equipo se guardan en localStorage como una capa encima de esa base,
  // para no perder los cambios entre visitas.
  cargarPersonalizados() {
    return JSON.parse(localStorage.getItem('saboresPersonalizados') || '[]');
  }

  guardarPersonalizados(lista) {
    localStorage.setItem('saboresPersonalizados', JSON.stringify(lista));
  }

  cargarEliminados() {
    return JSON.parse(localStorage.getItem('saboresEliminados') || '[]');
  }

  guardarEliminados(lista) {
    localStorage.setItem('saboresEliminados', JSON.stringify(lista));
  }

  // Devuelve el catálogo completo vigente: base (sin los eliminados) + personalizados.
  obtenerTodos() {
    const eliminados = this.cargarEliminados();
    const base = this.productos.filter(p => !eliminados.includes(p.id));
    const personalizados = this.cargarPersonalizados();
    return [...base, ...personalizados];
  }

  // Crea un sabor nuevo. `icono` es un emoji usado como imagen de marcador de posición
  // (los sabores de fábrica usan fotos reales; los nuevos, un emoji + color).
  agregarSabor({ nombre, precio, categoria, icono, color }) {
    const personalizados = this.cargarPersonalizados();
    const nuevo = {
      id: Date.now(),
      nombre,
      precio,
      categoria: categoria || 'cholados',
      icono: icono || '🍨',
      color: color || '#ff00ff',
      personalizado: true
    };
    personalizados.push(nuevo);
    this.guardarPersonalizados(personalizados);
    return nuevo;
  }

  editarSabor(id, cambios) {
    const personalizados = this.cargarPersonalizados();
    const idx = personalizados.findIndex(p => p.id === id);
    if (idx >= 0) {
      // Es un sabor creado por el equipo: se edita directamente.
      personalizados[idx] = { ...personalizados[idx], ...cambios };
      this.guardarPersonalizados(personalizados);
      return personalizados[idx];
    }
    // Es un sabor original: se "clona" a personalizados con los cambios y
    // se oculta el original, sin tocar el código fuente.
    const original = this.productos.find(p => p.id === id);
    if (!original) return null;
    const eliminados = this.cargarEliminados();
    if (!eliminados.includes(id)) {
      eliminados.push(id);
      this.guardarEliminados(eliminados);
    }
    const clon = { ...original, ...cambios, id: Date.now(), personalizado: true };
    personalizados.push(clon);
    this.guardarPersonalizados(personalizados);
    return clon;
  }

  eliminarSabor(id) {
    const personalizados = this.cargarPersonalizados();
    const sigueSiendoPersonalizado = personalizados.some(p => p.id === id);
    if (sigueSiendoPersonalizado) {
      this.guardarPersonalizados(personalizados.filter(p => p.id !== id));
      return;
    }
    const eliminados = this.cargarEliminados();
    if (!eliminados.includes(id)) {
      eliminados.push(id);
      this.guardarEliminados(eliminados);
    }
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

    obtenerPorDocumento(documento) {
        return this.reservas.filter(r => r.documento === documento);
    }

    cancelar(id) {
        this.reservas = this.reservas.filter(r => r.id !== id);
        localStorage.setItem('reservas', JSON.stringify(this.reservas));
    }
}

class UsuarioDAO {
    constructor() {
        this.usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        this.sembrarCuentasDemo();
    }

    // Crea cuentas de trabajador/admin de demostración si todavía no existen,
    // para que el sistema de roles funcione desde el primer arranque.
    sembrarCuentasDemo() {
        const semillas = [
            { documento: 'admin', nombres: 'Mr', apellidos: 'Yisstiv', password: 'admin123', rol: 'admin' },
            { documento: 'trabajador', nombres: 'Diego', apellidos: 'Ramírez', password: 'trabajador123', rol: 'trabajador' }
        ];
        let huboCambios = false;
        semillas.forEach(semilla => {
            if (!this.usuarios.find(u => u.documento === semilla.documento)) {
                this.usuarios.push({ ...semilla, fechaRegistro: new Date().toISOString() });
                huboCambios = true;
            }
        });
        if (huboCambios) {
            localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        }
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

    // Cambia el rol de un usuario existente. Devuelve el usuario actualizado o null si no existe.
    cambiarRol(documento, nuevoRol) {
        const usuario = this.obtenerPorDocumento(documento);
        if (!usuario) return null;
        usuario.rol = nuevoRol;
        this.guardar(usuario);
        return usuario;
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

class DireccionDAO {
    constructor() {
        this.direcciones = JSON.parse(localStorage.getItem('direcciones') || '[]');
    }

    obtenerPorDocumento(documento) {
        return this.direcciones.filter(d => d.documento === documento);
    }

    agregar(documento, etiqueta, direccion) {
        const nueva = { id: Date.now(), documento, etiqueta, direccion };
        this.direcciones.push(nueva);
        localStorage.setItem('direcciones', JSON.stringify(this.direcciones));
        return nueva;
    }

    eliminar(id) {
        this.direcciones = this.direcciones.filter(d => d.id !== id);
        localStorage.setItem('direcciones', JSON.stringify(this.direcciones));
    }
}

// Promoción general del negocio (banner + descuento), editable por trabajador/admin
class PromoDAO {
    obtener() {
        return JSON.parse(localStorage.getItem('promoGeneral') || 'null') || { activa: false, texto: '', descuento: 0 };
    }

    guardar(promo) {
        localStorage.setItem('promoGeneral', JSON.stringify(promo));
    }
}

// Información del negocio (dirección, horario, teléfono, email, ciudad):
// editable por admin/trabajador desde el perfil, sin tocar código.
const INFO_NEGOCIO_DEFECTO = {
    direccion: 'Mz 1 casa 18, Praderas de Santa Rita 1a Etapa, Ibagué',
    horario: 'Lunes a Domingo, 02:00 PM - 12:00 PM',
    telefono: '310 555 9630',
    email: 'info@mryisstiv.com',
    ciudad: 'Ibagué - Tolima'
};

class InfoNegocioDAO {
    obtener() {
        const guardada = JSON.parse(localStorage.getItem('infoNegocio') || 'null');
        return { ...INFO_NEGOCIO_DEFECTO, ...guardada };
    }

    guardar(info) {
        localStorage.setItem('infoNegocio', JSON.stringify(info));
    }
}

// Escribe la info del negocio en cualquier página que tenga estos elementos
function renderizarInfoNegocio() {
    const info = infoNegocioDAO.obtener();
    const set = (id, valor) => {
        const el = document.getElementById(id);
        if (el) el.textContent = valor;
    };
    set('info-direccion', info.direccion);
    set('info-horario', info.horario);
    set('info-telefono', info.telefono);
    set('info-whatsapp', info.telefono);
    set('footer-telefono', info.telefono);
    set('footer-email', info.email);
    set('footer-ciudad', info.ciudad);
    set('hero-ciudad', info.ciudad);

    // Actualiza cualquier enlace directo a WhatsApp con el teléfono guardado
    const numero = obtenerNumeroWhatsApp();
    document.querySelectorAll('a[data-whatsapp-link]').forEach(enlace => {
        const texto = enlace.dataset.whatsappTexto || '';
        enlace.href = `https://wa.me/${numero}${texto ? '?text=' + encodeURIComponent(texto) : ''}`;
    });
}

// Convierte el teléfono guardado al formato que necesita wa.me (código de país + número)
function obtenerNumeroWhatsApp() {
    const digitos = (infoNegocioDAO.obtener().telefono || '').replace(/\D/g, '');
    if (digitos.startsWith('57') && digitos.length > 10) return digitos;
    return '57' + digitos;
}

// --- Helpers de pedidos, usados por el perfil de cliente/trabajador ---
function obtenerTodosLosPedidos() {
    return JSON.parse(localStorage.getItem('pedidos') || '[]');
}

function obtenerPedidosPorDocumento(documento) {
    return obtenerTodosLosPedidos()
        .filter(p => p.cliente && p.cliente.documento === documento)
        .sort((a, b) => b.id - a.id);
}

function cambiarEstadoPedido(id, nuevoEstado) {
    const pedidos = obtenerTodosLosPedidos();
    const pedido = pedidos.find(p => p.id === id);
    if (pedido) {
        pedido.estado = nuevoEstado;
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
    }
    return pedido;
}

// ============================================
// CARRITO DE COMPRAS (DOMICILIOS)
// ============================================
class Carrito {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('carrito') || '[]');
        this.actualizarContador();
        this.actualizarVista();
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

        contenedorCarrito.innerHTML = this.items.map(item => {
            const producto = (typeof productoDAO !== 'undefined' && productoDAO) ? productoDAO.obtenerPorId(item.id) : null;
            const meta = (typeof CATEGORIA_META !== 'undefined' && CATEGORIA_META[producto?.categoria]) || { icono: '🍨', color: '#ffd6ec' };
            const color = producto?.color || meta.color;
            const icono = producto?.icono || meta.icono;
            return `
            <div class="item-carrito">
                <div class="item-avatar" style="background:${color};">${icono}</div>
                <div class="item-info">
                    <div class="item-nombre">${item.nombre}</div>
                    <div class="item-precio">$${(item.precio * item.cantidad).toLocaleString()}</div>
                </div>
                <div class="item-controles">
                    <div class="stepper-cantidad">
                        <button class="btn-cantidad" onclick="carrito.cambiarCantidad(${item.id}, -1)" aria-label="Quitar uno">−</button>
                        <span>${item.cantidad}</span>
                        <button class="btn-cantidad" onclick="carrito.cambiarCantidad(${item.id}, 1)" aria-label="Agregar uno">+</button>
                    </div>
                    <button class="btn-eliminar-item" onclick="carrito.eliminar(${item.id})" aria-label="Eliminar">🗑️</button>
                </div>
            </div>`;
        }).join('');

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

    // Arma el texto del pedido tal como se verá en WhatsApp, usando los datos
    // de entrega si el cliente ya los llenó (son opcionales).
    construirMensajeWhatsApp() {
        if (this.items.length === 0) return null;

        const lineas = this.items.map(item =>
            `• ${item.cantidad}x ${item.nombre} — $${(item.precio * item.cantidad).toLocaleString()}`
        );

        const nombre = document.getElementById('nombre-entrega')?.value.trim();
        const telefono = document.getElementById('telefono-entrega')?.value.trim();
        const direccion = document.getElementById('direccion-entrega')?.value.trim();
        const barrio = document.getElementById('barrio-entrega')?.value.trim();
        const notas = document.getElementById('notas-entrega')?.value.trim();

        let mensaje = `¡Hola MR YISSTIV cholados! 🍧 Quiero hacer este pedido:\n\n`;
        mensaje += lineas.join('\n');
        mensaje += `\n\n*Total: $${this.obtenerTotal().toLocaleString()}*`;

        if (nombre || telefono || direccion) {
            mensaje += `\n\n— Datos de entrega —`;
            if (nombre) mensaje += `\nNombre: ${nombre}`;
            if (telefono) mensaje += `\nTeléfono: ${telefono}`;
            if (direccion) mensaje += `\nDirección: ${direccion}${barrio ? ', ' + barrio : ''}`;
            if (notas) mensaje += `\nNotas: ${notas}`;
        }

        return mensaje;
    }
}

// Botón "Enviar pedido por WhatsApp" del resumen del carrito
function enviarPedidoPorWhatsApp() {
    const mensaje = carrito.construirMensajeWhatsApp();
    if (!mensaje) {
        carrito.mostrarNotificacion('Tu carrito está vacío, agrega algo primero', 'error');
        return;
    }
    const numeroWhatsApp = obtenerNumeroWhatsApp();
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// ============================================
// FUNCIONES GLOBALES
// ============================================
let carrito;
let productoDAO;
let reservaDAO;
let clienteDAO;
let usuarioDAO;
let direccionDAO;
let promoDAO;
let infoNegocioDAO;
let modalErrorContexto = null;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    carrito = new Carrito();
    productoDAO = new ProductoDAO();
    reservaDAO = new ReservaDAO();
    clienteDAO = new ClienteDAO();
    usuarioDAO = new UsuarioDAO();
    direccionDAO = new DireccionDAO();
    promoDAO = new PromoDAO();
    infoNegocioDAO = new InfoNegocioDAO();
    renderizarInfoNegocio();
    
    inicializarCatalogoGestionable();
    inicializarFiltros();
    inicializarSelectorCategorias();
    inicializarFormularioReserva();
    inicializarFormularioDomicilio();
    inicializarFormularioLogin();
    inicializarFormularioRegistro();
    inicializarPaginaSabores();
    establecerFechaMinima();
    actualizarNavSesion();
    inicializarPerfilDinamico();
    renderizarPromoBanner();
    inicializarFeedbackBotonesPedido();
});

// Si el navegador restaura la página desde su caché de atrás/adelante (bfcache),
// los scripts no se vuelven a ejecutar y el carrito puede quedar desactualizado
// frente a lo que hay guardado. Esto lo vuelve a sincronizar siempre.
window.addEventListener('pageshow', (e) => {
    if (e.persisted && carrito) {
        carrito.items = JSON.parse(localStorage.getItem('carrito') || '[]');
        carrito.actualizarVista();
        carrito.actualizarContador();
    }
});

// Da feedback visual (✓ Agregado) a cualquier botón .btn-pedido del catálogo,
// sin necesidad de tocar cada botón individualmente en el HTML.
function inicializarFeedbackBotonesPedido() {
    document.addEventListener('click', (e) => {
        const boton = e.target.closest('.btn-pedido');
        if (!boton) return;
        const textoOriginal = boton.textContent;
        boton.classList.add('agregado');
        boton.textContent = 'Agregado';
        setTimeout(() => {
            boton.classList.remove('agregado');
            boton.textContent = textoOriginal;
        }, 900);
    });
}

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
function generarCodigoReserva() {
    return 'R-' + Math.random().toString(36).slice(2, 7).toUpperCase();
}

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

        const sesion = obtenerSesionActual();
        const codigo = generarCodigoReserva();
        
        const reserva = {
            id: Date.now(),
            codigo,
            documento: sesion ? sesion.documento : null,
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
            `¡Reserva confirmada!\n\nCódigo: ${codigo}\nNombre: ${nombre}\nFecha: ${fecha}\nHora: ${hora}\nPersonas: ${personas}\nTipo: ${tipoReserva}\n\nTe esperamos en MR YISSTIV cholados.`,
            'exito'
        );
        
        formulario.reset();
        renderizarMisReservas();
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

// Panel "Mis Reservas" — solo visible y con datos si hay sesión iniciada
function renderizarMisReservas() {
    const panel = document.getElementById('panel-mis-reservas');
    const lista = document.getElementById('mis-reservas-lista');
    if (!panel || !lista) return;

    const sesion = obtenerSesionActual();

    if (!sesion) {
        panel.style.display = 'none';
        return;
    }

    panel.style.display = 'block';
    const misReservas = reservaDAO.obtenerPorDocumento(sesion.documento);

    if (misReservas.length === 0) {
        lista.innerHTML = '<p class="reservas-vacio">Todavía no tienes reservas activas.</p>';
        return;
    }

    lista.innerHTML = misReservas.map(r => `
        <div class="item-reserva">
            <div class="item-reserva-info">
                <div class="item-reserva-codigo">${r.codigo}</div>
                <div>${r.fecha} · ${r.hora} · ${r.personas} personas</div>
                <div class="item-reserva-tipo">${r.tipoReserva}</div>
            </div>
            <button class="btn-eliminar" onclick="cancelarReserva(${r.id})">Cancelar</button>
        </div>
    `).join('');
}

function cancelarReserva(id) {
    reservaDAO.cancelar(id);
    renderizarMisReservas();
    if (carrito) carrito.mostrarNotificacion('Reserva cancelada', 'info');
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

        abrirSeguimientoPedido(pedido.id);
    });
}

// Pasos del seguimiento visual (Cancelado se muestra aparte, con un aviso distinto)
const PASOS_SEGUIMIENTO = ['Confirmado', 'Preparando', 'Listo'];

// Abre la ventana emergente de seguimiento para cualquier pedido guardado, por su id.
// Se usa justo después de confirmar un domicilio, y también desde "Mis pedidos" en el perfil.
function abrirSeguimientoPedido(id) {
    const pedido = obtenerTodosLosPedidos().find(p => p.id === id);
    if (!pedido) return;

    document.getElementById('pedido-listo-numero').textContent = '#' + String(pedido.id).slice(-5);

    const contenedorItems = document.getElementById('pedido-listo-items');
    contenedorItems.innerHTML = pedido.items.map(item => {
        const producto = productoDAO.obtenerPorId(item.id);
        const meta = CATEGORIA_META[producto?.categoria] || CATEGORIA_META.cholados;
        const color = producto?.color || meta.color;
        return `
        <div class="pedido-listo-item">
            <div class="pedido-listo-item-swatch" style="background:${color};"></div>
            <div class="pedido-listo-item-nombre">
                <p>${item.nombre}</p>
                <p>Cantidad: ${item.cantidad}</p>
            </div>
            <span class="pedido-listo-item-precio">$${(item.precio * item.cantidad).toLocaleString()}</span>
        </div>`;
    }).join('');

    document.getElementById('pedido-listo-total-valor').textContent = '$' + pedido.total.toLocaleString();

    renderizarEstadoSeguimiento(pedido.estado);
    document.getElementById('modal-seguimiento-pedido').dataset.pedidoId = pedido.id;
    abrirModal('modal-seguimiento-pedido');
}

function renderizarEstadoSeguimiento(estado) {
    const icono = document.getElementById('pedido-listo-estado-icono');
    const titulo = document.getElementById('pedido-listo-estado-titulo');
    const texto = document.getElementById('pedido-listo-estado-texto');
    const timeline = document.getElementById('pedido-timeline');

    if (estado === 'Cancelado') {
        icono.textContent = '✕';
        icono.style.background = '#e05252';
        titulo.textContent = 'Pedido cancelado';
        texto.textContent = 'Este pedido fue cancelado. Escríbenos si tienes dudas.';
        timeline.innerHTML = '';
        return;
    }

    icono.style.background = '';
    const indiceActual = PASOS_SEGUIMIENTO.indexOf(estado === 'Entregado' ? 'Listo' : estado);
    const mensajes = {
        Confirmado: ['Pedido confirmado', 'Puedes recogerlo o esperar el domicilio'],
        Preparando: ['Preparando tu pedido', 'Nuestro equipo ya lo está alistando'],
        Listo: ['¡Pedido listo!', 'Puedes recogerlo o esperar el domicilio'],
        Entregado: ['Pedido entregado', '¡Que lo disfrutes! Gracias por tu compra']
    };
    const [tituloTexto, subTexto] = mensajes[estado] || mensajes.Confirmado;
    icono.textContent = '✓';
    titulo.textContent = tituloTexto;
    texto.textContent = subTexto;

    timeline.innerHTML = PASOS_SEGUIMIENTO.map((paso, i) => {
        let circulo;
        if (i < indiceActual) circulo = '<div class="paso-circulo">✓</div>';
        else if (i === indiceActual) circulo = '<div class="paso-circulo actual">●</div>';
        else circulo = '<div class="paso-circulo" style="background:#ddd;"></div>';
        const linea = i < PASOS_SEGUIMIENTO.length - 1 ? '<div class="paso-linea"></div>' : '';
        return `<div class="paso-timeline">${circulo}<span class="paso-texto">${paso}</span></div>${linea}`;
    }).join('');
}

// Botón "Ver seguimiento del domicilio": abre WhatsApp para pedir el estado en vivo
function pedirActualizacionDomicilio() {
    const id = document.getElementById('modal-seguimiento-pedido').dataset.pedidoId;
    const numero = obtenerNumeroWhatsApp();
    const mensaje = `¡Hola! ¿Me confirmas el estado de mi domicilio? Mi pedido es #${String(id).slice(-5)}`;
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');
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
    const nombreCompleto = usuario.nombres
        ? `${usuario.nombres} ${usuario.apellidos || ''}`.trim()
        : (usuario.nombre || 'Usuario');
    localStorage.setItem('sesionActual', JSON.stringify({
        documento: usuario.documento,
        nombre: nombreCompleto,
        rol: usuario.rol || 'cliente'
    }));
    actualizarNavSesion();
}

// --- Helpers de roles, reutilizables en cualquier página ---
function esRolActual(...roles) {
    const sesion = obtenerSesionActual();
    return !!sesion && roles.includes(sesion.rol);
}

function obtenerIniciales(nombre) {
    if (!nombre) return '?';
    return nombre.trim().split(/\s+/).slice(0, 2).map(p => p[0].toUpperCase()).join('');
}

function etiquetaRol(rol) {
    if (rol === 'admin') return 'Administrador';
    if (rol === 'trabajador') return 'Trabajador';
    return 'Cliente';
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
    renderizarMisReservas();
    inicializarPerfilDinamico();
    actualizarControlesGestorMenu();

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
            rol: 'cliente',
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

// ============================================
// PERFIL DINÁMICO (cliente / trabajador / admin)
// Activa la maqueta de perfiles-por-rol que ya existía en puntos.html
// ============================================
function inicializarPerfilDinamico() {
    const contenedorDemo = document.getElementById('perfil-demo');
    const contenedorReal = document.getElementById('perfil-real');
    if (!contenedorDemo || !contenedorReal) return; // esta sección solo vive en puntos.html

    const sesion = obtenerSesionActual();

    if (!sesion) {
        contenedorDemo.style.display = '';
        contenedorReal.style.display = 'none';
        contenedorReal.innerHTML = '';
        return;
    }

    contenedorDemo.style.display = 'none';
    contenedorReal.style.display = '';
    contenedorReal.innerHTML = renderizarTarjetaPerfil(sesion);
}

// Íconos de línea reutilizables (mismo lenguaje visual que las tarjetas del Club de Puntos)
const ICONOS_PERFIL = {
    caja: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    estrella: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    engranaje: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    portapapeles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
    etiqueta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    utensilios: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
    reloj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    personas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    grafico: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>'
};

function itemMenuPerfil(icono, texto, onclick) {
    return `<div class="perfil-menu-item" onclick="${onclick}">
        <span class="perfil-menu-icono">${ICONOS_PERFIL[icono]}</span>
        <span>${texto}</span>
    </div>`;
}

function renderizarTarjetaPerfil(sesion) {
    const iniciales = obtenerIniciales(sesion.nombre);
    const rolClase = sesion.rol === 'admin' ? 'rol-admin' : sesion.rol === 'trabajador' ? 'rol-trabajador' : 'rol-cliente';

    let menu = '';
    if (sesion.rol === 'admin') {
        menu = itemMenuPerfil('portapapeles', 'Gestionar pedidos', "manejarAccionPerfil('pedidos-staff')")
            + itemMenuPerfil('etiqueta', 'Precios y promos', "manejarAccionPerfil('precios')")
            + itemMenuPerfil('utensilios', 'Gestionar sabores', "window.location.href='sabores.html'")
            + itemMenuPerfil('pin', 'Dirección y horarios', "manejarAccionPerfil('info-negocio')")
            + itemMenuPerfil('personas', 'Empleados y roles', "manejarAccionPerfil('empleados')")
            + itemMenuPerfil('grafico', 'Ventas y reportes', "manejarAccionPerfil('ventas')")
            + itemMenuPerfil('engranaje', 'Configuración', "manejarAccionPerfil('configuracion')");
    } else if (sesion.rol === 'trabajador') {
        const pendientes = obtenerTodosLosPedidos().filter(p => p.estado !== 'Listo' && p.estado !== 'Entregado').length;
        menu = itemMenuPerfil('portapapeles', `Gestionar pedidos <span class="contador">${pendientes}</span>`, "manejarAccionPerfil('pedidos-staff')")
            + itemMenuPerfil('etiqueta', 'Precios y promos', "manejarAccionPerfil('precios')")
            + itemMenuPerfil('utensilios', 'Gestionar sabores', "window.location.href='sabores.html'")
            + itemMenuPerfil('reloj', 'Mi turno', "manejarAccionPerfil('turno')")
            + itemMenuPerfil('engranaje', 'Configuración', "manejarAccionPerfil('configuracion')");
    } else {
        const cliente = clienteDAO.obtenerPorDocumento(sesion.documento);
        const puntos = cliente ? cliente.puntos : 0;
        menu = itemMenuPerfil('caja', 'Mis pedidos', "manejarAccionPerfil('pedidos')")
            + itemMenuPerfil('estrella', `Club de puntos · ${puntos} pts`, "manejarAccionPerfil('puntos')")
            + itemMenuPerfil('pin', 'Mis direcciones', "manejarAccionPerfil('direcciones')")
            + itemMenuPerfil('engranaje', 'Configuración', "manejarAccionPerfil('configuracion')");
    }

    const esStaff = sesion.rol === 'admin' || sesion.rol === 'trabajador';
    return `
        <div class="perfil-tarjeta ${rolClase} perfil-tarjeta-real">
            <div class="perfil-cabecera">
                <div class="perfil-avatar">${iniciales}</div>
                <p class="perfil-nombre">${sesion.nombre}</p>
                <span class="perfil-badge-rol">${etiquetaRol(sesion.rol)}</span>
            </div>
            <div class="perfil-menu">${menu}</div>
        </div>
        <div class="perfil-detalle ${esStaff ? 'perfil-detalle-ancho' : ''}" id="perfil-detalle"></div>`;
}

function manejarAccionPerfil(accion) {
    const sesion = obtenerSesionActual();
    if (!sesion) return;
    const detalle = document.getElementById('perfil-detalle');
    if (!detalle) return;

    if (accion === 'pedidos') {
        const pedidos = obtenerPedidosPorDocumento(sesion.documento);
        detalle.innerHTML = pedidos.length === 0
            ? '<p class="perfil-detalle-vacio">Todavía no tienes pedidos.</p>'
            : pedidos.map(p => `
                <div class="perfil-detalle-fila">
                    <div>
                        <strong>#${String(p.id).slice(-5)}</strong> · ${new Date(p.fecha).toLocaleDateString()}
                        <div class="perfil-detalle-sub">${p.items.map(i => `${i.cantidad}x ${i.nombre}`).join(', ')}</div>
                    </div>
                    <button class="btn-ver-tienda btn-outline-pequeno" onclick="abrirSeguimientoPedido(${p.id})">${p.estado} · $${p.total.toLocaleString()}</button>
                </div>`).join('');
    }

    if (accion === 'puntos') {
        const cliente = clienteDAO.obtenerPorDocumento(sesion.documento);
        const puntos = cliente ? cliente.puntos : 0;
        const nivel = cliente ? cliente.nivel : 'Bronce';
        detalle.innerHTML = `<p class="perfil-detalle-vacio">Tienes <strong>${puntos} puntos</strong>, nivel <strong>${nivel}</strong>. Cada $1.000 en compras suma 1 punto.</p>`;
    }

    if (accion === 'direcciones') {
        renderizarDireccionesPerfil(detalle, sesion.documento);
    }

    if (accion === 'configuracion') {
        detalle.innerHTML = `
            <p class="perfil-detalle-vacio">Sesión iniciada como <strong>${sesion.nombre}</strong> (${sesion.documento}).</p>
            <button class="btn-eliminar" onclick="cerrarSesion()">Cerrar sesión</button>`;
    }

    if (accion === 'turno') {
        detalle.innerHTML = '<p class="perfil-detalle-vacio">Turno de hoy: 2:00 PM – 10:00 PM.</p>';
    }

    if (accion === 'pedidos-staff') {
        renderizarPedidosStaff(detalle);
    }

    if (accion === 'precios') {
        renderizarPreciosYPromos(detalle);
    }

    if (accion === 'ventas') {
        const pedidos = obtenerTodosLosPedidos();
        const total = pedidos.reduce((s, p) => s + p.total, 0);
        detalle.innerHTML = `<p class="perfil-detalle-vacio">${pedidos.length} pedidos registrados · <strong>$${total.toLocaleString()}</strong> en ventas totales.</p>`;
    }

    if (accion === 'info-negocio') {
        renderizarFormularioInfoNegocio(detalle);
    }

    if (accion === 'empleados') {
        detalle.innerHTML = `
            <div class="perfil-detalle-form">
                <input type="text" id="empleado-documento" placeholder="Documento del usuario">
                <select id="empleado-rol">
                    <option value="trabajador">Trabajador</option>
                    <option value="admin">Administrador</option>
                    <option value="cliente">Cliente</option>
                </select>
                <button class="btn-ver-tienda" onclick="promoverEmpleadoDesdePerfil()">Actualizar rol</button>
            </div>`;
    }
}

function renderizarFormularioInfoNegocio(detalle) {
    const info = infoNegocioDAO.obtener();
    detalle.innerHTML = `
        <div class="perfil-detalle-form info-negocio-form">
            <label style="width:100%;font-weight:600;">Esta información se muestra en todo el sitio (inicio y pie de página)</label>
            <div class="campo-info-negocio">
                <label for="info-negocio-direccion">Dirección</label>
                <input type="text" id="info-negocio-direccion" value="${info.direccion}">
            </div>
            <div class="campo-info-negocio">
                <label for="info-negocio-horario">Horario</label>
                <input type="text" id="info-negocio-horario" value="${info.horario}">
            </div>
            <div class="campo-info-negocio">
                <label for="info-negocio-telefono">Teléfono / WhatsApp</label>
                <input type="text" id="info-negocio-telefono" value="${info.telefono}">
            </div>
            <div class="campo-info-negocio">
                <label for="info-negocio-email">Email</label>
                <input type="text" id="info-negocio-email" value="${info.email}">
            </div>
            <div class="campo-info-negocio">
                <label for="info-negocio-ciudad">Ciudad</label>
                <input type="text" id="info-negocio-ciudad" value="${info.ciudad}">
            </div>
            <button class="btn-ver-tienda" onclick="guardarInfoNegocio()">Guardar cambios</button>
        </div>`;
}

function guardarInfoNegocio() {
    const info = {
        direccion: document.getElementById('info-negocio-direccion').value.trim(),
        horario: document.getElementById('info-negocio-horario').value.trim(),
        telefono: document.getElementById('info-negocio-telefono').value.trim(),
        email: document.getElementById('info-negocio-email').value.trim(),
        ciudad: document.getElementById('info-negocio-ciudad').value.trim()
    };
    infoNegocioDAO.guardar(info);
    renderizarInfoNegocio();
    carrito.mostrarNotificacion('Información del negocio actualizada', 'exito');
}

function renderizarDireccionesPerfil(detalle, documento) {
    const direcciones = direccionDAO.obtenerPorDocumento(documento);
    const lista = direcciones.length === 0
        ? '<p class="perfil-detalle-vacio">No tienes direcciones guardadas.</p>'
        : direcciones.map(d => `
            <div class="perfil-detalle-fila">
                <div><strong>${d.etiqueta}</strong><div class="perfil-detalle-sub">${d.direccion}</div></div>
                <button class="btn-eliminar" onclick="eliminarDireccionPerfil(${d.id})">Eliminar</button>
            </div>`).join('');

    detalle.innerHTML = `
        ${lista}
        <div class="perfil-detalle-form">
            <input type="text" id="nueva-direccion-etiqueta" placeholder="Ej. Casa, Trabajo">
            <input type="text" id="nueva-direccion-texto" placeholder="Dirección completa">
            <button class="btn-ver-tienda" onclick="agregarDireccionPerfil()">Agregar</button>
        </div>`;
}

function agregarDireccionPerfil() {
    const sesion = obtenerSesionActual();
    const etiqueta = document.getElementById('nueva-direccion-etiqueta').value.trim();
    const direccion = document.getElementById('nueva-direccion-texto').value.trim();
    if (!etiqueta || !direccion) {
        carrito.mostrarNotificacion('Completa etiqueta y dirección', 'error');
        return;
    }
    direccionDAO.agregar(sesion.documento, etiqueta, direccion);
    renderizarDireccionesPerfil(document.getElementById('perfil-detalle'), sesion.documento);
    carrito.mostrarNotificacion('Dirección agregada', 'exito');
}

function eliminarDireccionPerfil(id) {
    direccionDAO.eliminar(id);
    const sesion = obtenerSesionActual();
    renderizarDireccionesPerfil(document.getElementById('perfil-detalle'), sesion.documento);
}

const ESTADOS_PEDIDO = ['Confirmado', 'Preparando', 'Listo', 'Entregado', 'Cancelado'];

function renderizarPedidosStaff(detalle) {
    const pedidos = obtenerTodosLosPedidos().sort((a, b) => b.id - a.id);
    if (pedidos.length === 0) {
        detalle.innerHTML = '<p class="perfil-detalle-vacio">Todavía no hay pedidos registrados.</p>';
        return;
    }
    detalle.innerHTML = pedidos.map(p => `
        <div class="perfil-detalle-fila">
            <div>
                <strong>#${String(p.id).slice(-5)}</strong> · ${p.cliente.nombre}
                <div class="perfil-detalle-sub">${p.items.map(i => `${i.cantidad}x ${i.nombre}`).join(', ')} — $${p.total.toLocaleString()}</div>
            </div>
            <select onchange="cambiarEstadoPedidoPanel(${p.id}, this.value)">
                ${ESTADOS_PEDIDO.map(e => `<option value="${e}" ${e === p.estado ? 'selected' : ''}>${e}</option>`).join('')}
            </select>
        </div>`).join('');
}

function cambiarEstadoPedidoPanel(id, nuevoEstado) {
    cambiarEstadoPedido(id, nuevoEstado);
    carrito.mostrarNotificacion(`Pedido #${String(id).slice(-5)} → ${nuevoEstado}`, 'exito');
    inicializarPerfilDinamico();
    manejarAccionPerfil('pedidos-staff');
}

function renderizarPreciosYPromos(detalle) {
    const promo = promoDAO.obtener();
    const productos = productoDAO.obtenerTodos();

    const filasProductos = productos.map(p => `
        <div class="perfil-detalle-fila">
            <div><strong>${p.nombre}</strong></div>
            <div class="precio-editor">
                <span>$</span>
                <input type="number" min="1" value="${p.precio}" id="precio-input-${p.id}">
                <button class="btn-ver-tienda btn-outline-pequeno" onclick="guardarPrecioProducto(${p.id})">Guardar</button>
            </div>
        </div>`).join('');

    detalle.innerHTML = `
        <div class="perfil-detalle-form promo-form">
            <label style="width:100%;font-weight:600;">Promoción general (se muestra a todos los clientes)</label>
            <label style="display:flex;align-items:center;gap:0.4rem;width:auto;">
                <input type="checkbox" id="promo-activa" ${promo.activa ? 'checked' : ''}> Activa
            </label>
            <input type="text" id="promo-texto" placeholder="Ej. 20% de descuento en cholados este fin de semana" value="${promo.texto || ''}" style="flex:2 1 260px;">
            <input type="number" id="promo-descuento" min="0" max="100" placeholder="% descuento" value="${promo.descuento || 0}" style="flex:1 1 100px;">
            <button class="btn-ver-tienda" onclick="guardarPromoGeneral()">Guardar promo</button>
        </div>
        <p class="perfil-detalle-sub" style="margin:0.8rem 0 0.4rem;">Precios por sabor:</p>
        ${filasProductos}`;
}

function guardarPrecioProducto(id) {
    const input = document.getElementById(`precio-input-${id}`);
    const nuevoPrecio = Number(input.value);
    if (!nuevoPrecio || nuevoPrecio <= 0) {
        carrito.mostrarNotificacion('Escribe un precio válido', 'error');
        return;
    }
    productoDAO.editarSabor(id, { precio: nuevoPrecio });
    carrito.mostrarNotificacion('Precio actualizado', 'exito');
    renderizarPreciosYPromos(document.getElementById('perfil-detalle'));
}

function guardarPromoGeneral() {
    const activa = document.getElementById('promo-activa').checked;
    const texto = document.getElementById('promo-texto').value.trim();
    const descuento = Number(document.getElementById('promo-descuento').value) || 0;
    promoDAO.guardar({ activa, texto, descuento });
    carrito.mostrarNotificacion('Promoción guardada', 'exito');
    renderizarPromoBanner();
}

// Banner visible para TODOS en index.html si hay una promo activa
function renderizarPromoBanner() {
    const banner = document.getElementById('promo-banner');
    if (!banner) return;
    const promo = promoDAO.obtener();
    if (!promo.activa || !promo.texto) {
        banner.style.display = 'none';
        return;
    }
    banner.style.display = '';
    banner.innerHTML = `🎉 ${promo.texto}${promo.descuento ? ` · ${promo.descuento}% OFF` : ''}`;
}

function promoverEmpleadoDesdePerfil() {
    const documento = document.getElementById('empleado-documento').value.trim();
    const rol = document.getElementById('empleado-rol').value;
    if (!documento) {
        carrito.mostrarNotificacion('Escribe el documento del usuario', 'error');
        return;
    }
    const usuario = usuarioDAO.cambiarRol(documento, rol);
    if (!usuario) {
        carrito.mostrarNotificacion('No existe un usuario con ese documento', 'error');
        return;
    }
    carrito.mostrarNotificacion(`${usuario.nombres || usuario.documento} ahora es ${etiquetaRol(rol)}`, 'exito');
}

// ============================================
// PÁGINA SABORES — lista propia de sabores de helado (independiente del menú general)
// ============================================
const CATEGORIA_META = {
    cholados: { icono: '🍨', color: '#ffd6ec' },
    conos: { icono: '🍦', color: '#ffe7c2' },
    limonadas: { icono: '🥤', color: '#c6ffe9' },
    obleas: { icono: '🧇', color: '#ffe0a3' },
    postres: { icono: '🍰', color: '#e6c9ff' },
    raspados: { icono: '🧊', color: '#c2ecff' },
    comidas: { icono: '🥪', color: '#d7ecd2' },
    bebidas: { icono: '☕', color: '#e3d2b8' }
};

// Los sabores de helado (distinto del menú general de productos): se guardan
// aparte y se siembran con los que ya usa el negocio.
class SaborHeladoDAO {
    constructor() {
        this.sembrarSiEsNecesario();
        this.corregirBombombumLuloFlow();
    }

    sembrarSiEsNecesario() {
        if (localStorage.getItem('saboresHelado')) return;
        const base = [
            { nombre: 'Vainilla Chip', precio: 8000, icono: '🍦', color: '#fff3d6' },
            { nombre: 'Chocoramo', precio: 9000, icono: '🍫', color: '#dcb98a' },
            { nombre: 'Brownie', precio: 9000, icono: '🍰', color: '#c9a17a' },
            { nombre: 'Bombombum Lulo Flow', precio: 8500, icono: '🍬', color: '#ffc2d1' },
            { nombre: 'Maracuyá', precio: 8500, icono: '🟡', color: '#ffe08a' },
            { nombre: 'Tres Leches', precio: 9500, icono: '🥛', color: '#fdf6ec' }
        ].map(s => ({ ...s, id: Date.now() + Math.floor(Math.random() * 1000) }));
        localStorage.setItem('saboresHelado', JSON.stringify(base));
    }

    // Corrige, una sola vez, el catálogo de quienes ya habían recibido "Bombombum"
    // y "Lulo Flow" como dos sabores separados: en realidad es un solo sabor.
    corregirBombombumLuloFlow() {
        if (localStorage.getItem('migracionBombombumHecha')) return;
        const sabores = this.obtenerTodos();
        const bombombum = sabores.find(s => s.nombre.trim().toLowerCase() === 'bombombum');
        const luloFlow = sabores.find(s => s.nombre.trim().toLowerCase() === 'lulo flow');
        if (bombombum && luloFlow) {
            const fusionados = sabores
                .filter(s => s.id !== bombombum.id && s.id !== luloFlow.id)
                .concat([{ ...bombombum, nombre: 'Bombombum Lulo Flow' }]);
            localStorage.setItem('saboresHelado', JSON.stringify(fusionados));
        }
        localStorage.setItem('migracionBombombumHecha', '1');
    }

    obtenerTodos() {
        return JSON.parse(localStorage.getItem('saboresHelado') || '[]');
    }

    obtenerPorId(id) {
        return this.obtenerTodos().find(s => s.id === id);
    }

    agregar({ nombre, precio, icono, color }) {
        const sabores = this.obtenerTodos();
        const nuevo = { id: Date.now(), nombre, precio, icono: icono || '🍨', color: color || '#ff00ff' };
        sabores.push(nuevo);
        localStorage.setItem('saboresHelado', JSON.stringify(sabores));
        return nuevo;
    }

    editar(id, cambios) {
        const sabores = this.obtenerTodos();
        const idx = sabores.findIndex(s => s.id === id);
        if (idx < 0) return null;
        sabores[idx] = { ...sabores[idx], ...cambios };
        localStorage.setItem('saboresHelado', JSON.stringify(sabores));
        return sabores[idx];
    }

    eliminar(id) {
        const sabores = this.obtenerTodos().filter(s => s.id !== id);
        localStorage.setItem('saboresHelado', JSON.stringify(sabores));
    }
}

let saborHeladoDAO;
let saborEnEdicionId = null;

function inicializarPaginaSabores() {
    const grid = document.getElementById('grid-sabores');
    if (!grid) return; // solo existe en sabores.html

    saborHeladoDAO = new SaborHeladoDAO();
    renderizarGridSabores();

    const buscador = document.getElementById('buscador-sabores');
    if (buscador) buscador.addEventListener('input', renderizarGridSabores);

    const formulario = document.getElementById('form-sabor');
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            guardarSaborDesdeFormulario();
        });
    }
}

function esGestorDeMenu() {
    return esRolActual('trabajador', 'admin');
}

function renderizarGridSabores() {
    const grid = document.getElementById('grid-sabores');
    if (!grid) return;

    const gestor = esGestorDeMenu();
    document.querySelectorAll('.solo-gestor').forEach(el => {
        el.style.display = gestor ? '' : 'none';
    });

    const texto = (document.getElementById('buscador-sabores')?.value || '').toLowerCase().trim();
    let sabores = saborHeladoDAO.obtenerTodos();
    if (texto) sabores = sabores.filter(s => s.nombre.toLowerCase().includes(texto));

    if (sabores.length === 0) {
        grid.innerHTML = '<p class="carrito-vacio">No encontramos sabores con ese nombre.</p>';
        return;
    }

    grid.innerHTML = sabores.map(s => `
            <div class="sabor-card">
                <div class="sabor-avatar" style="background:${s.color};">${s.icono}</div>
                <div class="sabor-nombre">${s.nombre}</div>
                <div class="sabor-precio">$${s.precio.toLocaleString()}</div>
                <div class="sabor-acciones solo-gestor" style="display:${gestor ? '' : 'none'};">
                    <button type="button" onclick="abrirModalSabor(${s.id})" aria-label="Editar sabor">✏️</button>
                    <button type="button" onclick="confirmarEliminarSabor(${s.id})" aria-label="Eliminar sabor">🗑️</button>
                </div>
            </div>`).join('');
}

function abrirModalSabor(id = null) {
    saborEnEdicionId = id;
    const titulo = document.getElementById('modal-sabor-titulo');
    const form = document.getElementById('form-sabor');
    form.reset();

    if (id) {
        const sabor = saborHeladoDAO.obtenerPorId(id);
        if (!sabor) return;
        titulo.textContent = 'Editar sabor';
        document.getElementById('sabor-nombre').value = sabor.nombre;
        document.getElementById('sabor-precio').value = sabor.precio;
        document.getElementById('sabor-icono').value = sabor.icono || '';
        document.getElementById('sabor-color').value = sabor.color || '#ff00ff';
    } else {
        titulo.textContent = 'Agregar sabor';
        document.getElementById('sabor-color').value = '#ff00ff';
    }
    abrirModal('modal-sabor');
}

function guardarSaborDesdeFormulario() {
    const nombre = document.getElementById('sabor-nombre').value.trim();
    const precio = Number(document.getElementById('sabor-precio').value);
    const icono = document.getElementById('sabor-icono').value.trim();
    const color = document.getElementById('sabor-color').value;

    if (!nombre || !precio || precio <= 0) {
        mostrarError('Escribe un nombre y un precio válido para el sabor.', 'modal-sabor');
        return;
    }

    const datos = { nombre, precio, icono, color };

    if (saborEnEdicionId) {
        saborHeladoDAO.editar(saborEnEdicionId, datos);
        carrito.mostrarNotificacion('Sabor actualizado', 'exito');
    } else {
        saborHeladoDAO.agregar(datos);
        carrito.mostrarNotificacion('Sabor agregado al catálogo', 'exito');
    }

    cerrarModal('modal-sabor');
    renderizarGridSabores();
}

function confirmarEliminarSabor(id) {
    const sabor = saborHeladoDAO.obtenerPorId(id);
    if (!sabor) return;
    if (!window.confirm(`¿Eliminar "${sabor.nombre}" del catálogo de sabores?`)) return;
    saborHeladoDAO.eliminar(id);
    renderizarGridSabores();
    carrito.mostrarNotificacion('Sabor eliminado', 'info');
}

// ============================================
// GESTIÓN DEL MENÚ PRINCIPAL (catálogo de la tienda) — solo trabajador/admin
// Reutiliza el mismo motor de guardado que ya tenía ProductoDAO.
// ============================================
let productoEnEdicionId = null;

function inicializarCatalogoGestionable() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return; // solo existe en index.html

    renderizarProductosPersonalizados();
    actualizarControlesGestorMenu();

    const formulario = document.getElementById('form-producto-menu');
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            guardarProductoMenuDesdeFormulario();
        });
    }
}

// Quita del catálogo las tarjetas que el equipo eliminó, y agrega al final
// las que el equipo creó (con emoji+color, ya que no tienen foto real).
function renderizarProductosPersonalizados() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;

    const eliminados = productoDAO.cargarEliminados();
    eliminados.forEach(id => {
        const tarjeta = contenedor.querySelector(`.tarjeta-producto[data-id="${id}"]`);
        if (tarjeta) tarjeta.remove();
    });

    // Evita duplicar tarjetas personalizadas si esta función se llama varias veces
    contenedor.querySelectorAll('.tarjeta-producto[data-personalizado="1"]').forEach(t => t.remove());

    productoDAO.cargarPersonalizados().forEach(p => {
        contenedor.insertAdjacentHTML('beforeend', tarjetaProductoPersonalizadoHTML(p));
    });
}

function tarjetaProductoPersonalizadoHTML(p) {
    const meta = CATEGORIA_META[p.categoria] || CATEGORIA_META.cholados;
    const color = p.color || meta.color;
    const icono = p.icono || meta.icono;
    const nombreEscapado = p.nombre.replace(/'/g, "\\'");
    return `
        <div class="tarjeta-producto" data-id="${p.id}" data-categoria="${p.categoria}" data-personalizado="1">
            <div class="producto-imagen producto-imagen-placeholder" style="background:${color};">
                <span class="producto-imagen-emoji">${icono}</span>
            </div>
            <div class="producto-info">
                <h3>${p.nombre}</h3>
                <span class="precio">$${p.precio.toLocaleString()}</span>
                <button class="btn-pedido" onclick="agregarAlCarrito(${p.id},'${nombreEscapado}',${p.precio})">Agregar al carrito</button>
            </div>
        </div>`;
}

// Muestra/oculta el botón "+ Agregar producto" y los íconos ✏️🗑️ de cada
// tarjeta según si quien está viendo la página es trabajador/admin.
function actualizarControlesGestorMenu() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;

    const gestor = esGestorDeMenu();
    document.querySelectorAll('.solo-gestor-menu').forEach(el => {
        el.style.display = gestor ? '' : 'none';
    });

    contenedor.querySelectorAll('.tarjeta-producto').forEach(tarjeta => {
        let acciones = tarjeta.querySelector('.producto-acciones-gestor');
        if (!gestor) {
            if (acciones) acciones.remove();
            return;
        }
        if (!acciones) {
            const id = tarjeta.dataset.id;
            const imagen = tarjeta.querySelector('.producto-imagen');
            acciones = document.createElement('div');
            acciones.className = 'producto-acciones-gestor';
            acciones.innerHTML = `
                <button type="button" onclick="abrirModalProductoMenu(${id})" aria-label="Editar producto">✏️</button>
                <button type="button" onclick="confirmarEliminarProductoMenu(${id})" aria-label="Eliminar producto">🗑️</button>`;
            if (imagen) imagen.appendChild(acciones);
        }
    });
}

// Vuelve a aplicar el filtro de categoría activo, sin re-registrar listeners
// (para usar después de agregar/editar/eliminar un producto)
function reaplicarFiltroActual() {
    const boton = document.querySelector('.categorias-filtro .btn-categoria.activa');
    const categoria = boton ? boton.dataset.categoria : 'todos';
    document.querySelectorAll('#contenedor-productos .tarjeta-producto').forEach(tarjeta => {
        if (categoria === 'todos' || tarjeta.dataset.categoria === categoria) {
            tarjeta.style.display = 'block';
            tarjeta.style.opacity = '1';
            tarjeta.style.transform = 'scale(1)';
        } else {
            tarjeta.style.display = 'none';
        }
    });
}

function abrirModalProductoMenu(id = null) {
    productoEnEdicionId = id;
    const titulo = document.getElementById('modal-producto-menu-titulo');
    const form = document.getElementById('form-producto-menu');
    form.reset();

    if (id) {
        const producto = productoDAO.obtenerPorId(id);
        if (!producto) return;
        titulo.textContent = 'Editar producto';
        document.getElementById('producto-menu-nombre').value = producto.nombre;
        document.getElementById('producto-menu-precio').value = producto.precio;
        document.getElementById('producto-menu-categoria').value = producto.categoria;
        document.getElementById('producto-menu-icono').value = producto.icono || '';
        document.getElementById('producto-menu-color').value = producto.color || '#ff00ff';
    } else {
        titulo.textContent = 'Agregar producto';
        document.getElementById('producto-menu-color').value = '#ff00ff';
    }
    abrirModal('modal-producto-menu');
}

function guardarProductoMenuDesdeFormulario() {
    const nombre = document.getElementById('producto-menu-nombre').value.trim();
    const precio = Number(document.getElementById('producto-menu-precio').value);
    const categoria = document.getElementById('producto-menu-categoria').value;
    const icono = document.getElementById('producto-menu-icono').value.trim();
    const color = document.getElementById('producto-menu-color').value;

    if (!nombre || !precio || precio <= 0) {
        mostrarError('Escribe un nombre y un precio válido para el producto.', 'modal-producto-menu');
        return;
    }

    const datos = { nombre, precio, categoria, icono, color };

    if (productoEnEdicionId) {
        productoDAO.editarSabor(productoEnEdicionId, datos);
        carrito.mostrarNotificacion('Producto actualizado', 'exito');
    } else {
        productoDAO.agregarSabor(datos);
        carrito.mostrarNotificacion('Producto agregado al menú', 'exito');
    }

    cerrarModal('modal-producto-menu');
    renderizarProductosPersonalizados();
    actualizarControlesGestorMenu();
    reaplicarFiltroActual();
}

function confirmarEliminarProductoMenu(id) {
    const producto = productoDAO.obtenerPorId(id);
    if (!producto) return;
    if (!window.confirm(`¿Eliminar "${producto.nombre}" del menú?`)) return;
    productoDAO.eliminarSabor(id);
    renderizarProductosPersonalizados();
    actualizarControlesGestorMenu();
    reaplicarFiltroActual();
    carrito.mostrarNotificacion('Producto eliminado del menú', 'info');
}

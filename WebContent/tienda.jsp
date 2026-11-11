<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.mryisstiv.modelo.Usuario"%>
<%@ page import="com.mryisstiv.modelo.Carrito"%>
<%@ page import="com.mryisstiv.modelo.DetalleCarrito"%>
<%@ page import="java.util.List"%>

<%
    Usuario usuario = (Usuario) session.getAttribute("usuario");
    Carrito carrito = (Carrito) session.getAttribute("carrito");
    if (carrito == null) carrito = new Carrito();
    List<DetalleCarrito> detalles = carrito.getDetalles();
    double subtotal = carrito.getTotal();
    double domicilio = 3000;
    double total = subtotal + domicilio;
    
    String error = request.getParameter("error");
%>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mi Carrito - MR YISSTIV cholados</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&family=Pacifico&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box !important; }
body { overflow-x: hidden !important; margin: 0 !important; padding: 0 !important; font-family: 'Poppins', sans-serif !important; background: #fdf4ff !important; }

.header-principal { background: linear-gradient(90deg, #d946ef 0%, #a855f7 30%, #38bdf8 70%, #22d3ee 100%) !important; padding: 0.6rem 1.5rem !important; display: flex !important; align-items: center !important; justify-content: space-between !important; position: sticky !important; top: 0 !important; z-index: 1000 !important; box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important; height: 70px !important; }
.logo-container { display: flex !important; align-items: center !important; gap: 0.5rem !important; flex-shrink: 0 !important; }
.logo-img { height: 50px !important; width: auto !important; object-fit: contain !important; }
.logo-texto { display: flex !important; flex-direction: column !important; line-height: 1 !important; }
.logo-titulo { font-family: 'Pacifico', cursive !important; font-size: 1.8rem !important; color: white !important; margin: 0 !important; text-shadow: 2px 2px 4px rgba(0,0,0,0.2) !important; }
.logo-subtitulo { font-family: 'Pacifico', cursive !important; font-size: 0.85rem !important; color: #ffd700 !important; margin: 0 !important; }
.navegacion { display: flex !important; align-items: center !important; gap: 1rem !important; flex-wrap: nowrap !important; }
.nav-link { color: white !important; text-decoration: none !important; font-weight: 600 !important; font-size: 0.9rem !important; transition: all 0.3s !important; white-space: nowrap !important; }
.nav-link:hover { color: #ffd700 !important; }
.nav-sesion { background: rgba(255,255,255,0.15) !important; color: white !important; padding: 0.4rem 0.8rem !important; border-radius: 25px !important; text-decoration: none !important; font-weight: 600 !important; font-size: 0.85rem !important; border: 2px solid rgba(255,255,255,0.5) !important; transition: all 0.3s !important; white-space: nowrap !important; display: inline-flex !important; align-items: center !important; gap: 0.4rem !important; min-width: 40px !important; justify-content: center !important; }
.nav-sesion:hover { background: white !important; color: #a855f7 !important; }
.avatar-usuario { width: 32px !important; height: 32px !important; border-radius: 50% !important; background: linear-gradient(135deg, #ffd700, #ff8c00) !important; display: flex !important; align-items: center !important; justify-content: center !important; font-weight: 700 !important; font-size: 0.9rem !important; color: white !important; flex-shrink: 0 !important; }
.badge-carrito { background: #ffd700 !important; color: #333 !important; padding: 0.1rem 0.4rem !important; border-radius: 50% !important; font-size: 0.7rem !important; font-weight: 700 !important; margin-left: 0.2rem !important; }

.tienda-container { max-width: 1200px !important; margin: 2rem auto !important; padding: 0 2rem !important; }
.btn-volver { display: inline-block !important; color: #d946ef !important; text-decoration: none !important; font-weight: 600 !important; margin-bottom: 1rem !important; font-size: 1rem !important; }
.btn-volver:hover { color: #a855f7 !important; }

.alerta-error { background: #fee2e2 !important; color: #991b1b !important; padding: 1rem !important; border-radius: 12px !important; margin-bottom: 1.5rem !important; text-align: center !important; font-weight: 600 !important; border: 2px solid #fecaca !important; }

.grid-carrito { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 2rem !important; margin-top: 1rem !important; }

.card-carrito { background: white !important; border-radius: 24px !important; padding: 2rem !important; box-shadow: 0 10px 40px rgba(217, 70, 239, 0.15) !important; }
.card-carrito h2 { color: #d946ef !important; text-align: center !important; margin-bottom: 1.5rem !important; font-size: 1.8rem !important; }

.item-carrito { display: flex !important; align-items: center !important; gap: 1rem !important; padding: 1rem !important; border-bottom: 1px solid #f0e6ff !important; transition: background 0.3s !important; border-radius: 12px !important; }
.item-carrito:hover { background: #fdf4ff !important; }
.item-imagen { width: 60px !important; height: 60px !important; border-radius: 12px !important; background: linear-gradient(135deg, #fce7f3, #f3e8ff) !important; display: flex !important; align-items: center !important; justify-content: center !important; font-size: 2rem !important; flex-shrink: 0 !important; }
.item-info { flex: 1 !important; }
.item-nombre { font-weight: 700 !important; color: #333 !important; font-size: 1rem !important; margin-bottom: 0.2rem !important; }
.item-precio { color: #d946ef !important; font-weight: 700 !important; font-size: 0.95rem !important; }
.item-cantidad { display: flex !important; align-items: center !important; gap: 0.5rem !important; }
.btn-cantidad { background: #d946ef !important; color: white !important; border: none !important; width: 32px !important; height: 32px !important; border-radius: 50% !important; cursor: pointer !important; font-size: 1.2rem !important; font-weight: 700 !important; display: flex !important; align-items: center !important; justify-content: center !important; transition: all 0.3s !important; text-decoration: none !important; }
.btn-cantidad:hover { background: #a855f7 !important; transform: scale(1.1) !important; }
.cantidad-numero { font-weight: 700 !important; font-size: 1.1rem !important; min-width: 25px !important; text-align: center !important; }
.btn-eliminar { background: #fee2e2 !important; color: #dc2626 !important; border: none !important; padding: 0.4rem 0.8rem !important; border-radius: 8px !important; cursor: pointer !important; font-size: 0.8rem !important; text-decoration: none !important; transition: all 0.3s !important; }
.btn-eliminar:hover { background: #fecaca !important; }

.total-section { margin-top: 1.5rem !important; padding-top: 1.5rem !important; border-top: 2px solid #f0e6ff !important; }
.total-row { display: flex !important; justify-content: space-between !important; margin: 0.5rem 0 !important; font-size: 1rem !important; color: #555 !important; }
.total-final { font-size: 1.5rem !important; font-weight: 900 !important; color: #d946ef !important; margin-top: 0.5rem !important; }

.form-group { margin-bottom: 1rem !important; }
.form-group label { display: block !important; font-weight: 600 !important; color: #d946ef !important; margin-bottom: 0.3rem !important; font-size: 0.9rem !important; }
.form-group input, .form-group select, .form-group textarea { width: 100% !important; padding: 0.8rem !important; border: 2px solid #f0e6ff !important; border-radius: 12px !important; font-family: 'Poppins' !important; font-size: 0.95rem !important; transition: all 0.3s !important; background: white !important; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none !important; border-color: #d946ef !important; box-shadow: 0 0 0 3px rgba(217, 70, 239, 0.1) !important; }
.form-group textarea { resize: vertical !important; min-height: 80px !important; }

.btn-confirmar { width: 100% !important; background: linear-gradient(135deg, #d946ef, #a855f7) !important; color: white !important; border: none !important; padding: 1rem !important; border-radius: 50px !important; font-size: 1.1rem !important; font-weight: 700 !important; cursor: pointer !important; margin-top: 1rem !important; font-family: 'Poppins' !important; transition: all 0.3s !important; box-shadow: 0 6px 20px rgba(217, 70, 239, 0.3) !important; }
.btn-confirmar:hover { transform: translateY(-3px) !important; box-shadow: 0 10px 30px rgba(217, 70, 239, 0.5) !important; }

.sin-productos { text-align: center !important; padding: 3rem 1rem !important; color: #999 !important; }
.sin-productos .icono { font-size: 4rem !important; margin-bottom: 1rem !important; }
.btn-ver-productos { display: inline-block !important; background: linear-gradient(135deg, #d946ef, #a855f7) !important; color: white !important; padding: 0.8rem 2rem !important; border-radius: 50px !important; text-decoration: none !important; font-weight: 700 !important; margin-top: 1rem !important; transition: all 0.3s !important; }
.btn-ver-productos:hover { transform: translateY(-2px) !important; box-shadow: 0 6px 20px rgba(217, 70, 239, 0.4) !important; }

.footer { background: #1a0022 !important; color: white !important; padding: 2.5rem 2rem 1rem !important; margin-top: 3rem !important; }
.footer-contenido { display: grid !important; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)) !important; gap: 2rem !important; max-width: 1200px !important; margin: 0 auto !important; }
.footer h3 { font-family: 'Pacifico', cursive !important; color: #d946ef !important; font-size: 1.5rem !important; margin-bottom: 0.8rem !important; }
.footer h4 { color: #ffd700 !important; margin-bottom: 0.8rem !important; }
.footer p { margin: 0.3rem 0 !important; font-size: 0.9rem !important; }
.footer-bottom { text-align: center !important; margin-top: 2rem !important; padding-top: 1rem !important; border-top: 1px solid rgba(255,255,255,0.1) !important; font-size: 0.85rem !important; }

@media (max-width: 768px) { 
    .grid-carrito { grid-template-columns: 1fr !important; } 
    .navegacion { gap: 0.6rem !important; }
    .nav-link { font-size: 0.8rem !important; }
}
</style>
</head>
<body>

<!-- HEADER -->
<header class="header-principal">
    <div class="logo-container">
        <img src="imagenes/logo.png" alt="MR YISSTIV" class="logo-img" onerror="this.style.display='none'">
        <div class="logo-texto">
            <h1 class="logo-titulo">MR YISSTIV</h1>
            <p class="logo-subtitulo">cholados</p>
        </div>
    </div>
    <nav class="navegacion">
        <a href="index.jsp" class="nav-link">Menu</a>
        <a href="index.jsp#modulo-reservas" class="nav-link">Reservas</a>
        <a href="tienda.jsp" class="nav-link">Carrito <span class="badge-carrito"><%= detalles.size() %></span></a>
        <a href="sabores.jsp" class="nav-link">Sabores</a>
        <a href="puntos.jsp" class="nav-link">Puntos</a>
        <% if (usuario != null) { %>
            <a href="perfil.jsp" class="nav-link">Mi Perfil</a>
            <% if (usuario.isAdmin() || usuario.isEmpleado()) { %>
                <a href="admin.jsp" class="nav-link">Admin</a>
            <% } %>
            <a href="LogoutServlet" class="nav-sesion" title="Cerrar sesion de <%= usuario.getNombre() %>">
                <span class="avatar-usuario"><%= usuario.getNombre().substring(0, 1).toUpperCase() %></span>
            </a>
        <% } else { %>
            <a href="login.html" class="nav-sesion">Iniciar Sesion</a>
        <% } %>
    </nav>
</header>

<div class="tienda-container">
    <a href="index.jsp" class="btn-volver">← Volver al menu</a>
    
    <% if ("1".equals(error) || "guardar".equals(error)) { %>
        <div class="alerta-error">⚠️ Hubo un error al procesar tu pedido. Intenta de nuevo.</div>
    <% } else if ("campos".equals(error)) { %>
        <div class="alerta-error">⚠️ Por favor completa todos los campos obligatorios.</div>
    <% } %>
    
    <div class="grid-carrito">
        <!-- COLUMNA IZQUIERDA: PRODUCTOS DEL CARRITO -->
        <div class="card-carrito">
            <h2>🛒 Tu Pedido</h2>
            <% if (detalles.isEmpty()) { %>
                <div class="sin-productos">
                    <div class="icono">🛒</div>
                    <p style="font-size: 1.2rem; margin-bottom: 1rem;">Tu carrito esta vacio</p>
                    <a href="index.jsp" class="btn-ver-productos">Ver productos</a>
                </div>
            <% } else { 
                for (DetalleCarrito detalle : detalles) { 
            %>
                <div class="item-carrito">
                    <div class="item-imagen">🍧</div>
                    <div class="item-info">
                        <div class="item-nombre"><%= detalle.getProducto().getNombre() %></div>
                        <div class="item-precio">$<%= String.format("%,.0f", detalle.getProducto().getPrecio()) %></div>
                    </div>
                    <div class="item-cantidad">
                        <a href="CarritoServlet?accion=actualizar&id=<%= detalle.getProducto().getIdProducto() %>&cantidad=<%= detalle.getCantidad() - 1 %>" class="btn-cantidad">-</a>
                        <span class="cantidad-numero"><%= detalle.getCantidad() %></span>
                        <a href="CarritoServlet?accion=actualizar&id=<%= detalle.getProducto().getIdProducto() %>&cantidad=<%= detalle.getCantidad() + 1 %>" class="btn-cantidad">+</a>
                    </div>
                    <a href="CarritoServlet?accion=eliminar&id=<%= detalle.getProducto().getIdProducto() %>" class="btn-eliminar">🗑️</a>
                </div>
            <% } %>
            
            <div class="total-section">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>$<%= String.format("%,.0f", subtotal) %></span>
                </div>
                <div class="total-row">
                    <span>🚚 Domicilio:</span>
                    <span>$<%= String.format("%,.0f", domicilio) %></span>
                </div>
                <div class="total-row total-final">
                    <span>Total:</span>
                    <span>$<%= String.format("%,.0f", total) %></span>
                </div>
            </div>
            <% } %>
        </div>
        
        <!-- COLUMNA DERECHA: DATOS DE ENTREGA -->
        <div class="card-carrito">
            <h2>📦 Datos de Entrega</h2>
            <% if (usuario != null) { %>
                <form action="PedidoServlet" method="POST" onsubmit="return validarFormulario();">
                    <input type="hidden" name="subtotal" value="<%= subtotal %>">
                    <input type="hidden" name="valorDomicilio" value="<%= domicilio %>">
                    <input type="hidden" name="total" value="<%= total %>">
                    
                    <div class="form-group">
                        <label>👤 Nombre Completo:</label>
                        <input type="text" name="nombre" value="<%= usuario.getNombre() %> <%= usuario.getApellidos() %>" required>
                    </div>
                    
                    <div class="form-group">
                        <label>📞 Telefono / WhatsApp:</label>
                        <input type="tel" name="telefono" value="<%= usuario.getTelefono() %>" required pattern="[0-9]{10}" title="Ingresa 10 digitos">
                    </div>
                    
                    <div class="form-group">
                        <label>📍 Direccion de Entrega:</label>
                        <input type="text" name="direccion" placeholder="Calle, carrera, numero, apto..." required>
                    </div>
                    
                    <div class="form-group">
                        <label>🏘️ Barrio:</label>
                        <input type="text" name="barrio" placeholder="Tu barrio" required>
                    </div>
                    
                    <div class="form-group">
                        <label>🆔 Documento (Club de Puntos):</label>
                        <input type="text" name="documento" value="<%= usuario.getCedula() %>">
                    </div>
                    
                    <div class="form-group">
                        <label>💳 Metodo de Pago:</label>
                        <select name="metodoPago" required>
                            <option value="">Seleccionar...</option>
                            <option value="Efectivo">💵 Efectivo</option>
                            <option value="Transferencia">🏦 Transferencia</option>
                            <option value="Nequi">💜 Nequi</option>
                            <option value="Daviplata">🧡 Daviplata</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>📝 Observaciones (opcional):</label>
                        <textarea name="observaciones" placeholder="Alergias, instrucciones especiales..."></textarea>
                    </div>
                    
                    <button type="submit" class="btn-confirmar">✅ Confirmar Pedido</button>
                    <p style="text-align: center; color: #999; font-size: 0.8rem; margin-top: 0.5rem;">Al confirmar seras redirigido a WhatsApp</p>
                </form>
            <% } else { %>
                <div class="sin-productos">
                    <div class="icono">⚠️</div>
                    <p style="font-size: 1.1rem;">Debes <a href="login.html" style="color: #d946ef; font-weight: 700;">iniciar sesion</a> para hacer un pedido.</p>
                </div>
            <% } %>
        </div>
    </div>
</div>

<!-- FOOTER -->
<footer class="footer">
    <div class="footer-contenido">
        <div><h3>MR YISSTIV cholados</h3><p>Los mejores cholados y helados de la ciudad</p></div>
        <div><h4>Contacto</h4><p>Tel: 300 536 6095</p><p>Email: info@mryisstiv.com</p><p>Ibague - Tolima</p></div>
        <div><h4>Siguenos</h4><p>
            <a href="#" style="color: white; text-decoration: none; margin-right: 1rem;">Facebook</a>
            <a href="#" style="color: white; text-decoration: none; margin-right: 1rem;">Instagram</a>
            <a href="https://wa.me/573005366095" style="color: white; text-decoration: none;">WhatsApp</a>
        </p></div>
    </div>
    <div class="footer-bottom"><p>© 2026 MR YISSTIV cholados. Todos los derechos reservados.</p></div>
</footer>

<script>
function validarFormulario() {
    var nombre = document.querySelector('input[name="nombre"]').value.trim();
    var telefono = document.querySelector('input[name="telefono"]').value.trim();
    var direccion = document.querySelector('input[name="direccion"]').value.trim();
    var barrio = document.querySelector('input[name="barrio"]').value.trim();
    var metodoPago = document.querySelector('select[name="metodoPago"]').value;
    
    if (!nombre || !telefono || !direccion || !barrio || !metodoPago) {
        alert('⚠️ Por favor completa todos los campos obligatorios');
        return false;
    }
    
    if (telefono.length < 10) {
        alert('⚠️ El telefono debe tener al menos 10 digitos');
        return false;
    }
    
    return true;
}
</script>

</body>
</html>
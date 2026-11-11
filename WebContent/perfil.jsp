<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.mryisstiv.modelo.Usuario"%>
<%@ page import="com.mryisstiv.dao.impl.PedidoDAOImpl"%>
<%@ page import="com.mryisstiv.dao.impl.ReservaDAOImpl"%>
<%@ page import="com.mryisstiv.modelo.Pedido"%>
<%@ page import="com.mryisstiv.modelo.Reserva"%>
<%@ page import="java.util.List"%>

<%
    Usuario usuario = (Usuario) session.getAttribute("usuario");
    if (usuario == null) {
        response.sendRedirect("login.html");
        return;
    }

    PedidoDAOImpl pedidoDAO = new PedidoDAOImpl();
    ReservaDAOImpl reservaDAO = new ReservaDAOImpl();
    List<Pedido> misPedidos = pedidoDAO.selectByUsuario(usuario.getIdUsuario());
    List<Reserva> misReservas = reservaDAO.selectByUsuario(usuario.getIdUsuario());
%>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Mi Perfil - MR YISSTIV</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Poppins', sans-serif; background: #fdf4ff; padding: 2rem; }
.container { max-width: 1000px; margin: 0 auto; }
h1 { color: #d946ef; text-align: center; margin-bottom: 2rem; }
.card { background: white; border-radius: 16px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 4px 15px rgba(217, 70, 239, 0.1); }
h2 { color: #a855f7; border-bottom: 2px solid #fce7f3; padding-bottom: 0.5rem; margin-bottom: 1rem; }
table { width: 100%; border-collapse: collapse; }
th { background: #f3e8ff; color: #6b21a8; padding: 0.8rem; text-align: left; }
td { padding: 0.8rem; border-bottom: 1px solid #f0e6ff; font-size: 0.9rem; }
.estado { padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
.estado-pendiente { background: #fef3c7; color: #92400e; }
.estado-confirmado { background: #d1fae5; color: #065f46; }
.estado-camino { background: #dbeafe; color: #1e40af; }
.btn-volver { display: inline-block; background: #d946ef; color: white; padding: 0.6rem 1.2rem; border-radius: 25px; text-decoration: none; margin-bottom: 1rem; }
.btn-volver:hover { background: #a855f7; }
.info-usuario { background: linear-gradient(135deg, #fce7f3, #f3e8ff); padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem; }
.info-usuario h3 { color: #d946ef; margin-bottom: 0.5rem; }
.info-usuario p { margin: 0.3rem 0; color: #555; }
</style>
</head>
<body>
<div class="container">
<a href="index.jsp" class="btn-volver">← Volver al Inicio</a>
<h1>👤 Mi Perfil</h1>

<div class="info-usuario">
<h3>Hola, <%= usuario.getNombre() %> <%= usuario.getApellidos() %></h3>
<p>📧 <strong>Correo:</strong> <%= usuario.getCorreo() %></p>
<p>📞 <strong>Teléfono:</strong> <%= usuario.getTelefono() %></p>
<p>🆔 <strong>Cédula:</strong> <%= usuario.getCedula() %></p>
<p>🎭 <strong>Rol:</strong> <%= usuario.getRol() != null ? usuario.getRol().substring(0,1).toUpperCase() + usuario.getRol().substring(1) : "Cliente" %></p>
</div>

<div class="card">
<h2>🍧 Mis Pedidos</h2>
<% if (misPedidos == null || misPedidos.isEmpty()) { %>
<p>No has realizado pedidos aún.</p>
<% } else { %>
<table>
<thead><tr><th>ID</th><th>Total</th><th>Fecha</th><th>Estado</th></tr></thead>
<tbody>
<% for (Pedido p : misPedidos) { 
    String claseEstado = "estado-pendiente";
    if ("En camino".equals(p.getEstado())) claseEstado = "estado-camino";
    else if ("Finalizado".equals(p.getEstado())) claseEstado = "estado-confirmado";
%>
<tr>
<td>#<%= p.getIdPedido() %></td>
<td>$<%= String.format("%,.0f", p.getTotal()) %></td>
<td><%= p.getFechaPedido() != null ? p.getFechaPedido().toString().substring(0, 10) : "N/A" %></td>
<td><span class="estado <%= claseEstado %>"><%= p.getEstado() %></span></td>
</tr>
<% } %>
</tbody>
</table>
<% } %>
</div>

<div class="card">
<h2>🎉 Mis Reservas</h2>
<% if (misReservas == null || misReservas.isEmpty()) { %>
<p>No tienes reservas activas.</p>
<% } else { %>
<table>
<thead><tr><th>ID</th><th>Fecha</th><th>Hora</th><th>Personas</th><th>Estado</th></tr></thead>
<tbody>
<% for (Reserva r : misReservas) { 
    String claseEstado = "estado-pendiente";
    if ("Confirmada".equals(r.getEstado())) claseEstado = "estado-confirmado";
%>
<tr>
<td>#<%= r.getIdReserva() %></td>
<td><%= r.getFechaReserva() %></td>
<td><%= r.getHoraReserva() %></td>
<td><%= r.getNumeroPersonas() %></td>
<td><span class="estado <%= claseEstado %>"><%= r.getEstado() %></span></td>
</tr>
<% } %>
</tbody>
</table>
<% } %>
</div>
</div>
</body>
</html>
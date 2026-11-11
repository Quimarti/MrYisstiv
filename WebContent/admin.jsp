<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.mryisstiv.modelo.Usuario"%>
<%@ page import="com.mryisstiv.dao.impl.PedidoDAOImpl"%>
<%@ page import="com.mryisstiv.dao.impl.ReservaDAOImpl"%>
<%@ page import="com.mryisstiv.modelo.Pedido"%>
<%@ page import="com.mryisstiv.modelo.Reserva"%>
<%@ page import="java.util.List"%>

<%
    Usuario usuario = (Usuario) session.getAttribute("usuario");
    if (usuario == null || (!usuario.isAdmin() && !usuario.isEmpleado())) {
        response.sendRedirect("index.jsp");
        return;
    }

    String accion = request.getParameter("accion");
    if ("actualizarReserva".equals(accion)) {
        int id = Integer.parseInt(request.getParameter("id"));
        String nuevoEstado = request.getParameter("estado");
        new ReservaDAOImpl().actualizarEstado(id, nuevoEstado);
        response.sendRedirect("admin.jsp?exito=Reserva actualizada");
        return;
    }
    if ("actualizarPedido".equals(accion)) {
        int id = Integer.parseInt(request.getParameter("id"));
        String nuevoEstado = request.getParameter("estado");
        new PedidoDAOImpl().actualizarEstado(id, nuevoEstado);
        response.sendRedirect("admin.jsp?exito=Pedido actualizado");
        return;
    }

    ReservaDAOImpl reservaDAO = new ReservaDAOImpl();
    PedidoDAOImpl pedidoDAO = new PedidoDAOImpl();
    List<Reserva> reservas = reservaDAO.selectAll();
    List<Pedido> pedidos = pedidoDAO.selectAll();
%>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Panel Admin - MR YISSTIV</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Poppins', sans-serif; background: #fdf4ff; padding: 2rem; }
h1 { color: #d946ef; margin-bottom: 2rem; text-align: center; }
h2 { color: #a855f7; margin: 2rem 0 1rem 0; border-bottom: 3px solid #d946ef; padding-bottom: 0.5rem; }
.tabla-container { background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow-x: auto; margin-bottom: 2rem; }
table { width: 100%; border-collapse: collapse; }
th { background: linear-gradient(135deg, #d946ef, #a855f7); color: white; padding: 1rem; text-align: left; font-size: 0.9rem; }
td { padding: 0.8rem; border-bottom: 1px solid #f0e6ff; font-size: 0.85rem; }
tr:hover { background: #fdf4ff; }
.estado { padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700; display: inline-block; }
.estado-pendiente { background: #fef3c7; color: #92400e; }
.estado-confirmada { background: #d1fae5; color: #065f46; }
.estado-cancelada { background: #fee2e2; color: #991b1b; }
.estado-camino { background: #dbeafe; color: #1e40af; }
.acciones { display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; }
.btn-wa { background: #25d366; color: white; padding: 0.5rem 1rem; border-radius: 20px; text-decoration: none; font-size: 0.8rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; transition: all 0.3s; }
.btn-wa:hover { background: #1da851; transform: translateY(-2px); }
.btn-volver { display: inline-block; background: #d946ef; color: white; padding: 0.8rem 1.5rem; border-radius: 25px; text-decoration: none; font-weight: 600; margin-bottom: 1rem; }
.btn-volver:hover { background: #a855f7; }
.sin-datos { text-align: center; padding: 2rem; color: #999; }
.alerta-exito { background: #d4edda; color: #155724; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; text-align: center; }
select { padding: 0.4rem; border-radius: 6px; border: 1px solid #d946ef; font-family: 'Poppins'; }
.btn-guardar { background: #d946ef; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 6px; cursor: pointer; font-family: 'Poppins'; }
.btn-guardar:hover { background: #a855f7; }
</style>
</head>
<body>
<a href="index.jsp" class="btn-volver">← Volver al sitio</a>
<h1>Panel de Administracion - MR YISSTIV</h1>

<% if (request.getParameter("exito") != null) { %>
<div class="alerta-exito">✅ <%= request.getParameter("exito") %> correctamente</div>
<% } %>

<h2>Gestion de Reservas (<%= reservas.size() %>)</h2>
<div class="tabla-container">
<% if (reservas.isEmpty()) { %>
<p class="sin-datos">No hay reservas aun</p>
<% } else { %>
<table>
<thead>
<tr>
<th>ID</th>
<th>Cliente</th>
<th>Telefono</th>
<th>Fecha</th>
<th>Hora</th>
<th>Personas</th>
<th>Estado</th>
<th>Acciones</th>
</tr>
</thead>
<tbody>
<% for (Reserva r : reservas) { 
    String clase = "estado-pendiente";
    if ("Confirmada".equals(r.getEstado())) clase = "estado-confirmada";
    else if ("Cancelada".equals(r.getEstado())) clase = "estado-cancelada";
    
    String tel = r.getTelefonoUsuario();
    String telLimpio = (tel != null) ? tel.replaceAll("\\D", "") : "";
    String nom = r.getNombreUsuario();
    if (nom == null) nom = "Usuario #" + r.getIdUsuario();
    
    String urlWA = "";
    boolean tieneTel = telLimpio.length() >= 10;
    if (tieneTel) {
        urlWA = "https://wa.me/57" + telLimpio;
        urlWA += "?text=Hola%20" + nom.replaceAll(" ", "%20");
        urlWA += "%20Tu%20reserva%20" + r.getIdReserva();
        urlWA += "%20ha%20sido%20" + r.getEstado();
    }
%>
<tr>
<td>#<%= r.getIdReserva() %></td>
<td><%= nom %></td>
<td><%= tel != null ? tel : "N/A" %></td>
<td><%= r.getFechaReserva() %></td>
<td><%= r.getHoraReserva() %></td>
<td><%= r.getNumeroPersonas() %></td>
<td><span class="estado <%= clase %>"><%= r.getEstado() %></span></td>
<td class="acciones">
<form method="get" action="admin.jsp" style="display:flex; gap:4px;">
<input type="hidden" name="accion" value="actualizarReserva">
<input type="hidden" name="id" value="<%= r.getIdReserva() %>">
<select name="estado">
<option value="Pendiente" <%= "Pendiente".equals(r.getEstado()) ? "selected" : "" %>>Pendiente</option>
<option value="Confirmada" <%= "Confirmada".equals(r.getEstado()) ? "selected" : "" %>>Confirmada</option>
<option value="Cancelada" <%= "Cancelada".equals(r.getEstado()) ? "selected" : "" %>>Cancelada</option>
</select>
<button type="submit" class="btn-guardar">Guardar</button>
</form>
<% if (tieneTel) { %>
<a href="<%= urlWA %>" target="_blank" class="btn-wa">📱 Notificar</a>
<% } else { %>
<span style="color: #999; font-size: 0.75rem;">Sin telefono</span>
<% } %>
</td>
</tr>
<% } %>
</tbody>
</table>
<% } %>
</div>

<h2>Gestion de Pedidos (<%= pedidos.size() %>)</h2>
<div class="tabla-container">
<% if (pedidos.isEmpty()) { %>
<p class="sin-datos">No hay pedidos aun</p>
<% } else { %>
<table>
<thead>
<tr>
<th>ID</th>
<th>Usuario ID</th>
<th>Total</th>
<th>Observaciones</th>
<th>Estado</th>
<th>Acciones</th>
</tr>
</thead>
<tbody>
<% for (Pedido p : pedidos) { 
    String clase = "estado-pendiente";
    if ("En camino".equals(p.getEstado())) clase = "estado-camino";
    else if ("Finalizado".equals(p.getEstado())) clase = "estado-confirmada";
%>
<tr>
<td>#<%= p.getIdPedido() %></td>
<td><%= p.getIdUsuario() %></td>
<td><strong>$<%= String.format("%,.0f", p.getTotal()) %></strong></td>
<td style="max-width: 200px;"><%= p.getObservaciones() %></td>
<td><span class="estado <%= clase %>"><%= p.getEstado() %></span></td>
<td class="acciones">
<form method="get" action="admin.jsp" style="display:flex; gap:4px;">
<input type="hidden" name="accion" value="actualizarPedido">
<input type="hidden" name="id" value="<%= p.getIdPedido() %>">
<select name="estado">
<option value="Pendiente" <%= "Pendiente".equals(p.getEstado()) ? "selected" : "" %>>Pendiente</option>
<option value="En camino" <%= "En camino".equals(p.getEstado()) ? "selected" : "" %>>En camino</option>
<option value="Finalizado" <%= "Finalizado".equals(p.getEstado()) ? "selected" : "" %>>Finalizado</option>
</select>
<button type="submit" class="btn-guardar">Guardar</button>
</form>
</td>
</tr>
<% } %>
</tbody>
</table>
<% } %>
</div>
</body>
</html>
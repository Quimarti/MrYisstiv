<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.mryisstiv.modelo.Usuario"%>
<%@ page import="com.mryisstiv.modelo.Carrito"%>
<%
    Usuario usuarioHeader = (Usuario) session.getAttribute("usuario");
    String nombreHeader = "";
    boolean isLoggedInHeader = false;
    boolean esAdminHeader = false;
    boolean esEmpleadoHeader = false;
    
    if (usuarioHeader != null) {
        isLoggedInHeader = true;
        nombreHeader = usuarioHeader.getNombre();
        if (usuarioHeader.getIdRol() == 1) esAdminHeader = true;
        else if (usuarioHeader.getIdRol() == 2) esEmpleadoHeader = true;
    }
    
    Carrito carritoHeader = (Carrito) session.getAttribute("carrito");
    int cantidadCarrito = 0;
    if (carritoHeader != null) {
        cantidadCarrito = carritoHeader.getCantidadTotal();
    }
%>

<header class="header-principal" id="headerPrincipal">
    <div class="logo-container">
        <img src="imagenes/logo.png" alt="MR YISSTIV" class="logo-img" onerror="this.style.display='none'">
        <div class="logo-texto">
            <h1 class="logo-titulo">MR YISSTIV</h1>
            <p class="logo-subtitulo">cholados</p>
        </div>
    </div>
    <nav class="navegacion">
        <a href="index.jsp#tienda" class="nav-link">Menu</a>
        <a href="index.jsp#modulo-reservas" class="nav-link">Reservas</a>
        <a href="tienda.jsp" class="nav-link">Carrito <span class="badge-carrito"><%= cantidadCarrito %></span></a>
        <% if (isLoggedInHeader && (esAdminHeader || esEmpleadoHeader)) { %>
            <a href="sabores.jsp" class="nav-link">Sabores</a>
        <% } %>
        <a href="puntos.jsp" class="nav-link">Puntos</a>
        <% if (isLoggedInHeader) { %>
            <a href="perfil.jsp" class="nav-link">Mi Perfil</a>
            <% if (esAdminHeader || esEmpleadoHeader) { %>
                <a href="admin.jsp" class="nav-link">Admin</a>
            <% } %>
            <a href="LogoutServlet" class="nav-sesion" title="Cerrar sesion de <%= nombreHeader %>">
                <span class="avatar-usuario"><%= nombreHeader.substring(0, 1).toUpperCase() %></span>
            </a>
        <% } else { %>
            <a href="login.html" class="nav-sesion">Iniciar Sesion</a>
        <% } %>
    </nav>
</header>
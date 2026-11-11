<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.mryisstiv.dao.ProductoDAO"%>
<%@ page import="com.mryisstiv.dao.impl.ProductoDAOImpl"%>
<%@ page import="com.mryisstiv.modelo.Producto"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.ArrayList"%>

<%
    ProductoDAO productoDAO = new ProductoDAOImpl();
    List<Producto> todosProductos = productoDAO.selectAll();
    
    // ✅ FILTRAR POR CATEGORÍA
    String categoriaParam = request.getParameter("categoria");
    List<Producto> productos = new ArrayList<>();
    
    if (categoriaParam != null && !categoriaParam.isEmpty()) {
        try {
            int categoriaId = Integer.parseInt(categoriaParam);
            for (Producto p : todosProductos) {
                if (p.getIdCategoria() == categoriaId) {
                    productos.add(p);
                }
            }
        } catch (NumberFormatException e) {
            productos = todosProductos;
        }
    } else {
        productos = todosProductos;
    }
%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tienda - MR YISSTIV cholados</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&family=Pacifico&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
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

        .tienda-container { max-width: 1300px !important; margin: 2rem auto !important; padding: 0 2rem !important; }
        .btn-volver { display: inline-block !important; background: #d946ef !important; color: white !important; padding: 0.8rem 1.5rem !important; border-radius: 50px !important; text-decoration: none !important; font-weight: 600 !important; margin-bottom: 1.5rem !important; }
        .btn-volver:hover { background: #a855f7 !important; }
        .titulo-tienda { font-size: 2.5rem !important; color: #d946ef !important; text-align: center !important; margin-bottom: 0.5rem !important; }
        .subtitulo-tienda { text-align: center !important; color: #666 !important; margin-bottom: 2rem !important; }
        
        .categorias-filtro { display: flex !important; flex-wrap: nowrap !important; gap: 0.5rem !important; justify-content: center !important; align-items: center !important; margin-bottom: 2rem !important; padding: 0.5rem !important; overflow-x: auto !important; scrollbar-width: none !important; -webkit-overflow-scrolling: touch !important; }
        .categorias-filtro::-webkit-scrollbar { display: none !important; }
        .btn-categoria { position: relative !important; background: rgba(255, 255, 255, 0.35) !important; backdrop-filter: blur(15px) !important; -webkit-backdrop-filter: blur(15px) !important; border: 2px solid rgba(255, 255, 255, 0.6) !important; border-radius: 50px !important; padding: 0.5rem 0.9rem !important; color: #4a0e4e !important; font-weight: 700 !important; font-size: 0.75rem !important; text-decoration: none !important; white-space: nowrap !important; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important; box-shadow: 0 4px 20px rgba(217, 70, 239, 0.15), inset 0 0 15px rgba(255, 255, 255, 0.4) !important; display: inline-flex !important; align-items: center !important; gap: 0.3rem !important; flex-shrink: 0 !important; overflow: hidden !important; }
        .btn-categoria::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; background: linear-gradient(135deg, #d946ef, #a855f7, #fb923c, #ffd700) !important; background-size: 300% 300% !important; opacity: 0 !important; z-index: -1 !important; transition: opacity 0.4s ease !important; animation: auroraFlow 6s ease infinite !important; }
        @keyframes auroraFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .btn-categoria:hover, .btn-categoria.activa { color: white !important; border-color: rgba(255, 255, 255, 0.9) !important; transform: translateY(-2px) scale(1.05) !important; box-shadow: 0 8px 25px rgba(217, 70, 239, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.3) !important; }
        .btn-categoria:hover::before, .btn-categoria.activa::before { opacity: 1 !important; }
        .btn-categoria span { font-size: 0.9rem !important; }

        .contenedor-productos { display: grid !important; grid-template-columns: repeat(5, 1fr) !important; gap: 1.2rem !important; }
        .tarjeta-producto { background: white !important; border-radius: 16px !important; overflow: hidden !important; box-shadow: 0 2px 10px rgba(0,0,0,0.06) !important; transition: transform 0.3s !important; display: flex !important; flex-direction: column !important; }
        .tarjeta-producto:hover { transform: translateY(-5px) !important; box-shadow: 0 8px 20px rgba(217, 70, 239, 0.15) !important; }
        .producto-imagen { height: 180px !important; background: #f0f0f0 !important; display: flex !important; align-items: center !important; justify-content: center !important; overflow: hidden !important; }
        .producto-imagen img { width: 100% !important; height: 100% !important; object-fit: cover !important; }
        .producto-info { padding: 0.8rem !important; flex: 1 !important; display: flex !important; flex-direction: column !important; }
        .producto-info h3 { margin: 0.3rem 0 !important; color: #333 !important; font-size: 0.95rem !important; font-weight: 700 !important; }
        .precio { color: #d946ef !important; font-weight: 700 !important; font-size: 1rem !important; margin: 0.3rem 0 !important; background: #fdf4ff !important; display: inline-block !important; padding: 0.2rem 0.8rem !important; border-radius: 20px !important; }
        .badge-mas-vendido { background: #ffd700 !important; color: #333 !important; padding: 0.15rem 0.5rem !important; border-radius: 12px !important; font-size: 0.7rem !important; font-weight: 700 !important; display: inline-block !important; margin-bottom: 0.2rem !important; }
        .btn-pedido { display: block !important; background: linear-gradient(135deg, #f472b6, #fb923c) !important; color: white !important; text-align: center !important; padding: 0.6rem !important; border-radius: 50px !important; text-decoration: none !important; font-weight: 600 !important; margin-top: auto !important; transition: all 0.3s !important; font-size: 0.85rem !important; box-shadow: 0 3px 10px rgba(244, 114, 182, 0.3) !important; }
        .btn-pedido:hover { background: linear-gradient(135deg, #ec4899, #f97316) !important; transform: translateY(-2px) !important; }

        .sin-productos { text-align: center !important; padding: 3rem !important; color: #999 !important; font-size: 1.2rem !important; }

        @media (max-width: 1200px) { .contenedor-productos { grid-template-columns: repeat(4, 1fr) !important; } }
        @media (max-width: 900px) { .contenedor-productos { grid-template-columns: repeat(3, 1fr) !important; } .navegacion { gap: 0.6rem !important; } .nav-link { font-size: 0.8rem !important; } }
        @media (max-width: 600px) { .contenedor-productos { grid-template-columns: repeat(2, 1fr) !important; } .logo-titulo { font-size: 1.4rem !important; } .navegacion { flex-wrap: wrap !important; gap: 0.5rem !important; justify-content: center !important; } }
    </style>
</head>
<body>

    <jsp:include page="header.jsp" />

    <div class="tienda-container">
        <a href="index.jsp" class="btn-volver">← Volver al inicio</a>
        <h1 class="titulo-tienda">Tienda</h1>
        <p class="subtitulo-tienda">Todo nuestro menú, organizado por categoría.</p>
        
        <div class="categorias-filtro">
            <a href="lista-productos.jsp" class="btn-categoria <%= categoriaParam == null || categoriaParam.isEmpty() ? "activa" : "" %>"><span>🍨</span> Todos</a>
            <a href="lista-productos.jsp?categoria=1" class="btn-categoria <%= "1".equals(categoriaParam) ? "activa" : "" %>"><span>🍧</span> Cholados</a>
            <a href="lista-productos.jsp?categoria=2" class="btn-categoria <%= "2".equals(categoriaParam) ? "activa" : "" %>"><span>🍦</span> Conos</a>
            <a href="lista-productos.jsp?categoria=3" class="btn-categoria <%= "3".equals(categoriaParam) ? "activa" : "" %>"><span>🥤</span> Limonadas</a>
            <a href="lista-productos.jsp?categoria=4" class="btn-categoria <%= "4".equals(categoriaParam) ? "activa" : "" %>"><span>🧇</span> Obleas</a>
            <a href="lista-productos.jsp?categoria=5" class="btn-categoria <%= "5".equals(categoriaParam) ? "activa" : "" %>"><span>🍰</span> Postres</a>
            <a href="lista-productos.jsp?categoria=6" class="btn-categoria <%= "6".equals(categoriaParam) ? "activa" : "" %>"><span>🧊</span> Raspados</a>
            <a href="lista-productos.jsp?categoria=7" class="btn-categoria <%= "7".equals(categoriaParam) ? "activa" : "" %>"><span>🥪</span> Comidas</a>
            <a href="lista-productos.jsp?categoria=8" class="btn-categoria <%= "8".equals(categoriaParam) ? "activa" : "" %>"><span>☕</span> Bebidas</a>
        </div>
        
        <% if (productos.isEmpty()) { %>
            <div class="sin-productos">
                <p style="font-size: 3rem;">🔍</p>
                <p>No hay productos en esta categoría</p>
            </div>
        <% } else { %>
            <div class="contenedor-productos">
                <% for (Producto p : productos) { %>
                    <div class="tarjeta-producto">
                        <div class="producto-imagen">
                            <% 
                                String imagen = p.getImagen();
                                if (imagen != null && !imagen.isEmpty()) {
                                    String rutaImagen = imagen;
                                    if (!rutaImagen.toLowerCase().endsWith(".png")) {
                                        rutaImagen = rutaImagen.replaceAll("\\.(jpg|jpeg|gif|webp)$", "") + ".png";
                                    }
                                    if (!rutaImagen.startsWith("imagenes/")) {
                                        rutaImagen = "imagenes/" + rutaImagen;
                                    }
                            %>
                                <img src="<%= rutaImagen %>" alt="<%= p.getNombre() %>" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:4rem;\\'>🍧</span>';">
                            <% } else { %>
                                <span style="font-size: 4rem;">🍧</span>
                            <% } %>
                        </div>
                        <div class="producto-info">
                            <% if (p.isFavoritoSemana()) { %><span class="badge-mas-vendido">⭐ Más vendido</span><% } %>
                            <h3><%= p.getNombre() %></h3>
                            <p class="precio">$<%= String.format("%,.0f", p.getPrecio()) %></p>
                            <a href="CarritoServlet?accion=agregar&id=<%= p.getIdProducto() %>" class="btn-pedido">Agregar al carrito</a>
                        </div>
                    </div>
                <% } %>
            </div>
        <% } %>
    </div>

    <jsp:include page="footer.jsp" />

</body>
</html>
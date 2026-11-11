<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.mryisstiv.dao.ProductoDAO"%>
<%@ page import="com.mryisstiv.dao.impl.ProductoDAOImpl"%>
<%@ page import="com.mryisstiv.modelo.Producto"%>
<%@ page import="com.mryisstiv.modelo.Usuario"%>
<%@ page import="java.util.List"%>

<%
    ProductoDAO productoDAO = new ProductoDAOImpl();
    List<Producto> productos = productoDAO.selectAll();
    
    Usuario usuario = (Usuario) session.getAttribute("usuario");
    String nombreUsuario = "";
    boolean isLoggedIn = false;
    
    if (usuario != null) {
        isLoggedIn = true;
        nombreUsuario = usuario.getNombre();
    }
%>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MR YISSTIV cholados - Heladeria y Cholados</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&family=Pacifico&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css">
<style>
* { box-sizing: border-box !important; }
body { overflow-x: hidden !important; margin: 0 !important; padding: 0 !important; font-family: 'Poppins', sans-serif !important; background: #fdf4ff !important; }

.header-principal { background: linear-gradient(90deg, #d946ef 0%, #a855f7 30%, #38bdf8 70%, #22d3ee 100%) !important; padding: 0.6rem 1.5rem !important; display: flex !important; align-items: center !important; justify-content: space-between !important; position: sticky !important; top: 0 !important; z-index: 1000 !important; transition: transform 0.35s ease !important; box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important; height: 70px !important; }
.header-oculto { transform: translateY(-100%) !important; }
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

section { padding: 2rem 2rem !important; max-width: 1300px !important; margin: 0 auto !important; }

.hero { min-height: 280px !important; max-height: 320px !important; height: 35vh !important; background: linear-gradient(to bottom, rgba(20, 0, 26, 0.78), rgba(20, 0, 26, 0.62)), url('imagenes/3cholao.jpg') center center / cover no-repeat !important; background-color: #1a0022 !important; display: flex !important; align-items: center !important; justify-content: center !important; text-align: center !important; color: white !important; }
.hero-contenido { max-width: 700px !important; padding: 1.5rem !important; }
.hero-titulo { font-size: 1.8rem !important; margin-bottom: 0.6rem !important; line-height: 1.2 !important; }
.hero-titulo-marca { color: #ffd700 !important; font-family: 'Pacifico', cursive !important; }
.hero-descripcion { font-size: 1rem !important; margin-bottom: 1rem !important; }
.hero-botones { display: flex !important; gap: 1rem !important; justify-content: center !important; flex-wrap: wrap !important; }
.btn-hero { background: #ff00ff !important; color: white !important; padding: 0.7rem 1.3rem !important; border-radius: 25px !important; text-decoration: none !important; font-weight: 700 !important; font-size: 0.95rem !important; }
.btn-hero-secundario { background: transparent !important; border: 2px solid white !important; }
.hero-insignias { display: flex !important; gap: 1.5rem !important; justify-content: center !important; margin-top: 1rem !important; font-size: 0.85rem !important; }

.selector-categorias { max-width: 1100px !important; margin: 2rem auto !important; padding: 0 2rem !important; }
.antojo-wrapper { background: linear-gradient(135deg, #fdf4ff 0%, #fce7f3 50%, #f3e8ff 100%) !important; border-radius: 30px !important; padding: 2.5rem !important; position: relative !important; overflow: hidden !important; box-shadow: 0 10px 40px rgba(217, 70, 239, 0.1) !important; }
.antojo-wrapper::before { content: '' !important; position: absolute !important; top: -50px !important; right: -50px !important; width: 200px !important; height: 200px !important; background: radial-gradient(circle, rgba(217, 70, 239, 0.1) 0%, transparent 70%) !important; border-radius: 50% !important; }
.antojo-header { text-align: center !important; margin-bottom: 2rem !important; position: relative !important; z-index: 1 !important; }
.antojo-header .titulo-seccion { font-size: 2.5rem !important; color: #d946ef !important; font-weight: 900 !important; margin-bottom: 0.5rem !important; display: inline-block !important; }
.antojo-header .titulo-seccion::after { content: '' !important; position: absolute !important; bottom: -8px !important; left: 50% !important; transform: translateX(-50%) !important; width: 80px !important; height: 4px !important; background: linear-gradient(90deg, #d946ef, #a855f7, #38bdf8) !important; border-radius: 2px !important; }
.badge-nuevo { display: inline-block !important; background: linear-gradient(135deg, #ffd700, #ff8c00) !important; color: white !important; padding: 0.3rem 0.8rem !important; border-radius: 20px !important; font-size: 0.75rem !important; font-weight: 700 !important; margin-left: 0.5rem !important; vertical-align: middle !important; box-shadow: 0 2px 8px rgba(255, 140, 0, 0.3) !important; }
.selector-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 2rem !important; align-items: center !important; position: relative !important; z-index: 1 !important; }
.selector-info { text-align: left !important; }
.promo-container { text-align: center !important; margin-bottom: 1.2rem !important; }
.promo-text { background: linear-gradient(135deg, #ff6b9d, #ff8c42, #ffd700) !important; color: white !important; padding: 0.7rem 1.5rem !important; border-radius: 50px !important; font-size: 0.9rem !important; font-weight: 700 !important; display: inline-flex !important; align-items: center !important; gap: 0.5rem !important; box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4) !important; animation: pulsePromo 2s ease-in-out infinite !important; }
@keyframes pulsePromo { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
.lista-categorias-visual { list-style: none !important; padding: 0 !important; margin: 0 0 1rem 0 !important; display: flex !important; flex-direction: column !important; gap: 0.6rem !important; }
.cat-visual { display: flex !important; align-items: center !important; justify-content: center !important; gap: 0.5rem !important; padding: 0.9rem 1.3rem !important; font-size: 0.9rem !important; font-weight: 700 !important; color: #4a0e4e !important; background: rgba(255, 255, 255, 0.35) !important; backdrop-filter: blur(15px) !important; -webkit-backdrop-filter: blur(15px) !important; cursor: pointer !important; border-radius: 50px !important; border: 2px solid rgba(255, 255, 255, 0.6) !important; box-shadow: 0 4px 20px rgba(217, 70, 239, 0.15), inset 0 0 15px rgba(255, 255, 255, 0.4) !important; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important; white-space: nowrap !important; position: relative !important; overflow: hidden !important; width: 100% !important; max-width: 300px !important; margin: 0 auto !important; }
.cat-visual::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; background: linear-gradient(135deg, #d946ef, #a855f7, #fb923c, #ffd700) !important; background-size: 300% 300% !important; opacity: 0 !important; z-index: -1 !important; transition: opacity 0.4s ease !important; animation: auroraFlow 6s ease infinite !important; }
@keyframes auroraFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
.cat-visual:hover { transform: translateY(-3px) scale(1.05) !important; color: white !important; border-color: rgba(255, 255, 255, 0.9) !important; box-shadow: 0 8px 25px rgba(217, 70, 239, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.3) !important; }
.cat-visual:hover::before { opacity: 1 !important; }
.cat-visual.activa { background: linear-gradient(135deg, #d946ef, #a855f7, #fb923c, #ffd700) !important; background-size: 300% 300% !important; color: white !important; border-color: rgba(255, 255, 255, 0.9) !important; box-shadow: 0 8px 25px rgba(217, 70, 239, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.3) !important; animation: auroraFlow 6s ease infinite !important; }
.cat-visual.activa::before { opacity: 1 !important; }
.cat-visual-icono { font-size: 1.2rem !important; }
.cat-count { background: rgba(217, 70, 239, 0.15) !important; color: #d946ef !important; padding: 0.15rem 0.5rem !important; border-radius: 10px !important; font-size: 0.75rem !important; font-weight: 700 !important; margin-left: 0.3rem !important; }
.cat-visual.activa .cat-count { background: rgba(255, 255, 255, 0.25) !important; color: white !important; }
.selector-imagen-centro { width: 100% !important; max-width: 320px !important; margin: 0 auto !important; border-radius: 24px !important; overflow: visible !important; position: relative !important; background: white !important; padding: 10px !important; box-shadow: 0 15px 40px rgba(168, 85, 247, 0.25), 0 0 0 4px #ffd700, 0 0 0 8px #ff6b9d, 0 0 0 12px #a855f7 !important; animation: marcoFlotante 3s ease-in-out infinite !important; }
@keyframes marcoFlotante { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(1deg); } }
.selector-imagen-centro:hover { transform: scale(1.03) rotate(-1deg) !important; animation: none !important; }
.selector-imagen-centro::before { content: '⭐' !important; position: absolute !important; top: -15px !important; left: -15px !important; font-size: 2rem !important; z-index: 3 !important; animation: girarEstrella 4s linear infinite !important; }
@keyframes girarEstrella { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.2); } 100% { transform: rotate(360deg) scale(1); } }
.selector-imagen-centro::after { content: '💖' !important; position: absolute !important; bottom: -15px !important; right: -15px !important; font-size: 2rem !important; z-index: 3 !important; animation: latido 1.5s ease-in-out infinite !important; }
@keyframes latido { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.3); } }
.selector-imagen-centro img { width: 100% !important; height: auto !important; max-height: 300px !important; object-fit: contain !important; display: block !important; border-radius: 16px !important; }
.imagen-badge { position: absolute !important; top: -10px !important; right: 20px !important; background: linear-gradient(135deg, #ff6b9d, #ff8c42) !important; color: white !important; padding: 0.5rem 1rem !important; border-radius: 25px !important; font-size: 0.8rem !important; font-weight: 700 !important; z-index: 4 !important; box-shadow: 0 4px 12px rgba(255, 107, 157, 0.5) !important; display: flex !important; align-items: center !important; gap: 0.3rem !important; animation: bounceBadge 2s ease-in-out infinite !important; }
@keyframes bounceBadge { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }

.categorias-filtro { display: flex !important; flex-wrap: nowrap !important; gap: 0.5rem !important; justify-content: center !important; align-items: center !important; margin-bottom: 2rem !important; padding: 0.5rem !important; overflow-x: auto !important; scrollbar-width: none !important; -webkit-overflow-scrolling: touch !important; }
.categorias-filtro::-webkit-scrollbar { display: none !important; }
.btn-categoria { position: relative !important; background: rgba(255, 255, 255, 0.35) !important; backdrop-filter: blur(15px) !important; -webkit-backdrop-filter: blur(15px) !important; border: 2px solid rgba(255, 255, 255, 0.6) !important; border-radius: 50px !important; padding: 0.5rem 0.9rem !important; color: #4a0e4e !important; font-weight: 700 !important; font-size: 0.75rem !important; text-decoration: none !important; white-space: nowrap !important; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important; box-shadow: 0 4px 20px rgba(217, 70, 239, 0.15), inset 0 0 15px rgba(255, 255, 255, 0.4) !important; display: inline-flex !important; align-items: center !important; gap: 0.3rem !important; flex-shrink: 0 !important; overflow: hidden !important; }
.btn-categoria::before { content: '' !important; position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; background: linear-gradient(135deg, #d946ef, #a855f7, #fb923c, #ffd700) !important; background-size: 300% 300% !important; opacity: 0 !important; z-index: -1 !important; transition: opacity 0.4s ease !important; animation: auroraFlow 6s ease infinite !important; }
.btn-categoria:hover, .btn-categoria.activa { color: white !important; border-color: rgba(255, 255, 255, 0.9) !important; transform: translateY(-2px) scale(1.05) !important; box-shadow: 0 8px 25px rgba(217, 70, 239, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.3) !important; }
.btn-categoria:hover::before, .btn-categoria.activa::before { opacity: 1 !important; }
.btn-categoria span { font-size: 0.9rem !important; }

.seccion-destacados { background: linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #fef3c7 100%) !important; padding: 1.5rem 1rem !important; position: relative !important; overflow: hidden !important; border-radius: 20px !important; margin: 1rem auto !important; max-width: 1300px !important; }
.seccion-destacados::before { content: '🍦' !important; position: absolute !important; font-size: 2rem !important; opacity: 0.15 !important; animation: floatIceCream 8s ease-in-out infinite !important; top: 5% !important; left: 3% !important; }
.seccion-destacados::after { content: '🍦' !important; position: absolute !important; font-size: 1.8rem !important; opacity: 0.15 !important; animation: floatIceCream 10s ease-in-out infinite !important; top: 50% !important; right: 3% !important; }
@keyframes floatIceCream { 0%, 100% { transform: translateY(0) rotate(-5deg); } 50% { transform: translateY(-15px) rotate(5deg); } }
.sparkle { position: absolute !important; font-size: 1rem !important; opacity: 0.3 !important; animation: sparkle 3s ease-in-out infinite !important; }
@keyframes sparkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.2); } }
.titulo-mas-pedido { font-family: 'Pacifico', cursive !important; font-size: 1.8rem !important; color: #86198f !important; text-align: center !important; margin-bottom: 1rem !important; position: relative !important; text-shadow: 2px 2px 0px rgba(236, 72, 153, 0.3) !important; }
.titulo-mas-pedido::after { content: '' !important; position: absolute !important; bottom: -5px !important; left: 50% !important; transform: translateX(-50%) !important; width: 120px !important; height: 4px !important; background: linear-gradient(90deg, #ec4899, #d946ef) !important; border-radius: 10px !important; }
.grid-mas-pedido { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 1rem !important; max-width: 900px !important; margin: 0 auto !important; position: relative !important; z-index: 1 !important; }
.tarjeta-mas-pedido { background: white !important; border-radius: 16px !important; padding: 0.8rem !important; box-shadow: 0 6px 20px rgba(236, 72, 153, 0.15) !important; transition: all 0.3s ease !important; position: relative !important; overflow: hidden !important; border: 2px solid transparent !important; }
.tarjeta-mas-pedido:hover { transform: translateY(-5px) !important; box-shadow: 0 10px 30px rgba(236, 72, 153, 0.25) !important; }
.tarjeta-mas-pedido.destacada { border-color: #fbbf24 !important; box-shadow: 0 6px 20px rgba(251, 191, 36, 0.25) !important; }
.ribbon { position: absolute !important; top: 8px !important; left: -3px !important; width: 40px !important; height: 40px !important; clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%) !important; display: flex !important; align-items: center !important; justify-content: center !important; font-size: 1rem !important; z-index: 2 !important; }
.ribbon.cyan { background: linear-gradient(135deg, #22d3ee, #06b6d4) !important; }
.ribbon.pink { background: linear-gradient(135deg, #ec4899, #db2777) !important; }
.ribbon.yellow { background: linear-gradient(135deg, #fbbf24, #f59e0b) !important; }
.ribbon.star { position: absolute !important; top: -10px !important; left: 50% !important; transform: translateX(-50%) !important; font-size: 1.5rem !important; z-index: 3 !important; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)) !important; }
.producto-imagen-mas-pedido { height: 120px !important; display: flex !important; align-items: center !important; justify-content: center !important; margin-bottom: 0.5rem !important; border-radius: 12px !important; background: linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%) !important; }
.producto-imagen-mas-pedido img { max-width: 100% !important; max-height: 100% !important; object-fit: contain !important; }
.producto-info-mas-pedido h3 { font-size: 1rem !important; font-weight: 700 !important; color: #581c87 !important; margin: 0.3rem 0 !important; text-align: center !important; }
.estrellas { display: flex !important; justify-content: center !important; gap: 0.1rem !important; margin: 0.3rem 0 !important; }
.estrella { color: #fbbf24 !important; font-size: 0.85rem !important; }
.precio-y-botones { display: flex !important; align-items: center !important; justify-content: space-between !important; gap: 0.5rem !important; margin-top: 0.5rem !important; }
.precio-badge { background: linear-gradient(135deg, #fbbf24, #f59e0b) !important; color: white !important; padding: 0.3rem 0.8rem !important; border-radius: 10px !important; font-weight: 700 !important; font-size: 0.9rem !important; box-shadow: 0 2px 8px rgba(251, 191, 36, 0.3) !important; white-space: nowrap !important; }
.btn-pedir-ahora { flex: 1 !important; background: linear-gradient(135deg, #ec4899, #f97316) !important; color: white !important; border: none !important; padding: 0.5rem 0.8rem !important; border-radius: 50px !important; font-weight: 700 !important; font-size: 0.8rem !important; cursor: pointer !important; display: flex !important; align-items: center !important; justify-content: center !important; gap: 0.3rem !important; box-shadow: 0 2px 10px rgba(236, 72, 153, 0.3) !important; transition: all 0.3s ease !important; text-decoration: none !important; }
.btn-pedir-ahora:hover { transform: translateY(-2px) !important; box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4) !important; }
.btn-pedir-ahora .icono-bolsa { font-size: 0.9rem !important; }

.seccion-catalogo { background: #fdf4ff !important; padding-top: 2rem !important; }
.seccion-catalogo .titulo-seccion { font-size: 2.5rem !important; color: #d946ef !important; font-weight: 900 !important; text-align: center !important; margin-bottom: 0.3rem !important; }
.seccion-catalogo .descripcion-seccion { text-align: center !important; color: #666 !important; margin-bottom: 1.5rem !important; font-size: 1rem !important; }
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

.seccion-reservas { background: linear-gradient(135deg, #e8d5f5 0%, #d4b8e8 50%, #c9a0dc 100%) !important; border-radius: 30px !important; margin: 2rem auto !important; padding: 2rem !important; box-shadow: inset 0 0 60px rgba(217, 70, 239, 0.1) !important; }
.reservas-header { text-align: center !important; margin-bottom: 1.5rem !important; }
.reservas-header .titulo-seccion { font-size: 2rem !important; color: #6b21a8 !important; font-weight: 900 !important; margin-bottom: 0.3rem !important; }
.reservas-header p { color: #4a1d6b !important; font-size: 0.95rem !important; max-width: 600px !important; margin: 0 auto !important; }
.formulario-column { background: linear-gradient(135deg, #fdf4ff 0%, #fce7f3 100%) !important; padding: 1.5rem !important; border-radius: 20px !important; box-shadow: 0 10px 40px rgba(217, 70, 239, 0.25) !important; border: 2px solid rgba(217, 70, 239, 0.2) !important; max-width: 700px !important; margin: 0 auto !important; }
.formulario-column h3 { color: #d946ef !important; font-size: 1.3rem !important; margin: 0 0 0.2rem 0 !important; text-align: center !important; }
.formulario-column > p { color: #666 !important; font-size: 0.85rem !important; text-align: center !important; margin-bottom: 1rem !important; }
.formulario-reserva { display: flex !important; flex-direction: column !important; gap: 0.8rem !important; }
.fila-doble-reserva { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 0.8rem !important; }
.campo-reserva label { display: block !important; font-weight: 600 !important; color: #d946ef !important; font-size: 0.8rem !important; margin-bottom: 0.2rem !important; }
.campo-reserva input, .campo-reserva select, .campo-reserva textarea { width: 100% !important; padding: 0.6rem !important; border: 2px solid #f0e6ff !important; border-radius: 10px !important; font-family: 'Poppins' !important; font-size: 0.85rem !important; background: white !important; box-sizing: border-box !important; transition: all 0.3s !important; }
.campo-reserva input:focus, .campo-reserva select:focus, .campo-reserva textarea:focus { outline: none !important; border-color: #d946ef !important; box-shadow: 0 0 0 3px rgba(217, 70, 239, 0.1) !important; }
.campo-reserva textarea { resize: vertical !important; min-height: 60px !important; }
.btn-confirmar { background: linear-gradient(135deg, #d946ef, #a855f7) !important; color: white !important; border: none !important; padding: 0.8rem !important; border-radius: 50px !important; font-weight: 700 !important; font-size: 0.95rem !important; cursor: pointer !important; font-family: 'Poppins' !important; margin-top: 0.3rem !important; box-shadow: 0 6px 20px rgba(217, 70, 239, 0.4) !important; transition: all 0.3s !important; width: 100% !important; }
.btn-confirmar:hover { transform: translateY(-3px) !important; box-shadow: 0 10px 30px rgba(217, 70, 239, 0.5) !important; }
.nota-confirmacion { text-align: center !important; color: #999 !important; font-size: 0.75rem !important; margin: 0 !important; }
.info-mapa-container { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 1.5rem !important; margin-top: 2rem !important; align-items: start !important; }
.info-cards-compact { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 0.8rem !important; }
.info-card-compact { background: white !important; padding: 0.8rem !important; border-radius: 10px !important; box-shadow: 0 4px 15px rgba(217, 70, 239, 0.15) !important; border-left: 3px solid #d946ef !important; display: flex !important; align-items: flex-start !important; gap: 0.6rem !important; transition: transform 0.3s !important; }
.info-card-compact:hover { transform: translateY(-3px) !important; box-shadow: 0 6px 20px rgba(217, 70, 239, 0.25) !important; }
.icono-compact { font-size: 1.5rem !important; line-height: 1 !important; }
.info-card-compact h4 { margin: 0 0 0.2rem 0 !important; color: #d946ef !important; font-size: 0.85rem !important; font-weight: 700 !important; }
.info-card-compact p { margin: 0 !important; color: #555 !important; font-size: 0.75rem !important; line-height: 1.3 !important; }
.mapa-container-compact { border-radius: 14px !important; overflow: hidden !important; box-shadow: 0 10px 30px rgba(168, 85, 247, 0.25) !important; border: 3px solid white !important; }
.mapa-container-compact iframe { width: 100% !important; height: 250px !important; border: 0 !important; display: block !important; }
.mapa-note { text-align: center !important; color: #6b21a8 !important; font-size: 0.75rem !important; margin-top: 0.3rem !important; font-style: italic !important; }

.seccion-club-puntos { background: linear-gradient(135deg, #fff0ff, #f0ffff) !important; border-radius: 16px !important; margin: 2rem auto !important; padding: 1.2rem !important; }
.seccion-club-puntos .titulo-seccion { font-size: 1.3rem !important; margin-bottom: 0.1rem !important; }
.seccion-club-puntos .descripcion-seccion { font-size: 0.75rem !important; margin-bottom: 0.8rem !important; }
.niveles-grid { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 0.6rem !important; max-width: 650px !important; margin: 0 auto !important; }
.nivel-flip { padding: 0.8rem 0.5rem !important; border-radius: 10px !important; text-align: center !important; color: white !important; transition: transform 0.3s !important; min-height: auto !important; height: auto !important; }
.nivel-flip:hover { transform: translateY(-2px) !important; }
.nivel-icono { font-size: 1.3rem !important; margin-bottom: 0.1rem !important; }
.nivel-flip h4 { margin: 0.1rem 0 !important; font-size: 0.9rem !important; }
.nivel-flip p { margin: 0.05rem 0 !important; font-size: 0.7rem !important; }
.nivel-beneficio { font-weight: 700 !important; font-size: 0.75rem !important; margin-top: 0.2rem !important; }
.bronce { background: linear-gradient(135deg, #cd7f32, #8b4513) !important; }
.plata { background: linear-gradient(135deg, #c0c0c0, #808080) !important; }
.oro { background: linear-gradient(135deg, #ffd700, #ff8c00) !important; }

.footer { background: #1a0022 !important; color: white !important; padding: 2.5rem 2rem 1rem !important; margin-top: 3rem !important; }
.footer-contenido { display: grid !important; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)) !important; gap: 2rem !important; max-width: 1200px !important; margin: 0 auto !important; }
.footer h3 { font-family: 'Pacifico', cursive !important; color: #d946ef !important; font-size: 1.5rem !important; margin-bottom: 0.8rem !important; }
.footer h4 { color: #ffd700 !important; margin-bottom: 0.8rem !important; }
.footer p { margin: 0.3rem 0 !important; font-size: 0.9rem !important; }
.footer-bottom { text-align: center !important; margin-top: 2rem !important; padding-top: 1rem !important; border-top: 1px solid rgba(255,255,255,0.1) !important; font-size: 0.85rem !important; }

@media (max-width: 1200px) { .contenedor-productos { grid-template-columns: repeat(4, 1fr) !important; } }
@media (max-width: 900px) { .contenedor-productos { grid-template-columns: repeat(3, 1fr) !important; } .selector-grid { grid-template-columns: 1fr !important; } .info-cards-compact { grid-template-columns: 1fr !important; } .fila-doble-reserva { grid-template-columns: 1fr !important; } .niveles-grid { grid-template-columns: 1fr !important; } .info-mapa-container { grid-template-columns: 1fr !important; } .navegacion { gap: 0.6rem !important; } .nav-link { font-size: 0.8rem !important; } .grid-mas-pedido { grid-template-columns: 1fr !important; } }
@media (max-width: 600px) { .contenedor-productos { grid-template-columns: repeat(2, 1fr) !important; } .logo-titulo { font-size: 1.4rem !important; } .navegacion { flex-wrap: wrap !important; gap: 0.5rem !important; justify-content: center !important; } .hero-titulo { font-size: 1.4rem !important; } .header-principal { padding: 0.5rem 1rem !important; } .titulo-mas-pedido { font-size: 1.5rem !important; } }
</style>
</head>
<body>

<jsp:include page="header.jsp" />

<section class="hero">
    <div class="hero-contenido">
        <h1 class="hero-titulo">Bienvenido a <span class="hero-titulo-marca">MR YISSTIV cholados</span>!</h1>
        <p class="hero-descripcion">Fruta de verdad, mucho sabor y el toque artesanal de siempre.</p>
        <div class="hero-botones">
            <a href="#tienda" class="btn-hero">Ver Menu</a>
            <a href="https://wa.me/573005366095?text=Hola!%20Quiero%20hacer%20un%20pedido" class="btn-hero btn-hero-secundario">Pedir por WhatsApp</a>
        </div>
        <div class="hero-insignias">
            <span>4.9 en resenas</span>
            <span>Domicilios el mismo dia</span>
            <span>Ibague - Tolima</span>
        </div>
    </div>
</section>

<section class="selector-categorias">
    <div class="antojo-wrapper">
        <div class="antojo-header">
            <h2 class="titulo-seccion">Encuentra tu antojo <span class="badge-nuevo">NUEVO</span></h2>
            <p class="descripcion-seccion">Desde cholados cargados de fruta hasta postres para compartir: elige una categoria y descubre por que somos el antojo favorito de Ibague.</p>
        </div>
        <div class="selector-grid">
            <div class="selector-info">
                <div class="promo-container">
                    <div class="promo-text"><span class="promo-icon">🎉</span><span>Mas de 25 sabores para elegir!</span></div>
                </div>
                <ul class="lista-categorias-visual">
                    <li class="cat-visual activa" onclick="cambiarCategoria(0)"><span class="cat-visual-icono">🍨</span><span>Cholados</span><span class="cat-count">8</span></li>
                    <li class="cat-visual" onclick="cambiarCategoria(1)"><span class="cat-visual-icono">🍦</span><span>Conos y helados</span><span class="cat-count">5</span></li>
                    <li class="cat-visual" onclick="cambiarCategoria(2)"><span class="cat-visual-icono">🍰</span><span>Postres y raspados</span><span class="cat-count">7</span></li>
                    <li class="cat-visual" onclick="cambiarCategoria(3)"><span class="cat-visual-icono">☕</span><span>Bebidas y comidas</span><span class="cat-count">6</span></li>
                </ul>
            </div>
            <div class="selector-imagen-centro">
                <div class="imagen-badge"><span>⭐</span><span>Mas pedido</span></div>
                <img src="imagenes/31antojo.png" alt="Cholado MR YISSTIV" id="imagenCategoria">
            </div>
        </div>
    </div>
</section>

<section class="seccion-destacados">
    <span class="sparkle" style="top: 20%; left: 15%;">✨</span>
    <span class="sparkle" style="top: 40%; right: 10%;">⭐</span>
    <span class="sparkle" style="bottom: 30%; left: 10%;">✨</span>
    <span class="sparkle" style="top: 15%; right: 20%;">⭐</span>
    <span class="sparkle" style="bottom: 20%; right: 15%;">✨</span>
    <h2 class="titulo-mas-pedido">Lo mas pedido</h2>
    <div class="grid-mas-pedido">
        <div class="tarjeta-mas-pedido destacada">
            <div class="ribbon cyan">⭐</div>
            <span class="ribbon star">👑</span>
            <div class="producto-imagen-mas-pedido"><span style="font-size: 5rem;">🍧</span></div>
            <div class="producto-info-mas-pedido">
                <h3>Yisstiv Cholao</h3>
                <div class="estrellas"><span class="estrella">⭐</span><span class="estrella">⭐</span><span class="estrella">⭐</span><span class="estrella">⭐</span><span class="estrella">⭐</span></div>
                <div class="precio-y-botones">
                    <span class="precio-badge">$10.000</span>
                    <a href="CarritoServlet?accion=agregar&id=1" class="btn-pedir-ahora"><span>Pedir</span><span class="icono-bolsa">🛍️</span></a>
                </div>
            </div>
        </div>
        <div class="tarjeta-mas-pedido">
            <div class="ribbon pink">🔥</div>
            <div class="producto-imagen-mas-pedido"><span style="font-size: 5rem;">🍦</span></div>
            <div class="producto-info-mas-pedido">
                <h3>Cono Volteado</h3>
                <div class="estrellas"><span class="estrella">⭐</span><span class="estrella">⭐</span><span class="estrella">⭐</span><span class="estrella">⭐</span><span class="estrella">⭐</span></div>
                <div class="precio-y-botones">
                    <span class="precio-badge">$10.000</span>
                    <a href="CarritoServlet?accion=agregar&id=10" class="btn-pedir-ahora"><span>Pedir</span><span class="icono-bolsa">🛍️</span></a>
                </div>
            </div>
        </div>
        <div class="tarjeta-mas-pedido">
            <div class="ribbon yellow">🍌</div>
            <div class="producto-imagen-mas-pedido"><span style="font-size: 5rem;">🍌</span></div>
            <div class="producto-info-mas-pedido">
                <h3>Banana Split</h3>
                <div class="estrellas"><span class="estrella">⭐</span><span class="estrella">⭐</span><span class="estrella">⭐</span><span class="estrella">⭐</span><span class="estrella">⭐</span></div>
                <div class="precio-y-botones">
                    <span class="precio-badge">$13.000</span>
                    <a href="CarritoServlet?accion=agregar&id=9" class="btn-pedir-ahora"><span>Pedir</span><span class="icono-bolsa">🛍️</span></a>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="tienda" class="seccion-catalogo">
    <h2 class="titulo-seccion">Tienda</h2>
    <p class="descripcion-seccion">Todo nuestro menu, organizado por categoria.</p>
    <div class="categorias-filtro">
        <a href="lista-productos.jsp" class="btn-categoria activa"><span>🍨</span> Todos</a>
        <a href="lista-productos.jsp?categoria=1" class="btn-categoria"><span>🍧</span> Cholados</a>
        <a href="lista-productos.jsp?categoria=2" class="btn-categoria"><span>🍦</span> Conos</a>
        <a href="lista-productos.jsp?categoria=3" class="btn-categoria"><span>🥤</span> Limonadas</a>
        <a href="lista-productos.jsp?categoria=4" class="btn-categoria"><span>🧇</span> Obleas</a>
        <a href="lista-productos.jsp?categoria=5" class="btn-categoria"><span>🍰</span> Postres</a>
        <a href="lista-productos.jsp?categoria=6" class="btn-categoria"><span>🧊</span> Raspados</a>
        <a href="lista-productos.jsp?categoria=7" class="btn-categoria"><span>🥪</span> Comidas</a>
        <a href="lista-productos.jsp?categoria=8" class="btn-categoria"><span>☕</span> Bebidas</a>
    </div>
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
                    <% if (p.isFavoritoSemana()) { %><span class="badge-mas-vendido">Mas vendido</span><% } %>
                    <h3><%= p.getNombre() %></h3>
                    <p class="precio">$<%= String.format("%,.0f", p.getPrecio()) %></p>
                    <a href="CarritoServlet?accion=agregar&id=<%= p.getIdProducto() %>" class="btn-pedido">Agregar al carrito</a>
                </div>
            </div>
        <% } %>
    </div>
</section>

<section id="modulo-reservas" class="seccion-reservas">
    <div class="reservas-header">
        <h2 class="titulo-seccion">Encuentranos</h2>
        <p>Ven a vivir la experiencia MR YISSTIV. Reserva tu mesa con anticipacion.</p>
    </div>
    <div class="formulario-column">
        <h3>Reserva tu Mesa</h3>
        <p>Completa tus datos y te confirmaremos tu reserva</p>
        <% if (isLoggedIn) { %>
            <p style="text-align: center; color: #d946ef; font-weight: 600; margin-bottom: 1rem;">Hola <%= nombreUsuario %>, reserva tu mesa aqui</p>
            <form class="formulario-reserva" action="ReservaServlet" method="POST">
                <div class="fila-doble-reserva">
                    <div class="campo-reserva"><label>Fecha de Visita:</label><input type="date" name="fecha" min="<%= new java.text.SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date()) %>" required></div>
                    <div class="campo-reserva"><label>Hora del Evento:</label><input type="time" name="hora" required></div>
                </div>
                <div class="campo-reserva"><label>Numero de Personas:</label><input type="number" name="personas" min="1" max="20" required placeholder="2"></div>
                <button type="submit" class="btn-confirmar">Confirmar Reserva</button>
                <p class="nota-confirmacion">Te contactaremos para confirmar</p>
            </form>
        <% } else { %>
            <p style="text-align: center; color: #666; padding: 1rem;">Debes <a href="login.html" style="color: #d946ef; font-weight: 700;">iniciar sesion</a> para hacer una reserva.</p>
        <% } %>
    </div>
    <div class="info-mapa-container">
        <div class="info-cards-compact">
            <div class="info-card-compact"><div class="icono-compact">📍</div><div><h4>Direccion</h4><p>Mz 1 casa 18, Praderas de Santa Rita 1a Etapa, Ibague</p></div></div>
            <div class="info-card-compact"><div class="icono-compact">🕐</div><div><h4>Horario</h4><p>Lun-Dom<br>2PM - 12AM</p></div></div>
            <div class="info-card-compact"><div class="icono-compact">📞</div><div><h4>Telefono</h4><p>300 536 6095</p></div></div>
            <div class="info-card-compact"><div class="icono-compact">💬</div><div><h4>WhatsApp</h4><p>300 536 6095</p></div></div>
        </div>
        <div>
            <div class="mapa-container-compact">
                <iframe src="https://maps.google.com/maps?q=Praderas+de+Santa+Rita+1a+Etapa,+Ibague,+Tolima,+Colombia&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <p class="mapa-note">* Mapa de ubicacion</p>
        </div>
    </div>
</section>

<section id="modulo-club-puntos" class="seccion-club-puntos">
    <h2 class="titulo-seccion" style="text-align: center; color: #d946ef;">Club de Puntos</h2>
    <p class="descripcion-seccion" style="text-align: center; color: #666;">Mientras mas compras, mas ahorras!</p>
    <div class="niveles-grid">
        <div class="nivel-flip bronce"><div class="nivel-icono">🥉</div><h4>Bronce</h4><p>0 - 499 pts</p><p class="nivel-beneficio">Sin descuento</p></div>
        <div class="nivel-flip plata"><div class="nivel-icono">🥈</div><h4>Plata</h4><p>500 - 999 pts</p><p class="nivel-beneficio">10% descuento</p></div>
        <div class="nivel-flip oro"><div class="nivel-icono">🥇</div><h4>Oro</h4><p>1000+ pts</p><p class="nivel-beneficio">20% descuento</p></div>
    </div>
    <div style="text-align: center; margin-top: 0.8rem !important;"><a href="puntos.jsp" class="btn-ver-tienda" style="font-size: 0.75rem !important; padding: 0.4rem 1rem !important;">Consultar mis puntos</a></div>
</section>

<jsp:include page="footer.jsp" />

<script>
    let lastScroll = 0;
    const header = document.getElementById('headerPrincipal');
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('header-oculto');
        } else {
            header.classList.remove('header-oculto');
        }
        lastScroll = currentScroll;
    });
    function cambiarCategoria(index) {
        const categorias = document.querySelectorAll('.cat-visual');
        for (let i = 0; i < categorias.length; i++) {
            categorias[i].classList.remove('activa');
        }
        categorias[index].classList.add('activa');
        const imagenes = ['imagenes/31antojo.png', 'imagenes/10conovolteado.png', 'imagenes/19tentaciondeq.png', 'imagenes/26jugos.png'];
        document.getElementById('imagenCategoria').src = imagenes[index];
    }
</script>
<!-- Toast de notificación -->
<div id="toast" style="position:fixed;bottom:30px;right:30px;background:linear-gradient(135deg,#d946ef,#a855f7);color:white;padding:1rem 2rem;border-radius:50px;font-family:'Poppins',sans-serif;font-weight:600;font-size:0.95rem;box-shadow:0 10px 30px rgba(217,70,239,0.4);z-index:9999;opacity:0;transform:translateY(20px);transition:all 0.4s ease;pointer-events:none;">
    ✅ Producto agregado al carrito
</div>

<script>
// Detectar clics en botones "Agregar al carrito" y "Pedir"
document.addEventListener('click', function(e) {
    var target = e.target.closest('.btn-pedido, .btn-pedir-ahora');
    if (target) {
        var toast = document.getElementById('toast');
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
        }, 2500);
    }
});
</script>
</body>
</html>
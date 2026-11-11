<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sabores - MR YISSTIV cholados</title>
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

        .sabores-container { max-width: 1200px !important; margin: 2rem auto !important; padding: 0 2rem !important; }
        .btn-volver { display: inline-block !important; color: #d946ef !important; text-decoration: none !important; font-weight: 600 !important; margin-bottom: 1rem !important; }
        .btn-volver:hover { color: #a855f7 !important; }
        .titulo-sabores { font-size: 2.5rem !important; color: #d946ef !important; text-align: center !important; margin-bottom: 0.5rem !important; }
        .subtitulo-sabores { text-align: center !important; color: #666 !important; margin-bottom: 2rem !important; }
        .buscador-container { display: flex !important; gap: 1rem !important; margin-bottom: 2rem !important; align-items: center !important; }
        .buscador { flex: 1 !important; padding: 0.8rem 1.2rem !important; border: 2px solid #f0e6ff !important; border-radius: 50px !important; font-family: 'Poppins' !important; font-size: 1rem !important; outline: none !important; }
        .buscador:focus { border-color: #d946ef !important; }
        .btn-agregar { background: linear-gradient(135deg, #ec4899, #fb923c) !important; color: white !important; border: none !important; padding: 0.8rem 1.5rem !important; border-radius: 50px !important; font-weight: 700 !important; cursor: pointer !important; font-family: 'Poppins' !important; }
        .grid-sabores { display: grid !important; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important; gap: 1.5rem !important; }
        .sabor-card { background: white !important; border-radius: 16px !important; padding: 1rem !important; text-align: center !important; box-shadow: 0 4px 15px rgba(217, 70, 239, 0.1) !important; transition: transform 0.3s !important; }
        .sabor-card:hover { transform: translateY(-5px) !important; }
        .sabor-icono { width: 80px !important; height: 80px !important; border-radius: 50% !important; margin: 0 auto 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; font-size: 2.5rem !important; }
        .sabor-nombre { font-weight: 700 !important; color: #333 !important; font-size: 0.9rem !important; }

        .footer { background: #1a0022 !important; color: white !important; padding: 2.5rem 2rem 1rem !important; margin-top: 3rem !important; }
        .footer-contenido { display: grid !important; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)) !important; gap: 2rem !important; max-width: 1200px !important; margin: 0 auto !important; }
        .footer h3 { font-family: 'Pacifico', cursive !important; color: #d946ef !important; font-size: 1.5rem !important; margin-bottom: 0.8rem !important; }
        .footer h4 { color: #ffd700 !important; margin-bottom: 0.8rem !important; }
        .footer p { margin: 0.3rem 0 !important; font-size: 0.9rem !important; }
        .footer-bottom { text-align: center !important; margin-top: 2rem !important; padding-top: 1rem !important; border-top: 1px solid rgba(255,255,255,0.1) !important; font-size: 0.85rem !important; }
    </style>
</head>
<body>

    <jsp:include page="header.jsp" />

    <div class="sabores-container">
        <a href="index.jsp" class="btn-volver">← Volver al menú</a>
        <h1 class="titulo-sabores">Sabores</h1>
        <p class="subtitulo-sabores">Todos nuestros sabores de helado, en un solo lugar.</p>
        
        <div class="buscador-container">
            <input type="text" class="buscador" placeholder="Buscar sabor...">
            <button class="btn-agregar">+ Agregar sabor</button>
        </div>

        <div class="grid-sabores">
            <div class="sabor-card"><div class="sabor-icono" style="background: #ff6b9d;">🍓</div><div class="sabor-nombre">Fresa</div></div>
            <div class="sabor-card"><div class="sabor-icono" style="background: #4ecdc4;">🌊</div><div class="sabor-nombre">Menta</div></div>
            <div class="sabor-card"><div class="sabor-icono" style="background: #ffe66d;">🍌</div><div class="sabor-nombre">Banano</div></div>
            <div class="sabor-card"><div class="sabor-icono" style="background: #a8e6cf;">🥝</div><div class="sabor-nombre">Kiwi</div></div>
            <div class="sabor-card"><div class="sabor-icono" style="background: #ff8b94;">🍉</div><div class="sabor-nombre">Sandía</div></div>
            <div class="sabor-card"><div class="sabor-icono" style="background: #c7ceea;">🫐</div><div class="sabor-nombre">Mora</div></div>
        </div>
    </div>

    <jsp:include page="footer.jsp" />

</body>
</html>
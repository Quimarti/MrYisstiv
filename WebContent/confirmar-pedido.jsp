<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String mensajeWA = (String) session.getAttribute("ultimoMensajeWA");
    if (mensajeWA == null) {
        response.sendRedirect("index.jsp");
        return;
    }
    session.removeAttribute("ultimoMensajeWA");
%>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pedido Confirmado - MR YISSTIV</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Pacifico&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #fdf4ff 0%, #fce7f3 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; }
.card { background: white; border-radius: 24px; padding: 3rem; max-width: 500px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(217, 70, 239, 0.2); }
.icono-exito { font-size: 5rem; margin-bottom: 1rem; animation: bounce 1s ease infinite; }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
h1 { color: #d946ef; font-size: 2rem; margin-bottom: 1rem; }
p { color: #666; font-size: 1.1rem; margin-bottom: 1.5rem; line-height: 1.6; }
.btn-wa { display: inline-block; background: #25d366; color: white; padding: 1rem 2rem; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 1.1rem; margin: 0.5rem; transition: all 0.3s; box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3); }
.btn-wa:hover { background: #1da851; transform: translateY(-3px); box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4); }
.btn-volver { display: inline-block; background: #d946ef; color: white; padding: 1rem 2rem; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 1.1rem; margin: 0.5rem; transition: all 0.3s; }
.btn-volver:hover { background: #a855f7; transform: translateY(-3px); }
.info-box { background: #f0fdf4; border: 2px solid #86efac; border-radius: 12px; padding: 1rem; margin: 1.5rem 0; text-align: left; }
.info-box p { margin: 0.3rem 0; font-size: 0.95rem; color: #166534; }
</style>
</head>
<body>
<div class="card">
    <div class="icono-exito">🎉</div>
    <h1>¡Pedido Confirmado!</h1>
    <p>Tu pedido ha sido guardado exitosamente. Ahora envíanos los detalles por WhatsApp para confirmar tu orden.</p>
    
    <div class="info-box">
        <p>✅ <strong>Pedido registrado</strong> en nuestro sistema</p>
        <p>📱 <strong>Haz clic abajo</strong> para enviar los detalles por WhatsApp</p>
        <p>⏰ <strong>Te confirmaremos</strong> en menos de 30 minutos</p>
    </div>
    
    <!-- ✅ Botón universal que funciona en PC y móvil -->
    <a href="<%= mensajeWA %>" class="btn-wa">📱 Enviar por WhatsApp</a>
    <br>
    <a href="index.jsp" class="btn-volver">🏠 Volver al inicio</a>
    
    <p style="font-size: 0.85rem; color: #999; margin-top: 1.5rem;">
        Si no tienes WhatsApp instalado, el botón abrirá WhatsApp Web automáticamente.
    </p>
</div>

<script>
// Auto-redirección a WhatsApp después de 2 segundos
setTimeout(function() {
    window.location.href = "<%= mensajeWA %>";
}, 2000);
</script>
</body>
</html>
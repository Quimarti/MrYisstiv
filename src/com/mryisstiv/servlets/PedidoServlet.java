package com.mryisstiv.servlets;

import com.mryisstiv.dao.impl.PedidoDAOImpl;
import com.mryisstiv.modelo.Carrito;
import com.mryisstiv.modelo.DetalleCarrito;
import com.mryisstiv.modelo.Pedido;
import com.mryisstiv.modelo.Usuario;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/PedidoServlet")
public class PedidoServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final String NUMERO_NEGOCIO = "573005366095";

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        request.setCharacterEncoding("UTF-8");
        HttpSession session = request.getSession();
        Usuario usuario = (Usuario) session.getAttribute("usuario");
        
        if (usuario == null) {
            response.sendRedirect("login.html");
            return;
        }
        
        try {
            // Obtener datos del formulario
            String nombre = request.getParameter("nombre");
            String telefono = request.getParameter("telefono");
            String direccion = request.getParameter("direccion");
            String barrio = request.getParameter("barrio");
            String documento = request.getParameter("documento");
            String metodoPago = request.getParameter("metodoPago");
            String observaciones = request.getParameter("observaciones");
            
            BigDecimal subtotal = new BigDecimal(request.getParameter("subtotal"));
            BigDecimal valorDomicilio = new BigDecimal(request.getParameter("valorDomicilio"));
            BigDecimal total = new BigDecimal(request.getParameter("total"));
            
            // Obtener el carrito para listar los productos
            Carrito carrito = (Carrito) session.getAttribute("carrito");
            List<DetalleCarrito> detalles = (carrito != null) ? carrito.getDetalles() : null;
            
            System.out.println("=== NUEVO PEDIDO ===");
            System.out.println("Cliente: " + nombre);
            System.out.println("Telefono: " + telefono);
            System.out.println("Direccion: " + direccion);
            System.out.println("Barrio: " + barrio);
            System.out.println("Pago: " + metodoPago);
            System.out.println("Subtotal: " + subtotal);
            System.out.println("Domicilio: " + valorDomicilio);
            System.out.println("Total: " + total);
            
            // Combinar info en observaciones para guardar en BD
            String detallesCompletos = "Cliente: " + nombre + 
                " | Tel: " + telefono + 
                " | Direccion: " + direccion + 
                " | Barrio: " + barrio + 
                " | Doc: " + (documento != null ? documento : "N/A") + 
                " | Pago: " + metodoPago;
            
            if (observaciones != null && !observaciones.isEmpty()) {
                detallesCompletos += " | Notas: " + observaciones;
            }
            
            // Crear pedido
            Pedido pedido = new Pedido(
                usuario.getIdUsuario(), 
                1,  // id_direccion (valor por defecto)
                1,  // id_metodo_pago (valor por defecto)
                subtotal, 
                valorDomicilio, 
                total, 
                detallesCompletos
            );
            pedido.setEstado("Pendiente");
            
            // Guardar en BD
            PedidoDAOImpl dao = new PedidoDAOImpl();
            boolean guardado = dao.insert(pedido);
            
            System.out.println("Guardado en BD: " + guardado);
            
            if (guardado) {
                // Construir mensaje BONITO para WhatsApp
                StringBuilder msg = new StringBuilder();
                msg.append("*🍧 NUEVO PEDIDO - MR YISSTIV CHOLADOS*").append("%0A");
                msg.append("%0A");
                msg.append("*👤 Cliente:* ").append(nombre).append("%0A");
                msg.append("*📞 Telefono:* ").append(telefono).append("%0A");
                msg.append("*📍 Direccion:* ").append(direccion).append("%0A");
                msg.append("*🏘️ Barrio:* ").append(barrio).append("%0A");
                msg.append("*💳 Pago:* ").append(metodoPago).append("%0A");
                msg.append("%0A");
                msg.append("*━━━━━━━━━━━━━━━━━━━━━━*").append("%0A");
                msg.append("*🛒 DETALLE DEL PEDIDO:*").append("%0A");
                msg.append("*━━━━━━━━━━━━━━━━━━━━━━*").append("%0A");
                
                if (detalles != null && !detalles.isEmpty()) {
                    for (DetalleCarrito d : detalles) {
                        msg.append("• ").append(d.getProducto().getNombre());
                        msg.append(" x").append(d.getCantidad());
                        msg.append(" = $").append(String.format("%,.0f", d.getSubtotal()));
                        msg.append("%0A");
                    }
                } else {
                    msg.append("(Sin detalle de productos)").append("%0A");
                }
                
                msg.append("%0A");
                msg.append("*━━━━━━━━━━━━━━━━━━━━━━*").append("%0A");
                msg.append("*💰 Subtotal:* $").append(String.format("%,.0f", subtotal)).append("%0A");
                msg.append("*🚚 Domicilio:* $").append(String.format("%,.0f", valorDomicilio)).append("%0A");
                msg.append("* TOTAL:* $").append(String.format("%,.0f", total)).append("%0A");
                
                if (observaciones != null && !observaciones.isEmpty()) {
                    msg.append("%0A");
                    msg.append("*📝 Notas:* ").append(observaciones).append("%0A");
                }
                
                msg.append("%0A");
                msg.append("_Gracias por tu compra! _");
                
                String mensaje = msg.toString();
                
                // Guardar en sesion para redireccion
                session.setAttribute("ultimoMensajeWA", "https://wa.me/" + NUMERO_NEGOCIO + "?text=" + mensaje);
                
                // Redirigir a pagina de confirmacion
                response.sendRedirect("confirmar-pedido.jsp");
            } else {
                // Error al guardar
                response.sendRedirect("tienda.jsp?error=guardar");
            }
            
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("ERROR EN PEDIDO: " + e.getMessage());
            response.sendRedirect("tienda.jsp?error=" + e.getMessage());
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }
}
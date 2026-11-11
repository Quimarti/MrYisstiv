package com.mryisstiv.servlets;

import com.mryisstiv.dao.impl.ReservaDAOImpl;
import com.mryisstiv.modelo.Reserva;
import com.mryisstiv.modelo.Usuario;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/ReservaServlet")
public class ReservaServlet extends HttpServlet {
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
        
        String fecha = request.getParameter("fecha");
        String hora = request.getParameter("hora");
        String personasStr = request.getParameter("personas");
        
        try {
            int personas = Integer.parseInt(personasStr);
            
            Reserva reserva = new Reserva(usuario.getIdUsuario(), fecha, hora, personas);
            ReservaDAOImpl dao = new ReservaDAOImpl();
            boolean guardado = dao.insert(reserva);
            
            if (guardado) {
                String mensaje = "🎉 *NUEVA RESERVA - MR YISSTIV*%0A" +
                    "━━━━━━━━━━━━━━━━━━━━━━%0A" +
                    "👤 *Cliente:* " + usuario.getNombre() + " " + usuario.getApellidos() + "%0A" +
                    "📞 *Teléfono:* " + usuario.getTelefono() + "%0A" +
                    "📧 *Correo:* " + usuario.getCorreo() + "%0A" +
                    "📅 *Fecha:* " + fecha + "%0A" +
                    "⏰ *Hora:* " + hora + "%0A" +
                    "👥 *Personas:* " + personas + "%0A" +
                    "━━━━━━━━━━━━━━━━━━━━━━%0A" +
                    "Por favor confirmar disponibilidad. ¡Gracias!";
                
                response.sendRedirect("https://wa.me/" + NUMERO_NEGOCIO + "?text=" + mensaje);
            } else {
                response.sendRedirect("index.jsp?error=1");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect("index.jsp?error=1");
        }
    }
}
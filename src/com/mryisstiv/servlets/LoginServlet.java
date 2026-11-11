package com.mryisstiv.servlets;

import com.mryisstiv.dao.impl.UsuarioDAOImpl;
import com.mryisstiv.modelo.Usuario;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private UsuarioDAOImpl usuarioDAO = new UsuarioDAOImpl();

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // 1. Obtener los parámetros enviados desde el formulario HTML
        String correo = request.getParameter("correo");
        String contrasena = request.getParameter("contrasena");

        // 2. Consultar el usuario en la base de datos usando el DAO
        Usuario usuario = usuarioDAO.consultarPorCorreo(correo);

        // 3. Validar que el usuario exista y que la contraseña coincida
        if (usuario != null && usuario.getContrasena().equals(contrasena)) {
            
            // 4. Crear la sesión HTTP y guardar los datos del usuario
            HttpSession session = request.getSession();
            session.setAttribute("usuario", usuario);  // ✅ CLAVE CORREGIDA: "usuario"
            session.setAttribute("nombreUsuario", usuario.getNombre());

            // 5. Redirigir al catálogo de productos (tienda)
            response.sendRedirect("index.jsp");
            
        } else {
            // 6. Si falla la validación, redirigir al login con un mensaje de error
            response.sendRedirect("login.html?error=1");
        }
    }
}
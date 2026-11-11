package com.mryisstiv.servlets;

import com.mryisstiv.dao.UsuarioDAO;
import com.mryisstiv.dao.impl.UsuarioDAOImpl;
import com.mryisstiv.modelo.Usuario;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet que gestiona el registro de nuevos usuarios en el sistema.
 * Valida que el correo no esté duplicado antes de insertar el nuevo registro.
 *
 * @author Ana María Quimbayo
 * @version 1.0
 */
@WebServlet("/RegistroServlet")
public class RegistroServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private UsuarioDAO usuarioDAO = new UsuarioDAOImpl();

    /**
     * Método POST que recibe los datos del formulario de registro.
     * Crea un nuevo objeto Usuario y lo persiste en la base de datos.
     *
     * @param request  Petición HTTP con los datos del formulario.
     * @param response Respuesta HTTP para redirigir según el resultado.
     * @throws ServletException Si ocurre un error en el servlet.
     * @throws IOException      Si ocurre un error de entrada/salida.
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // 1. Recibir los datos del formulario
        String nombre = request.getParameter("nombre");
        String apellidos = request.getParameter("apellidos");
        String cedula = request.getParameter("cedula");
        String correo = request.getParameter("correo");
        String telefono = request.getParameter("telefono");
        String contrasena = request.getParameter("contrasena");

        // 2. Validar que el correo no exista previamente en la base de datos
        Usuario existente = usuarioDAO.consultarPorCorreo(correo);
        if (existente != null) {
            // Si ya existe, redirigir con error de duplicado
            response.sendRedirect("registro.html?error=1");
            return;
        }

        // 3. Crear el nuevo objeto Usuario con los datos recibidos
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setApellidos(apellidos);
        nuevoUsuario.setCedula(cedula);
        nuevoUsuario.setCorreo(correo);
        nuevoUsuario.setTelefono(telefono);
        nuevoUsuario.setContrasena(contrasena);
        nuevoUsuario.setIdRol(1); // Asignar rol de cliente por defecto
        nuevoUsuario.setActivo(true);

        // 4. Intentar insertar el usuario en la base de datos
        try {
            boolean insertado = usuarioDAO.insert(nuevoUsuario);
            if (insertado) {
                // Si se insertó correctamente, redirigir con mensaje de éxito
                response.sendRedirect("registro.html?exito=1");
            } else {
                // Si falló la inserción, redirigir con error genérico
                response.sendRedirect("registro.html?error=2");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect("registro.html?error=2");
        }
    }
}
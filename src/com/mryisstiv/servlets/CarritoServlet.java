package com.mryisstiv.servlets;

import com.mryisstiv.modelo.Carrito;
import com.mryisstiv.modelo.Producto;
import com.mryisstiv.dao.impl.ProductoDAOImpl;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/CarritoServlet")
public class CarritoServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String accion = request.getParameter("accion");
        HttpSession session = request.getSession();
        
        Carrito carrito = (Carrito) session.getAttribute("carrito");
        if (carrito == null) {
            carrito = new Carrito();
            session.setAttribute("carrito", carrito);
        }
        
        if ("agregar".equals(accion)) {
            try {
                int idProducto = Integer.parseInt(request.getParameter("id"));
                ProductoDAOImpl dao = new ProductoDAOImpl();
                Producto producto = dao.select(idProducto);
                
                if (producto != null) {
                    carrito.agregarProducto(producto);
                    session.setAttribute("cantidadCarrito", carrito.getCantidadTotal());
                }
                
                // Redirigir al ancla #tienda para no perder la posición
                response.sendRedirect("index.jsp#tienda");
            } catch (Exception e) {
                e.printStackTrace();
                response.sendRedirect("index.jsp#tienda");
            }
        } else if ("eliminar".equals(accion)) {
            try {
                int idProducto = Integer.parseInt(request.getParameter("id"));
                carrito.eliminarProducto(idProducto);
                session.setAttribute("cantidadCarrito", carrito.getCantidadTotal());
                response.sendRedirect("tienda.jsp");
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if ("actualizar".equals(accion)) {
            try {
                int idProducto = Integer.parseInt(request.getParameter("id"));
                int cantidad = Integer.parseInt(request.getParameter("cantidad"));
                
                if (cantidad <= 0) {
                    carrito.eliminarProducto(idProducto);
                } else {
                    carrito.actualizarCantidad(idProducto, cantidad);
                }
                session.setAttribute("cantidadCarrito", carrito.getCantidadTotal());
                response.sendRedirect("tienda.jsp");
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            response.sendRedirect("tienda.jsp");
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
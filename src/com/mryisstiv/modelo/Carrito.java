package com.mryisstiv.modelo;

import java.util.ArrayList;
import java.util.List;

public class Carrito {
    private List<DetalleCarrito> detalles;

    public Carrito() {
        this.detalles = new ArrayList<>();
    }

    public void agregarProducto(Producto producto) {
        // Verificar si el producto ya está en el carrito
        for (DetalleCarrito detalle : detalles) {
            if (detalle.getProducto().getIdProducto() == producto.getIdProducto()) {
                detalle.setCantidad(detalle.getCantidad() + 1);
                return;
            }
        }
        // Si no está, agregarlo
        detalles.add(new DetalleCarrito(producto, 1));
    }

    public void eliminarProducto(int idProducto) {
        detalles.removeIf(detalle -> detalle.getProducto().getIdProducto() == idProducto);
    }

    public void actualizarCantidad(int idProducto, int cantidad) {
        for (DetalleCarrito detalle : detalles) {
            if (detalle.getProducto().getIdProducto() == idProducto) {
                detalle.setCantidad(cantidad);
                break;
            }
        }
    }

    public List<DetalleCarrito> getDetalles() {
        return detalles;
    }

    public double getTotal() {
        double total = 0;
        for (DetalleCarrito detalle : detalles) {
            total += detalle.getSubtotal();
        }
        return total;
    }

    public int getCantidadTotal() {
        int cantidad = 0;
        for (DetalleCarrito detalle : detalles) {
            cantidad += detalle.getCantidad();
        }
        return cantidad;
    }
}
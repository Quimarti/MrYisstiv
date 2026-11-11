package com.mryisstiv.modelo;

import java.math.BigDecimal;

/**
 * Clase que representa los productos dentro de un pedido ya realizado
 */
public class DetallePedido {
    
    private int id_detalle_pedido;
    private Pedido pedido;
    private Producto producto;
    private int cantidad;
    private BigDecimal precio_unitario; // Precio al momento de la compra
    private BigDecimal subtotal;
    
    public DetallePedido() {
    }
    
    // Getters y Setters
    public int getId_detalle_pedido() { return id_detalle_pedido; }
    public void setId_detalle_pedido(int id_detalle_pedido) { this.id_detalle_pedido = id_detalle_pedido; }
    
    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }
    
    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }
    
    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }
    
    public BigDecimal getPrecio_unitario() { return precio_unitario; }
    public void setPrecio_unitario(BigDecimal precio_unitario) { this.precio_unitario = precio_unitario; }
    
    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
}
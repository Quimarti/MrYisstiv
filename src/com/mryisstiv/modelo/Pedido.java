package com.mryisstiv.modelo;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Pedido {
    private int idPedido;
    private int idUsuario;
    private int idDireccion;
    private int idMetodoPago;
    private BigDecimal subtotal;
    private BigDecimal valorDomicilio;
    private BigDecimal total;
    private String estado;
    private Timestamp fechaPedido;
    private String observaciones;

    public Pedido() {}

    public Pedido(int idUsuario, int idDireccion, int idMetodoPago, 
                  BigDecimal subtotal, BigDecimal valorDomicilio, 
                  BigDecimal total, String observaciones) {
        this.idUsuario = idUsuario;
        this.idDireccion = idDireccion;
        this.idMetodoPago = idMetodoPago;
        this.subtotal = subtotal;
        this.valorDomicilio = valorDomicilio;
        this.total = total;
        this.observaciones = observaciones;
        this.estado = "Pendiente";
    }

    public int getIdPedido() { return idPedido; }
    public void setIdPedido(int idPedido) { this.idPedido = idPedido; }
    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }
    public int getIdDireccion() { return idDireccion; }
    public void setIdDireccion(int idDireccion) { this.idDireccion = idDireccion; }
    public int getIdMetodoPago() { return idMetodoPago; }
    public void setIdMetodoPago(int idMetodoPago) { this.idMetodoPago = idMetodoPago; }
    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
    public BigDecimal getValorDomicilio() { return valorDomicilio; }
    public void setValorDomicilio(BigDecimal valorDomicilio) { this.valorDomicilio = valorDomicilio; }
    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public Timestamp getFechaPedido() { return fechaPedido; }
    public void setFechaPedido(Timestamp fechaPedido) { this.fechaPedido = fechaPedido; }
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
}
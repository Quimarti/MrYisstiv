package com.mryisstiv.modelo;

import java.sql.Timestamp;

/**
 * Clase que representa un producto marcado como favorito por un usuario
 */
public class Favorito {
    
    private int id_favorito;
    private Usuario usuario;
    private Producto producto;
    private Timestamp fecha_agregado;
    
    public Favorito() {
    }
    
    // Getters y Setters
    public int getId_favorito() { return id_favorito; }
    public void setId_favorito(int id_favorito) { this.id_favorito = id_favorito; }
    
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    
    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }
    
    public Timestamp getFecha_agregado() { return fecha_agregado; }
    public void setFecha_agregado(Timestamp fecha_agregado) { this.fecha_agregado = fecha_agregado; }
}
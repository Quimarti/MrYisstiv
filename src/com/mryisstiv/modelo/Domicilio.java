package com.mryisstiv.modelo;

import java.sql.Timestamp;

/**
 * Clase que representa un domicilio (despacho a domicilio)
 */
public class Domicilio {
    
    private int id_domicilio;
    private Pedido pedido;
    private String direccion_entrega;
    private String nombre_destinatario;
    private String telefono_contacto;
    private Timestamp fecha_entrega_estimada;
    private String estado; // En camino, Entregado
    private String observaciones;
    
    public Domicilio() {
    }
    
    // Getters y Setters
    public int getId_domicilio() { return id_domicilio; }
    public void setId_domicilio(int id_domicilio) { this.id_domicilio = id_domicilio; }
    
    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }
    
    public String getDireccion_entrega() { return direccion_entrega; }
    public void setDireccion_entrega(String direccion_entrega) { this.direccion_entrega = direccion_entrega; }
    
    public String getNombre_destinatario() { return nombre_destinatario; }
    public void setNombre_destinatario(String nombre_destinatario) { this.nombre_destinatario = nombre_destinatario; }
    
    public String getTelefono_contacto() { return telefono_contacto; }
    public void setTelefono_contacto(String telefono_contacto) { this.telefono_contacto = telefono_contacto; }
    
    public Timestamp getFecha_entrega_estimada() { return fecha_entrega_estimada; }
    public void setFecha_entrega_estimada(Timestamp fecha_entrega_estimada) { this.fecha_entrega_estimada = fecha_entrega_estimada; }
    
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
}
package com.mryisstiv.modelo;

import java.sql.Timestamp;

public class Reserva {
    private int idReserva;
    private int idUsuario;
    private String fechaReserva;
    private String horaReserva;
    private int numeroPersonas;
    private String estado;
    private Timestamp fechaCreacion;
    
    // Campos adicionales del usuario (para mostrar en admin)
    private String nombreUsuario;
    private String telefonoUsuario;
    private String correoUsuario;

    public Reserva() {
        this.estado = "Pendiente";
    }

    public Reserva(int idUsuario, String fechaReserva, String horaReserva, int numeroPersonas) {
        this.idUsuario = idUsuario;
        this.fechaReserva = fechaReserva;
        this.horaReserva = horaReserva;
        this.numeroPersonas = numeroPersonas;
        this.estado = "Pendiente";
    }

    // Getters y Setters
    public int getIdReserva() { return idReserva; }
    public void setIdReserva(int idReserva) { this.idReserva = idReserva; }
    
    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }
    
    public String getFechaReserva() { return fechaReserva; }
    public void setFechaReserva(String fechaReserva) { this.fechaReserva = fechaReserva; }
    
    public String getHoraReserva() { return horaReserva; }
    public void setHoraReserva(String horaReserva) { this.horaReserva = horaReserva; }
    
    public int getNumeroPersonas() { return numeroPersonas; }
    public void setNumeroPersonas(int numeroPersonas) { this.numeroPersonas = numeroPersonas; }
    
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    
    public Timestamp getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(Timestamp fechaCreacion) { this.fechaCreacion = fechaCreacion; }
    
    public String getNombreUsuario() { return nombreUsuario; }
    public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }
    
    public String getTelefonoUsuario() { return telefonoUsuario; }
    public void setTelefonoUsuario(String telefonoUsuario) { this.telefonoUsuario = telefonoUsuario; }
    
    public String getCorreoUsuario() { return correoUsuario; }
    public void setCorreoUsuario(String correoUsuario) { this.correoUsuario = correoUsuario; }
}
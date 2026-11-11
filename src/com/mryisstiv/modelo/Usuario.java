package com.mryisstiv.modelo;

public class Usuario {
    // Campos que tu DAO necesita (según el error)
    private int idUsuario;
    private String nombre;
    private String apellidos;
    private String cedula;
    private String correo;
    private String telefono;
    private String contrasena;
    private int idRol;
    private boolean activo;
    
    // Campo nuevo para el sistema de roles por texto
    private String rol;

    public Usuario() {
        this.rol = "cliente";
        this.activo = true;
    }

    // Getters y Setters
    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }
    
    public String getCedula() { return cedula; }
    public void setCedula(String cedula) { this.cedula = cedula; }
    
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    
    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }
    
    public int getIdRol() { return idRol; }
    public void setIdRol(int idRol) { this.idRol = idRol; }
    
    public boolean isActivo() { return activo; }
    public void setActivo(boolean activo) { this.activo = activo; }
    
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
    
    // Métodos de ayuda para validar permisos
    public boolean isAdmin() { 
        return "admin".equalsIgnoreCase(this.rol) || this.idRol == 1; 
    }
    public boolean isEmpleado() { 
        return "empleado".equalsIgnoreCase(this.rol) || this.idRol == 2; 
    }
    public boolean isCliente() { 
        return "cliente".equalsIgnoreCase(this.rol) || this.idRol == 3; 
    }
}
package com.mryisstiv.modelo;

/**
 * Clase que representa el rol de un usuario en el sistema
 * @author Ana Maria Quimbayo
 * @version 1.0
 */
public class Rol {
    
    // Atributos
    private int id_rol;
    private String nombre_rol;
    
    // Constructores
    public Rol() {
        // Constructor vacío
    }
    
    public Rol(int id_rol, String nombre_rol) {
        this.id_rol = id_rol;
        this.nombre_rol = nombre_rol;
    }
    
    // Getters y Setters
    public int getId_rol() {
        return id_rol;
    }
    
    public void setId_rol(int id_rol) {
        this.id_rol = id_rol;
    }
    
    public String getNombre_rol() {
        return nombre_rol;
    }
    
    public void setNombre_rol(String nombre_rol) {
        this.nombre_rol = nombre_rol;
    }
    
    // toString
    @Override
    public String toString() {
        return "Rol{" +
                "id_rol=" + id_rol +
                ", nombre_rol='" + nombre_rol + '\'' +
                '}';
    }
}

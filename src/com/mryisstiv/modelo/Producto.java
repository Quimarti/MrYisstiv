package com.mryisstiv.modelo;

public class Producto {
    
    private int idProducto;
    private String nombre;
    private String descripcion;
    private double precio;
    private int stock;
    private String imagen;
    private int idCategoria;
    private boolean favoritoSemana;
    private boolean activo;

    public Producto() {
    }

    public Producto(int idProducto, String nombre, String descripcion, double precio, 
                    int stock, String imagen, int idCategoria, boolean favoritoSemana, boolean activo) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.idCategoria = idCategoria;
        this.favoritoSemana = favoritoSemana;
        this.activo = activo;
    }

    public int getIdProducto() { return idProducto; }
    public void setIdProducto(int idProducto) { this.idProducto = idProducto; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public double getPrecio() { return precio; }
    public void setPrecio(double precio) { this.precio = precio; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }

    public int getIdCategoria() { return idCategoria; }
    public void setIdCategoria(int idCategoria) { this.idCategoria = idCategoria; }

    public boolean isFavoritoSemana() { return favoritoSemana; }
    public void setFavoritoSemana(boolean favoritoSemana) { this.favoritoSemana = favoritoSemana; }

    public boolean isActivo() { return activo; }
    public void setActivo(boolean activo) { this.activo = activo; }
}
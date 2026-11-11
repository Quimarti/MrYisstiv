package com.mryisstiv.dao;

import com.mryisstiv.modelo.Producto;
import java.util.List;

public interface ProductoDAO {
    boolean insert(Producto producto);
    List<Producto> selectAll();
    Producto select(int idProducto);
    List<Producto> selectByCategoria(int idCategoria);
    boolean update(Producto producto);
    boolean delete(int idProducto);
}
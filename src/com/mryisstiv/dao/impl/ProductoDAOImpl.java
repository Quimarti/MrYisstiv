package com.mryisstiv.dao.impl;

import com.mryisstiv.utilidad.Conexion;
import com.mryisstiv.dao.ProductoDAO;
import com.mryisstiv.modelo.Producto;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProductoDAOImpl implements ProductoDAO {

    @Override
    public boolean insert(Producto producto) {
        String sql = "INSERT INTO producto (nombre, descripcion, precio, stock, imagen, id_categoria, favorito_semana, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setString(1, producto.getNombre());
            ps.setString(2, producto.getDescripcion());
            ps.setDouble(3, producto.getPrecio());
            ps.setInt(4, producto.getStock());
            ps.setString(5, producto.getImagen());
            ps.setInt(6, producto.getIdCategoria());
            ps.setBoolean(7, producto.isFavoritoSemana());
            ps.setBoolean(8, producto.isActivo());
            
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al insertar producto: " + e.getMessage());
            return false;
        }
    }

    @Override
    public List<Producto> selectAll() {
        List<Producto> lista = new ArrayList<>();
        String sql = "SELECT * FROM producto WHERE activo = 1";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            
            while (rs.next()) {
                Producto p = new Producto();
                p.setIdProducto(rs.getInt("id_producto"));
                p.setNombre(rs.getString("nombre"));
                p.setDescripcion(rs.getString("descripcion"));
                p.setPrecio(rs.getDouble("precio"));
                p.setStock(rs.getInt("stock"));
                p.setImagen(rs.getString("imagen"));
                p.setIdCategoria(rs.getInt("id_categoria"));
                p.setFavoritoSemana(rs.getBoolean("favorito_semana"));
                p.setActivo(rs.getBoolean("activo"));
                lista.add(p);
            }
        } catch (SQLException e) {
            System.err.println("Error al consultar productos: " + e.getMessage());
        }
        return lista;
    }

    @Override
    public Producto select(int idProducto) {
        String sql = "SELECT * FROM producto WHERE id_producto = ?";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setInt(1, idProducto);
            ResultSet rs = ps.executeQuery();
            
            if (rs.next()) {
                Producto p = new Producto();
                p.setIdProducto(rs.getInt("id_producto"));
                p.setNombre(rs.getString("nombre"));
                p.setDescripcion(rs.getString("descripcion"));
                p.setPrecio(rs.getDouble("precio"));
                p.setStock(rs.getInt("stock"));
                p.setImagen(rs.getString("imagen"));
                p.setIdCategoria(rs.getInt("id_categoria"));
                p.setFavoritoSemana(rs.getBoolean("favorito_semana"));
                p.setActivo(rs.getBoolean("activo"));
                return p;
            }
        } catch (SQLException e) {
            System.err.println("Error al consultar producto: " + e.getMessage());
        }
        return null;
    }

    @Override
    public List<Producto> selectByCategoria(int idCategoria) {
        List<Producto> lista = new ArrayList<>();
        String sql = "SELECT * FROM producto WHERE id_categoria = ? AND activo = 1";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setInt(1, idCategoria);
            ResultSet rs = ps.executeQuery();
            
            while (rs.next()) {
                Producto p = new Producto();
                p.setIdProducto(rs.getInt("id_producto"));
                p.setNombre(rs.getString("nombre"));
                p.setDescripcion(rs.getString("descripcion"));
                p.setPrecio(rs.getDouble("precio"));
                p.setStock(rs.getInt("stock"));
                p.setImagen(rs.getString("imagen"));
                p.setIdCategoria(rs.getInt("id_categoria"));
                p.setFavoritoSemana(rs.getBoolean("favorito_semana"));
                p.setActivo(rs.getBoolean("activo"));
                lista.add(p);
            }
        } catch (SQLException e) {
            System.err.println("Error al consultar por categoría: " + e.getMessage());
        }
        return lista;
    }

    @Override
    public boolean update(Producto producto) {
        String sql = "UPDATE producto SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?, id_categoria = ?, favorito_semana = ? WHERE id_producto = ?";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setString(1, producto.getNombre());
            ps.setString(2, producto.getDescripcion());
            ps.setDouble(3, producto.getPrecio());
            ps.setInt(4, producto.getStock());
            ps.setString(5, producto.getImagen());
            ps.setInt(6, producto.getIdCategoria());
            ps.setBoolean(7, producto.isFavoritoSemana());
            ps.setInt(8, producto.getIdProducto());
            
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al actualizar producto: " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean delete(int idProducto) {
        String sql = "UPDATE producto SET activo = 0 WHERE id_producto = ?";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setInt(1, idProducto);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Error al eliminar producto: " + e.getMessage());
            return false;
        }
    }
}
package com.mryisstiv.dao.impl;

import com.mryisstiv.dao.UsuarioDAO;
import com.mryisstiv.modelo.Usuario;
import com.mryisstiv.utilidad.Conexion;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UsuarioDAOImpl implements UsuarioDAO {

    // ============================================
    // CONSULTAR USUARIO POR CORREO (PARA LOGIN)
    // ============================================
    @Override
    public Usuario consultarPorCorreo(String correo) {
        Usuario usuario = null;
        String sql = "SELECT * FROM usuario WHERE correo = ? AND activo = 1";
        
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setString(1, correo);
            ResultSet rs = ps.executeQuery();
            
            if (rs.next()) {
                usuario = new Usuario();
                usuario.setIdUsuario(rs.getInt("id_usuario"));
                usuario.setNombre(rs.getString("nombre"));
                usuario.setApellidos(rs.getString("apellidos"));
                usuario.setCedula(rs.getString("cedula"));
                usuario.setCorreo(rs.getString("correo"));
                usuario.setTelefono(rs.getString("telefono"));
                usuario.setContrasena(rs.getString("contrasena"));
                usuario.setIdRol(rs.getInt("id_rol"));
                usuario.setActivo(rs.getBoolean("activo"));
                
                // Asignar rol por texto según el id_rol
                if (usuario.getIdRol() == 1) {
                    usuario.setRol("admin");
                } else if (usuario.getIdRol() == 2) {
                    usuario.setRol("empleado");
                } else {
                    usuario.setRol("cliente");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return usuario;
    }

    // ============================================
    // INSERTAR NUEVO USUARIO (PARA REGISTRO)
    // ============================================
    @Override
    public boolean insert(Usuario usuario) {
        String sql = "INSERT INTO usuario (nombre, apellidos, cedula, correo, telefono, contrasena, id_rol, activo) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            ps.setString(1, usuario.getNombre());
            ps.setString(2, usuario.getApellidos());
            ps.setString(3, usuario.getCedula());
            ps.setString(4, usuario.getCorreo());
            ps.setString(5, usuario.getTelefono());
            ps.setString(6, usuario.getContrasena());
            ps.setInt(7, 3); // Por defecto todos son clientes (id_rol = 3)
            ps.setBoolean(8, true); // activo = true
            
            int filasAfectadas = ps.executeUpdate();
            
            if (filasAfectadas > 0) {
                ResultSet generatedKeys = ps.getGeneratedKeys();
                if (generatedKeys.next()) {
                    usuario.setIdUsuario(generatedKeys.getInt(1));
                }
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // ============================================
    // SELECCIONAR USUARIO POR ID
    // ============================================
    @Override
    public Usuario select(int id) {
        Usuario usuario = null;
        String sql = "SELECT * FROM usuario WHERE id_usuario = ?";
        
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            
            if (rs.next()) {
                usuario = mapearUsuario(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return usuario;
    }

    // ============================================
    // SELECCIONAR TODOS LOS USUARIOS
    // ============================================
    @Override
    public List<Usuario> selectAll() {
        List<Usuario> lista = new ArrayList<>();
        String sql = "SELECT * FROM usuario ORDER BY id_usuario ASC";
        
        try (Connection conn = Conexion.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            
            while (rs.next()) {
                lista.add(mapearUsuario(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    // ============================================
    // ACTUALIZAR DATOS DEL USUARIO
    // ============================================
    @Override
    public boolean update(Usuario usuario) {
        String sql = "UPDATE usuario SET nombre=?, apellidos=?, cedula=?, correo=?, telefono=?, contrasena=?, id_rol=?, activo=? WHERE id_usuario=?";
        
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setString(1, usuario.getNombre());
            ps.setString(2, usuario.getApellidos());
            ps.setString(3, usuario.getCedula());
            ps.setString(4, usuario.getCorreo());
            ps.setString(5, usuario.getTelefono());
            ps.setString(6, usuario.getContrasena());
            ps.setInt(7, usuario.getIdRol());
            ps.setBoolean(8, usuario.isActivo());
            ps.setInt(9, usuario.getIdUsuario());
            
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // ============================================
    // ELIMINAR USUARIO (desactivar)
    // ============================================
    @Override
    public boolean delete(int id) {
        String sql = "UPDATE usuario SET activo = 0 WHERE id_usuario = ?";
        
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // ============================================
    // ACTUALIZAR ROL DEL USUARIO (PARA ADMIN)
    // ============================================
    public boolean actualizarRol(int idUsuario, int nuevoRol) {
        String sql = "UPDATE usuario SET id_rol = ? WHERE id_usuario = ?";
        
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setInt(1, nuevoRol);
            ps.setInt(2, idUsuario);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // ============================================
    // VERIFICAR SI EL CORREO YA EXISTE
    // ============================================
    public boolean correoExiste(String correo) {
        String sql = "SELECT COUNT(*) FROM usuario WHERE correo = ?";
        
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setString(1, correo);
            ResultSet rs = ps.executeQuery();
            
            if (rs.next()) {
                return rs.getInt(1) > 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // ============================================
    // MÉTODO AUXILIAR PARA MAPEAR ResultSet A Usuario
    // ============================================
    private Usuario mapearUsuario(ResultSet rs) throws SQLException {
        Usuario u = new Usuario();
        u.setIdUsuario(rs.getInt("id_usuario"));
        u.setNombre(rs.getString("nombre"));
        u.setApellidos(rs.getString("apellidos"));
        u.setCedula(rs.getString("cedula"));
        u.setCorreo(rs.getString("correo"));
        u.setTelefono(rs.getString("telefono"));
        u.setContrasena(rs.getString("contrasena"));
        u.setIdRol(rs.getInt("id_rol"));
        u.setActivo(rs.getBoolean("activo"));
        
        // Asignar rol por texto
        if (u.getIdRol() == 1) {
            u.setRol("admin");
        } else if (u.getIdRol() == 2) {
            u.setRol("empleado");
        } else {
            u.setRol("cliente");
        }
        
        return u;
    }
}
package com.mryisstiv.dao.impl;

import com.mryisstiv.dao.ReservaDAO;
import com.mryisstiv.modelo.Reserva;
import com.mryisstiv.utilidad.Conexion;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ReservaDAOImpl implements ReservaDAO {

    @Override
    public boolean insert(Reserva reserva) throws SQLException {
        String sql = "INSERT INTO reserva (id_usuario, fecha_reserva, hora_reserva, numero_personas, estado) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, reserva.getIdUsuario());
            ps.setString(2, reserva.getFechaReserva());
            ps.setString(3, reserva.getHoraReserva());
            ps.setInt(4, reserva.getNumeroPersonas());
            ps.setString(5, "Pendiente");
            return ps.executeUpdate() > 0;
        }
    }

    @Override
    public Reserva select(int id) throws SQLException {
        String sql = "SELECT r.*, u.nombre, u.apellidos, u.telefono, u.correo " +
                     "FROM reserva r LEFT JOIN usuario u ON r.id_usuario = u.id_usuario " +
                     "WHERE r.id_reserva = ?";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return mapearReserva(rs);
            }
        }
        return null;
    }

    @Override
    public List<Reserva> selectAll() throws SQLException {
        List<Reserva> lista = new ArrayList<>();
        String sql = "SELECT r.*, u.nombre, u.apellidos, u.telefono, u.correo " +
                     "FROM reserva r LEFT JOIN usuario u ON r.id_usuario = u.id_usuario " +
                     "ORDER BY r.fecha_creacion DESC";
        try (Connection conn = Conexion.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) {
                lista.add(mapearReserva(rs));
            }
        }
        return lista;
    }

    @Override
    public List<Reserva> selectByUsuario(int idUsuario) throws SQLException {
        List<Reserva> lista = new ArrayList<>();
        String sql = "SELECT r.*, u.nombre, u.apellidos, u.telefono, u.correo " +
                     "FROM reserva r LEFT JOIN usuario u ON r.id_usuario = u.id_usuario " +
                     "WHERE r.id_usuario = ? ORDER BY r.fecha_creacion DESC";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, idUsuario);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                lista.add(mapearReserva(rs));
            }
        }
        return lista;
    }

    @Override
    public boolean update(Reserva reserva) throws SQLException {
        String sql = "UPDATE reserva SET fecha_reserva=?, hora_reserva=?, numero_personas=?, estado=? WHERE id_reserva=?";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, reserva.getFechaReserva());
            ps.setString(2, reserva.getHoraReserva());
            ps.setInt(3, reserva.getNumeroPersonas());
            ps.setString(4, reserva.getEstado());
            ps.setInt(5, reserva.getIdReserva());
            return ps.executeUpdate() > 0;
        }
    }

    @Override
    public boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM reserva WHERE id_reserva = ?";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }

    @Override
    public boolean actualizarEstado(int id, String estado) throws SQLException {
        String sql = "UPDATE reserva SET estado = ? WHERE id_reserva = ?";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, estado);
            ps.setInt(2, id);
            return ps.executeUpdate() > 0;
        }
    }

    // Método auxiliar para mapear ResultSet a Reserva
    private Reserva mapearReserva(ResultSet rs) throws SQLException {
        Reserva r = new Reserva();
        r.setIdReserva(rs.getInt("id_reserva"));
        r.setIdUsuario(rs.getInt("id_usuario"));
        r.setFechaReserva(rs.getString("fecha_reserva"));
        r.setHoraReserva(rs.getString("hora_reserva"));
        r.setNumeroPersonas(rs.getInt("numero_personas"));
        r.setEstado(rs.getString("estado"));
        
        try { r.setFechaCreacion(rs.getTimestamp("fecha_creacion")); } catch (Exception e) {}
        
        // Datos del usuario (pueden ser null si no hay JOIN)
        try { 
            String nombre = rs.getString("nombre");
            String apellidos = rs.getString("apellidos");
            r.setNombreUsuario(nombre != null ? nombre + " " + apellidos : "Usuario #" + r.getIdUsuario());
        } catch (Exception e) {
            r.setNombreUsuario("Usuario #" + r.getIdUsuario());
        }
        try { r.setTelefonoUsuario(rs.getString("telefono")); } catch (Exception e) {}
        try { r.setCorreoUsuario(rs.getString("correo")); } catch (Exception e) {}
        
        return r;
    }
}
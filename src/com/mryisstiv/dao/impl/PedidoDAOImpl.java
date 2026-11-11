package com.mryisstiv.dao.impl;

import com.mryisstiv.dao.PedidoDAO;
import com.mryisstiv.modelo.Pedido;
import com.mryisstiv.utilidad.Conexion;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PedidoDAOImpl implements PedidoDAO {

    @Override
    public boolean insert(Pedido pedido) throws SQLException {
        String sql = "INSERT INTO pedido (id_usuario, id_direccion, id_metodo_pago, subtotal, valor_domicilio, total, estado, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setInt(1, pedido.getIdUsuario());
            stmt.setInt(2, pedido.getIdDireccion());
            stmt.setInt(3, pedido.getIdMetodoPago());
            stmt.setBigDecimal(4, pedido.getSubtotal());
            stmt.setBigDecimal(5, pedido.getValorDomicilio());
            stmt.setBigDecimal(6, pedido.getTotal());
            stmt.setString(7, pedido.getEstado());
            stmt.setString(8, pedido.getObservaciones());
            return stmt.executeUpdate() > 0;
        }
    }

    @Override
    public Pedido select(int id) throws SQLException {
        String sql = "SELECT * FROM pedido WHERE id_pedido = ?";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) return mapearResultSetAPedido(rs);
        }
        return null;
    }

    @Override
    public List<Pedido> selectAll() throws SQLException {
        List<Pedido> lista = new ArrayList<>();
        String sql = "SELECT * FROM pedido ORDER BY fecha_pedido DESC";
        try (Connection conn = Conexion.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) lista.add(mapearResultSetAPedido(rs));
        }
        return lista;
    }

    @Override
    public List<Pedido> selectByUsuario(int idUsuario) throws SQLException {
        List<Pedido> lista = new ArrayList<>();
        String sql = "SELECT * FROM pedido WHERE id_usuario = ? ORDER BY fecha_pedido DESC";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, idUsuario);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) lista.add(mapearResultSetAPedido(rs));
        }
        return lista;
    }

    @Override
    public boolean update(Pedido pedido) throws SQLException {
        String sql = "UPDATE pedido SET id_direccion=?, id_metodo_pago=?, subtotal=?, valor_domicilio=?, total=?, estado=?, observaciones=? WHERE id_pedido=?";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, pedido.getIdDireccion());
            ps.setInt(2, pedido.getIdMetodoPago());
            ps.setBigDecimal(3, pedido.getSubtotal());
            ps.setBigDecimal(4, pedido.getValorDomicilio());
            ps.setBigDecimal(5, pedido.getTotal());
            ps.setString(6, pedido.getEstado());
            ps.setString(7, pedido.getObservaciones());
            ps.setInt(8, pedido.getIdPedido());
            return ps.executeUpdate() > 0;
        }
    }

    @Override
    public boolean delete(int id) throws SQLException {
        String sql = "DELETE FROM pedido WHERE id_pedido = ?";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }

    @Override
    public boolean actualizarEstado(int id, String estado) throws SQLException {
        String sql = "UPDATE pedido SET estado = ? WHERE id_pedido = ?";
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, estado);
            ps.setInt(2, id);
            return ps.executeUpdate() > 0;
        }
    }

    private Pedido mapearResultSetAPedido(ResultSet rs) throws SQLException {
        Pedido p = new Pedido();
        p.setIdPedido(rs.getInt("id_pedido"));
        p.setIdUsuario(rs.getInt("id_usuario"));
        p.setIdDireccion(rs.getInt("id_direccion"));
        p.setIdMetodoPago(rs.getInt("id_metodo_pago"));
        p.setFechaPedido(rs.getTimestamp("fecha_pedido"));
        p.setSubtotal(rs.getBigDecimal("subtotal"));
        p.setValorDomicilio(rs.getBigDecimal("valor_domicilio"));
        p.setTotal(rs.getBigDecimal("total"));
        p.setEstado(rs.getString("estado"));
        p.setObservaciones(rs.getString("observaciones"));
        return p;
    }
}
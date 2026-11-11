package com.mryisstiv.dao;

import com.mryisstiv.modelo.Pedido;
import java.sql.SQLException;
import java.util.List;

public interface PedidoDAO {
    boolean insert(Pedido pedido) throws SQLException;
    Pedido select(int id) throws SQLException;
    List<Pedido> selectAll() throws SQLException;
    List<Pedido> selectByUsuario(int idUsuario) throws SQLException;
    boolean update(Pedido pedido) throws SQLException;
    boolean delete(int id) throws SQLException;
    boolean actualizarEstado(int id, String estado) throws SQLException;
}
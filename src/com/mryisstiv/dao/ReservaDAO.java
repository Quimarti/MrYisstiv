package com.mryisstiv.dao;

import com.mryisstiv.modelo.Reserva;
import java.sql.SQLException;
import java.util.List;

public interface ReservaDAO {
    boolean insert(Reserva reserva) throws SQLException;
    Reserva select(int id) throws SQLException;
    List<Reserva> selectAll() throws SQLException;
    List<Reserva> selectByUsuario(int idUsuario) throws SQLException;
    boolean update(Reserva reserva) throws SQLException;
    boolean delete(int id) throws SQLException;
    boolean actualizarEstado(int id, String estado) throws SQLException;
}
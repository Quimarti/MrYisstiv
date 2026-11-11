package com.mryisstiv.dao;

import com.mryisstiv.modelo.Usuario;
import java.util.List;

public interface UsuarioDAO {
    Usuario consultarPorCorreo(String correo);
    boolean insert(Usuario usuario);
    Usuario select(int id);
    List<Usuario> selectAll();
    boolean update(Usuario usuario);
    boolean delete(int id);
}
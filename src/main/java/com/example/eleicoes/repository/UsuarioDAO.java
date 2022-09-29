package com.example.eleicoes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.eleicoes.model.Usuario;

public interface UsuarioDAO extends JpaRepository<Usuario, Long> {
    
}

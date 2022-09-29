package com.example.eleicoes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.eleicoes.model.Candidato;

public interface CandidatoDAO extends JpaRepository<Candidato, Long> {

    @Query(value="SELECT * FROM candidato c WHERE c.ca_nome LIKE %:filtro%", nativeQuery=true)
    List <Candidato> findWithFilter(@Param("filtro")String filtro);
    
}

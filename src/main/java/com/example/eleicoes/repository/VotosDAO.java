package com.example.eleicoes.repository;

import java.util.List;

//import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.eleicoes.model.Votos;

public interface VotosDAO extends JpaRepository<Votos, Long>{

    @Query(value="SELECT * FROM votos c WHERE c.ca_id = :filtro", nativeQuery=true)
    List <Votos> findWithFilter(@Param("filtro")Long filtro);

    @Query(value="SELECT * FROM votos v WHERE v.ele_id = :id", nativeQuery=true)
    List <Votos> findEleicao(@Param("id") Long id);
    
}

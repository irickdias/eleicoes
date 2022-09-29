package com.example.eleicoes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.eleicoes.model.Eleicao;

public interface EleicaoDAO extends JpaRepository<Eleicao, Long>{
    
    @Query(value="SELECT * FROM eleicao c WHERE c.ele_tipo LIKE %:filtro%", nativeQuery=true)
    List <Eleicao> findWithFilter(@Param("filtro")String filtro);

}

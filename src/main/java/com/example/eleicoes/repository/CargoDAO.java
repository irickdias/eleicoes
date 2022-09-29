package com.example.eleicoes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.eleicoes.model.Cargo;

public interface CargoDAO extends JpaRepository<Cargo, Long> {
    
    @Query(value="SELECT * FROM cargo c WHERE c.car_descr LIKE %:filtro%", nativeQuery=true)
    List <Cargo> findWithFilter(@Param("filtro")String filtro);

}

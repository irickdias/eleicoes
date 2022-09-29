package com.example.eleicoes.repository;

//import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.query.Param;

import com.example.eleicoes.model.Partido;

public interface PartidoDAO extends JpaRepository<Partido, Long>{
    
    //@Query("FROM Partido WHERE par_nome LIKE %?1%")
    //List<Partido> findWithFilter(String filter);

    @Query(value="SELECT * FROM partido c WHERE c.par_nome LIKE %:filtro%", nativeQuery=true)
    List <Partido> findWithFilter(@Param("filtro")String filtro);

}

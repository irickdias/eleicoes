package com.example.eleicoes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.eleicoes.model.Partido;
import com.example.eleicoes.repository.PartidoDAO;

@CrossOrigin
@RestController
@RequestMapping(value="/apis/partido")
public class PartidoServiceController {

    @Autowired
    private PartidoDAO partidoDAO;
    
    @PostMapping("/incluir")
    public ResponseEntity<Object> incluir(@RequestBody Partido partido) // chega um json
    {
        //System.out.println(partido.getNome());
        partidoDAO.save(partido);
        return new ResponseEntity<>(partido, HttpStatus.OK);
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<Object> excluir(@PathVariable(value="id") Long id)
    {
        //System.out.println("Deletar " + id);
        partidoDAO.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PostMapping("/alterar")
    public ResponseEntity<Object> alterar(@RequestBody Partido partido)
    {
        partidoDAO.save(partido);
        return new ResponseEntity<>(partido, HttpStatus.OK);
    }

    @GetMapping("/buscar-um/{id}")
    public ResponseEntity<Object> buscarUm(@PathVariable(value="id") Long id)
    {

        return new ResponseEntity<>(partidoDAO.findById(id).orElse(new Partido()), HttpStatus.OK);
    }

    @GetMapping("/buscar-todos")
    public ResponseEntity<Object> buscarFiltro(@Param(value="filtro") String filtro)
    {

        return new ResponseEntity<>(partidoDAO.findWithFilter(filtro), HttpStatus.OK);
    }
}

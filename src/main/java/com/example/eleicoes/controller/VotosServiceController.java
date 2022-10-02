package com.example.eleicoes.controller;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.repository.query.Param;
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

import com.example.eleicoes.model.Votos;
import com.example.eleicoes.repository.VotosDAO;

@CrossOrigin
@RestController
@RequestMapping(value="/apis/votos")
public class VotosServiceController {
    
    @Autowired
    private VotosDAO votosDAO;
    
    @PostMapping("/incluir")
    public ResponseEntity<Object> incluir(@RequestBody Votos votos) // chega um json
    {
        //System.out.println(partido.getNome());
        votosDAO.save(votos);
        return new ResponseEntity<>(votos, HttpStatus.OK);
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<Object> excluir(@PathVariable(value="id") Long id)
    {
        //System.out.println("Deletar " + id);
        votosDAO.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PostMapping("/alterar")
    public ResponseEntity<Object> alterar(@RequestBody Votos votos)
    {
        votosDAO.save(votos);
        return new ResponseEntity<>(votos, HttpStatus.OK);
    }

    @GetMapping("/buscar-um/{id}")
    public ResponseEntity<Object> buscarUm(@PathVariable(value="id") Long id)
    {

        return new ResponseEntity<>(votosDAO.findById(id).orElse(new Votos()), HttpStatus.OK);
    }

    @GetMapping("/buscar-todos")
    public ResponseEntity<Object> buscarTodos()
    {

        return new ResponseEntity<>(votosDAO.findAll(), HttpStatus.OK);
    }
}

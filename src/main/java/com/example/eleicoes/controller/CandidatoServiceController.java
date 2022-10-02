package com.example.eleicoes.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.eleicoes.model.Candidato;
import com.example.eleicoes.repository.CandidatoDAO;

@CrossOrigin
@RestController
@RequestMapping(value="/apis/candidato")
public class CandidatoServiceController {
    
    @Autowired
    private CandidatoDAO candidatoDAO;

    @PostMapping("/incluir")
    public ResponseEntity<Object> incluir(@RequestBody Candidato candidato) // chega um json
    {
        //System.out.println(candidato.getNome());
        candidatoDAO.save(candidato);
        return new ResponseEntity<>(candidato, HttpStatus.OK);
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<Object> excluir(@PathVariable(value="id") Long id)
    {
        //System.out.println("Deletar " + id);
        candidatoDAO.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PostMapping("/alterar")
    public ResponseEntity<Object> alterar(@RequestBody Candidato candidato)
    {
        candidatoDAO.save(candidato);
        return new ResponseEntity<>(candidato, HttpStatus.OK);
    }

    @GetMapping("/buscar-um/{id}")
    public ResponseEntity<Object> buscarUm(@PathVariable(value="id") Long id)
    {

        return new ResponseEntity<>(candidatoDAO.findById(id).orElse(new Candidato()), HttpStatus.OK);
    }

    @GetMapping("/buscar-todos")
    public ResponseEntity<Object> buscarTodos(@RequestParam(value="filtro") String filtro)
    { 
        return new ResponseEntity<>(candidatoDAO.findWithFilter(filtro),HttpStatus.OK);
    }
    
}

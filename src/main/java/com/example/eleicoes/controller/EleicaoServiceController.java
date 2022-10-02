package com.example.eleicoes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.eleicoes.model.Eleicao;
import com.example.eleicoes.repository.EleicaoDAO;

@CrossOrigin
@RestController
@RequestMapping(value="/apis/eleicao")
public class EleicaoServiceController {
    @Autowired
    private EleicaoDAO eleicaoDAO;
    
    @PostMapping("/incluir")
    public ResponseEntity<Object> incluir(@RequestBody Eleicao eleicao) // chega um json
    {
        //System.out.println(partido.getNome());
        eleicaoDAO.save(eleicao);
        return new ResponseEntity<>(eleicao, HttpStatus.OK);
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<Object> excluir(@PathVariable(value="id") Long id)
    {
        //System.out.println("Deletar " + id);
        eleicaoDAO.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PostMapping("/alterar")
    public ResponseEntity<Object> alterar(@RequestBody Eleicao eleicao)
    {
        eleicaoDAO.save(eleicao);
        return new ResponseEntity<>(eleicao, HttpStatus.OK);
    }

    @GetMapping("/buscar-um/{id}")
    public ResponseEntity<Object> buscarUm(@PathVariable(value="id") Long id)
    {

        return new ResponseEntity<>(eleicaoDAO.findById(id).orElse(new Eleicao()), HttpStatus.OK);
    }

    @GetMapping("/buscar-todos")
    public ResponseEntity<Object> buscarTodos(@RequestParam(value="filtro") String filtro)
    { 
        return new ResponseEntity<>(eleicaoDAO.findWithFilter(filtro),HttpStatus.OK);
    }
    
}

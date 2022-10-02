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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.eleicoes.model.Usuario;
import com.example.eleicoes.repository.UsuarioDAO;

@CrossOrigin
@RestController
@RequestMapping(value="/apis/usuario")
public class UsuarioServiceController {

    @Autowired
    private UsuarioDAO usuarioDAO;
    
    @PostMapping("/incluir")
    public ResponseEntity<Object> incluir(@RequestBody Usuario usuario) // chega um json
    {
        //System.out.println(partido.getNome());
        usuarioDAO.save(usuario);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<Object> excluir(@PathVariable(value="id") Long id)
    {
        //System.out.println("Deletar " + id);
        usuarioDAO.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PostMapping("/alterar")
    public ResponseEntity<Object> alterar(@RequestBody Usuario usuario)
    {
        usuarioDAO.save(usuario);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    @GetMapping("/buscar-um/{id}")
    public ResponseEntity<Object> buscarUm(@PathVariable(value="id") Long id)
    {

        return new ResponseEntity<>(usuarioDAO.findById(id).orElse(new Usuario()), HttpStatus.OK);
    }
    
}

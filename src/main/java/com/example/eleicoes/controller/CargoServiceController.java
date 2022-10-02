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

import com.example.eleicoes.model.Cargo;
import com.example.eleicoes.repository.CargoDAO;

@CrossOrigin
@RestController
@RequestMapping(value="/apis/cargo")
public class CargoServiceController {

    @Autowired // transforma em JSON automaticamente
    private CargoDAO cargoDAO;

    @PostMapping("/incluir")
    public ResponseEntity<Object> incluir(@RequestBody Cargo cargo) // chega um json
    {
        //System.out.println(cargo.getNome());
        cargoDAO.save(cargo);
        return new ResponseEntity<>(cargo, HttpStatus.OK);
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<Object> excluir(@PathVariable(value="id") Long id)
    {
        //System.out.println("Deletar " + id);
        cargoDAO.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PostMapping("/alterar")
    public ResponseEntity<Object> alterar(@RequestBody Cargo cargo)
    {
        cargoDAO.save(cargo);
        return new ResponseEntity<>(cargo, HttpStatus.OK);
    }

    @GetMapping("/buscar-um/{id}")
    public ResponseEntity<Object> buscarUm(@PathVariable(value="id") Long id)
    {

        return new ResponseEntity<>(cargoDAO.findById(id).orElse(new Cargo()), HttpStatus.OK);
    }

    @GetMapping("/buscar-todos")
    public ResponseEntity<Object> buscarTodos(@RequestParam(value="filtro") String filtro)
    { 
        return new ResponseEntity<>(cargoDAO.findWithFilter(filtro),HttpStatus.OK);
    }
    
}

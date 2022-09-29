package com.example.eleicoes.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="candidato")
public class Candidato implements Serializable{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ca_id")
    private Long id;

    @Column(name="ca_numero")
    private Long num;

    @Column(name="ca_nome")
    private String nome;

    @ManyToOne
    @JoinColumn(name="par_id", nullable=false)
    private Partido partido;

    @OneToMany(mappedBy="candidato")
    private List<Cargo> cargos;

    public List<Cargo> getCargos() {
        return cargos;
    }

    public void setCargos(List<Cargo> cargos) {
        this.cargos = cargos;
    }

    @OneToMany(mappedBy = "candidato")
    private List<Votos> votos;


    public List<Votos> getVotos() {
        return votos;
    }

    public void setVotos(List<Votos> votos) {
        this.votos = votos;
    }

    public Candidato() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    
    public Long getNum() {
        return num;
    }

    public void setNum(Long num) {
        this.num = num;
    }

    
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    
    public Partido getPartido() {
        return partido;
    }

    public void setPartido(Partido partido) {
        this.partido = partido;
    }

    

    
}

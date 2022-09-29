package com.example.eleicoes.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="votos")
public class Votos implements Serializable{
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="vot_id")
    private Long id;

    @Column(name="vot_total")
    private Long total;


    @ManyToOne
    @JoinColumn(name = "ca_id", referencedColumnName = "ca_id")
    Candidato candidato;

    @ManyToOne
    @JoinColumn(name = "ele_id", referencedColumnName = "ele_id")
    Eleicao eleicao;

    public Votos() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    
    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    
    public Eleicao getEleicao() {
        return eleicao;
    }

    public void setEleicao(Eleicao eleicao) {
        this.eleicao = eleicao;
    }



    
}

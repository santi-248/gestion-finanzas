package com.apoud.finanzas.controller;

import com.apoud.finanzas.model.HistoricoMensual;
import com.apoud.finanzas.repository.HistoricoMensualRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController 
@RequestMapping ("/api/historico")
public class HistoricoMensualController {
    @Autowired
    private HistoricoMensualRepository repository;

    @GetMapping 
    public List<HistoricoMensual> obtenerTodos(){
        return repository.findAll();
    }

    @PostMapping 
    public HistoricoMensual crear(@RequestBody HistoricoMensual historico){
        return repository.save(historico);
    }
}

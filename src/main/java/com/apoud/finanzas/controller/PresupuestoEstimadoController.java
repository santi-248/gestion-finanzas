package com.apoud.finanzas.controller;

import com.apoud.finanzas.model.PresupuestoEstimado;
import com.apoud.finanzas.repository.PresupuestoEstimadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController 
@RequestMapping ("/api/presupuestos")
public class PresupuestoEstimadoController {
    @Autowired 
    private PresupuestoEstimadoRepository repository;

    @GetMapping
    public List<PresupuestoEstimado> obtenerTodos(){
        return repository.findAll();
    }

    @PostMapping
    public PresupuestoEstimado crear(@RequestBody PresupuestoEstimado presupuesto){
        return repository.save(presupuesto);
    }
}

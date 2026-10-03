package com.apoud.finanzas.controller;

import com.apoud.finanzas.model.MovimientoPresupuesto;
import com.apoud.finanzas.repository.MovimientoPresupuestoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/presupuesto")
@CrossOrigin(origins = "http://localhost:5173")
public class PresupuestoController {

    @Autowired
    private MovimientoPresupuestoRepository repository;

    // Trae todo el presupuesto armado
    @GetMapping
    public List<MovimientoPresupuesto> obtenerPresupuesto() {
        return repository.findAll();
    }

    // Recibe todas las listas juntas, limpia la base y guarda el nuevo presupuesto
    @PostMapping("/guardar-todo")
    public void guardarPresupuestoCompleto(@RequestBody List<MovimientoPresupuesto> movimientos) {
        repository.deleteAll(); 
        repository.saveAll(movimientos);
    }
}
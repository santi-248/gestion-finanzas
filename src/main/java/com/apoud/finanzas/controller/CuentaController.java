package com.apoud.finanzas.controller;

import com.apoud.finanzas.model.Cuenta;
import com.apoud.finanzas.repository.CuentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController 
@RequestMapping ("/api/cuentas")
public class CuentaController {

    @Autowired 
    private CuentaRepository cuentaRepository;

    @GetMapping 
    public List<Cuenta> obtenerTodas() {
        return cuentaRepository.findAll();
    }

    @PostMapping 
    public Cuenta crearCuenta(@RequestBody Cuenta cuenta){
        return cuentaRepository.save(cuenta);
    }

    @PutMapping("/{id}")
    public Cuenta actualizarSaldo(@PathVariable Long id, @RequestBody Cuenta cuentaActualizada) {
        return cuentaRepository.findById(id)
                .map(cuenta -> {
                    cuenta.setSaldoActual(cuentaActualizada.getSaldoActual());
                    return cuentaRepository.save(cuenta);
                }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void eliminarCuenta(@PathVariable Long id) {
        cuentaRepository.deleteById(id);
    }
}
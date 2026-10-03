package com.apoud.finanzas.repository;

import com.apoud.finanzas.model.MovimientoPresupuesto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovimientoPresupuestoRepository extends JpaRepository<MovimientoPresupuesto, Long> {
}
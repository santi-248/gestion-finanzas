package com.apoud.finanzas.repository;

import com.apoud.finanzas.model.PresupuestoEstimado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository 
public interface PresupuestoEstimadoRepository extends JpaRepository<PresupuestoEstimado, Long>{
}

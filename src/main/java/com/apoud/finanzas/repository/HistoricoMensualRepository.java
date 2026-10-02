package com.apoud.finanzas.repository;

import com.apoud.finanzas.model.HistoricoMensual;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository 
public interface HistoricoMensualRepository extends JpaRepository<HistoricoMensual, Long> {
}
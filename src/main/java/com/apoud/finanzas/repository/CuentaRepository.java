package com.apoud.finanzas.repository;

import com.apoud.finanzas.model.Cuenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository 
public interface CuentaRepository extends JpaRepository<Cuenta, Long> {
}

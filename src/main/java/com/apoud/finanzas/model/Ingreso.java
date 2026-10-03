package com.apoud.finanzas.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity 
@DiscriminatorValue("INGRESO")
public class Ingreso extends MovimientoPresupuesto{
    
}
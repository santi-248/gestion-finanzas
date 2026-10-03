package com.apoud.finanzas.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity 
@DiscriminatorValue("INVERSION")
public class Inversion extends MovimientoPresupuesto{
    
}
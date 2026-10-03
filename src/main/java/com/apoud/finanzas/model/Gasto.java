package com.apoud.finanzas.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity 
@DiscriminatorValue("GASTO")
public class Gasto extends MovimientoPresupuesto{
    
}
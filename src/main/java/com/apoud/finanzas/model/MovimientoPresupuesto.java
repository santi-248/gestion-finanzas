package com.apoud.finanzas.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@Entity 
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_movimiento", discriminatorType = DiscriminatorType.STRING)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "tipo")
@JsonSubTypes ({
    @JsonSubTypes.Type(value = Ingreso.class, name = "INGRESO"),
    @JsonSubTypes.Type(value = Gasto.class, name = "GASTO"),
    @JsonSubTypes.Type(value = Inversion.class, name = "INVERSION")
})

public abstract class MovimientoPresupuesto {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String moneda;
    private Double montoOriginal;
    private Double cotizacion;

    public MovimientoPresupuesto() {}

    public MovimientoPresupuesto(String nombre, String moneda, Double montoOriginal, Double cotizacion) {
        this.nombre = nombre;
        this.moneda = moneda;
        this.montoOriginal = montoOriginal;
        this.cotizacion = cotizacion;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getMoneda() { return moneda; }
    public void setMoneda(String moneda) { this.moneda = moneda; }

    public Double getMontoOriginal() { return montoOriginal; }
    public void setMontoOriginal(Double montoOriginal) { this.montoOriginal = montoOriginal; }

    public Double getCotizacion() { return cotizacion; }
    public void setCotizacion(Double cotizacion) { this.cotizacion = cotizacion; }
}
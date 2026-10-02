package com.apoud.finanzas.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table (name = "presupuestos")
public class PresupuestoEstimado {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descripcion;
    private BigDecimal monto;
    private String tipo;
    private Integer multiplicadorMensual;

    public PresupuestoEstimado(){
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public BigDecimal getMonto() { return monto; }
    public void setMonto(BigDecimal monto) { this.monto = monto; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public Integer getMultiplicadorMensual() { return multiplicadorMensual; }
    public void setMultiplicadorMensual(Integer multiplicadorMensual) { this.multiplicadorMensual = multiplicadorMensual; }
}

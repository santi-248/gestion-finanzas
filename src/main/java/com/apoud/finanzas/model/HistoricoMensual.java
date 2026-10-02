package com.apoud.finanzas.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "historico_mensual")
public class HistoricoMensual {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer mes;
    private Integer anio;
    private BigDecimal saldoTotal;

    public HistoricoMensual() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Integer getMes() { return mes; }
    public void setMes(Integer mes) { this.mes = mes; }
    public Integer getAnio() { return anio; }
    public void setAnio(Integer anio) { this.anio = anio; }
    public BigDecimal getSaldoTotal() { return saldoTotal; }
    public void setSaldoTotal(BigDecimal saldoTotal) { this.saldoTotal = saldoTotal; }
}

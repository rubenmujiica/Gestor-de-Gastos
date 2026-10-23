package com.rubenmujica.gestor_gastos_backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "presupuestos_mensuales")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PresupuestoMensual {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "ingreso_mensual", nullable = false)
    private BigDecimal ingresoMensual;

    @Column(name = "ahorro_fijo", nullable = false)
    private BigDecimal ahorroFijo;

    @Column(name = "mes", nullable = false)
    private Integer mes;

    @Column(name = "anio", nullable = false)
    private Integer anio;
}

package com.rubenmujica.gestor_gastos_backend.repository;

import com.rubenmujica.gestor_gastos_backend.model.PresupuestoMensual;
import com.rubenmujica.gestor_gastos_backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PresupuestoMensualRepository extends JpaRepository<PresupuestoMensual, Long> {
    Optional<PresupuestoMensual> findByUsuarioIdAndMesAndAnio(Long usuarioId, Integer mes, Integer anio);
}

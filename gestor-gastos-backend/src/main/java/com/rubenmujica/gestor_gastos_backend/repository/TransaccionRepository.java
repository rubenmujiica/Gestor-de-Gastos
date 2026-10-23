package com.rubenmujica.gestor_gastos_backend.repository;

import com.rubenmujica.gestor_gastos_backend.model.Transaccion;
import com.rubenmujica.gestor_gastos_backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransaccionRepository extends JpaRepository<Transaccion, Long> {
    List<Transaccion> findByUsuarioId(Long usuarioId);
}

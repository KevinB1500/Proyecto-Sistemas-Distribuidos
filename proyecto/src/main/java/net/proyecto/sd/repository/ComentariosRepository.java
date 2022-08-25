package net.proyecto.sd.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import net.proyecto.sd.model.Comentarios;
import net.proyecto.sd.model.ComentariosPK;

public interface ComentariosRepository extends JpaRepository<Comentarios, ComentariosPK>{
	
	@Query("SELECT a FROM Comentarios a "
			+ "WHERE (:id is null or a.id.id=:id) "
			+ "AND (:cuentas_id is null or a.id.cuentas_id=:cuentas_id) "
			+ "AND (:canchas_id is null or a.id.canchas_id=:canchas_id) "
			+ "AND (cast(:fecha as timestamp) is null or a.fecha=:fecha) "
			+ "AND (:mensaje is null or UPPER(a.mensaje) like %:mensaje%) "
			+ "ORDER BY a.id.id")
	public List<Comentarios> buscarPorParametros(
			@Param("id")Integer id,
			@Param("cuentas_id")Integer cuentas_id,
			@Param("canchas_id")Integer canchas_id,
			@Param("fecha")Date fecha,
			@Param("mensaje")String mensaje);
}
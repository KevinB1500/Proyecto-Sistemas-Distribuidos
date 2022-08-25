package net.proyecto.sd.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import net.proyecto.sd.model.Likes;
import net.proyecto.sd.model.LikesPK;

public interface LikesRepository extends JpaRepository<Likes, LikesPK>{

	@Query("SELECT a FROM Likes a "
			+ "WHERE (:id is null or a.id.id=:id) "
			+ "AND (:cuentas_id is null or a.id.cuentas_id=:cuentas_id) "
			+ "AND (:canchas_id is null or a.id.canchas_id=:canchas_id) "
			+ "AND (cast(:fecha as timestamp) is null or a.fecha=:fecha) "
			+ "ORDER BY a.id.id")
	public List<Likes> buscarPorParametros(
			@Param("id")Integer id,
			@Param("cuentas_id")Integer cuentas_id,
			@Param("canchas_id")Integer canchas_id,
			@Param("fecha")Date fecha);
}

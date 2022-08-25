package net.proyecto.sd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import net.proyecto.sd.model.Canchas;

public interface CanchasRepository extends JpaRepository<Canchas, Integer>{

	@Query("SELECT a FROM Canchas a "
			+ "WHERE (:id is null or a.id=:id) "
			+ "AND (:nombre is null or UPPER(a.nombre) like %:nombre%) "
			+ "AND (:precio is null or a.precio=:precio) "
			+ "AND (:descripcion is null or UPPER(a.descripcion) like %:descripcion%) "
			+ "AND (:zona is null or UPPER(a.zona) like %:zona%) "
			+ "AND (:direccion is null or UPPER(a.direccion) like %:direccion%) "
			+ "AND (:imgUrl is null or UPPER(a.imgUrl) like %:imgUrl%) "
			+ "AND (:coordenadas is null or UPPER(a.coordenadas) like %:coordenadas%) "
			+ "ORDER BY a.id")
	public List<Canchas> buscarPorParametros(
			@Param("id")Integer id,
			@Param("nombre")String nombre,
			@Param("precio")Double precio,
			@Param("descripcion")String descripcion,
			@Param("zona")String zona,
			@Param("direccion")String direccion,	
			@Param("imgUrl")String imgUrl,
			@Param("coordenadas")String coordenadas
			);
}
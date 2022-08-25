package net.proyecto.sd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import net.proyecto.sd.model.Cuentas;

public interface CuentasRepository extends JpaRepository<Cuentas, Integer>{
	
	@Query("SELECT a FROM Cuentas a "
			+ "WHERE (:id is null or a.id=:id) "
			+ "AND (:usuario is null or UPPER(a.usuario) like %:usuario%) "
			+ "AND (:clave is null or a.clave like %:clave%) "
			+ "AND (:correo is null or UPPER(a.correo) like %:correo%) "
			+ "AND (:tipo is null or UPPER(a.tipo) like %:tipo%) "
			+ "AND (:nombre is null or UPPER(a.nombre) like %:nombre%) "
			+ "AND (:telefono is null or UPPER(a.telefono) like %:telefono%) "
			+ "ORDER BY a.id")
	public List<Cuentas> buscarPorParametros(
			@Param("id")Integer id,
			@Param("usuario")String usuario,
			@Param("clave")String clave,
			@Param("correo")String correo,
			@Param("tipo")String tipo,
			@Param("nombre")String nombre,
			@Param("telefono")String telefono);
}

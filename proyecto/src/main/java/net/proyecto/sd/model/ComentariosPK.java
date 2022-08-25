package net.proyecto.sd.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

import net.proyecto.sd.model.Comentarios.ComentariosCreation;
import net.proyecto.sd.model.Comentarios.ComentariosUpdate;

@Embeddable
public class ComentariosPK implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@NotNull(groups = {ComentariosCreation.class, ComentariosUpdate.class}, message = "El id de cuentas no puede ser nulo")
	@Column(name = "cuentas_id")
	Integer cuentas_id;
	
	@NotNull(groups = {ComentariosCreation.class, ComentariosUpdate.class}, message = "El id de canchas no puede ser nulo")
	@Column(name = "canchas_id")
	Integer canchas_id;
	
	@NotNull(groups = {ComentariosCreation.class, ComentariosUpdate.class}, message = "El id no puede ser nulo")
	@Column(name = "id")
	Integer id;

	public ComentariosPK() {
		super();
	}

	public ComentariosPK(
			@NotNull(groups = { ComentariosCreation.class,
					ComentariosUpdate.class }, message = "El id de cuentas no puede ser nulo") Integer cuentas_id,
			@NotNull(groups = { ComentariosCreation.class,
					ComentariosUpdate.class }, message = "El id de canchas no puede ser nulo") Integer canchas_id,
			@NotNull(groups = { ComentariosCreation.class,
					ComentariosUpdate.class }, message = "El id no puede ser nulo") Integer id) {
		super();
		this.cuentas_id = cuentas_id;
		this.canchas_id = canchas_id;
		this.id = id;
	}

	public Integer getCuentas_id() {
		return cuentas_id;
	}

	public void setCuentas_id(Integer cuentas_id) {
		this.cuentas_id = cuentas_id;
	}

	public Integer getCanchas_id() {
		return canchas_id;
	}

	public void setCanchas_id(Integer canchas_id) {
		this.canchas_id = canchas_id;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
}
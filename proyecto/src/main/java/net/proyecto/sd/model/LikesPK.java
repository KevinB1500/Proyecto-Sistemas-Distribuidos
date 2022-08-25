package net.proyecto.sd.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

import net.proyecto.sd.model.Likes.LikesCreation;
import net.proyecto.sd.model.Likes.LikesUpdate;

@Embeddable
public class LikesPK implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Column(name = "canchas_id")
	@NotNull(groups = {LikesCreation.class, LikesUpdate.class}, message = "El id de cancha no puede ser nulo")
	Integer canchas_id;
	
	@Column(name = "cuentas_id")
	@NotNull(groups = {LikesCreation.class, LikesUpdate.class}, message = "El id de cuenta no puede ser nulo")
	Integer cuentas_id;

	@Column(name = "id")
	@NotNull(groups = {LikesCreation.class, LikesUpdate.class}, message = "El id no puede ser nulo")
	Integer id;
	
	public LikesPK() {
		super();
	}

	public LikesPK(
			@NotNull(groups = { LikesCreation.class,
					LikesUpdate.class }, message = "El id de cancha no puede ser nulo") Integer canchas_id,
			@NotNull(groups = { LikesCreation.class,
					LikesUpdate.class }, message = "El id de cuenta no puede ser nulo") Integer cuentas_id,
			@NotNull(groups = { LikesCreation.class,
					LikesUpdate.class }, message = "El id no puede ser nulo") Integer id) {
		super();
		this.canchas_id = canchas_id;
		this.cuentas_id = cuentas_id;
		this.id = id;
	}

	public Integer getCanchas_id() {
		return canchas_id;
	}

	public void setCanchas_id(Integer canchas_id) {
		this.canchas_id = canchas_id;
	}

	public Integer getCuentas_id() {
		return cuentas_id;
	}

	public void setCuentas_id(Integer cuentas_id) {
		this.cuentas_id = cuentas_id;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}	
}
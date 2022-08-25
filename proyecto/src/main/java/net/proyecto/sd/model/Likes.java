package net.proyecto.sd.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Cacheable(true)
@Entity
@Table(name="likes")
public class Likes implements Serializable{
	private static final long serialVersionUID = 1L;
	
	public interface LikesCreation{}
	public interface LikesUpdate{}
	
	@EmbeddedId
	@NotNull(groups = {LikesCreation.class, LikesUpdate.class}, message = "El id no puede ser nulo")
	@Valid
	@Column(name = "id")
	LikesPK id;
	
	@Column(name = "fecha")
	@NotNull(groups = {LikesCreation.class, LikesUpdate.class}, message = "La fecha no puede ser nula")
	Date fecha;
	
	public Likes() {
		super();
	}

	public Likes(
			@NotNull(groups = { LikesCreation.class,
					LikesUpdate.class }, message = "El id no puede ser nulo") @Valid LikesPK id,
			@NotNull(groups = { LikesCreation.class,
					LikesUpdate.class }, message = "La fecha no puede ser nula") Date fecha) {
		super();
		this.id = id;
		this.fecha = fecha;
	}

	public LikesPK getId() {
		return id;
	}

	public void setId(LikesPK id) {
		this.id = id;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
}
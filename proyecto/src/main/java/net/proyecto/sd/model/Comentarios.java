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
import javax.validation.constraints.Size;

@Entity
@Cacheable(true)
@Table(name = "comentarios")
public class Comentarios implements Serializable{
	private static final long serialVersionUID = 1L;
	
	public interface ComentariosCreation{}
	public interface ComentariosUpdate{}
	
	@Valid
	@EmbeddedId
	@NotNull(groups = {ComentariosCreation.class, ComentariosUpdate.class}, message = "El id no puede ser nulo")
	@Column(name = "id", insertable = true, updatable = false)
	ComentariosPK id;
	
	@Column(name = "fecha")
	Date fecha;
	
	@Column(name = "mensaje", insertable = true, updatable = true, nullable = true)
	@Size(max = 250, message = "El mensaje puede contener máximo 250 caracteres")
	String mensaje;

	public Comentarios() {
		super();
	}

	public Comentarios(
			@Valid @NotNull(groups = { ComentariosCreation.class,
					ComentariosUpdate.class }, message = "El id no puede ser nulo") ComentariosPK id,
			Date fecha, @Size(max = 250, message = "El mensaje puede contener máximo 250 caracteres") String mensaje) {
		super();
		this.id = id;
		this.fecha = fecha;
		this.mensaje = mensaje;
	}

	public ComentariosPK getId() {
		return id;
	}

	public void setId(ComentariosPK id) {
		this.id = id;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
}
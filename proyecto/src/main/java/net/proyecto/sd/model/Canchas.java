package net.proyecto.sd.model;

import java.io.Serializable;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "canchas")
@Cacheable(false)
@NamedQuery(name="Canchas.findAll", query="SELECT a FROM Canchas a")
public class Canchas implements Serializable{
	private static final long serialVersionUID = 1L;

	public interface CanchasCreation{}
	public interface CanchasUpdate{}
	
	@Id
	@Valid
	@Column(name = "id", updatable = false, insertable = true)
	@NotNull(groups = {CanchasCreation.class, CanchasUpdate.class}, message = "El id no puede ser nulo")
	Integer id;
	
	@Column(name = "nombre")
	@NotNull(groups = {CanchasCreation.class, CanchasUpdate.class}, message = "El nombre de la cancha no puede ser nulo")
	@Size(max = 45, message = "El nombre de la cancha puede contener máximo 45 caracteres")
	String nombre;
	
	@Column(name = "precio")
	@NotNull(groups = {CanchasCreation.class, CanchasUpdate.class}, message = "El precio no puede ser nulo")
	@Digits(integer = 3, fraction = 2, message = "Precio es de 3 cifras enteras y 2 decimales")
	Double precio;
	
	@Column(name = "descripcion")
	@NotNull(groups = {CanchasCreation.class, CanchasUpdate.class}, message = "La descripción no puede ser nula")
	@Size(max = 250, message = "La descripción puede contener máximo 250 caracteres")
	String descripcion;
	
	@Column(name = "zona")
	@Size(max = 45, message = "La zona puede contener máximo 45 caracteres")
	String zona;
	
	@Column(name = "direccion")
	@Size(max = 250, message = "La dirección puede contener máximo 250 caracteres")
	@NotNull(groups = {CanchasCreation.class, CanchasUpdate.class}, message = "La dirección no puede ser nula")
	String direccion;
	
	@Column(name = "img_url")
	@Size(max = 500, message = "la url de la imagen puede contener máximo 500 caracteres")
	String imgUrl;
	
	@Column(name = "coordenadas")
	@Size(max = 250, message = "Las coordenadas pueden contener un máximo de 250 caracteres")
	String coordenadas;

	public Canchas() {
		super();
	}

	public Canchas(
			@Valid @NotNull(groups = { CanchasCreation.class,
					CanchasUpdate.class }, message = "El id no puede ser nulo") Integer id,
			@NotNull(groups = { CanchasCreation.class,
					CanchasUpdate.class }, message = "El nombre de la cancha no puede ser nulo") @Size(max = 45, message = "El nombre de la cancha puede contener máximo 45 caracteres") String nombre,
			@NotNull(groups = { CanchasCreation.class,
					CanchasUpdate.class }, message = "El precio no puede ser nulo") @Digits(integer = 3, fraction = 2, message = "Precio es de 3 cifras enteras y 2 decimales") Double precio,
			@NotNull(groups = { CanchasCreation.class,
					CanchasUpdate.class }, message = "La descripción no puede ser nula") @Size(max = 250, message = "La descripción puede contener máximo 250 caracteres") String descripcion,
			@Size(max = 45, message = "La zona puede contener máximo 45 caracteres") String zona,
			@Size(max = 250, message = "La dirección puede contener máximo 250 caracteres") @NotNull(groups = {
					CanchasCreation.class,
					CanchasUpdate.class }, message = "La dirección no puede ser nula") String direccion,
			@Size(max = 500, message = "la url de la imagen puede contener máximo 500 caracteres") String imgUrl,
			@Size(max = 250, message = "Las coordenadas pueden contener un máximo de 250 caracteres") String coordenadas) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.precio = precio;
		this.descripcion = descripcion;
		this.zona = zona;
		this.direccion = direccion;
		this.imgUrl = imgUrl;
		this.coordenadas = coordenadas;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Double getPrecio() {
		return precio;
	}

	public void setPrecio(Double precio) {
		this.precio = precio;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getZona() {
		return zona;
	}

	public void setZona(String zona) {
		this.zona = zona;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getCoordenadas() {
		return coordenadas;
	}

	public void setCoordenadas(String coordenadas) {
		this.coordenadas = coordenadas;
	}
}
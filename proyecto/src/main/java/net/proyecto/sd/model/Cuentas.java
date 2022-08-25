package net.proyecto.sd.model;

import java.io.Serializable;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "cuentas")
@Cacheable(true)
public class Cuentas implements Serializable{
	private static final long serialVersionUID = 1L;
	
	public interface CuentasCreation{}
	public interface CuentasUpdate{}
	
	@Column(name = "id", insertable = true, updatable = false)
	@Valid
	@Id
	@NotNull(groups = {CuentasCreation.class, CuentasUpdate.class}, message = "El id no puede ser nulo")
	Integer id;
	
	@Column(name = "usuario", insertable = true, updatable = true)
	@NotNull(groups = {CuentasCreation.class, CuentasUpdate.class}, message = "El usuario no puede ser nulo")
	@Size(max = 45, message = "El usuario puede contener máximo 45 caracteres")
	String usuario;
	
	@Column(name = "clave", insertable = true, updatable = true)
	@NotNull(groups = {CuentasCreation.class, CuentasUpdate.class}, message = "El clave no puede ser nula")
	@Size(max = 250, message = "La clave puede contener máximo 250 caracteres")
	String clave;
	
	@Column(name = "correo", insertable = true, updatable = true)
	@NotNull(groups = {CuentasCreation.class, CuentasUpdate.class}, message = "El correo electrónico no puede ser nulo")
	@Size(max = 45, message = "El correo electrónico puede contener máximo 45 caracteres")
	String correo;
	
	@Column(name = "tipo", insertable = true, updatable = true)
	@Size(max = 45, message = "El tipo de cuenta puede contener máximo 45 caracteres")
	String tipo;
	
	@Column(name = "nombre", insertable = true, updatable = true)
	@NotNull(groups = {CuentasCreation.class, CuentasUpdate.class}, message = "El nombre del usuario no puede ser nulo")
	@Size(max = 200, message = "El nombre puede contener máximo 200 caracters")
	String nombre;
	
	@Column(name = "telefono", insertable = true, updatable = true)
	@NotNull(groups = {CuentasCreation.class, CuentasUpdate.class}, message = "El telefono no puede ser nulo")
	@Size(max = 10, message = "El campo telefono puede contener máximo 10 caracteres")
	String telefono;

	public Cuentas() {
		super();
	}

	public Cuentas(
			@Valid @NotNull(groups = { CuentasCreation.class,
					CuentasUpdate.class }, message = "El id no puede ser nulo") Integer id,
			@NotNull(groups = { CuentasCreation.class,
					CuentasUpdate.class }, message = "El usuario no puede ser nulo") @Size(max = 45, message = "El usuario puede contener máximo 45 caracteres") String usuario,
			@NotNull(groups = { CuentasCreation.class,
					CuentasUpdate.class }, message = "El clave no puede ser nula") @Size(max = 250, message = "La clave puede contener máximo 250 caracteres") String clave,
			@NotNull(groups = { CuentasCreation.class,
					CuentasUpdate.class }, message = "El correo electrónico no puede ser nulo") @Size(max = 45, message = "El correo electrónico puede contener máximo 45 caracteres") String correo,
			@Size(max = 45, message = "El tipo de cuenta puede contener máximo 45 caracteres") String tipo,
			@NotNull(groups = { CuentasCreation.class,
					CuentasUpdate.class }, message = "El nombre del usuario no puede ser nulo") @Size(max = 200, message = "El nombre puede contener máximo 200 caracters") String nombre,
			@NotNull(groups = { CuentasCreation.class,
					CuentasUpdate.class }, message = "El telefono no puede ser nulo") @Size(max = 10, message = "El campo telefono puede contener máximo 10 caracteres") String telefono) {
		super();
		this.id = id;
		this.usuario = usuario;
		this.clave = clave;
		this.correo = correo;
		this.tipo = tipo;
		this.nombre = nombre;
		this.telefono = telefono;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getClave() {
		return clave;
	}

	public void setClave(String clave) {
		this.clave = clave;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
}
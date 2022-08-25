package net.proyecto.sd.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.persistence.NoResultException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import net.proyecto.sd.model.Cuentas;
import net.proyecto.sd.repository.CuentasRepository;
import net.proyecto.sd.utils.FuncionesGenerales;

@RestController
@RequestMapping("/cuentas")
public class CuentasController {

	@Autowired
	public CuentasRepository cuentasRepo;
	
	@Autowired
	public TransactionTemplate transactionTemplate;
	
	@Autowired
	public FuncionesGenerales fg;
	
	@Operation(summary = "consultarLista", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@GetMapping
	public List<Cuentas> consultarLista(@RequestParam(name = "id", required = false)Integer id,
										@RequestParam(name = "usuario", required = false)String usuario, 
										@RequestParam(name = "clave", required = false)String clave, 
										@RequestParam(name = "correo", required = false)String correo, 
										@RequestParam(name = "tipo", required = false)String tipo, 
										@RequestParam(name = "nombre", required = false)String nombre, 
										@RequestParam(name = "telefono", required = false)String telefono
										){
		List<Cuentas>cuenta=cuentasRepo.buscarPorParametros(id, (usuario==null)?null:usuario.toUpperCase(), clave, 
							correo, (tipo==null)?null:tipo.toUpperCase(), (nombre==null)?null:nombre.toUpperCase(), telefono);
		return cuenta;
	}
	
	@Operation(summary = "consultarPorCodigo", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@GetMapping(path = "/{id}")
	public Cuentas consultarPorCodigo(@PathVariable("id")Integer id) {
		Optional<Cuentas>cuenta=cuentasRepo.findById(id);
		if(!cuenta.isPresent()) {
			throw new NoResultException("Cuenta con id " + id + " no existe");
		}
		return cuenta.get();
	}
	
	@Operation(summary = "ingresarCuenta", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@PostMapping
	public ResponseEntity<?>ingresar(@RequestBody Cuentas transaccion, HttpServletRequest request){
		fg.validar(transaccion, Cuentas.CuentasCreation.class);
		transactionTemplate.execute(new TransactionCallbackWithoutResult() {
			
			@Override
			protected void doInTransactionWithoutResult(TransactionStatus status) {
				validacionesPost(transaccion);
				cuentasRepo.save(transaccion);
			}
		});
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(transaccion.getId()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	@Operation(summary = "actualizarCuenta", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@PutMapping
	public ResponseEntity<?>actualizar(@RequestBody Cuentas transaccion, HttpServletRequest request){
		fg.validar(transaccion, Cuentas.CuentasUpdate.class);
		validacionesPut(transaccion);
		cuentasRepo.save(transaccion);
		return new ResponseEntity<>("", HttpStatus.OK);
	}
	
	private void validacionesPost(Cuentas transaccion) {
		if(cuentasRepo.existsById(transaccion.getId())) {
			throw new DataIntegrityViolationException("Cuenta con id " + 
		transaccion.getId() + " ya existe");
		}
	}
	
	private void validacionesPut(Cuentas transaccion) {
		if(!cuentasRepo.existsById(transaccion.getId())) {
			throw new NoResultException("Cuenta con id " + 
					transaccion.getId() + " no existe");
		}
	}
}

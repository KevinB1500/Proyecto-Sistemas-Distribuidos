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
import net.proyecto.sd.model.Canchas;
import net.proyecto.sd.repository.CanchasRepository;
import net.proyecto.sd.utils.FuncionesGenerales;

@RestController
@RequestMapping("/canchas")
public class CanchasController {
	
	@Autowired
	public CanchasRepository canchasRepo;
	
	@Autowired
	public TransactionTemplate transactionTemplate;
	
	@Autowired
	public FuncionesGenerales fg;
	
	@Operation(summary = "consultarLista", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@GetMapping
	public List<Canchas> consultarLista(@RequestParam(name = "id", required = false)Integer id,
										@RequestParam(name = "nombre", required = false)String nombre, 
										@RequestParam(name = "precio", required = false)Double precio, 
										@RequestParam(name = "descripcion", required = false)String descripcion, 
										@RequestParam(name = "zona", required = false)String zona, 
										@RequestParam(name = "direccion", required = false)String direccion, 
										@RequestParam(name = "imgUrl", required = false)String imgUrl, 
										@RequestParam(name = "coordenadas", required = false)String coordenadas 
										){
		List<Canchas>canchas=canchasRepo.buscarPorParametros(id, (nombre==null)?null:nombre.toUpperCase(), precio, 
				(descripcion==null)?null:descripcion.toUpperCase(), (zona==null)?null:zona.toUpperCase(), 
						(direccion==null)?null:direccion.toUpperCase(), imgUrl, coordenadas);
		return canchas;
	}
	
	@Operation(summary = "consultarPorCodigo", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@GetMapping("/{id}")
	public Canchas consultarPorCodigo(@PathVariable("id")Integer id) {
		Optional<Canchas>cancha=canchasRepo.findById(id);
		if(!cancha.isPresent()) {
			throw new NoResultException("Cancha con id " + id + " no existe");
		}
		return cancha.get();
	}
	
	@Operation(summary = "ingresar", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@PostMapping
	public ResponseEntity<?>ingresar(@RequestBody Canchas transaccion, HttpServletRequest request){
		fg.validar(transaccion, Canchas.CanchasCreation.class);
		transactionTemplate.execute(new TransactionCallbackWithoutResult() {
			
			@Override
			protected void doInTransactionWithoutResult(TransactionStatus status) {
				validacionesPost(transaccion);
				canchasRepo.save(transaccion);
			}
		});
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(transaccion.getId()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	@Operation(summary = "actualizar", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@PutMapping
	public ResponseEntity<?>actualizar(@RequestBody Canchas transaccion, HttpServletRequest request){
		fg.validar(transaccion, Canchas.CanchasUpdate.class);
		validacionesPut(transaccion);
		canchasRepo.save(transaccion);
		return new ResponseEntity<>("", HttpStatus.OK);
	}
	
	private void validacionesPost(Canchas transaccion) {
		if(canchasRepo.existsById(transaccion.getId())) {
			throw new DataIntegrityViolationException("Cancha con id " + 
		transaccion.getId() + " ya existe");
		}
	}
	
	private void validacionesPut(Canchas transaccion) {
		if(!canchasRepo.existsById(transaccion.getId())) {
			throw new NoResultException("Cancha con id " + 
					transaccion.getId() + " no existe");
		}
	}
}
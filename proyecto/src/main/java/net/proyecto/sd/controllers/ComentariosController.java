package net.proyecto.sd.controllers;

import java.net.URI;
import java.util.Date;
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
import net.proyecto.sd.model.Comentarios;
import net.proyecto.sd.model.ComentariosPK;
import net.proyecto.sd.repository.ComentariosRepository;
import net.proyecto.sd.utils.FuncionesGenerales;

@RestController
@RequestMapping("/comentarios")
public class ComentariosController {

	@Autowired
	public ComentariosRepository comentRepo;
	
	@Autowired
	public TransactionTemplate transactionTemplate;
	
	@Autowired
	public FuncionesGenerales fg;
	
	@Operation(summary = "consultarLista", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@GetMapping
	public List<Comentarios> consultarLista(@RequestParam(name = "id", required = false)Integer id,
										@RequestParam(name = "cuentas_id", required = false)Integer cuentas_id, 
										@RequestParam(name = "canchas_id", required = false)Integer canchas_id, 
										@RequestParam(name = "fecha", required = false)Date fecha, 
										@RequestParam(name = "mensaje", required = false)String mensaje 
										){
		List<Comentarios>coment=comentRepo.buscarPorParametros(id, cuentas_id, canchas_id, 
				fecha, (mensaje==null)?null:mensaje.toUpperCase());
		return coment;
	}
	
	@Operation(summary = "consultarPorCodigo", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@GetMapping("/{id}/{cuentas_id}/{canchas_id}")
	public Comentarios consultarPorCodigo(@PathVariable("id")Integer id,
										  @PathVariable("cuentas_id")Integer cuentas_id,
										  @PathVariable("canchas_id")Integer canchas_id) {
		Optional<Comentarios>coment=comentRepo.findById(new ComentariosPK(id, cuentas_id, canchas_id));
		if(!coment.isPresent()) {
			throw new NoResultException("Comentario con id " + id + " cuenta " + cuentas_id + 
					" cancha " + canchas_id + " no existe");
		}
		return coment.get();
	}
	
	@Operation(summary = "ingresarComentario", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@PostMapping
	public ResponseEntity<?>ingresar(@RequestBody Comentarios transaccion, HttpServletRequest request){
		fg.validar(transaccion, Comentarios.ComentariosCreation.class);
		transactionTemplate.execute(new TransactionCallbackWithoutResult() {
			
			@Override
			protected void doInTransactionWithoutResult(TransactionStatus status) {
				validacionesPost(transaccion);
				comentRepo.save(transaccion);
			}
		});
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}/{cuentas_id}/{canchas_id}")
				.buildAndExpand(transaccion.getId().getId(), transaccion.getId().getCuentas_id(), 
				transaccion.getId().getCanchas_id()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	@Operation(summary = "actualizarComentario", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@PutMapping
	public ResponseEntity<?>actualizar(@RequestBody Comentarios transaccion, HttpServletRequest request){
		fg.validar(transaccion, Comentarios.ComentariosUpdate.class);
		validacionesPut(transaccion);
		comentRepo.save(transaccion);
		return new ResponseEntity<>("", HttpStatus.OK);
	}
	
	private void validacionesPost(Comentarios transaccion) {
		if(comentRepo.existsById(new ComentariosPK(transaccion.getId().getId(), transaccion.getId().getCuentas_id(), 
				transaccion.getId().getCanchas_id()))) {
			throw new DataIntegrityViolationException("Comentario con id " + 
		transaccion.getId() + ", id de cancha" + transaccion.getId().getCanchas_id() + " ya existe");
		}
	}
	
	private void validacionesPut(Comentarios transaccion) {
		if(!comentRepo.existsById(transaccion.getId())) {
			throw new NoResultException("Comentario con id " + 
					transaccion.getId() + " no existe");
		}
	}
}

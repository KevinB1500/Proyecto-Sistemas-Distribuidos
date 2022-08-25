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
import net.proyecto.sd.model.Likes;
import net.proyecto.sd.model.LikesPK;
import net.proyecto.sd.repository.LikesRepository;
import net.proyecto.sd.utils.FuncionesGenerales;

@RestController
@RequestMapping("/likes")
public class LikesController {

	@Autowired
	public LikesRepository likeRepo;
	
	@Autowired
	public TransactionTemplate transactionTemplate;
	
	@Autowired
	public FuncionesGenerales fg;
	
	@Operation(summary = "consultarLista", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@GetMapping
	public List<Likes> consultarLista(@RequestParam(name = "id", required = false)Integer id,
										@RequestParam(name = "canchas_id", required = false)Integer canchas_id, 
										@RequestParam(name = "cuentas_id", required = false)Integer cuentas_id, 
										@RequestParam(name = "descripcion", required = false)Date fecha
										){
		List<Likes>like=likeRepo.buscarPorParametros(id, canchas_id, cuentas_id, 
				fecha);
		return like;
	}
	
	@Operation(summary = "consultarPorCodigo", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@GetMapping("/{id}/{cuentas_id}/{canchas_id}")
	public Likes consultarPorCodigo(@PathVariable("id")Integer id,
										  @PathVariable("cuentas_id")Integer cuentas_id,
										  @PathVariable("canchas_id")Integer canchas_id) {
		Optional<Likes>like=likeRepo.findById(new LikesPK(id, cuentas_id, canchas_id));
		if(!like.isPresent()) {
			throw new NoResultException("Comentario con id " + id + " cuenta " + cuentas_id + 
					" cancha " + canchas_id + " no existe");
		}
		return like.get();
	}
	
	@Operation(summary = "ingresarLike", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@PostMapping
	public ResponseEntity<?>ingresar(@RequestBody Likes transaccion, HttpServletRequest request){
		fg.validar(transaccion, Likes.LikesCreation.class);
		transactionTemplate.execute(new TransactionCallbackWithoutResult() {
			
			@Override
			protected void doInTransactionWithoutResult(TransactionStatus status) {
				validacionesPost(transaccion);
				likeRepo.save(transaccion);
			}
		});
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(transaccion.getId()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	@Operation(summary = "actualizar", security = {@SecurityRequirement(name = "Autorización token módulo proyecto")})
	@PutMapping
	public ResponseEntity<?>actualizar(@RequestBody Likes transaccion, HttpServletRequest request){
		fg.validar(transaccion, Likes.LikesUpdate.class);
		validacionesPut(transaccion);
		likeRepo.save(transaccion);
		return new ResponseEntity<>("", HttpStatus.OK);
	}
	
	private void validacionesPost(Likes transaccion) {
		if(likeRepo.existsById(transaccion.getId())) {
			throw new DataIntegrityViolationException("Like con id " + 
		transaccion.getId() + " ya existe");
		}
	}
	
	private void validacionesPut(Likes transaccion) {
		if(!likeRepo.existsById(transaccion.getId())) {
			throw new NoResultException("Likes con id " + 
					transaccion.getId() + " no existe");
		}
	}
}
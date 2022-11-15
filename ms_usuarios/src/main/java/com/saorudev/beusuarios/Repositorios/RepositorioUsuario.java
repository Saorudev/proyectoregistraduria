package com.saorudev.beusuarios.Repositorios;
import com.saorudev.beusuarios.Modelos.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioUsuario extends MongoRepository<Usuario, String> {

}

package com.saorudev.beusuarios.Repositorios;
import com.saorudev.beusuarios.Modelos.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
public interface RepositorioUsuario extends MongoRepository<Usuario, String> {
    @Query("{'correo': ?0}")
    public Usuario getUserByEmail(String correo);

}

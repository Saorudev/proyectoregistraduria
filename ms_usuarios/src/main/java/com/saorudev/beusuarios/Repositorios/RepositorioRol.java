package com.saorudev.beusuarios.Repositorios;

import com.saorudev.beusuarios.Modelos.Rol;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioRol  extends  MongoRepository<Rol, String> {

}

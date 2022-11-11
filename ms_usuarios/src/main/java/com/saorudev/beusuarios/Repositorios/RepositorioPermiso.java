package com.saorudev.beusuarios.Repositorios;

import com.saorudev.beusuarios.Modelos.Permiso;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioPermiso extends MongoRepository<Permiso, String> {

}

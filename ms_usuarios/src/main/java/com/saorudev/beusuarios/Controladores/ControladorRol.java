package com.saorudev.beusuarios.Controladores;
import com.saorudev.beusuarios.Modelos.Permiso;
import com.saorudev.beusuarios.Modelos.Rol;
import com.saorudev.beusuarios.Modelos.Usuario;
import com.saorudev.beusuarios.Repositorios.RepositorioPermiso;
import com.saorudev.beusuarios.Repositorios.RepositorioRol;
import com.saorudev.beusuarios.Repositorios.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
@CrossOrigin
@RestController
@RequestMapping("/roles")

public class ControladorRol {
    @Autowired
    private RepositorioRol miRepositorioRol;


    @GetMapping("")
    public List<Rol> index(){
        return this.miRepositorioRol.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Rol create(@RequestBody  Rol infoRol){
        return this.miRepositorioRol.save(infoRol);
    }
    @GetMapping("{id}")
    public Rol show(@PathVariable String id){
        Rol rolActual=this.miRepositorioRol
                .findById(id)
                .orElse(null);
        return rolActual;
    }
    @PutMapping("{id}")
    public Rol update(@PathVariable String id,@RequestBody  Rol infoRol){
        Rol rolActual=this.miRepositorioRol
                .findById(id)
                .orElse(null);
        if (rolActual!=null){
            rolActual.setNombre(infoRol.getNombre());
            return this.miRepositorioRol.save(rolActual);
        }else{
            return  null;
        }
    }
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public void delete(@PathVariable String id){
        Rol rolActual=this.miRepositorioRol
                .findById(id)
                .orElse(null);
        if (rolActual!=null){
            this.miRepositorioRol.delete(rolActual);
        }
    }
}
package com.saorudev.beusuarios.Controladores;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.saorudev.beusuarios.Modelos.Permiso;
import com.saorudev.beusuarios.Modelos.PermisosRol;
import com.saorudev.beusuarios.Modelos.Rol;
import com.saorudev.beusuarios.Repositorios.RepositorioPermiso;
import com.saorudev.beusuarios.Repositorios.RepositorioPermisosRol;
import com.saorudev.beusuarios.Repositorios.RepositorioRol;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/permisosrol")

public class ControladorPermisosRol {
    @Autowired
    private RepositorioPermisosRol miRepositorioPermisosRol;

    @Autowired
    private RepositorioPermiso miRepositorioPermiso;

    @Autowired
    private RepositorioRol miRepositorioRol;


    @GetMapping("")
    public List<PermisosRol> index(){
        return this.miRepositorioPermisosRol.findAll();
    }

    // Asignación Rol y Permiso
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("roles/{id_rol}/permisos/{id_permiso}")
    public PermisosRol create(@PathVariable String id_rol,@PathVariable String id_permiso){
        PermisosRol nuevo = new PermisosRol();
        Rol elRol=this.miRepositorioRol.findById(id_rol).get();
        Permiso elPermiso = this.miRepositorioPermiso.findById(id_permiso).get();
        if (elRol!=null && elPermiso!=null){
            nuevo.setPermiso(elPermiso);
            nuevo.setRol(elRol);
            return this.miRepositorioPermisosRol.save(nuevo);
        }else{
            return null;
        }
    }
    @GetMapping("{id}")
    public PermisosRol show(@PathVariable String id){
        PermisosRol permisosRolesActual=this.miRepositorioPermisosRol
                .findById(id)
                .orElse(null);
        return permisosRolesActual;
    }
    // Modificacion Rol y Permiso
    @PutMapping("{id}/roles/{id_rol}/permisos/{id_permiso}")
    public PermisosRol update(@PathVariable String id,@PathVariable String id_rol,@PathVariable String id_permiso){
        PermisosRol permisosRolActual=this.miRepositorioPermisosRol
                .findById(id)
                .orElse(null);
        Rol elRol=this.miRepositorioRol.findById(id_rol).get();
        Permiso elPermiso=this.miRepositorioPermiso.findById(id_permiso).get();
        if(permisosRolActual!=null && elPermiso!=null && elRol!=null){
            permisosRolActual.setPermiso(elPermiso);
            permisosRolActual.setRol(elRol);
            return this.miRepositorioPermisosRol.save(permisosRolActual);
        }else{
            return null;
        }
    }
    @GetMapping("validar-permiso/roles/{id_rol}")
    public PermisosRol getPermiso(@PathVariable String id_rol, @RequestBody Permiso infoPermiso){
        Permiso elPermiso = this.miRepositorioPermiso.getPermiso(infoPermiso.getUrl(),infoPermiso.getMetodo());
        Rol elRol = this.miRepositorioRol.findById(id_rol).get();
        if ( elPermiso != null && elRol != null){
            return this.miRepositorioPermisosRol.getPermisoRol(elRol.get_id(), elPermiso.get_id());
        }
        else {
            return null;
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public void delete(@PathVariable String id){
        PermisosRol permisosRolesActual=this.miRepositorioPermisosRol
                .findById(id)
                .orElse(null);
        if (permisosRolesActual!=null){
            this.miRepositorioPermisosRol.delete(permisosRolesActual);
        }
    }
}

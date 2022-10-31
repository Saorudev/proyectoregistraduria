from Modelos.Resultado import Resultado
from Modelos.Partido import Partido
from Modelos.Mesa import Mesa
from Repositorios.RepositorioResultado import RepositorioResultado
from Repositorios.RepositorioPartido import RepositorioPartido
from Repositorios.RepositorioMesa import RepositorioMesa

class ControladorResultado():
    def __init__(self):
        self.repositorioResultado = RepositorioResultado()
        self.repositorioPartido = RepositorioPartido()
        self.repositorioMesa = RepositorioMesa()

    def index(self):
        return self.repositorioResultado.findAll()

    """
    Asignacion partido y mesa a resultado
    """

    def create(self,infoResultado,id_mesa,id_partido):
        nuevoResultado = Resultado(infoResultado)
        laMesa = Mesa(self.repositorioMesa.findById(id_mesa))
        elPartido = Partido(self.repositorioPartido.findById(id_partido))
        nuevoResultado.mesa = laMesa
        nuevoResultado.partido = elPartido
        return self.repositorioResultado.save(nuevoResultado)

    def show(self):
        elResultado = Resultado(self.repositorioResultado.findById(id))
        return elResultado.__dict__

    """
    Modificacion de resultado (mesa y partido)
    """

    def update(self,id,infoResultado,id_mesa,id_partido):
        elResultado = Resultado(self.repositorioResultado.findById(id))
        elResultado.numero_mesa = infoResultado["numero_mesa"]
        laMesa = Mesa(self.repositorioMesa.findById(id_mesa))
        elPartido = Partido (self.repositorioPartido.findById(id_partido))
        elResultado.mesa = laMesa
        elResultado.partido = elPartido
        return self.repositorioResultado.save(elResultado)

    def delete (self, id):
        return self.repositorioResultado.delete(id)

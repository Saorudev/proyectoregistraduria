from Modelos.resultadoModel import Resultado
from Modelos.partidoModel import Partido
from Modelos.mesaModel import Mesa
from Repositorios.repositorioResultado import RepositorioResultado
from Repositorios.repositorioPartido import RepositorioPartido
from Repositorios.repositorioMesa import RepositorioMesa

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

    def show(self,id):
        elResultado = Resultado(self.repositorioResultado.findById(id))
        return elResultado.__dict__

    """
    Modificacion de resultado (mesa y partido)
    """

    def update(self,id,infoResultado,id_mesa,id_partido):
        elResultado = Resultado(self.repositorioResultado.findById(id))
        elResultado.id_mesa = infoResultado["numero_mesa"]
        elResultado.id_partido = infoResultado["id_partido"]
        laMesa = Mesa(self.repositorioMesa.findById(id_mesa))
        elPartido = Partido (self.repositorioPartido.findById(id_partido))
        elResultado.mesa = laMesa
        elResultado.partido = elPartido
        return self.repositorioResultado.save(elResultado)

    def delete (self, id):
        return self.repositorioResultado.delete(id)

   
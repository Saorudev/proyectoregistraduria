from Modelos.resultadoModel import Resultado
from Modelos.candidatoModel import Candidato
from Modelos.mesaModel import Mesa
from Repositorios.repositorioResultado import RepositorioResultado
from Repositorios.repositorioCandidato import RepositorioCandidato
from Repositorios.repositorioMesa import RepositorioMesa

class ControladorResultado():
    def __init__(self):
        self.repositorioResultado = RepositorioResultado()
        self.repositorioCandidato = RepositorioCandidato()
        self.repositorioMesa = RepositorioMesa()

    def index(self):
        return self.repositorioResultado.findAll()

    """
    Asignacion mesa y candidato a resultado
    """

    def create(self,infoResultado,id_mesa,id_candidato):
        nuevoResultado = Resultado(infoResultado)
        laMesa = Mesa(self.repositorioMesa.findById(id_mesa))
        elCandidato = Candidato(self.repositorioCandidato.findById(id_candidato))
        nuevoResultado.mesa = laMesa
        nuevoResultado.candidato = elCandidato
        return self.repositorioResultado.save(nuevoResultado)

    def show(self,id):
        elResultado = Resultado(self.repositorioResultado.findById(id))
        return elResultado.__dict__

    """
    Modificacion de resultado (mesa y candidato)
    """

    def update(self,id,infoResultado,id_mesa,id_candidato):
        elResultado = Resultado(self.repositorioResultado.findById(id))
        elResultado.id_mesa = infoResultado["numero_mesa"]
        elResultado.id_partido = infoResultado["id_partido"]
        laMesa = Mesa (self.repositorioMesa.findById(id_mesa))
        elCandidato = Candidato (self.repositorioCandidato.findById(id_candidato))
        elResultado.mesa = laMesa
        elResultado.partido = elCandidato
        return self.repositorioResultado.save(elResultado)

    def delete (self, id):
        return self.repositorioResultado.delete(id)

    def listarResultadoEnCandidato(self, id_candidato):
        return self.repositorioResultado.getListadoResultadosCandidato(id_candidato) 
    
    def test(self, id_candidato):
        return self.repositorioResultado.test(id_candidato)
from Repositorios.InterfaceRepositorio import InterfaceRepositorio
from Modelos.resultadoModel import Resultado
from bson import ObjectId

class RepositorioResultado(InterfaceRepositorio[Resultado]):
    def getListadoResultadosCandidato(self, id_candidato):
        theQuery = {"candidato.$id": ObjectId(id_candidato)}
        return self.query(theQuery)

    def test(self, id_candidato):
        query1 = {
            "$match": {"materia.$id": ObjectId(id_candidato)}
        }
        pipeline = [query1]
        return self.queryAggregation(pipeline)
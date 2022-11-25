from Repositorios.InterfaceRepositorio import InterfaceRepositorio
from Modelos.resultadoModel import Resultado
from bson import ObjectId


class RepositorioResultado(InterfaceRepositorio[Resultado]):
    def getListadoResultadosCandidato(self, id_candidato):
        theQuery = {"candidato.$id": ObjectId(id_candidato)}
        return self.query(theQuery)
    
    def getMayorResultadoPorCandidato(self):
        query1 = {
            "$group": {
                "_id": "$candidato",
                "max": {
                    "$max": "$resultado_final"
                },
                "doc": {
                    "$first": "$$ROOT"
                }
            }
        }
        pipeline = [query1]
        return self.queryAggregation(pipeline)

    def promedioResultadosPorCandidato(self, id_candidato):
        query1 = {
            "$match": {"candidato.$id": ObjectId(id_candidato)}
        }
        query2 = {
            "$group": {
                "_id": "$candidato",
                "promedio": {
                    "$avg": "$resultado_final"
                }
            }
        }
        pipeline = [query1, query2]
        return self.queryAggregation(pipeline)

    def sumaResultadosPorCandidato(self, id_candidato):
        query1 = {
            "$match": {"candidato.$id": ObjectId(id_candidato)}
        }
        query2 = {
            "$group": {
                "_id": "$candidato",
                "promedio": {
                    "$sum": "$resultado_final"
                }
            }
        }
        pipeline = [query1, query2]
        return self.queryAggregation(pipeline)

    def test(self, id_candidato):
        query1 = {
            "$match": {"candidato.$id": ObjectId(id_candidato)}
        }
        pipeline = [query1]
        return self.queryAggregation(pipeline)
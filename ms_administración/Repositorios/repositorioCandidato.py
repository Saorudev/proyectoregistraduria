from Repositorios.InterfaceRepositorio import InterfaceRepositorio
from Modelos.candidatoModel import Candidato
from bson import ObjectId

class RepositorioCandidato(InterfaceRepositorio[Candidato]):
    def getListadoCandidatosEnPartido(self, id_Candidato):
      theQuery = {"partido.$id": ObjectId(id_Candidato)}
      return self.query(theQuery)

#mongodb+srv://saorudev:<password>@cluster1.a479qkb.mongodb.net/?retryWrites=true&w=majority
"""
  "data-db-connection": "mongodb+srv://saorudev:Natsudragneel189-@cluster0.l9gzw3q.mongodb.net/db-proyecto-c4?retryWrites=true&w=majority",
    "name-db": "db-proyecto-c4"
"""
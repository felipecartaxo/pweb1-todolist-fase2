export interface Tarefa {

  id?: number, // O id pode ser nulo, pois será criado automaticamente
  titulo: string,
  categoria: string,
  concluido: boolean
}

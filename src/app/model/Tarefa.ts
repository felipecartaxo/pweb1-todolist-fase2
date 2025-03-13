export interface Tarefa {

  id?: number, // O id pode ser nulo, pois será criado automaticamente
  tarefa: string,
  categoria: string,
  concluido: boolean
}

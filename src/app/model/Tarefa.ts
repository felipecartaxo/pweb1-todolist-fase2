export interface Tarefa {

  id?: string, // O id pode ser nulo, pois será criado automaticamente
  titulo: string,
  categoria: string,
  concluido: boolean,
  usuarioID: string;
}



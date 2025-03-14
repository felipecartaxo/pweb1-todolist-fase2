import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../model/Tarefa';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL = 'http://localhost:3000/tasks'; // URL gerada pelo json server

  constructor(private http: HttpClient) { }

  // Listagem das tarefas
  getTasks() : Observable<Tarefa[]> {
    // Faz um GET para o json server
    return this.http.get<Tarefa[]>(this.URL);
  }

  // Remove uma tarefa
  deleteTask(tarefa: Tarefa): Observable<Tarefa>{
    return this.http.delete<Tarefa>(`${this.URL}/${tarefa.id}`);
  }

  // Atualiza o status da tarefa
  updateTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.URL}/${tarefa.id}`, tarefa);
  }
}

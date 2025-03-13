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

  // Retorna uma lista contendo todas as tarefas no json server
  // Note também que utilizamos o Observable por se tratar de uma requisição síncrona
  getTasks() : Observable<Tarefa[]> {
    // Faz um GET para o json server
    return this.http.get<Tarefa[]>(this.URL);
  }
}

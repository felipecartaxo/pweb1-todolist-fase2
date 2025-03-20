import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { from, Observable, map, switchMap } from 'rxjs';
import { Tarefa } from '../model/Tarefa';
import { UsuarioService } from './usuario.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// ----- SPRING BOOT -----
export class TaskService {

  // private URL = 'http://localhost:3000/tasks'; // URL do json server
  private URL = 'http://localhost:8080/tarefas';

  constructor(private http: HttpClient) { }

  // Listagem das tarefas
  getTasks() : Observable<Tarefa[]> {
    // Faz um GET para o json server
    return this.http.get<Tarefa[]>(this.URL);
  }

  // Cria uma nova tarefa
  addTask(tarefa: Tarefa) : Observable<Tarefa> {
    return this.http.post<Tarefa>(`${this.URL}`, tarefa);
  }

  // Atualiza o status da tarefa
  updateTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.URL}/${tarefa.id}`, tarefa);
  }

  // Remove uma tarefa
  deleteTask(tarefa: Tarefa): Observable<Tarefa>{
    return this.http.delete<Tarefa>(`${this.URL}/${tarefa.id}`);
  }

  // Filtra tarefas por título e categoria
  pesquisarPorFiltro(titulo: string, categoria: string): Observable<Tarefa[]> {
    // Configura os parâmetros da requisição
    let params = new HttpParams();

    if (titulo) {
      params = params.append('titulo', titulo);
    }

    if (categoria) {
      params = params.append('categoria', categoria);
    }

    // Faz a requisição GET com os parâmetros
    return this.http.get<Tarefa[]>(`${this.URL}/filtrar`, { params });
  }
}

// ------------------ FIRESTORE -------------------
// export class TaskService {
//   private injetor = inject(Injector);
//   private colecaoTarefas: AngularFirestoreCollection<Tarefa>;
//   private NOME_COLECAO = 'tarefas';
//
//   constructor(private firestore: AngularFirestore, private usuarioService: UsuarioService) {
//     this.colecaoTarefas = this.firestore.collection(this.NOME_COLECAO);
//     runInInjectionContext(this.injetor, () => {
//       this.colecaoTarefas = this.firestore.collection(this.NOME_COLECAO);
//     });
//   }
//
//   // Listagem das tarefas
//   getTasks(): Observable<Tarefa[]> {
//     const usuario = this.usuarioService.getUsuarioLogado();
//     if (!usuario) return new Observable(subscriber => subscriber.next([]));
//
//     return runInInjectionContext(this.injetor, () => {
//       return this.firestore.collection<Tarefa>(this.NOME_COLECAO, ref =>
//         ref.where('usuarioID', '==', usuario.id)) // Apenas tarefas do usuário logado
//         .valueChanges({ idField: 'id' });
//     });
//   }
//
//   // Cria uma nova tarefa
//   addTask(tarefa: Tarefa): Observable<Tarefa> {
//     const usuario = this.usuarioService.getUsuarioLogado();
//     if (!usuario) return new Observable(subscriber => subscriber.next(tarefa));
//
//     tarefa.usuarioID = usuario.id!;
//
//     delete tarefa.id;
//     return from(this.colecaoTarefas.add({ ...tarefa })).pipe(
//       switchMap((docRef: DocumentReference<Tarefa>) => docRef.get()),
//       map(doc => ({ id: doc.id, ...doc.data() } as Tarefa))
//     );
//   }
//
//   // Atualiza o status da tarefa
//   updateTask(tarefa: Tarefa): Observable<void> {
//     return runInInjectionContext(this.injetor, () => {
//       return from(this.colecaoTarefas.doc(tarefa.id).update({ ...tarefa }));
//     });
//   }
//
//   // Remove uma tarefa
//   deleteTask(id: string): Observable<void> {
//     return runInInjectionContext(this.injetor, () => {
//       return from(this.colecaoTarefas.doc(id).delete());
//     });
//   }
//
//   /*
//
//   TODO: PARA CORRIGIR (ESTAVA UTILIZANDO O FIRESTORE)
//   // Filtra uma tarefa por título e categoria
//   pesquisarPorFiltro(titulo: string, categoria: string): Observable<Tarefa[]> {
//     const usuarioID = this.usuarioService.getUsuarioLogado()?.id;
//     if (!usuarioID) return new Observable(subscriber => subscriber.next([]));
//
//     return runInInjectionContext(this.injetor, () => {
//       return this.firestore.collection<Tarefa>(this.NOME_COLECAO, ref =>
//         ref.where('usuarioID', '==', usuarioID)
//       ).valueChanges({ idField: 'id' }).pipe(
//         map(tarefas => tarefas.filter(tarefa =>
//           (titulo ? tarefa.titulo.toLowerCase().includes(titulo.toLowerCase()) : true) &&
//           (categoria ? tarefa.categoria === categoria : true)
//         ))
//       );
//     });
//   }
// }

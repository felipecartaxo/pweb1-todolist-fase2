import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { from, Observable, map, switchMap } from 'rxjs';
import { Tarefa } from '../model/Tarefa';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private injetor = inject(Injector);
  private colecaoTarefas: AngularFirestoreCollection<Tarefa>;
  private NOME_COLECAO = 'tarefas';

  constructor(private firestore: AngularFirestore, private usuarioService: UsuarioService) {
    this.colecaoTarefas = this.firestore.collection(this.NOME_COLECAO);
    runInInjectionContext(this.injetor, () => {
      this.colecaoTarefas = this.firestore.collection(this.NOME_COLECAO);
    });
  }

  // Listagem das tarefas
  getTasks(): Observable<Tarefa[]> {
    const usuario = this.usuarioService.getUsuarioLogado();
    if (!usuario) return new Observable(subscriber => subscriber.next([]));

    return runInInjectionContext(this.injetor, () => {
      return this.firestore.collection<Tarefa>(this.NOME_COLECAO, ref =>
        ref.where('usuarioID', '==', usuario.id)) // Apenas tarefas do usuário logado
        .valueChanges({ idField: 'id' });
    });
  }

  // Cria uma nova tarefa
  addTask(tarefa: Tarefa): Observable<Tarefa> {
    const usuario = this.usuarioService.getUsuarioLogado();
    if (!usuario) return new Observable(subscriber => subscriber.next(tarefa));

    tarefa.usuarioID = usuario.id!;

    delete tarefa.id;
    return from(this.colecaoTarefas.add({ ...tarefa })).pipe(
      switchMap((docRef: DocumentReference<Tarefa>) => docRef.get()),
      map(doc => ({ id: doc.id, ...doc.data() } as Tarefa))
    );
  }

  // Atualiza o status da tarefa
  updateTask(tarefa: Tarefa): Observable<void> {
    return runInInjectionContext(this.injetor, () => {
      return from(this.colecaoTarefas.doc(tarefa.id).update({ ...tarefa }));
    });
  }

  // Remove uma tarefa
  deleteTask(id: string): Observable<void> {
    return runInInjectionContext(this.injetor, () => {
      return from(this.colecaoTarefas.doc(id).delete());
    });
  }

  //Filtra uma tarefa
  pesquisarPorFiltro(valor: string): Observable<Tarefa[]> {
    return runInInjectionContext(this.injetor, () => {
      return this.firestore.collection<Tarefa>(this.NOME_COLECAO, ref =>
        ref.where('titulo', '>=', valor).where('titulo', '<=', valor + '\uf8ff')
      ).valueChanges({ idField: 'id' }).pipe(
        switchMap(tarefasTitulo =>
          this.firestore.collection<Tarefa>(this.NOME_COLECAO, ref =>
            ref.where('categoria', '>=', valor).where('categoria', '<=', valor + '\uf8ff')
          ).valueChanges({ idField: 'id' }).pipe(
            map(tarefasCategoria => [...tarefasTitulo, ...tarefasCategoria])
          )
        )
      );
    });
  }
}



import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, Observable, map } from 'rxjs';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private injetor = inject(Injector);
  private colecaoUsuarios: AngularFirestoreCollection<Usuario>;
  private NOME_COLECAO = 'usuarios';
  private usuarioLogado: Usuario | null = null;

  constructor(private firestore: AngularFirestore) {
    this.colecaoUsuarios = this.firestore.collection<Usuario>(this.NOME_COLECAO);
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return from(this.colecaoUsuarios.add({ ...usuario })).pipe(
      map(docRef => ({ id: docRef.id, ...usuario } as Usuario))
    );
  }

  login(nome: string, senha: string): Observable<Usuario | null> {
    return runInInjectionContext(this.injetor, () => {
      return from(
        this.firestore.collection<Usuario>(this.NOME_COLECAO, ref =>
          ref.where('nome', '==', nome)
        ).get()
      ).pipe(
        map(snapshot => {
          if (!snapshot.empty) {
            const usuarios = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as Usuario[];

            const usuarioEncontrado = usuarios.find(user => user.senha === senha);

            if (usuarioEncontrado) {
              this.usuarioLogado = usuarioEncontrado;
              return usuarioEncontrado;
            }
          }
          return null;
        })
      );
    });
  }

  getUsuarioLogado(): Usuario | null {
    return this.usuarioLogado;
  }

  logout() {
    this.usuarioLogado = null;
  }
}





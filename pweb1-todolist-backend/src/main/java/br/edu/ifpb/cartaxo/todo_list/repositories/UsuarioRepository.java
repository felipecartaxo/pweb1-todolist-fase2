package br.edu.ifpb.cartaxo.todo_list.repositories;

import br.edu.ifpb.cartaxo.todo_list.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
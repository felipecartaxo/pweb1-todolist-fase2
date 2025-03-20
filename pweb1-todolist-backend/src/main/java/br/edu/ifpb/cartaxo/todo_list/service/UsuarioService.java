package br.edu.ifpb.cartaxo.todo_list.service;

import br.edu.ifpb.cartaxo.todo_list.model.Usuario;
import br.edu.ifpb.cartaxo.todo_list.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Retorna todos os usuários cadastrados
    public List<Usuario> getUsuarios() {
        return this.usuarioRepository.findAll();
    }

    // Busca uma tarefa por id
    public Usuario getUsuarioPorId(Long id) {
        return this.usuarioRepository.findById(id).
                orElse(null);
    }

    // Cadastra um novo usuário
    @Transactional
    public Usuario inserirOuAtualizar(Usuario usuario) {
        if (usuario.getNome() == null && usuario.getPassword() == null) {
            throw new RuntimeException("Login e senha são obrigatórios");
        }

        // Se não lançar exceção, salva o usuário
        return this.usuarioRepository.save(usuario);
    }

    // Remove um usuário a partir de um id
    public void apagar(Long id) {
        this.usuarioRepository.deleteById(id);
    }
}
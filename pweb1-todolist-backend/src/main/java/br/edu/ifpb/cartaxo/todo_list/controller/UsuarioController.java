package br.edu.ifpb.cartaxo.todo_list.controller;

import br.edu.ifpb.cartaxo.todo_list.model.Usuario;
import br.edu.ifpb.cartaxo.todo_list.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class UsuarioController {

    @Autowired private UsuarioService usuarioService;

    // Retorno todos os usuários
    @GetMapping("/usuarios")
    public List<Usuario> getUsuarios() {
        return this.usuarioService.getUsuarios();
    }

    // Retorna um usuário a partir de um id passado na URL
    @GetMapping("/usuarios{id}")
    public Usuario getUsuarioPorId(@PathVariable Long id) {
        return this.usuarioService.getUsuarioPorId(id);
    }

    // Insere um atualiza um novo usuário
    @PostMapping("/usuarios")
    public Usuario inserirUsuario(@RequestBody Usuario usuario) {
        return this.usuarioService.inserirOuAtualizar(usuario);
    }

    // Remove um usuário a partir de um id
    @DeleteMapping("usuarios/{id}")
    public void apagarUsuario(@PathVariable Long id) {
        this.usuarioService.apagar(id);
    }
}
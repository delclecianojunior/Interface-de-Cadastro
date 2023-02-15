import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPessoa } from './IPessoas';
import { PessoaService } from './pessoa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{
  title = 'CadastroCrud';

  formulario: FormGroup;

  pessoas: IPessoa[] = [];
  pessoa: IPessoa;

  constructor(private pessoaService: PessoaService){}

  ngOnInit(): void {
    
    this.formulario = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl(null),
      profissao: new FormControl(null),
    });
  }

  mostrarTodosUsuarios(){
    this.pessoaService.mostrarTodos()
    .subscribe((pessoas) => this.pessoas = pessoas)
  }

  mostraSomenteUm(){
    this.pessoaService.mostarPorId(4)
    .then((pessoa) => console.log(pessoa))
    .catch((error) => console.log(error))
  }

  adicionarPessoa(pessoa: IPessoa){
    pessoa.id = this.pessoas.length + 1;
    this.pessoaService.adicionar(pessoa)
    .subscribe(() => {
      this.pessoas.push(pessoa);
    })
  }

  atualizarPessoa(pessoa: IPessoa){
    // let indice = this.pessoas.indexOf(pessoa); //Pegando o indice da onde eu cliquei pra editar
    // console.log(pessoa);
    this.pessoaService.atualizar(pessoa)
    .subscribe(() => {;
    })
  }

  excluir(pessoa: IPessoa){
    let indice = this.pessoas.indexOf(pessoa);
    this.pessoaService.deletar(pessoa.id)
    .subscribe(() => {
      this.pessoas.splice(indice, 1);
    })
  }


  salvar(){
    const pessoaEditada = this.formulario.getRawValue() as IPessoa;
    console.log(pessoaEditada);

    if(this.pessoa?.id > 0){
      this.atualizarPessoa(pessoaEditada);
      alert("Atualizado com sucesso");
    }
    else{
      console.log("Entrou no else");
      this.adicionarPessoa(pessoaEditada);
      alert("Adicionado com sucesso");
    }
  }

  editar(pessoa: IPessoa){
    console.log(pessoa);
    this.pessoa = pessoa;
    this.formulario.setValue({
      id: pessoa.id,
      nome: pessoa.nome,
      profissao: pessoa.profissao
    })
  }

}

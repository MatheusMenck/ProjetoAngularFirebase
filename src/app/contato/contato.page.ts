import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {

  contato: any = {
    nome: null,
    assunto: null,
    mensagem: null,
    estrelinha: [
      {valor: 1, selecionado:false},
      {valor: 2, selecionado:false},
      {valor: 3, selecionado:false},
      {valor: 4, selecionado:false},
      {valor: 5, selecionado:false}
    ]
  }

  id: any;

  contatos: any;

  constructor(
    public crudService: CrudService
  ) { 
    this.getContatos();
  }

  ngOnInit() {
  }

  enviar(){
    this.crudService.insert(this.contato, 'contatos');
    this.getContatos();
  }
  getContatos(){
    this.crudService.fetchAll('contatos')
    .then(dados=> {
      this.contatos = dados;
    })
  }

  remove(id: string){
    this.crudService.remove(id, 'contatos')
    .then(()=>{
      this.getContatos();
    })
  }
  edit(contato: any){
    this.id = contato.id;
    this.contato.nome = contato.nome;
    this.contato.assunto = contato.assunto;
    this.contato.mensagem = contato.mensagem;
  }
  atualizar(){
    if(!!!this.contato.nome)
      return;
    if(!!!this.contato.assunto)
      return;
    if(!!!this.contato.mensagem)
      return;
    this.crudService.update(this.id, this.contato, 'contatos')
    this.getContatos();
  }

  setEstrelinha(estrelinha: any) {
    this.contato.estrelinha.forEach((element: any) => {
      if (element.valor <= estrelinha.valor) {
        element.selecionado = true;
      } else {
        element.selecionado = false;
      }
    });
    console.log(this.contato);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from 'environments/environment';
import { IPessoa } from './IPessoas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private httpClient: HttpClient) { }

  mostrarTodos(): Observable<IPessoa[]>{
    return this.httpClient.get<IPessoa[]>(`${API_PATH}Pessoas`);
  }

  mostarPorId(id: number){
    return this.httpClient.get<IPessoa>(`${API_PATH}Pessoas/${id}`).toPromise();
  }

  adicionar(pessoa: IPessoa): Observable<IPessoa>{
    return this.httpClient.post<IPessoa>(`${API_PATH}Pessoas`, pessoa)
  }

  atualizar(pessoa: IPessoa): Observable<IPessoa>{
    return this.httpClient.put<IPessoa>(`${API_PATH}Pessoas/${pessoa.id}`, pessoa);
  }

  deletar(pessoaId: number): Observable<IPessoa>{
    return this.httpClient.delete<IPessoa>(`${API_PATH}Pessoas/${pessoaId}`);
  }


}

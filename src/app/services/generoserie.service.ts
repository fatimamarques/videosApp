import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IListaGeneroSerie } from '../models/generoserie.model';

@Injectable({
  providedIn: 'root'
})
export class GeneroserieService {
  lingua = 'pt-BR';

  private apiURL = 'https://api.themoviedb.org/3/';
  private key = '?api_key=ac137da6d2a6e08bdef16081746ebfd4';

  constructor(
    private http: HttpClient,
    public toastController: ToastController
  ) { }

  buscarGenerosSeries(): Observable<IListaGeneroSerie> {
    const url = `${this.apiURL}genre/tv/list${this.key}&language=${this.lingua}`;
    return this.http.get<IListaGeneroSerie>(url).pipe(
      map((retorno) => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  async exibirErro(erro) {
    const toast = await this.toastController.create({
      message: 'Erro ao consultar a API',
      duration: 2000,
      color: 'danger',
      position: 'middle',
    });
    toast.present();
    return null;
  }
}

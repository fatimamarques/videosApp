import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SeriesService } from '../services/series.service';
import { IListaSeries, ISerie } from '../models/iSerie.model';
import { DadosService } from './../services/dados.service';
import { GeneroService } from '../services/genero.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  titulo = 'Series';
  listaSeries: IListaSeries;
  generos: string[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public seriesService: SeriesService,
    public dadosService: DadosService,
    public generoService: GeneroService,
    public route: Router
  ) {}

  buscarSeries(evento: any) {
    console.log(evento.target.value);
    const busca = evento.target.value;
    if (busca && busca.trim() !== '') {
      this.seriesService.buscarSeries(busca).subscribe((dados) => {
        console.log(dados);
        this.listaSeries = dados;
      });
    }
  }

  exibirSerie(serie: ISerie) {
    this.dadosService.guardarDados('serie', serie);
    this.route.navigateByUrl('/dados-serie');
  }
  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: 'Deseja realmente favoritar a serie?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Sim, favoritar',
          handler: () => {
            this.apresentarToast();
          },
        },
      ],
    });

    await alert.present();
  }

  async apresentarToast() {
    const toast = await this.toastController.create({
      message: 'Filme adicionado aos favoritos',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  ngOnInit() {
    this.generoService.buscarGeneros().subscribe((dados) => {
      console.log('Generos: ', dados.genres);
      dados.genres.forEach((genero) => {
        this.generos[genero.id] = genero.name;
      });

      this.dadosService.guardarDados('generos', this.generos);
    });
  }
}

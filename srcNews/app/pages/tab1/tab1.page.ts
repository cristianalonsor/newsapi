import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { RespuestaTopHeadlines, Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];


  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData( event ){
    this.cargarNoticias( event );
  }

  // el signo de preguntas hace opcionar el argumento a recibir
  cargarNoticias( event? ){

    this.noticiasService.getTopHeadlines()
    .subscribe( resp => {
      // console.log('noticias ', resp);

      // mediante la pregunta cancelo el infinte scroll
      if (resp.articles.length === 0){
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      // como necesito trabajarlo como articulo independiente, uso el operador spread "..."
      // asi traigo e inserto independientemente las cosas al arreglo de noticias
      this.noticias.push( ...resp.articles);

      // termino de cargar el infinite scroll
      if (event) {
        event.target.complete();
      }

    });
  }
}

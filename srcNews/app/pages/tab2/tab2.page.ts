import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment,  IonContent } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;
  // 1) tomo lo que recibo desde el ioncontent
  @ViewChild(IonContent) scrollContent: IonContent;

  categorias = ['business', 'entertainment', 'general', 'health',
               'science', 'sports', 'technology'];

  noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.segment.value = this.categorias[0];
    this.cargarNoticias( this.categorias[0] );
  }

  cambioCategoria( event ){
    // borrar el arreglo para limpiarlo de las noticias si es que tenia
    this.noticias = [];
    // utilizo el metodo para puder subir el infinitescroll
    this.subirInifinito();
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string, event?){

    this.noticiasService.getTopHeadlinesCategorias(categoria)
    .subscribe( resp => {
      // console.log(resp);
      this.noticias.push(...resp.articles);
      if (event) {
        event.target.complete();
      }
    });
  }

  loadData( event ){
    // console.log(event);
    this.cargarNoticias(this.segment.value, event);
  }
  // 2)el ioncontent tiene la propiedad scrolltotop en ms para subir la imagen hasta arriba
  subirInifinito(){
    this.scrollContent.scrollToTop(1500);
  }
}

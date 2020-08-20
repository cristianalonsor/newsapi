import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apikey = environment.apikey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apikey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }
                // recibo de algun tipo de datos
  private ejecutarQuery<T>( query: string ){

    query = apiUrl + query;
                // retorno del tipo de dato que recibi
    return this.http.get<T>( query, { headers } );
  }

  getTopHeadlines(){

    this.headlinesPage++;
    // tslint:disable-next-line: max-line-length
    // return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/top-headlines?country=us&apiKey=8ccbf36b27dd4ed6b9420714c0a039a4`);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadlinesCategorias( categoria: string ){

    // verifico si mi categoria es la misma que la actual
    if ( this.categoriaActual === categoria){
      // cargo la siguiente pagina
      this.categoriaPage++;
    } else {
      // cagro una nueva categoria
      this.categoriaPage = 1;
      // la categoria actual, sera la categoria
      this.categoriaActual = categoria;
    }


    // return this.http.get(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8ccbf36b27dd4ed6b9420714c0a039a4`)
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }

}

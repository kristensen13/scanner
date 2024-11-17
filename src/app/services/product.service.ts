import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient)
  private utilsSvc = inject(UtilsService);
  private apiUrl = environment.apiUrl;

  async fetchArbolFamilia(nodo: any): Promise<any> {
    const loading = await this.utilsSvc.loading();
    await loading.present();
    const arbol = await this.http.get(`${this.apiUrl}Articulo/PorFamilia/${nodo}/MAS_VENDIDOS`).toPromise();
    // console.log(arbol);
    await loading.dismiss();
    return arbol;

  }

  fetchArticlesByCategory(categoryName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Articulo/PorCategoria/${categoryName}`);
  }

  async fetchArticlesById(Id: any) {
    return this.http.get(`${this.apiUrl}Articulo/${Id}`);
  }
}

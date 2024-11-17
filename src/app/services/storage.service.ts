import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductItemCart } from '../interfaces/product.interface';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private utilsSvc = inject(UtilsService);

  loadProducts(): Observable<ProductItemCart[]> {
    const rawProducts = this.utilsSvc.getFromLocalStorage('products');

    return of(rawProducts ? JSON.parse(rawProducts) : []);
  }

  saveProducts(products: ProductItemCart[]): void {
    this.utilsSvc.saveInLocalStorage('products', JSON.stringify(products));
  }
}

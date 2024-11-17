import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  private http = inject(HttpClient);
  categoriesTree: any[] = [];

  constructor() {

  }
  async startScan(val?: number) {
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: val || 17,
        cameraDirection: 1
      });
      console.log(result);
      return result.ScanResult;

    } catch (error) {
      throw (error)
    }
  }

  fetchCategories() {
    this.http.get('https://www.coalimaronline.com/api/ArbolFamilia/Raiz').subscribe((resp: any) => {
      this.categoriesTree = [this.buildCategoryTree(resp)]; // Convertimos la raíz en un array
      console.log(this.categoriesTree); // Visualizar la estructura anidada en la consola
    });
  }

  buildCategoryTree(category: any): any {
    // Clonar la categoría para añadir subcategorías sin modificar el original
    const node = {
      ...category,
      subCategorias: (category.InverseIdPadreOrigenNavigation || []).map((subCategory: any) => this.buildCategoryTree(subCategory))
    };
    return node;
  }
}

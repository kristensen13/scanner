import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient)

  // private apiUrl = 'https://www.coalimaronline.com/api/ArbolFamilia/Raiz';

  fetchCategories(): Observable<any> {
    return this.http.get(`${baseUrl}ArbolFamilia/Raiz`);
  }

  buildCategoryTree(category: any): any {
    return {
      ...category,
      subCategorias: (category.InverseIdPadreOrigenNavigation || []).map((subCategory: any) =>
        this.buildCategoryTree(subCategory)
      ),
    };
  }

  getMainCategoriesWithSubcategories(): Observable<any[]> {
    return new Observable((observer) => {
      this.fetchCategories().subscribe((categoryRoot: any) => {
        if (categoryRoot && categoryRoot.InverseIdPadreOrigenNavigation) {
          const categoryTree = this.buildCategoryTree(categoryRoot);
          observer.next([categoryTree]);
        } else {
          console.error("La respuesta de categorías no contiene subcategorías:", categoryRoot);
          observer.next([]);
        }
        observer.complete();
      });
    });
  }

  // getMainCategoriesWithSubcategories(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}Category/GetWithSubcategories`);
  // }

  // Nuevo método para encontrar una categoría y obtener sus subcategorías
  getSubcategoriesByName(categoryName: string): Observable<any[]> {
    return new Observable((observer) => {
      this.getMainCategoriesWithSubcategories().subscribe((categories) => {
        const foundCategory = this.findCategoryByName(categories[0], categoryName);
        if (foundCategory) {
          observer.next(foundCategory.subCategorias || []);
        } else {
          observer.next([]); // Si no encuentra la categoría, devuelve un array vacío
        }
        observer.complete();
      });
    });
  }

  private findCategoryByName(category: any, categoryName: string): any {
    if (category.Nombre === categoryName) {
      return category;
    }
    for (const subCategory of category.subCategorias || []) {
      const result = this.findCategoryByName(subCategory, categoryName);
      if (result) return result;
    }
    return null;
  }

  pages = [
    { title: 'Frescos', url: '/frescos' },
    { title: 'Despensa', url: '/despensa' },
    { title: 'Bebidas', url: '/bebidas' },
    { title: 'Congelados', url: '/congelados' },
    { title: 'Horno', url: '/horno' },
    { title: 'Bebé', url: '/bebe' },
    { title: 'Perfumería e Higiene', url: '/perfumeria-e-higiene' },
    { title: 'Limpieza y Hogar', url: '/limpieza-y-hogar' },
    { title: 'Parafarmacia', url: '/parafarmacia' },
    { title: 'Mascotas', url: '/mascotas' },
    { title: 'Bio & Salud', url: '/bio-y-salud' },
    { title: 'Jardín y Piscina', url: '/jardin-y-piscina' },
  ];

  // Función para obtener la URL correspondiente al nombre de la categoría
  getCategoryUrl(categoryName: string): string {
    const page = this.pages.find(p => p.title === categoryName);
    return page ? page.url : '/not-found'; // Redirigir a 'not-found' si no hay coincidencia
  }
}

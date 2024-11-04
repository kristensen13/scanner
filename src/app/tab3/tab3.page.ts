import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonList, IonItem, IonItemDivider } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [NgIf, NgFor, IonItemDivider, IonItem, IonList, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab3Page {

  // private http = inject(HttpClient)

  // data!: any[];

  // constructor() {
  //   this.openCategory();
  // }

  // openCategory() {
  //   this.http.get('https://www.coalimaronline.com/api/ArbolFamilia/Raiz').subscribe((resp: any) => {
  //     this.data = resp.InverseIdPadreOrigenNavigation;
  //     console.log(this.data);
  //   });
  // }

  private http = inject(HttpClient);
  categoriesTree: any[] = [];

  constructor() {
    this.fetchCategories();
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

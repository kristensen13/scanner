import { Component, inject } from '@angular/core';
import { IonThumbnail, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonList, IonItem, IonItemDivider, IonAccordionGroup, IonAccordion, IonCol, IonRow, IonCard, IonText, IonImg, IonIcon, IonGrid } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { LowerCasePipe, NgFor, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import { addCircleOutline, basketOutline, fishOutline, fitnessOutline, flowerOutline, happyOutline, medkitOutline, pawOutline, pizzaOutline, shirtOutline, snowOutline, sparklesOutline, wineOutline } from 'ionicons/icons';
import { CategoryService } from '../services/category.service';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../shared/components/header/header.component";
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonIcon,
    IonThumbnail,
    IonImg,
    IonText,
    IonCard,
    IonRow,
    IonCol,
    IonAccordion,
    IonAccordionGroup,
    NgIf,
    NgFor,
    IonItemDivider,
    IonItem,
    IonList,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    RouterLink,
    HeaderComponent,
    LowerCasePipe
  ],
})
export class Tab1Page {

  private categorySvc = inject(CategoryService);
  private utilsSvc = inject(UtilsService);
  categoriesTree: any[] = [];

  // Define aquí la propiedad icons
  icons = [
    { title: 'Frescos', icon: 'fish-outline' },
    { title: 'Despensa', icon: 'basket-outline' },
    { title: 'Bebidas', icon: 'wine-outline' },
    { title: 'Congelados', icon: 'snow-outline' },
    { title: 'Horno', icon: 'pizza-outline' },
    { title: 'Bebé', icon: 'happy-outline' },
    { title: 'Perfumería e Higiene', icon: 'sparkles-outline' },
    { title: 'Limpieza y Hogar', icon: 'shirt-outline' },
    { title: 'Parafarmacia', icon: 'medkit-outline' },
    { title: 'Mascotas', icon: 'paw-outline' },
    { title: 'Bio & Salud', icon: 'fitness-outline' },
    { title: 'Jardín y Piscina', icon: 'flower-outline' },
  ];

  constructor() {
    this.fetchCategories();
    this.addAllIcons();
  }

  addAllIcons() {
    addIcons({
      'fish-outline': fishOutline,
      'basket-outline': basketOutline,
      'wine-outline': wineOutline,
      'snow-outline': snowOutline,
      'pizza-outline': pizzaOutline,
      'happy-outline': happyOutline,
      'sparkles-outline': sparklesOutline,
      'shirt-outline': shirtOutline,
      'medkit-outline': medkitOutline,
      'paw-outline': pawOutline,
      'fitness-outline': fitnessOutline,
      'flower-outline': flowerOutline,
      'add-circle-outline': addCircleOutline
    });
  }

  async fetchCategories() {
    const loading = await this.utilsSvc.loading();
    await loading.present();
    this.categorySvc.fetchCategories().subscribe((resp: any) => {
      this.categoriesTree = [this.categorySvc.buildCategoryTree(resp)];
      // console.log(this.categoriesTree);
    });
    await loading.dismiss();
  }

  getIconForCategory(nombre: string): string {
    const icon = this.icons.find(i => i.title === nombre);
    return icon ? icon.icon : 'add-circle-outline';
  }

  // Llama a getCategoryUrl desde el servicio
  getCategoryUrl(categoryName: string): string {
    return this.categorySvc.getCategoryUrl(categoryName);
  }
}

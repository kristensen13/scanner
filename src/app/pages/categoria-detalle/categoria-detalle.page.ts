import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCard, IonLabel, IonGrid, IonCardHeader, IonCol, IonRow, IonImg, IonCardTitle, IonCardContent, IonItem, IonAccordionGroup, IonAccordion, IonList } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { UtilsService } from 'src/app/services/utils.service';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-categoria-detalle',
  templateUrl: './categoria-detalle.page.html',
  styleUrls: ['./categoria-detalle.page.scss'],
  standalone: true,
  imports: [IonList, IonAccordion, IonAccordionGroup, IonItem, IonCardContent, IonCardTitle, IonImg, IonRow, IonCol, IonCardHeader, IonGrid, IonLabel, IonCard, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class CategoriaDetallePage implements OnInit {

  private categorySvc = inject(CategoryService);
  private utilsSvc = inject(UtilsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  subCategoriesTree: any[] = [];
  categoryName: string = '';
  nombre!: string;

  constructor() {
    addIcons({ add });
  }

  ionViewWillEnter() {
    this.fetchCategories();
    // Reaplicar cualquier estilo o configuración cuando se muestra la página
    this.expandAccordionGroups();
  }


  ngOnInit() {
    // Suscribirse a los cambios en los parámetros de la URL
    this.route.paramMap.subscribe(params => {
      this.categoryName = this.capitalizeFirstLetter(params.get('nombre') || '')
        .replace(/\b(Y|E)\b/g, match => match.toLowerCase());
      // this.categoryName = this.categoryName.replace(/\b(Y|E)\b/g, match => match.toLowerCase());

    });

    // Llama al servicio para obtener la estructura de subcategorías
    // this.fetchCategories();
  }

  async fetchCategories() {
    const loading = await this.utilsSvc.loading();
    await loading.present();
    this.categorySvc.getMainCategoriesWithSubcategories().subscribe((categories) => {
      this.subCategoriesTree = categories;
    });
    await loading.dismiss();
  }

  // Navega a la página de artículos según la subcategoría seleccionada
  openSubcategory(category: any, subSubCategory: any) {
    this.router.navigate(['/articulo-por-familia', { page: category.Nombre, nodo: subSubCategory.Id, name: subSubCategory.Nombre }]);
  }

  // Función para capitalizar la primera letra de cada palabra
  capitalizeFirstLetter(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  expandAccordionGroups() {
    const accordionGroups = document.querySelectorAll('ion-accordion-group');
    accordionGroups.forEach((group: any) => {
      group.expand = 'inset';
    });
  }
}

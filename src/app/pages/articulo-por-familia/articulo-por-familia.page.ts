import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardContent, IonNote, ToastController } from '@ionic/angular/standalone';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/services/utils.service';

const baseUrl = environment.apiUrl;

@Component({
  selector: 'app-articulo-por-familia',
  templateUrl: './articulo-por-familia.page.html',
  styleUrls: ['./articulo-por-familia.page.scss'],
  standalone: true,
  imports: [IonNote, IonCardContent, IonCardTitle, IonCardHeader, IonImg, IonCard, IonRow, IonCol, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class ArticuloPorFamiliaPage implements OnInit {

  private productSvc = inject(ProductService);
  private utilsSvc = inject(UtilsService)
  private route = inject(ActivatedRoute)
  private http = inject(HttpClient);
  private router = inject(Router);
  private toastController = inject(ToastController);
  articles: any[] = [];
  subCategoryName: string = '';
  page!: string

  async ngOnInit() {
    const nodeId = this.route.snapshot.paramMap.get('nodo');
    this.subCategoryName = this.route.snapshot.paramMap.get('name') || '';
    this.page = this.route.snapshot.paramMap.get('page') || '';

    if (nodeId) {
      try {
        this.articles = await this.productSvc.fetchArbolFamilia(nodeId);
        this.articles.forEach((article: any) => this.getImage(article));

        // Mostrar un Toast si el array está vacío
        if (this.articles.length === 0) {
          this.showToast('No hay productos disponibles en esta categoría.');

        }
      } catch (error) {
        console.error("Error al obtener los artículos:", error);
      }
    }
  }

  capitalizeFirstLetter(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  async getImage(article: any) {
    try {
      const res: any = await this.http.get(`${baseUrl}FotoDeProducto/PequePrincipalPorIdArticulo/${article.Id}`).toPromise();
      article.image = `https://www.coalimaronline.com/assets/fotosArticulos/${res.NombreArchivo}`;
    } catch (error) {
      console.log('Error al obtener la imagen', error);
    }
  }

  openProductDetails(article: any) {
    // Guarda la URL actual antes de navegar
    localStorage.setItem('previousUrl', this.router.url);

    // Navega a la página de detalles del producto
    this.router.navigate(['/producto-detalle', { id: article.Id }]);
  }

  // Método para mostrar un Toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'middle',
      color: 'warning',
    });
    await toast.present();
    toast.onDidDismiss().then(() => this.utilsSvc.routerLink(`categoria-detalle/${this.page}`))
  }
}

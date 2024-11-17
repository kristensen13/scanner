import { Component, inject, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonButtons, IonBackButton, IonIcon, IonNote } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
// import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { addIcons } from 'ionicons';
import { arrowBack, chevronBackOutline } from 'ionicons/icons';
import { CartStateService } from 'src/app/services/cart-state.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

const baseUrl = environment.apiUrl;
@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.page.html',
  styleUrls: ['./producto-detalle.page.scss'],
  standalone: true,
  imports: [IonNote, IonIcon, IonBackButton, IonButtons, IonButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonImg, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class ProductoDetallePage implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router)
  private http = inject(HttpClient);
  private cartStateSvc = inject(CartStateService).state;
  // private header = inject(HeaderComponent);

  productId!: number;
  productImage: string = '';
  productData: any;  // Los datos del producto
  backButtonUrl: string = '';  // URL previa para el botón de regreso
  count = 1;
  product = input.required<any>();

  constructor() {
    addIcons({ chevronBackOutline });
  }

  addToCart = output<any>();

  add(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.addToCart.emit(this.product());
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  // Getter para actualizar dinámicamente el texto de la unidad
  get unidadTexto(): string {
    const magnitud = this.productData?.MagnitudDescripcion;
    return magnitud ? `/${magnitud}` : '';
  }


  ngOnInit() {

    // Obtén la URL de la página anterior del localStorage
    this.backButtonUrl = localStorage.getItem('previousUrl') || '/articulo-por-familia';

    console.log(this.backButtonUrl);


    // Obtén el ID del producto de los parámetros de la ruta
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.productId) {
      this.fetchProductDetails();
    }
  }

  // Método para obtener detalles del producto desde la API
  fetchProductDetails() {
    this.http.get(`${baseUrl}Articulo/${this.productId}`).subscribe((product: any) => {

      this.productData = product;
      this.fetchProductImage();
    });
  }

  // Método para obtener la imagen del producto
  fetchProductImage() {
    this.http
      .get(`${baseUrl}FotoDeProducto/PequePrincipalPorIdArticulo/${this.productId}`)
      .subscribe((res: any) => {

        this.productImage = `https://www.coalimaronline.com/assets/fotosArticulos/${res.NombreArchivo}`;
      });
  }

}

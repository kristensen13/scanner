import { Component, inject, Input, OnInit } from '@angular/core';
// import { UtilsService } from 'src/app/services/utils.service';
// import { IonicModule } from '@ionic/angular';
import { IonIcon, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonSearchbar, IonButton, IonContent, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { addIcons } from 'ionicons';
import { arrowBack, cartOutline, chevronBackOutline, trashBin, trashBinOutline } from 'ionicons/icons';
import { CurrencyPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    // IonicModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonContent,
    IonBackButton,
    IonTitle,
    IonIcon,
    IonSearchbar,
    IonGrid,
    IonCol,
    IonRow,
    ReactiveFormsModule,
    FormsModule,
    CurrencyPipe
  ],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title!: string;
  @Input() backButton!: string;
  @Input() totalAmount!: number;
  // @Input() isModal!: boolean;
  // @Input() showMenu!: boolean;

  // utilsSvc = inject(UtilsService);
  totalCompra: number = 0; // Monto total inicial

  // Método para actualizar el monto total
  actualizarMontoTotal(nuevoMonto: number) {
    this.totalCompra += nuevoMonto;
  }

  constructor() {
    addIcons({
      arrowBack,
      chevronBackOutline,
      cartOutline,
      trashBin
    })
  }

  // dismissModal() {
  //   this.utilsSvc.dismissModal();
  // }
}

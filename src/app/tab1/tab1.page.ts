import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

import { LoaderService } from 'src/app/services/loader.service';
import { IonicModule } from '@ionic/angular';
import { CurrencyPipe, NgIf, UpperCasePipe } from '@angular/common';
import { barcodeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { environment } from 'src/environments/environment';
import { ScannerService } from '../services/scanner.service';

const baseUrl = environment.apiUrl;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonIcon,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    CurrencyPipe,
    UpperCasePipe
  ],
})
export class Tab1Page {
  // private barcodeScanner = inject(BarcodeScanner);
  private http = inject(HttpClient);
  private ionLoader = inject(LoaderService);
  private scanSvc = inject(ScannerService);

  showSpinner = true;
  code!: string;
  data: any;
  id!: number;
  filename!: string;
  image!: string;
  codeStr = 'Código: ';
  price = 'Precio: ';

  constructor() {
    addIcons({ barcodeOutline });
  }

  async scanBarcode() {
    try {
      await this.scanSvc.startScan().then((barcodeData) => {
        this.code = barcodeData;
        console.log('Barcode data', this.code);
        this.http
          .get(`${baseUrl}Articulo/PorCodigoBarras/${this.code}.`)
          .subscribe((resp: any) => {
            console.log(resp);
            if (Object.entries(resp).length !== 0) {
              this.data = resp[0];
              this.id = resp[0].Id;
              console.log(this.id);

              this.http
                .get(
                  `${baseUrl}FotoDeProducto/PequePrincipalPorIdArticulo/${this.id}`
                )
                .subscribe((res: any) => {
                  console.log(res.Id);
                  this.filename = res.NombreArchivo;
                  console.log(this.filename);

                  this.image = `https://www.coalimaronline.com/assets/fotosArticulos/${this.filename}`;
                  console.log(this.image);
                });
            } else {
              // console.log('Hola');
              this.image = '../../assets/images/busquedaSinResultados.png';
              this.codeStr = '';
              this.price = '';
              this.data = {
                //Nombre: 'No existe el producto',
                //Pvp: null,
                //Codigo: '---',
              };
            }
          });

        // // .catch((err) => {
        // //   console.log('Error', err);
        // // });
      });
    } catch (error) {
      console.log(error);

    }

  }
}



/////////////
import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonCard, IonSpinner, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HttpClient } from '@angular/common/http';
import { Network } from '@capacitor/network';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonSpinner, IonCard, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CurrencyPipe, UpperCasePipe, HeaderComponent]

})
export class Tab3Page {

  http = inject(HttpClient)

  showSpinner = true;

  code!: string;
  data: any;
  id!: number;
  filename!: string;
  image!: string;
  codeStr = 'Código: ';
  price = 'Precio: ';

  buscar(event: any) {
    setTimeout(() => {
      this.showSpinner = false;
    }, 1000);
    this.code = event.target.value;
    //console.log(this.code);

    this.http
      .get(
        `https://www.coalimaronline.com/api/Articulo/PorCodigoBarras/${this.code}.`
      )
      .subscribe((resp: any) => {
        //console.log(resp);
        if (Object.entries(resp).length !== 0) {
          this.data = resp[0];
          console.log(this.data);

          this.id = resp[0].Id;
          //console.log(this.id);

          this.http
            .get(
              `https://www.coalimaronline.com/api/FotoDeProducto/PequePrincipalPorIdArticulo/${this.id}`
            )
            .subscribe((res: any) => {
              //console.log(res.Id);
              this.filename = res.NombreArchivo;
              // console.log(this.nombreArchivo);

              this.image = `https://www.coalimaronline.com/assets/fotosArticulos/${this.filename}`;
              //console.log(this.image);
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
    //});
  }


}


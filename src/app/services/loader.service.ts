import { inject, Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loadingCtrl = inject(LoadingController)
  // constructor(public loadingCtrl: LoadingController) {}

  // This will show then autohide the loader
  showHideAutoLoader() {
    this.loadingCtrl
      .create({
        message: 'This Loader Will Auto Hide in 2 Seconds',
        duration: 2000,
      })
      .then((res) => {
        res.present();

        res.onDidDismiss().then((dis) => {
          console.log('Loading dismissed! after 2 Seconds', dis);
        });
      });
  }

  // Show the loader for infinite time
  showLoader() {
    this.loadingCtrl
      .create({
        message: 'Please wait...',
      })
      .then((res) => {
        res.present();
      });
  }

  // Hide the loader if already created otherwise return error
  hideLoader() {
    this.loadingCtrl
      .dismiss()
      .then((res) => {
        console.log('Loading dismissed!', res);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }


}

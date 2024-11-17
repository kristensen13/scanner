import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  ModalController,
  ModalOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeCircleOutline, checkmarkCircleOutline, arrowBack } from 'ionicons/icons';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  constructor() {
    addIcons({
      closeCircleOutline,
      checkmarkCircleOutline, arrowBack
    })
  }

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  alertCtrl = inject(AlertController);
  router = inject(Router);

  // async takePicture(promptLabelHeader: string) {
  //   return await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: true,
  //     resultType: CameraResultType.DataUrl,
  //     source: CameraSource.Prompt,
  //     promptLabelHeader,
  //     promptLabelPhoto: 'Seleccionar foto',
  //     promptLabelPicture: 'Hacer foto',
  //   });
  // }

  // Alert
  async presentAlert(opts?: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);
    await alert.present();
  }

  // Loading
  loading() {
    return this.loadingCtrl.create({
      spinner: 'crescent',
      message: 'Please wait...',
    });
  }

  // Toast
  async toastPresent(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    await toast.present();
  }

  // Navigate
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  // Save a element in the local storage
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  // Get a element in the local storage
  getFromLocalStorage(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Modal
  async modalPresent(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      return data;
    }
  }

  // Dismiss modal
  dismissModal(data?: any) {
    return this.modalCtrl.dismiss(data);
  }
}

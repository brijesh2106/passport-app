import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular'; // Import ToastController

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  applicationType: string = '';
  reissueReason: string = '';
  changeParticularsReason: string = '';
  displayReissueOptions: boolean = false;
  // Existing model bindings...
  typeOfApplication: string = '';
  passportBookletType: string = '';
  validityRequired: string = '';
  givenName: string = '';
  knownByOtherNames: string = '';
  nameChanged: string = '';
  photoFileName: string = '';
  signatureFileName: string = '';

  constructor(private toastController: ToastController) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  checkReissueStatus() {
    this.displayReissueOptions = this.applicationType === 'reissue';
  }

  validateAndUploadFile(event: Event, fileType: 'photo' | 'signature') {
    const element = event.target as HTMLInputElement;
    const file = element.files ? element.files[0] : null;
    if (!file) {
      this.presentToast(`No ${fileType} selected!`);
      return;
    }

    if (!file.type.match(/image\/(jpg|jpeg|png)/)) {
      this.presentToast(`Only .JPG, .JPEG and .PNG files are allowed for ${fileType}!`);
      return;
    }

    if (file.size > 2097152) {
      this.presentToast(`${fileType.toUpperCase()} size must be less than 2MB!`);
      return;
    }

    // Update file name properties based on the file type
    if (fileType === 'photo') {
      this.photoFileName = file.name;
    } else if (fileType === 'signature') {
      this.signatureFileName = file.name;
    }

    this.presentToast(`${fileType.toUpperCase()} is valid and ready to be uploaded!`);
  }

  onSubmit(form: NgForm) {
    console.log('Application Type:', this.applicationType);
    console.log('Reissue Reason:', this.reissueReason);
    console.log('Change Particulars Reason:', this.changeParticularsReason);
    // Further submission logic can be implemented here
  }
}

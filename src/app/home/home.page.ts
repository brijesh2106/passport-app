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
  applicantGivenName: string = ''; // Updated from givenName
  applicantSurname: string = ''; // Updated from surname
  knownByOtherNames: string = '';
  nameChanged: string = '';
  photoFileName: string = '';
  signatureFileName: string = '';
  dateOfBirth: string = ''; // Default value assigned
  today: Date = new Date(); // Get today's date
  placeOfBirth: string = '';
  district: string = '';
  state: string = '';
  region: string = '';
  gender: string = '';
  maritalStatus: string = '';
  citizenship: string = '';
  pan: string = '';
  voterId: string = '';
  employmentType: string = '';
  organizationName: string = '';
  showOrganizationField: boolean = false;
  familyGovernmentServant: string = '';
  educationalQualification: string = '';
  nonEcrStatus: string = '';
  distinguishingMark: string = '';
  aadhaarNumber: string = '';
  fathersGivenName: string = '';
  fathersSurname: string = '';
  mothersGivenName: string = '';
  mothersSurname: string = '';
  legalGuardiansGivenName: string = '';
  legalGuardiansSurname: string = '';
  spousesGivenName: string = '';
  spousesSurname: string = '';
  filePassportNumber: string = '';
  fathersnationality: string = '';
  mothersFilePassportNumber: string = '';
  mothersNationality: string = '';
  houseStreet: string = '';
  villageTownCity: string = '';
  residentialDistrict: string = '';
  policeStation: string = '';
  stateUT: string = '';
  pin: string = '';
  mobileNumber: string = '';
  telephoneNumber: string = '';
  emailID: string = '';
  permanentSameAsPresent: string = '';
  emergencyAddressDifferent: string = '';
  emergencyNameAddress: string = '';
  emergencyMobileNumber: string = '';
  emergencyTelephoneNumber: string = '';
  emergencyEmailId: string = '';
  passportNumber: string = '';
  dateOfIssue: string = '';
  dateOfExpiry: string = '';
  currentDate: Date = new Date();
  nextDay: Date = new Date(); 
  placeOfIssue: string = '';
  passportNotIssued: string = '';
  showPassportDetails: boolean = false;
  fileNumber: string = '';
  applicationDate: string = '';
  passportOffice: string = '';
  pendingProceedings: string = '';
  pendingWarrantOrSummons: string = '';
  arrestWarrantIssued: string = '';
  departureProhibitionOrder: string = '';
  convictedMoralTurpitude: string = '';
  refusedPassport: string = '';
  impoundedPassport: string = '';
  revokedPassport: string = '';
  grantedCitizenship: string = '';
  heldPassport: string = '';
  surrenderedIndianPassport: string = '';
  appliedForRenunciation: string = '';
  returnedOnEC: string = '';
  deported: string = '';
  deportationCostRefunded: string = '';
  repatriated: string = '';
  repatriationCostRefunded: string = '';    //photo after
  aadhaarFileName: string = '';
  panFileName: string = '';
  voterIdFileName: string = '';
  isPhotoChecked: boolean = false;
  isSignatureChecked: boolean = false;
  isAadhaarChecked: boolean = false;
  isPANChecked: boolean = false;
  isVoterIDChecked: boolean = false;
  selfDeclarationPlace: string = '';
  selfDeclarationFileName: string = '';
  dateOfApply: string = '';
  preview: boolean = false; 

  
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

  validateAndUploadFile(event: Event, fileType: 'photo' | 'signature' | 'aadhaar' | 'pan' | 'voterId' | 'selfDeclaration') {
    const element = event.target as HTMLInputElement;
    const file = element.files ? element.files[0] : null;
    if (!file) {
      this.presentToast(`No file selected for ${fileType}!`);
      return;
    }
  
    if (!file.type.match(/image\/(jpg|jpeg|png)/)) {
      this.presentToast(`Only .JPG, .JPEG, and .PNG files are allowed for ${fileType}!`);
      return;
    }
  
    if (file.size > 2097152) {
      this.presentToast(`${fileType.toUpperCase()} size must be less than 2MB!`);
      return;
    }
  
    // Assign file name based on file type
    switch (fileType) {
      case 'photo':
        this.photoFileName = file.name;
        break;
      case 'signature':
        this.signatureFileName = file.name;
        break;
      case 'aadhaar':
        this.aadhaarFileName = file.name;
        break;
      case 'pan':
        this.panFileName = file.name;
        break;
      case 'voterId':
        this.voterIdFileName = file.name;
        break;
      case 'selfDeclaration':
        this.selfDeclarationFileName = file.name; // Ensures handling for selfDeclaration
        break;
    }
  
    this.presentToast(`${fileType.toUpperCase()} is valid and ready to be uploaded!`);
  }
  

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.previewFormData();
      this.generateJsonResponse();
    } else {
      this.presentToast('Please check the form for errors.');
    }
  }

  togglePreview() {
    this.preview = !this.preview;
    this.previewFormData(); // Optionally log the data or handle other preview-specific logic
  }

  previewFormData() {
    console.log("Form Data:", {
      applicationType: this.applicationType,
      reissueReason: this.reissueReason,
      changeParticularsReason: this.changeParticularsReason,
      displayReissueOptions: this.displayReissueOptions,
      typeOfApplication: this.typeOfApplication,
      passportBookletType: this.passportBookletType,
      validityRequired: this.validityRequired,
      applicantGivenName: this.applicantGivenName,
      applicantSurname: this.applicantSurname,
      knownByOtherNames: this.knownByOtherNames,
      nameChanged: this.nameChanged,
      photoFileName: this.photoFileName,
      signatureFileName: this.signatureFileName,
      dateOfBirth: this.dateOfBirth,
      today: this.today,
      placeOfBirth: this.placeOfBirth,
      district: this.district,
      state: this.state,
      region: this.region,
      gender: this.gender,
      maritalStatus: this.maritalStatus,
      citizenship: this.citizenship,
      pan: this.pan,
      voterId: this.voterId,
      employmentType: this.employmentType,
      organizationName: this.organizationName,
      showOrganizationField: this.showOrganizationField,
      familyGovernmentServant: this.familyGovernmentServant,
      educationalQualification: this.educationalQualification,
      nonEcrStatus: this.nonEcrStatus,
      distinguishingMark: this.distinguishingMark,
      aadhaarNumber: this.aadhaarNumber,
      fathersGivenName: this.fathersGivenName,
      fathersSurname: this.fathersSurname,
      mothersGivenName: this.mothersGivenName,
      mothersSurname: this.mothersSurname,
      legalGuardiansGivenName: this.legalGuardiansGivenName,
      legalGuardiansSurname: this.legalGuardiansSurname,
      spousesGivenName: this.spousesGivenName,
      spousesSurname: this.spousesSurname,
      filePassportNumber: this.filePassportNumber,
      fathersnationality: this.fathersnationality,
      mothersFilePassportNumber: this.mothersFilePassportNumber,
      mothersNationality: this.mothersNationality,
      houseStreet: this.houseStreet,
      villageTownCity: this.villageTownCity,
      residentialDistrict: this.residentialDistrict,
      policeStation: this.policeStation,
      stateUT: this.stateUT,
      pin: this.pin,
      mobileNumber: this.mobileNumber,
      telephoneNumber: this.telephoneNumber,
      emailID: this.emailID,
      permanentSameAsPresent: this.permanentSameAsPresent,
      emergencyAddressDifferent: this.emergencyAddressDifferent,
      emergencyNameAddress: this.emergencyNameAddress,
      emergencyMobileNumber: this.emergencyMobileNumber,
      emergencyTelephoneNumber: this.emergencyTelephoneNumber,
      emergencyEmailId: this.emergencyEmailId,
      passportNumber: this.passportNumber,
      dateOfIssue: this.dateOfIssue,
      dateOfExpiry: this.dateOfExpiry,
      currentDate: this.currentDate,
      nextDay: this.nextDay,
      placeOfIssue: this.placeOfIssue,
      passportNotIssued: this.passportNotIssued,
      showPassportDetails: this.showPassportDetails,
      fileNumber: this.fileNumber,
      applicationDate: this.applicationDate,
      passportOffice: this.passportOffice,
      pendingProceedings: this.pendingProceedings,
      pendingWarrantOrSummons: this.pendingWarrantOrSummons,
      arrestWarrantIssued: this.arrestWarrantIssued,
      departureProhibitionOrder: this.departureProhibitionOrder,
      convictedMoralTurpitude: this.convictedMoralTurpitude,
      refusedPassport: this.refusedPassport,
      impoundedPassport: this.impoundedPassport,
      revokedPassport: this.revokedPassport,
      grantedCitizenship: this.grantedCitizenship,
      heldPassport: this.heldPassport,
      surrenderedIndianPassport: this.surrenderedIndianPassport,
      appliedForRenunciation: this.appliedForRenunciation,
      returnedOnEC: this.returnedOnEC,
      deported: this.deported,
      deportationCostRefunded: this.deportationCostRefunded,
      repatriated: this.repatriated,
      repatriationCostRefunded: this.repatriationCostRefunded,
      aadhaarFileName: this.aadhaarFileName,
      panFileName: this.panFileName,
      voterIdFileName: this.voterIdFileName,
      isPhotoChecked: this.isPhotoChecked,
      isSignatureChecked: this.isSignatureChecked,
      isAadhaarChecked: this.isAadhaarChecked,
      isPANChecked: this.isPANChecked,
      isVoterIDChecked: this.isVoterIDChecked,
      selfDeclarationPlace: this.selfDeclarationPlace,
      selfDeclarationFileName: this.selfDeclarationFileName,
      dateOfApply: this.dateOfApply,
     
    });
  }

  generateJsonResponse() {
    const formData = {
      applicationType: this.applicationType,
      reissueReason: this.reissueReason,
      changeParticularsReason: this.changeParticularsReason,
      displayReissueOptions: this.displayReissueOptions,
      typeOfApplication: this.typeOfApplication,
      passportBookletType: this.passportBookletType,
      validityRequired: this.validityRequired,
      applicantGivenName: this.applicantGivenName,
      applicantSurname: this.applicantSurname,
      knownByOtherNames: this.knownByOtherNames,
      nameChanged: this.nameChanged,
      photoFileName: this.photoFileName,
      signatureFileName: this.signatureFileName,
      dateOfBirth: this.dateOfBirth,
      today: this.today,
      placeOfBirth: this.placeOfBirth,
      district: this.district,
      state: this.state,
      region: this.region,
      gender: this.gender,
      maritalStatus: this.maritalStatus,
      citizenship: this.citizenship,
      pan: this.pan,
      voterId: this.voterId,
      employmentType: this.employmentType,
      organizationName: this.organizationName,
      showOrganizationField: this.showOrganizationField,
      familyGovernmentServant: this.familyGovernmentServant,
      educationalQualification: this.educationalQualification,
      nonEcrStatus: this.nonEcrStatus,
      distinguishingMark: this.distinguishingMark,
      aadhaarNumber: this.aadhaarNumber,
      fathersGivenName: this.fathersGivenName,
      fathersSurname: this.fathersSurname,
      mothersGivenName: this.mothersGivenName,
      mothersSurname: this.mothersSurname,
      legalGuardiansGivenName: this.legalGuardiansGivenName,
      legalGuardiansSurname: this.legalGuardiansSurname,
      spousesGivenName: this.spousesGivenName,
      spousesSurname: this.spousesSurname,
      filePassportNumber: this.filePassportNumber,
      fathersnationality: this.fathersnationality,
      mothersFilePassportNumber: this.mothersFilePassportNumber,
      mothersNationality: this.mothersNationality,
      houseStreet: this.houseStreet,
      villageTownCity: this.villageTownCity,
      residentialDistrict: this.residentialDistrict,
      policeStation: this.policeStation,
      stateUT: this.stateUT,
      pin: this.pin,
      mobileNumber: this.mobileNumber,
      telephoneNumber: this.telephoneNumber,
      emailID: this.emailID,
      permanentSameAsPresent: this.permanentSameAsPresent,
      emergencyAddressDifferent: this.emergencyAddressDifferent,
      emergencyNameAddress: this.emergencyNameAddress,
      emergencyMobileNumber: this.emergencyMobileNumber,
      emergencyTelephoneNumber: this.emergencyTelephoneNumber,
      emergencyEmailId: this.emergencyEmailId,
      passportNumber: this.passportNumber,
      dateOfIssue: this.dateOfIssue,
      dateOfExpiry: this.dateOfExpiry,
      currentDate: this.currentDate,
      nextDay: this.nextDay,
      placeOfIssue: this.placeOfIssue,
      passportNotIssued: this.passportNotIssued,
      showPassportDetails: this.showPassportDetails,
      fileNumber: this.fileNumber,
      applicationDate: this.applicationDate,
      passportOffice: this.passportOffice,
      pendingProceedings: this.pendingProceedings,
      pendingWarrantOrSummons: this.pendingWarrantOrSummons,
      arrestWarrantIssued: this.arrestWarrantIssued,
      departureProhibitionOrder: this.departureProhibitionOrder,
      convictedMoralTurpitude: this.convictedMoralTurpitude,
      refusedPassport: this.refusedPassport,
      impoundedPassport: this.impoundedPassport,
      revokedPassport: this.revokedPassport,
      grantedCitizenship: this.grantedCitizenship,
      heldPassport: this.heldPassport,
      surrenderedIndianPassport: this.surrenderedIndianPassport,
      appliedForRenunciation: this.appliedForRenunciation,
      returnedOnEC: this.returnedOnEC,
      deported: this.deported,
      deportationCostRefunded: this.deportationCostRefunded,
      repatriated: this.repatriated,
      repatriationCostRefunded: this.repatriationCostRefunded,
      aadhaarFileName: this.aadhaarFileName,
      panFileName: this.panFileName,
      voterIdFileName: this.voterIdFileName,
      isPhotoChecked: this.isPhotoChecked,
      isSignatureChecked: this.isSignatureChecked,
      isAadhaarChecked: this.isAadhaarChecked,
      isPANChecked: this.isPANChecked,
      isVoterIDChecked: this.isVoterIDChecked,
      selfDeclarationPlace: this.selfDeclarationPlace,
      selfDeclarationFileName: this.selfDeclarationFileName,
      dateOfApply: this.dateOfApply,

    };
    console.log("JSON Response:", JSON.stringify(formData));
  }
}

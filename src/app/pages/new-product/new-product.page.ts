import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.models';
import { DbfirebaseService } from 'src/app/services/dbfirebase.service';
import { FirestorageService } from 'src/app/services/firestorage.service';

import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {

  public user$: Observable<any> = this.authSvc.afAuth.user;



  productos: Producto[] = [];
  newProducto: Producto;
  private path = 'Productos/';
  enableNewProducto = false;


  //loading
  loading: any;

  //file variables
  newImage = '';
  newFile: any;
  mmyTienda: any;

  constructor(
    public firestoreService: DbfirebaseService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public firestorageService: FirestorageService,
    private authSvc: AuthService
  ) { }

  ngOnInit() {
    this.authSvc.getUser()
    .subscribe(user =>{
      console.log("My ID ESSS: ", user.uid);
      this.mmyTienda = user.uid; 
      this.resetFormAdd(this.mmyTienda);
    });

    
   if(this.getProductos()!=null){
    this.getProductos();
   }

    //this.user$.subscribe(event => console.log("My IDssss ES: ", event.uid));
   
  
  }

 

  async guardarProducto(myTienda) {
    this.mmyTienda = myTienda.value;
    this.presentLoading("Guardando...");
    const path = "Productos";
    const name = this.newProducto.nombre;
    if (this.newFile !== undefined) {
      const res = await this.firestorageService.uploadImage(this.newFile, path, name);
      this.newProducto.photoURL = res;
    }

    this.firestoreService.createDoc(this.newProducto, this.path, this.newProducto.id).then(res => {
      this.loading.dismiss();

      //reset form
      this.resetFormAdd(myTienda.value);
      this.presentToast('Producto guardado con exito', 'success');
    }).catch(error => {
      this.presentToast('Producto no se pudo guardar', 'danger');
    });

  }

  //devolver productos

  getProductos() {

    this.firestoreService.getCollection<Producto>(this.path).subscribe(res => {
      this.productos = res;

    });

  }

  //eliminar
  async deleteProducto(producto: Producto) {

    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: '¿Seguro que desea <strong>eliminar</strong> el producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancelar');
          }
        }, {
          text: 'Si, eliminar',
          handler: () => {
            this.firestoreService.deleteDoc(this.path, producto.id).then(res => {
              this.presentToast('Producto eliminado con exito', 'warning');
              this.alertController.dismiss();
            }).catch(error => {
              this.presentToast('Producto no se pudo eliminar', 'danger');
            });

            console.log('Confirm Si');
          }
        }
      ]
    });

    await alert.present();

  }

  //reset
  resetFormAdd(mmyTienda) {

    console.log("My tienda id", this.mmyTienda);

    this.newProducto = {
      nombre: '',
      descripcion: '',
      precio: null,
      precioDescuento: null,
      photoURL: '',
      id: this.firestoreService.getId(),
      idTienda:mmyTienda,
      totalCompras: 0,
      cantidad:null,
      categoria: '',
      fecha: new Date()
    }

  }


  //ion loading
  async presentLoading(textoLoading: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'loadingStyle',
      message: textoLoading,
    });
    await this.loading.present();
  }

  //mensaje toast
  async presentToast(msg: string, colorToast: string) {
    const toast = await this.toastController.create({
      color: colorToast,
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  //Agregar imagen
  async newImageProductUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        //this.newImage=image.target.result as string;
        this.newProducto.photoURL = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}

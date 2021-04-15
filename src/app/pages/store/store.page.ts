import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto.models';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DbfirebaseService } from 'src/app/services/dbfirebase.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  productos: Producto[] = [];

  private path = 'Productos/';

  nuevosSuscriber: Subscription;

  producto: Producto;
  usuario: User;
  constructor(public firestoreService: DbfirebaseService, private authSvc: AuthService, private router: Router) { }


  ngOnInit() {
    const data = this.firestoreService.getNavData();
    console.log("My store id is: ", data);
    this.getTienda(data.tiendaID);
    this.getProductos(data.tiendaID);
  }

  async getProductos(ctiendaID) {

    //const uid = await this.authSvc.getUid();
    const path = 'Productos/';
    this.nuevosSuscriber = this.firestoreService.getCollectionQuery<Producto>(path, 'idTienda', '==', ctiendaID).subscribe(res => {
      if (res.length) {
        console.log('getPedidosNuevos() -> res ', res);
        this.productos = res;
      }
    });

  }
  getTienda(tiendaID: string) {
    //console.log("My product id is: ",productID);
    const path = 'users';
    this.firestoreService.getDoc<User>(path, tiendaID).subscribe(res => {
      if (res !== undefined) {
        this.usuario = res;
        console.log('datosVendedor ->', this.usuario);
      }

    });

  }


  
 
}

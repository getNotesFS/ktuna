import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto.models';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DbfirebaseService } from 'src/app/services/dbfirebase.service';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.page.html',
  styleUrls: ['./my-store.page.scss'],
})
export class MyStorePage implements OnInit {
  productos: Producto[] = [];

  private path = 'Productos/';
  public user$: Observable<any> = this.authSvc.afAuth.user;

  usuario: User;
  anyu: any;
  constructor(private authSvc: AuthService, private firestoreService: DbfirebaseService, private router: Router) {

    const path = 'users';
    this.user$.subscribe(auth => {
      console.log('datosCliente ->', auth.uid);

      this.firestoreService.getDoc<User>(path, auth.uid).subscribe(res => {
        if (res !== undefined) {
          this.usuario = res;
          console.log('datosCliente ->', this.usuario);
          this.firestoreService.getCollection<Producto>(this.path).subscribe(res => {
            
            if(res[0].idTienda === this.usuario.uid){
              this.productos = res;
            }else{
              console.log("No hay productos");
            }
            console.log(this.productos);
          });
        
        }

      });
    });



  }
  ngOnInit() {
    //this.getProductos();
    
  }

  getProductos() {

    this.firestoreService.getCollection<Producto>(this.path).subscribe(res => {
      this.productos = res;
      console.log(this.productos);
    });

  }

  getProducto(productoID: Producto) {
    let data = {
      'id': productoID.id,
      'tiendaID': productoID.idTienda
    }
    this.firestoreService.setNavData(data);
    this.router.navigate(['/tabs-seller/product']);
    console.log(productoID.id);
  }


}

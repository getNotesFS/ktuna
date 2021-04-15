import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto.models';
import { User } from 'src/app/interfaces/user.interface';
import { DbfirebaseService } from 'src/app/services/dbfirebase.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  producto: Producto;
  usuario:User;
 
  constructor(public firestoreService: DbfirebaseService, private router:Router) { }

  ngOnInit() { 
    //this.getProducto();
    const data =this.firestoreService.getNavData();
    console.log("My product id is: ",data);
    this.getProducto(data.id);
    this.getTienda(data.tiendaID);
  }

   getProducto(productID:string) { 
    //console.log("My product id is: ",productID);
    const path = 'Productos';  
    this.firestoreService.getDoc<Producto>(path, productID).subscribe( res => {
          if (res !== undefined) {
                this.producto = res;
               console.log('datosCliente ->' , this.producto);
          }
          
    });

  }


  getTienda(tiendaID:string) { 
    //console.log("My product id is: ",productID);
    const path = 'users';  
    this.firestoreService.getDoc<User>(path, tiendaID).subscribe( res => {
          if (res !== undefined) {
                this.usuario = res;
               console.log('datosCliente ->' , this.usuario);
          }
          
    });

  }

  openStore(tiendaID){
    let data={ 
      'tiendaID':tiendaID
    }
  this.firestoreService.setNavData(data);
  this.router.navigate(['/store']);
  }
  
}

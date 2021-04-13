import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.models';
import { DbfirebaseService } from 'src/app/services/dbfirebase.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {


  productos: Producto[] = [];
  newProducto: Producto = {
    nombre:'',
    descripcion:'',
    precio:null,
    precioDescuento:null,
    photoURL:'',
    id:this.firestoreService.getId(),
    categoria:'',
    fecha:new Date()

  };
  private path = 'Productos/';
  enableNewProducto = false;

  constructor(public firestoreService: DbfirebaseService) { }

  ngOnInit() {
    this.getProductos();
  }

  async guardarProducto() {

    this.firestoreService.createDoc(this.newProducto, this.path, this.newProducto.id);

  }

//devolver productos

  getProductos() {
    this.firestoreService.getCollection<Producto>(this.path).subscribe(res => {
      this.productos = res;
    });
  }

  //eliminar
  async deleteProducto(producto: Producto) {

    this.firestoreService.deleteDoc(this.path,producto.id);
}
}

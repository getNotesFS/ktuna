export interface Categoria{
    nombre:string;
}

export interface Producto {
    nombre: string;
    descripcion:string;
    precio: number;
    precioDescuento:number;
    photoURL: string;
    categoria: string;  
    id:string;
    fecha: Date;
}

export interface Cliente {
   uid: string;
   email: string;
   nombre: string;
   celular: string;
   cedula:string;
   photoURL: string;
   referencia: string; 
}

export interface Pedido {
   id: string;
   cliente: Cliente;
   productos: ProductoPedido[];
   precioTotal: number;
   estado: EstadoPedido;
   fecha: any;
   valoracion: number;
}

export interface ProductoPedido {
    producto: Producto;
    cantidad: number;
}

export type  EstadoPedido = 'enviado' | 'visto' | 'camino' | 'entregado';



 

 
 export interface Roles{
     cliente?:boolean;
     vendedor?:boolean;
     admin?:boolean;
 }

 export interface Tienda{
     nombre?:string;
     photoURL?:string;
     productoVenta?:string;
     descripcion?:string;
     direccion?:string;
     telefono?:string;
 }
export interface User{
    uid:string;
    email?:string;
    displayName?:string;
    photoURL?: string;
    emailVerified?:boolean;
    ci?:string;
    roles?: Roles; 
    tienda?:Tienda; 
}

export interface datosCliente{  
    direccion?:string;
    telefono?:string;
}
export interface UserCliente{
    uid:string;
    email?:string;
    displayName?:string;
    photoURL?: string;
    emailVerified?:boolean;
    ci?:string;
    roles?: Roles; 
    datosCliente?:datosCliente; 
}
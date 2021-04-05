export interface Roles{
    client:boolean;
    seller:boolean;
}

export interface User{
    uid:string;
    email:string;
    displayName:string;
    photoURL: string;
    emailVerified:boolean; 
    //roles:Roles;
}

/*
  
    nameSurname:string;
    ci:string;
    typeProduct:string; */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
 

@Injectable({
  providedIn: 'root'
})
export class DbfirebaseService {

  navData:any;

  constructor(public dbFirestore: AngularFirestore) { }

  //crear nuevo documento
  createDoc(data: any, path: string, id: string) {
    const collection = this.dbFirestore.collection(path);
    return collection.doc(id).set(data);
  }
  //devolver documento
  getDoc<tipo>(path: string, id: string) {
    const collection = this.dbFirestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }
  //eliminar documento
  deleteDoc(path: string, id: string) {
    const collection = this.dbFirestore.collection(path);
    return collection.doc(id).delete();
  }
  //actualizar documento
  updateDoc(data: any, path: string, id: string) {
    const collection = this.dbFirestore.collection(path);
    return collection.doc(id).update(data);
  }


  //devolver ID
  getId() {
    return this.dbFirestore.createId();
  }

  //devolver coleccion
  getCollection<tipo>(path: string) {
    const collection = this.dbFirestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  //devolver colección por búsqueda
  getCollectionQuery<tipo>(path: string, parametro: string, condicion: any, busqueda: string) {
    const collection = this.dbFirestore.collection<tipo>(path,
      ref => ref.where(parametro, condicion, busqueda));
    return collection.valueChanges();
  }

  //devolver todas las colecciones
  getCollectionAll<tipo>(path, parametro: string, condicion: any, busqueda: string, startAt: any) {
    if (startAt == null) {
      startAt = new Date();
    }
    const collection = this.dbFirestore.collectionGroup<tipo>(path,
      ref => ref.where(parametro, condicion, busqueda)
        .orderBy('fecha', 'desc')
        .limit(1)
        .startAfter(startAt)
    );
    return collection.valueChanges();
  }

  //devolver coleccion por página
  getCollectionPaginada<tipo>(path: string, limit: number, startAt: any) {
    if (startAt == null) {
      startAt = new Date();
    }
    const collection = this.dbFirestore.collection<tipo>(path,
      ref => ref.orderBy('fecha', 'desc')
        .limit(limit)
        .startAfter(startAt)
    );
    return collection.valueChanges();
  }



  //navData
  setNavData(navObj){
    this.navData=navObj;
  }
  getNavData(){
    if(!this.navData){
      return 0;
    }
    return this.navData;
  }



}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CoffeeOrder } from './order.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private firestore: AngularFirestore) { }

  createCoffeeOrder(data: CoffeeOrder) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("coffeeOrders")
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }

  updateCoffeeOrder(data: CoffeeOrder) {
    return this.firestore
      .collection("coffeeOrders")
      .doc(data.id)
      .set({ completed: true }, { merge: true });
  }

  deleteCoffeeOrder(data: CoffeeOrder) {
    return this.firestore
      .collection("coffeeOrders")
      .doc(data.id)
      .delete();
  }

  getCoffeeOrders(): Observable<any> | Observable<CoffeeOrder[]> {
    return this.firestore.collection<CoffeeOrder>("coffeeOrders")
      .snapshotChanges()
      .pipe(
        map(docChangeActions => {
          return docChangeActions.map(coffeeOrderDoc => {
            let data = coffeeOrderDoc.payload.doc.data();
            let id = coffeeOrderDoc.payload.doc.id;
            console.warn({ id, ...data } as CoffeeOrder);
            return { id, ...data } as CoffeeOrder;
          })
        })
      );

  }


}

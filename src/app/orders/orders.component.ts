import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/orders.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CoffeeOrder } from '../shared/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private ordersService: OrdersService) { }

  form = new FormGroup({
    customerName: new FormControl(''),
    orderNumber: new FormControl(''),
    coffeeOrder: new FormControl(''),
    completed: new FormControl(false)
  })

  coffees = ["Americano", "Flat White", "Cappuccino",
    "Latte", "Espresso", "Machiato", "Mocha", "Hot Chocolate", "Tea"];

  coffeeOrder = [];

  addCoffee = coffee => {
    return this.coffeeOrder.push(coffee);
  };

  removeCoffee = coffee => {
    let index = this.coffeeOrder.indexOf(coffee);
    if (index > -1) this.coffeeOrder.splice(index, 1);
  };

  onSubmit() {

    let order: CoffeeOrder;
    order = this.form.value;
    order.coffeeOrder = this.coffeeOrder;

    this.ordersService.createCoffeeOrder(order)
      .then(res => {

      });

    this.coffeeOrder = [];
    this.form.reset();

  }

  ngOnInit() {
  }


}

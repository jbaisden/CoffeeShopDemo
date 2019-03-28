import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/orders.service';
import { CoffeeOrder } from '../shared/order.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private ordersService: OrdersService) { }
  coffeeOrders: Observable<CoffeeOrder[]>;

  markCompleted = (data: CoffeeOrder) => {
    return this.ordersService.updateCoffeeOrder(data);
  };

  deleteOrder = (data: CoffeeOrder) => {
    this.ordersService.deleteCoffeeOrder(data);
  };

  ngOnInit() {
    this.coffeeOrders = this.ordersService.getCoffeeOrders();
  }

}

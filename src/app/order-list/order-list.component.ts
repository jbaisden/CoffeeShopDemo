import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private ordersService: OrdersService) { }
  coffeeOrders;

  getCoffeeOrders = () => {
    return this.ordersService
      .getCoffeeOrders()
      .subscribe(res => (this.coffeeOrders = res));
  };

  markCompleted = data => {
    return this.ordersService.updateCoffeeOrder(data);
  };

  deleteOrder = data => {
    return this.ordersService.deleteCoffeeOrder(data);
  };

  ngOnInit() {
    this.getCoffeeOrders();
  }

}

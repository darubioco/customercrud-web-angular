import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {

  customers: Customer[];
  serviceErrorMessage: string;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}

  readCustomers() {
    this.customerService.readCustomers().then((customers) => {
      this.customers = customers;
    }).catch((error) => {
      this.serviceErrorMessage = error.message;
    });
  }

  ngOnInit() {
    this.readCustomers();
  }

  goToCreateCustomer() {
    this.router.navigateByUrl('customer-form');
  }

  goToUpdateCustomer(customerId: string) {
    this.router.navigate(['customer-form'], { queryParams: { id: customerId }});
  }

  deleteCustomer(customerId: string) {
    this.customerService.deleteCustomer(customerId).then(() => {
      this.readCustomers();
    }).catch((error) => {
      this.serviceErrorMessage = error.message;
    });
  }

}

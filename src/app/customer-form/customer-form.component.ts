import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
})
export class CustomerFormComponent implements OnInit {

  customer: Customer;
  title: string;
  serviceErrorMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      const customerId = queryParams.id;
      if (customerId) {
        this.title = 'Update customer';
        this.customerService.readCustomer(customerId).then((customerToUpdate) => {
          this.customer = customerToUpdate;
        }).catch((error) => {
          this.serviceErrorMessage = error.message;
        });
      } else {
        this.title = 'Create customer';
        this.customer = new Customer();
      }
    });
  }

  goToCustomerList() {
    this.router.navigateByUrl('customer-list');
  }

  saveCustomer() {
    let savePromise;
    if (!this.customer.id) {
      savePromise = this.customerService.createCustomer(this.customer);
    } else {
      savePromise = this.customerService.updateCustomer(this.customer);
    }
    savePromise.then(() => {
      this.goToCustomerList();
    }).catch((error) => {
      this.serviceErrorMessage = error.message;
    });
  }

}

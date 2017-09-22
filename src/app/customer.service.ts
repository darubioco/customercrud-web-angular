import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Customer } from './customer';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomerService {

  private baseUrl = 'http://localhost:3000/api/customers';

  constructor(private http: Http) {}

  private genericErrorMessage(error: any): string {
    switch (error.status) {
      case 0:
        return 'Service unavailable';
      case 400:
        return 'Bad request';
      case 404:
        return 'Not found';
      case 500:
        return 'Internal server error';
      default:
        return `Unexpected error with status ${error.status}`;
    }
  }

  createCustomer(customerToCreate: Customer): Promise<Customer> {
    return this.http.post(this.baseUrl, customerToCreate).toPromise()
      .then(response => response.json() as Customer)
      .catch((error) => {
        let message;
        if (error.status === 400) {
          message = `Customer not created: email "${customerToCreate.email}" already in use`;
        } else {
          message = this.genericErrorMessage(error);
        }
        return Promise.reject({ message });
      });
  }

  readCustomers(): Promise<Customer[]> {
    return this.http.get(this.baseUrl).toPromise()
      .then(response => response.json() as Customer[])
      .catch((error) => {
        return Promise.reject({ message: this.genericErrorMessage(error) });
      });
  }

  readCustomer(customerId: string): Promise<Customer> {
    return this.http.get(this.baseUrl + '/' + customerId).toPromise()
      .then(response => response.json() as Customer)
      .catch((error) => {
        let message;
        if (error.status === 400) {
          message = `Invalid customer id "${customerId}"`;
        } else if (error.status === 404) {
          message = `Customer with id "${customerId}" not found`;
        } else {
          message = this.genericErrorMessage(error);
        }
        return Promise.reject({ message });
      });
  }

  updateCustomer(customerToUpdate): Promise<Customer> {
    return this.http.put(this.baseUrl + '/' + customerToUpdate.id,
      customerToUpdate).toPromise()
      .then(response => response.json() as Customer)
      .catch((error) => {
        let message;
        if (error.status === 400) {
          message = `Customer not updated: email "${customerToUpdate.email}" already in use`;
        } else {
          message = this.genericErrorMessage(error);
        }
        return Promise.reject({ message });
      });
  }

  deleteCustomer(customerId: string): Promise<any> {
    return this.http.delete(this.baseUrl + '/' + customerId).toPromise()
      .then(response => response.json())
      .catch((error) => {
        let message;
        if (error.status === 404) {
          message = `Customer with id "${customerId}" not found`;
        } else {
          message = this.genericErrorMessage(error);
        }
        return Promise.reject({ message });
      });
  }

}

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerService } from './customer.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'customer-list', component: CustomerListComponent },
      { path: 'customer-form', component: CustomerFormComponent },
      { path: '', redirectTo: 'customer-list', pathMatch: 'full' },
      { path: '**', redirectTo: 'customer-list' }
    ]),
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule {}

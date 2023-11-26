import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { ConvertToCurrency } from './shared/convert-to-currency.pipe';
import { ItemformComponent } from './items/itemform.component';
import { RegisterComponent } from './users/register.component';  
import { LoginComponent } from './users/login.component';
import { ItemDetailComponent } from './items/item-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ItemsComponent,
    ConvertToCurrency,
    ItemformComponent,
    LoginComponent,
    RegisterComponent,
    ItemDetailComponent
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'items', component: ItemsComponent },
      { path: 'itemform', component: ItemformComponent },
      { path: 'itemform/:mode/:id', component: ItemformComponent },
      { path: 'item-details/:id', component: ItemDetailComponent },
      { path: 'users/register', component: RegisterComponent },
      { path: 'users/login', component: LoginComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

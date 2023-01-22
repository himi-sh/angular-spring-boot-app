import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StockComponent } from './stock/stock.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'dashboard', component: StockComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: StockComponent },
  { path: 'register', component: RegisterComponent },
  { path : 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

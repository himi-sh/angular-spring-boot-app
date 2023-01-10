import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddStockComponent } from './stock/add-stock/add-stock.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'addStock', component: AddStockComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

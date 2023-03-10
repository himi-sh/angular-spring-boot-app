import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockComponent } from './stock/stock.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AgGridModule } from 'ag-grid-angular'; // Importing the Ag-Grid-Angular 
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { ActionRendererComponent } from './renderer-component/action-renderer/action-renderer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestInterceptor } from './RequestInterceptor';
import { NumericEditorComponent } from './renderer-component/numeric-editor/numeric-editor.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from './helper/auth.interceptor';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  declarations: [
    AppComponent,
    StockComponent,
    HeaderComponent,
    FooterComponent,
    ActionRendererComponent,
    NumericEditorComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    HttpClientModule, BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

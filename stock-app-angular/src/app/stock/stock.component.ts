import { Component, ViewChild } from '@angular/core';
import { GridReadyEvent, ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { StockService } from './stock.service';
import { ActionRendererComponent } from '../renderer-component/action-renderer/action-renderer.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  gridApi: any;
  rowData : any[] = [];
  columnDefs : any[] = [];
  frameworkComponent: any;
  stockForm: any;
  hideForm = true;

  constructor(private http: HttpClient,
    private service: StockService,
    private router: Router) {}
  
    
  ngOnInit() {
    
    // {name: '', currentPrice: '', lastUpdate: ''}
    this.columnDefs = [
      { headerName: 'Name', field: 'name' },
      { headerName: 'Current Price', field: 'currentPrice' },
      { headerName: 'Last Updated On', field: 'lastUpdate' },
      // { headerName: 'Action', field: '', cellRenderer: 'actionrederer'}
    ];
    this.loadStock();
    this.frameworkComponent = {
      // actionrederer: ActionRendererComponent
    }
    this.stockForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }
  
  
  onGridReady(params: GridReadyEvent) {
    this.gridApi = this.agGrid.api;
    this.gridApi.setDomLayout('autoHeight');
    this.gridApi.sizeColumnsToFit();
  }

  loadStock() {
    this.service.getStocks().subscribe(
      (response: any) => { 
        if (response.stocks) {
          console.log(response.stocks);
          this.rowData = response.stocks;
        }

      },
      (error: any) => { console.log(error);
    });
  }

  iconClick(event: any) {

  }

  addStock() {
    this.router.navigate(['/addStock']);
    this.hideForm = !this.hideForm;
  }

  save() {
    this.hideForm = !this.hideForm;
    let newRow:any = {
      name: this.stockForm.controls['name'].value,
      currentPrice: this.stockForm.controls['price'].value
    }
    this.service.postStocks(newRow).subscribe(
      (response: any) => { 
        console.log(response);
        if (response) {
          newRow['lastUpdate'] = response.lastUpdate;
          this.rowData.push(newRow);
          this.gridApi.setRowData(this.rowData);
        }
      },
      (error: any) => { console.log(error);
    });
  }
    
 
}

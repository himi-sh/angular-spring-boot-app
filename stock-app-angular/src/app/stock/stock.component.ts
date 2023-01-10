import { Component, ViewChild } from '@angular/core';
import { GridReadyEvent, ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { StockService } from './stock.service';

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



  constructor(private http: HttpClient,
    private service: StockService) {}
  
    
  ngOnInit() {
    
    // {name: '', currentPrice: '', lastUpdate: ''}
    this.columnDefs = [
      { headerName: 'Name', field: 'name' },
      { headerName: 'Current Price', field: 'currentPrice' },
      { headerName: 'Last Updated On', field: 'lastUpdate' }
    ];
    this.loadStock();
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
 
}

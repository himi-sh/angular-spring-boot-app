import { Component, ViewChild } from '@angular/core';
import { GridReadyEvent, ColDef, GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { StockService } from './stock.service';
import { ActionRendererComponent } from '../renderer-component/action-renderer/action-renderer.component';
import { NumericEditorComponent } from '../renderer-component/numeric-editor/numeric-editor.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  entryComponents: [ActionRendererComponent]
})
export class StockComponent {

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild('paginationTemplate', {static: true}) paginationTemplate: any;

  gridApi: any;
  rowData : any[] = [];
  columnDefs : any[] = [];
  frameworkComponent: any;
  stockForm: any;
  hideForm = true;
  gridOptions: GridOptions = {};
  isAdminLoggedIn = false;
 
  constructor(private http: HttpClient,
    private service: StockService,
    private tokenService: TokenStorageService,
    private router: Router) {
      this.columnDefs = [
        { headerName: 'Name', field: 'name' },
        { headerName: 'Current Price', field: 'currentPrice', editable: true, 
        cellEditor: NumericEditorComponent
      },
        { headerName: 'Last Updated On', field: 'lastUpdate',
        valueFormatter: function(params: any) {
          let date = new Date(params.value);
          return date.toLocaleString();
        }
        },
        {
          headerName: 'Actions',
          field: 'actions',
          cellRenderer: 'actionsRenderer',
          hide: this.isAdminLoggedIn
        }
      ];
      
      this.gridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.rowData,
        frameworkComponents: {
          actionsRenderer: ActionRendererComponent
        },
        onCellValueChanged: this.onCellValueChanged.bind(this),
        context: { onEdit: this.editStock.bind(this), onDelete: this.deleteStock.bind(this) },
        pagination: true,
        paginationPageSize: 10
      };
    }
  
    
  ngOnInit() {
    if (this.tokenService.getUser()) {
      this.isAdminLoggedIn = this.tokenService.getUser().roles.includes('ROLE_ADMIN');
    }
    
    this.loadStock();
    this.stockForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  mockRowData() {
    this.rowData = [
      {name: 'Test1', 
      currentPrice: '10',
      lastUpdate: '',
      actions: 'edit-delete'
    }
    ]
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

  addStock() {
    this.router.navigate(['/addStock']);
    this.hideForm = !this.hideForm;
  }

  save() {
    //add price validation
    this.hideForm = !this.hideForm;
    let newRow:any = {
      name: this.stockForm.controls['name'].value,
      currentPrice: this.stockForm.controls['price'].value
    }
    this.stockForm.reset();
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
    
  editStock(params: any) {
    const data = params.node.data;
    this.service.editStock(data).subscribe(
      (response: any) => { 
        console.log(response);
        if (response) {
          params.node.data.enableButton = false;
          this.loadStock();
        }
      },
      (error: any) => { console.log(error);
    });
  }

  deleteStock(row: any) {
    console.log('Delete stock');
    this.service.deleteStock(row.id).subscribe(
      (response: any) => { 
        console.log(response);
        if (response) {
          this.loadStock();
        }
      },
      (error: any) => { console.log(error);
    });
  }

  onCellValueChanged(params: any) {
    const rowIndex = params.rowIndex;
    var changedData = [params.data];
    params.node.data.enableButton = true;
    params.api.applyTransaction({ update: changedData });
  }

  showActions(params: any) {
    if (this.isAdminLoggedIn) {
      return true;
    }
    return false;
  }
  
}

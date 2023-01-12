import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

// @Component({
//   selector: 'app-action-renderer',
//   templateUrl: './action-renderer.component.html',
//   styleUrls: ['./action-renderer.component.css']
// })
// import { Component } from '@angular/core';
// import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-actions-renderer',
  templateUrl: './action-renderer.component.html',
})
export class ActionRendererComponent implements ICellRendererAngularComp {

  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }

  onEditClick(event: any) {
    console.log('Edit button clicked for row:', this.params.node.data);
    this.params.context.onEdit(this.params);
  }

  onDeleteClick(event: any) {
    console.log('Delete button clicked for row:', this.params.node.data);
    this.params.context.onDelete(this.params.node.data);
  }
}


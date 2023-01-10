import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-renderer',
  templateUrl: './action-renderer.component.html',
  styleUrls: ['./action-renderer.component.css']
})
export class ActionRendererComponent implements ICellRendererAngularComp {

  actionItems: any;
  params: any;

  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }

  onActionClick(row: any) {
    console.log("row ", row);
    row["data"] = this.params.node.data;
    row["rowIndex"] = this.params.node.rowIndex;
    this.params.context.componentParam.getSelectedAction.emit(row);
  }

  openMenu() {
    let row: any = {};
    row["data"] = this.params.node.data;
    row["rowIndex"] = this.params.node.rowIndex;
    this.params.context.componentParam.getActions.emit(row);
    this.actionItems = this.params.context.componentParam.actionMenu;
  }

}

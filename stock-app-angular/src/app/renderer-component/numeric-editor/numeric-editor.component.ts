import { Component, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
const KEY_BACKSPACE = 'Backspace';
const KEY_DELETE = 'Delete';
const KEY_F2 = 'F2';
const KEY_ENTER = 'Enter';
const KEY_TAB = 'Tab';

@Component({
  selector: 'app-numeric-editor',
  templateUrl: './numeric-editor.component.html',
  styleUrls: ['./numeric-editor.component.css']
})
export class NumericEditorComponent implements ICellEditorAngularComp, AfterViewInit {
  private params: any;
  public value!: number;
  public highlightAllOnFocus = true;
  private cancelBeforeStart = false;

  @ViewChild('input', { read: ViewContainerRef })
  public input!: ViewContainerRef;

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.setInitialState(this.params);

    // only start edit if key pressed is a number, not a letter
    this.cancelBeforeStart = !!(
      params.charPress && '1234567890'.indexOf(params.charPress) < 0
    );
  }

  setInitialState(params: ICellEditorParams) {
    let startValue;
    let highlightAllOnFocus = true;

    if (params.eventKey === KEY_BACKSPACE || params.eventKey === KEY_DELETE) {
      // if backspace or delete pressed, we clear the cell
      startValue = '';
    } else if (params.charPress) {
      // if a letter was pressed, we start with the letter
      startValue = params.charPress;
      highlightAllOnFocus = false;
    } else {
      // otherwise we start with the current value
      startValue = params.value;
      if (params.eventKey === KEY_F2) {
        highlightAllOnFocus = false;
      }
    }

    this.value = startValue;
    this.highlightAllOnFocus = highlightAllOnFocus;
  }

  getValue(): any {
    return this.value;
  }

  isCancelBeforeStart(): boolean {
    return this.cancelBeforeStart;
  }

  isCancelAfterEnd(): boolean {
    return this.value > 1000000;
  }

  onKeyDown(event: any): void {
    if (this.isLeftOrRight(event) || this.deleteOrBackspace(event)) {
      event.stopPropagation();
      return;
    }

    if (
      !this.finishedEditingPressed(event) &&
      !this.isKeyPressedNumeric(event)
    ) {
      if (event.preventDefault) event.preventDefault();
    } else {
      this.value = event.target.value;
    }
  }

  ngAfterViewInit() {
    window.setTimeout(() => {
      this.input.element.nativeElement.focus();
      if (this.highlightAllOnFocus) {
        this.input.element.nativeElement.select();

        this.highlightAllOnFocus = false;
      } else {
        const length = this.input.element.nativeElement.value
          ? this.input.element.nativeElement.value.length
          : 0;
        if (length > 0) {
          this.input.element.nativeElement.setSelectionRange(length, length);
        }
      }

      this.input.element.nativeElement.focus();
    });
  }

  private isCharNumeric(charStr: string): boolean {
    return !!/[+-]?([0-9]*[.])?[0-9]+/.test(charStr);
  }

  private isKeyPressedNumeric(event: any): boolean {
    const charStr = event.target.value + event.key;
    return this.isCharNumeric(charStr);
  }

  private deleteOrBackspace(event: any) {
    return [KEY_DELETE, KEY_BACKSPACE].indexOf(event.key) > -1;
  }

  private isLeftOrRight(event: any) {
    return ['ArrowLeft', 'ArrowRight'].indexOf(event.key) > -1;
  }

  private finishedEditingPressed(event: any) {
    const key = event.key;
    return key === KEY_ENTER || key === KEY_TAB;
  }
}

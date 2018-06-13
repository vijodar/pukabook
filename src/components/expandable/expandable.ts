import { Component, Input } from '@angular/core';

@Component({
  selector: 'expandable',
  templateUrl: 'expandable.html',
})
export class ExpandableComponent {

  //region INPUTS
  @Input()
  expanded: boolean

  @Input()
  buttonText: string
  //endregion INPUTS

  //region PUBLIC_VARIABLES
  public icon: string
  //endregion PUBLIC_VARIABLES

  //region CONST
  constructor() {
    this.icon = this.expanded == true ? "arrow-dropup" : "arrow-dropdown"
  }
  //endregion CONST

  //region PUBLIC_METHODS
  public changeExpanded() {
    this.expanded = !this.expanded
    this.icon = this.expanded == true ? "arrow-dropup" : "arrow-dropdown"
  }

  public returnExpanded() {
    
    return this.expanded
  }
  //endregion PUBLIC_METHODS
}
import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { NgChangeDetector, onInputChange } from 'app/changes-utils';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
@NgChangeDetector()
export class ChildComponent implements OnInit, OnChanges
{
  @Input() i: number;
  @Input() j: number;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void
  {
  }

  ngOnInit(): void
  {
  }

  @onInputChange('i')
  changedI(change: SimpleChange)
  {
    console.log(`i: ${change.currentValue}`);
  }

  @onInputChange('j', false)
  changedJ(change: SimpleChange)
  {
    console.log(`j: ${change.currentValue}`);
  }
}

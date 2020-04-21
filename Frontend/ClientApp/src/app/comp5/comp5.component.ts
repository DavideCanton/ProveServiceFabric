import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-comp5',
  templateUrl: './comp5.component.html',
  styleUrls: ['./comp5.component.scss']
})
export class Comp5Component implements OnInit
{
  i: number;

  constructor() { }

  ngOnInit(): void
  {
    interval(1000).subscribe(i => this.i = i);
  }

}

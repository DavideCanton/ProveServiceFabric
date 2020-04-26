import { Component } from '@angular/core';
import { range } from 'lodash';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent
{
    compNumber = 6;
    comps = range(1, this.compNumber + 1);
}

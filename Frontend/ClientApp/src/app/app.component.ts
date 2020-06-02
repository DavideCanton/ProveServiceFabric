import { Component } from '@angular/core';
import { JsonClass, JsonProperty, SerializeFn, JsonMapper } from 'at-json';
import { range } from 'lodash';

@JsonClass()
export class M
{
    @JsonProperty() name: string;
    serialize: SerializeFn;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent
{
    compNumber = 6;
    comps = range(1, this.compNumber + 1);
    m: M = JsonMapper.deserialize(M, { name: 'pippo' });
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileCacheService } from 'app/comp3/db/file-cache.service';
import { Item } from 'app/comp3/db/interfaces';
import { of, Observable } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { State } from 'app/reducers';
import { Store, select } from '@ngrx/store';
import { startDownload } from 'app/comp3/comp3.actions';
import { filesSelector } from 'app/comp3/comp3.selectors';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.css']
})
export class Comp3Component implements OnInit
{
  urls = [
    'http://localhost:4200/assets/img/DSC03013.JPG',
    'http://localhost:4200/assets/img/DSC03032.JPG',
    'http://localhost:4200/assets/img/DSC03036.JPG',
  ];

  parsed$: Observable<Item[]>;

  constructor(
    private service: FileCacheService,
    private store: Store<State>
  )
  {
    this.parsed$ = this.store.pipe(select(filesSelector));
  }

  ngOnInit()
  {
    of(...this.urls).pipe(
      mergeMap(url =>
      {
        const name = url.match(/.*\/(.*)$/)[1];

        const itemToSave =
        {
          name,
          path: url,
          progress: 0,
          src: ''
        };

        return this.service.insert(itemToSave);
      }, 3)
    ).subscribe(itemCreated =>
    {
      this.store.dispatch(startDownload({ id: itemCreated.id, path: itemCreated.path }));
    });
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryEventService {

  constructor() { }
  private categoryUpdatedSource = new Subject<void>();

  categoryUpdated$ = this.categoryUpdatedSource.asObservable();

  emitCategoryUpdated() {
    this.categoryUpdatedSource.next();
  }
}


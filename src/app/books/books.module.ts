import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BookAuthorsComponent } from './components/book-authors/book-authors.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookPreviewComponent } from './components/book-preview/book-preview.component';
import { BookPreviewListComponent } from './components/book-preview-list/book-preview-list.component';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { BookCollectionComponent } from './containers/book-collection/book-collection.component';
import { FindBookComponent } from './containers/find-book/find-book.component';
import { SelectedBookComponent } from './containers/selected-book/selected-book.component';
import { ViewBookComponent } from './containers/view-book/view-book.component';
import { BookRoutingModule } from './book-routing.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { reducers } from './reducers/books-app.reducer';
import { BookEffects } from './effects/book.effects';
import { BookCollectionEffects } from './effects/book-collection.effects';
import { BookExistsGuard } from './guards/book-exists.guard';



export const COMPONENTS = [
                          BookAuthorsComponent,
                          BookDetailComponent,
                          BookPreviewComponent,
                          BookPreviewListComponent,
                          BookSearchComponent,
                          BookCollectionComponent,
                          FindBookComponent,
                          SelectedBookComponent,
                          ViewBookComponent];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    BookRoutingModule,
    PipesModule,
    StoreModule.forFeature('books', reducers),
    EffectsModule.forFeature([BookEffects, BookCollectionEffects]),
  ],
  declarations: COMPONENTS,
  providers: [BookExistsGuard],
})
export class BooksModule { }

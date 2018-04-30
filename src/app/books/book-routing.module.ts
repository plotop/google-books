import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FindBookComponent } from './containers/find-book/find-book.component';
import { ViewBookComponent } from './containers/view-book/view-book.component';
import { BookCollectionComponent } from './containers/book-collection/book-collection.component';
import { BookExistsGuard } from './guards/book-exists.guard';


export const routes: Routes = [
    { path: 'find', component: FindBookComponent },
    {
      path: ':id',
      component: ViewBookComponent,
      canActivate: [BookExistsGuard],
    },
    { path: '', component: BookCollectionComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BookRoutingModule {

}

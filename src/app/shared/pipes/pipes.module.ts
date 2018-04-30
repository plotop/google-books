import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommasPipe } from './commas.pipe';
import { EllipsisPipe } from './ellipsis.pipe';


export const PIPES = [CommasPipe, EllipsisPipe];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }

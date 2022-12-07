import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImgSrcPipe} from "./img-src.pipe";



@NgModule({
  declarations: [ImgSrcPipe],
  imports: [
    CommonModule
  ],
  exports: [
    ImgSrcPipe
  ]
})
export class ImgSrcModule { }

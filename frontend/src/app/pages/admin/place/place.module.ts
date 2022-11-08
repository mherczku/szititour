import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceComponent } from './place.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', component: PlaceComponent},
]

@NgModule({
  declarations: [
    PlaceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PlaceModule { }

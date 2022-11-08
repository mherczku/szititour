import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists.component';
import {ButtonsModule} from "../buttons/buttons.module";
import {DropdownModule} from "../dropdown/dropdown.module";



@NgModule({
    declarations: [
        ListsComponent
    ],
    exports: [
        ListsComponent
    ],
    imports: [
        CommonModule,
        ButtonsModule,
        DropdownModule
    ]
})
export class ListsModule { }

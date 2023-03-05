import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DropdownComponent } from "./dropdown.component";
import {ButtonsModule} from "../../buttons/buttons.module";
import {RouterModule} from "@angular/router";
import {ImgSrcModule} from "../../../pipes/img-src/img-src.module";


@NgModule({
    declarations: [
        DropdownComponent
    ],
    exports: [
        DropdownComponent
    ],
    imports: [
        CommonModule,
        ButtonsModule,
        RouterModule,
        ImgSrcModule
    ]
})
export class DropdownModule { }

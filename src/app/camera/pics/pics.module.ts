import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { PicsRoutingModule } from "./pics-routing.module";

import { PicsComponent } from "./pics.component";



@NgModule({
    imports: [
        NativeScriptCommonModule,
        PicsRoutingModule,
    ],
    providers: [

    ],
    declarations: [
        PicsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PicsModule { }

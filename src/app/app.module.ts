import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WelcomeModule } from "./welcome/welcome.module";
import { PicsModule } from "./camera/pics/pics.module";
//import { PicsComponent } from './camera/pics/pics.component';



@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        WelcomeModule,
        PicsModule
    ],
    declarations: [
        AppComponent,
  

    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }

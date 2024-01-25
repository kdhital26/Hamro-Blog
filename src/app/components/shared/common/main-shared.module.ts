import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FooterComponent } from "src/app/footer/footer.component";
import { ButtonComponent } from "./button/button.component";
import { LoaderComponent } from "./loader/loader.component";

@NgModule({
    declarations:[
        ButtonComponent,
        LoaderComponent,
        FooterComponent,

    ],
    imports: [
        CommonModule
    ],
    exports: [
        ButtonComponent,
        LoaderComponent,
        FooterComponent,

    ],
})

export class AppMainSharedModule{

}
import { NgModule } from "@angular/core";
import { ListComponent } from "./list/list.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CandidateRoutingModule } from "./candidates-routing.module";
import { CommonModules } from "src/app/modules/commons.module";

@NgModule({
  declarations: [ListComponent],
  imports: [
    CandidateRoutingModule,
    CommonModules
  ]
})
export class CandidateModule {}

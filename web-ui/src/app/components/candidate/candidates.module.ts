import { NgModule } from "@angular/core";
import { ListComponent } from "./list/list.component";
import { CandidateRoutingModule } from "./candidates-routing.module";
import { CommonModules } from "src/app/modules/commons.module";
import { SubmitComponent } from './submit/submit.component';
import { RouterModule } from "@angular/router";
import { DatePipe } from "@angular/common";

@NgModule({
  providers: [DatePipe],
  declarations: [ListComponent, SubmitComponent],
  imports: [
    CandidateRoutingModule,
    RouterModule,
    CommonModules,
  ]
})
export class CandidateModule {}

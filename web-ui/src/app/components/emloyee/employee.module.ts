import { NgModule } from "@angular/core";
import { ListComponent } from "./list/list.component";
import { CommonModules } from "src/app/modules/commons.module";
import { RouterModule } from "@angular/router";
import { DatePipe } from "@angular/common";
import { EmployeeRoutingModule } from "./employee-routing.module";

@NgModule({
  providers: [DatePipe],
  declarations: [ListComponent],
  imports: [
    EmployeeRoutingModule,
    RouterModule,
    CommonModules,
  ]
})
export class EmployeeModule {}

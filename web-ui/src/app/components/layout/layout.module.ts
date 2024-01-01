import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CommonModules } from "src/app/modules/commons.module";
import { DatePipe } from "@angular/common";

@NgModule({
  providers: [DatePipe],
  imports: [
    RouterModule,
    CommonModules,
  ],
  declarations: [MainLayoutComponent]
})
export class LayoutModule {}

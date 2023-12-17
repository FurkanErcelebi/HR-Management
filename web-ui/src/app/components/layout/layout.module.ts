import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CommonModules } from "src/app/modules/commons.module";

@NgModule({
  imports: [
    RouterModule,
    CommonModules
  ],
  declarations: [MainLayoutComponent]
})
export class LayoutModule {}

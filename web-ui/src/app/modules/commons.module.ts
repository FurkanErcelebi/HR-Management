import { ScrollingModule } from "@angular/cdk/scrolling";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";

const materialModuleList = [
  MatButtonModule,
  MatSidenavModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatExpansionModule,
  MatTooltipModule,
  MatTableModule,
  ScrollingModule,
]

@NgModule({
  imports: [materialModuleList, RouterModule],
  exports: [materialModuleList, RouterModule]
})
export class CommonModules{}

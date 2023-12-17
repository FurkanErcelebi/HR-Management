import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModules } from './modules/commons.module';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { SideMenuComponent } from './components/layout/side-menu/side-menu.component';
import { EntranceComponent } from './components/layout/entrance/entrance.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    // DetailsComponent,
    // CreateComponent,
    // SideMenuComponent,
    SideMenuComponent,
    MainLayoutComponent,
    EntranceComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    CommonModules,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

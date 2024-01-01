import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'web-ui';

  constructor (public router: Router,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon(
          `solar_file`,
          domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/solar_file-bold.svg`)
        );
        this.matIconRegistry.addSvgIcon(
          `grid_table`,
          domSanitizer.bypassSecurityTrustResourceUrl(`../assets/images/grid-table.svg`)
        );

  }

  ngOnInit(): void {
  }
}

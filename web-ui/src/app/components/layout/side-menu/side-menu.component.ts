import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface RouteInfo {
  path: string;
  title: string;
  moduleName: string;
  icon: string;
  class: string;
  groupTitle: boolean;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit{

  sidebarRouteList: RouteInfo[] = [];
  public innerHeight: any;
  headerHeight = 60;
  listMaxHeight: string;
  listMaxWidth: string;

  constructor (private router:Router) {

  }

  @HostListener('window:resize', ['$event'])
  windowResizecall() {
    this.setMenuHeight();
  }

  ngOnInit(): void {
    const routes: RouteInfo[] = [
      {
        path: 'candidates',
        title: 'Adaylar',
        moduleName: 'candidates',
        icon: 'fas fa-tachometer-alt',
        class: '',
        groupTitle: false
      },
      {
        path: 'employees',
        title: 'Görevliler',
        moduleName: 'employees',
        icon: 'fas fa-shopping-cart',
        class: 'menu-toggle',
        groupTitle: false
      }
    ];
    this.setMenuHeight();
  }

  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }


}

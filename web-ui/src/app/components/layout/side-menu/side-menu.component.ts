import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent, Scroll } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidePageInfo, SideRouteInfo } from 'src/app/models/common';

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
export class SideMenuComponent implements OnInit, OnDestroy{

  isFocus1 = false;
  isFocus2 = false;

  sideRoutes:SideRouteInfo[] = [
    {
      pageType: 'candidate',
      sidePageList:[{
        title: 'Yeni Başvurular',
        url: '/candidates/list',
        isFocus: false
      }, {
        title: 'Geçmiş Başvurular',
        url: '/candidates/list',
        isFocus: false
      }]
    },
    {
      pageType: 'employee',
      sidePageList:[{
        title: 'Çalışanlar',
        url: '/employees/list',
        isFocus: false
      }]
    },
  ];
  sidePageList:SidePageInfo[];

  routerObj:Subscription;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof Scroll) {
        this.sidePageList = this.sideRoutes.find((sideRoute) => event.routerEvent.url.includes(sideRoute.pageType))?.sidePageList || [];
      }
    });
  }

  ngOnDestroy(): void {
    this.routerObj.unsubscribe();
  }

  changeFocus(idx:number , isFocused:boolean){
    const sidePage = this.sidePageList[idx];
    if (sidePage) {
      sidePage.isFocus = isFocused;
    }
  }

  getTopStyleValue(index: number): string{
    return `${(index * 103 ) + 139}px`;
  }

  // sidebarRouteList: RouteInfo[] = [];
  // public innerHeight: any;
  // headerHeight = 60;
  // listMaxHeight: string;
  // listMaxWidth: string;

  // constructor (private router:Router) {

  // }

  // @HostListener('window:resize', ['$event'])
  // windowResizecall() {
  //   this.setMenuHeight();
  // }

  // ngOnInit(): void {
  //   const routes: RouteInfo[] = [
  //     {
  //       path: 'candidates',
  //       title: 'Adaylar',
  //       moduleName: 'candidates',
  //       icon: 'fas fa-tachometer-alt',
  //       class: '',
  //       groupTitle: false
  //     },
  //     {
  //       path: 'employees',
  //       title: 'Görevliler',
  //       moduleName: 'employees',
  //       icon: 'fas fa-shopping-cart',
  //       class: 'menu-toggle',
  //       groupTitle: false
  //     }
  //   ];
  //   this.setMenuHeight();
  // }

  // setMenuHeight() {
  //   this.innerHeight = window.innerHeight;
  //   const height = this.innerHeight - this.headerHeight;
  //   this.listMaxHeight = height + '';
  //   this.listMaxWidth = '500px';
  // }


}

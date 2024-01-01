import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { EntranceComponent } from './components/layout/entrance/entrance.component';
import { animation } from '@angular/animations';

const routes: Routes = [{
  path: '',
  redirectTo: '/entrance',
  pathMatch: 'full',
  // canActivate: [MsalGuard]
},
{
  path: 'entrance',
  component: EntranceComponent,
  // data:[
  //   animation
  // ]
},
{
  path: '',
  component: MainLayoutComponent,
  children: [
    {
      path: 'candidates',
      loadChildren: () =>
        import('./components/candidate/candidates.module').then(
          (m) => m.CandidateModule
        )
    },
    {
      path: 'employees',
      loadChildren: () =>
        import('./components/emloyee/employee.module').then(
          (m) => m.EmployeeModule)
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

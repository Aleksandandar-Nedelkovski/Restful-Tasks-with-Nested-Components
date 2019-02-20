import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewFormComponent } from './new-form/new-form.component';

const routes: Routes = [
    { path: 'home',component: DashboardComponent },
    { path: 'new',component: NewFormComponent },
    { path: '', pathMatch: 'full', redirectTo: '/home' }, 
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
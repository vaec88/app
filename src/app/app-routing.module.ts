import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { LocalStorageComponent } from './components/local-storage/local-storage.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'repositories', component: RepositoryComponent },
  { path: 'localStorage', component: LocalStorageComponent },
  { path: 'create', component: FormComponent },
  { path: 'update/:id', component: FormComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

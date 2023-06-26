import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPeopleComponent } from './list-people/list-people.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { DeletePersonComponent } from './delete-person/delete-person.component';

const routes: Routes = [
  { path: '', component: ListPeopleComponent },
  { path: 'edit/:id', component: EditPersonComponent },
  { path: 'delete/:id', component: DeletePersonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users-table',
    pathMatch: 'full'
  },
  {
    path: 'users-table',
    loadChildren: () => import('./modules/users-table/users-table.module').then(m => m.UsersTableModule)
  },
  {
    path: 'posts',
    loadChildren: () => import('./modules/user-posts/user-posts.module').then(m => m.UserPostsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

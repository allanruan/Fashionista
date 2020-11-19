
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth/auth.guard';
import { ServicesComponent } from './services/services.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { UserComponent} from './user/user.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {roles:["admin"]} },
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard], data: {roles:["admin"]} },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: {roles:["admin"]} },
  { path: 'companies-list', component: CompaniesListComponent, canActivate: [AuthGuard], data: {roles:["admin"]} },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard], data: {roles:["user"]} },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard], data: {roles:["admin"]} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

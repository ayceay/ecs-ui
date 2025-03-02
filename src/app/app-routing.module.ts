import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {UserComponent} from "./modules/user/user.component";
import {ProductGroupComponent} from "./modules/product-group/product-group.component";
import {ProductComponent} from "./modules/product/product.component";
import {CustomerGroupComponent} from "./modules/customer-group/customer-group.component";
import {CustomerComponent} from "./modules/customer/customer.component";
import {AuthGuard} from "./modules/guard/auth-guard";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: 'ecs/users', component: UserComponent, canActivate: [AuthGuard]},
                    {path: 'ecs/product-groups', component: ProductGroupComponent, canActivate: [AuthGuard]},
                    {path: 'ecs/products', component: ProductComponent, canActivate: [AuthGuard]},
                    {path: 'ecs/customer-groups', component: CustomerGroupComponent, canActivate: [AuthGuard]},
                    {path: 'ecs/customers', component: CustomerComponent, canActivate: [AuthGuard]},
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

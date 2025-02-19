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

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: 'ecs/users', component: UserComponent},
                    {path: 'ecs/product-groups', component: ProductGroupComponent},
                    {path: 'ecs/products', component: ProductComponent},
                    {path: 'ecs/customer-groups', component: CustomerGroupComponent},
                    {path: 'ecs/customers', component: CustomerComponent},
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

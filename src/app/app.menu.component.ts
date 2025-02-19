import {Component, OnInit} from '@angular/core';
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppComponent, public appMain: AppMainComponent) {
    }

    ngOnInit() {
        this.model = [
            {
                label: 'Favorites', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}
                ]
            },
            {
                label: 'Ecs', icon: 'pi pi-fw pi-star', routerLink: ['/ecs'], badge: 6,
                items: [
                    {label: 'Kullanıcı', icon: 'pi pi-fw pi-id-card', routerLink: ['/ecs/users']},
                    {label: 'Ürün Grubu', icon: 'pi pi-fw pi-id-card', routerLink: ['/ecs/product-groups']},
                    {label: 'Ürün', icon: 'pi pi-fw pi-id-card', routerLink: ['/ecs/products']},
                    {label: 'Müşteri Grubu', icon: 'pi pi-fw pi-id-card', routerLink: ['/ecs/customer-groups']},
                    {label: 'Müşteri', icon: 'pi pi-fw pi-id-card', routerLink: ['/ecs/customers']}
                ]
            }
        ];
    }

    onMenuClick() {
        this.appMain.menuClick = true;
    }
}

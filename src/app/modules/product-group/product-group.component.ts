import {Component, inject, ViewChild} from '@angular/core';
import {Table, TableLazyLoadEvent, TableSelectAllChangeEvent} from "primeng/table";
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../models/user";
import {FilterMetadata, MessageService} from "primeng/api";
import {AppBreadcrumbService} from "../../app.breadcrumb.service";
import {ProductGroup} from "../models/product-group";
import {ProductGroupService} from "../services/product-group.service";

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html'
})
export class ProductGroupComponent {
    @ViewChild('dt') table: Table;

    private formBuilder = inject(FormBuilder);

    productGroupForm = this.formBuilder.group({
        name: ['', Validators.required]
    });

    loading = false;

    productGroupDialog: boolean;

    deleteProductGroupDialog: boolean = false;

    deleteProductGroupsDialog: boolean = false;

    productGroups: ProductGroup[];

    productGroup: ProductGroup;

    selectedProductGroups: ProductGroup[];

    submitted: boolean;

    rowsPerPageOptions = [10, 25, 50];

    selectAll: boolean;

    totalRecords: number;

    constructor(private productGroupService: ProductGroupService, private messageService: MessageService,
                private breadcrumbService: AppBreadcrumbService) {

        this.breadcrumbService.setItems([
            {label: 'Pages'},
            {label: 'Crud', routerLink: ['/pages/crud']}
        ]);
    }

    ngOnInit() {
        this.refresh();
    }

    loadProductGroups(event: TableLazyLoadEvent) {
        let dtFilter: { [k: string]: any; };
        if (event.filters) {
            dtFilter = Object.fromEntries(Object.entries(event.filters).map(([key, value]) => [key, (value as FilterMetadata).value]));
        }
        this.loading = true;
        console.log(event);
        let pageNumber = (event.first === 0 || event.first == undefined) ? 0 : event.first / (event.rows == undefined ? 1 : event.rows);
        this.productGroupService.productGroupsQueryPagePost$Json({
            body: {
                page: pageNumber,
                size: event.rows,
                filter: dtFilter
            }
        }).subscribe({
            next: data => {
                this.productGroups = data.tutorials;
                this.totalRecords = data.totalItems;
            },
            error: err => {
                console.log(err);
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    openNew() {
        this.refresh();
        this.submitted = false;
        this.productGroupDialog = true;
    }

    deleteSelectedProductGroups() {
        this.deleteProductGroupsDialog = true;
    }

    editProductGroup(product_group: ProductGroup) {
        this.refresh();
        this.productGroup = product_group;
        this.productGroupForm.patchValue(product_group);
        this.productGroupDialog = true;
    }

    deleteUser(product_group: ProductGroup) {
        this.deleteProductGroupDialog = true;
        this.productGroup = {...product_group};
    }

    confirmDeleteSelected() {
        this.deleteProductGroupsDialog = false;
        this.productGroups = this.productGroups.filter(val => !this.selectedProductGroups.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProductGroups = null;
    }

    confirmDelete() {
        this.deleteProductGroupDialog = false;
        this.productGroupService.productGroupsIdDelete({id: this.productGroup.id.toString()}).subscribe({
            next: data => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Ürün Grubu Silindi',
                    life: 3000
                });
                this.table.reset();
            },
            error: err => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Hata',
                    detail: 'Ürün Grubu Silinirken Hata! error: ' + err,
                    life: 3000
                });
            },
            complete: () => {
                this.refresh();
            }
        })
        this.productGroup = {};
    }

    hideDialog() {
        this.refresh();
        this.productGroupDialog = false;
        this.submitted = false;
    }

    saveUser() {
        if (this.productGroup) {
            this.productGroupService.productGroupsIdPut({id: this.productGroup.id.toString(), body: this.productGroupForm.value}).subscribe({
                next: data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Başarılı',
                        detail: 'Ürün Grubu Güncellendi',
                        life: 3000
                    });
                    this.table.reset();
                },
                complete: () => {
                },
                error: err => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Hata',
                        detail: 'Ürün Grubu Güncellenirken Hata! error: ' + err,
                        life: 3000
                    });
                }
            });
        } else {
            this.productGroupService.productGroupsPost$Json({body: this.productGroupForm.value}).subscribe({
                next: data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Başarılı',
                        detail: 'Ürün Grubu Oluşturuldu',
                        life: 3000
                    });
                    this.table.reset();
                },
                complete: () => {
                },
                error: err => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Hata',
                        detail: 'Ürün Grubu Oluşturulurken Hata! error: ' + err,
                        life: 3000
                    });
                }
            });
        }

    }


    onSelectionChange($event: any) {

    }

    onSelectAllChange($event: TableSelectAllChangeEvent) {

    }

    get name() {
        return this.productGroupForm.get('name');
    }

    get surname() {
        return this.productGroupForm.get('surname');
    }

    get username() {
        return this.productGroupForm.get('username');
    }

    refresh() {
        this.productGroupForm.reset();
        this.selectedProductGroups = [];
        this.productGroup = null;
    }
}

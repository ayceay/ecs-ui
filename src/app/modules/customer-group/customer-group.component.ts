import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {Table, TableLazyLoadEvent, TableSelectAllChangeEvent} from "primeng/table";
import {FormBuilder, Validators} from "@angular/forms";
import {FilterMetadata, MessageService} from "primeng/api";
import {AppBreadcrumbService} from "../../app.breadcrumb.service";
import {CustomerGroup} from "../models/customer-group";
import {CustomerGroupService} from "../services/customer-group.service";

@Component({
  selector: 'app-customer-group',
  templateUrl: './customer-group.component.html'
})
export class CustomerGroupComponent implements OnInit{
    @ViewChild('dt') table: Table;

    private formBuilder = inject(FormBuilder);

    customerGroupForm = this.formBuilder.group({
        name: ['', Validators.required],
        max_discount: ['', Validators.required]
    });

    loading = false;

    customerGroupDialog: boolean;

    deleteCustomerGroupDialog: boolean = false;

    deleteCustomerGroupsDialog: boolean = false;

    customerGroups: CustomerGroup[];

    customerGroup: CustomerGroup;

    selectedCustomerGroups: CustomerGroup[];

    submitted: boolean;

    rowsPerPageOptions = [10, 25, 50];

    totalRecords: number;

    constructor(private customerGroupService: CustomerGroupService, private messageService: MessageService,
                private breadcrumbService: AppBreadcrumbService) {

        this.breadcrumbService.setItems([
            {label: 'Pages'},
            {label: 'Crud', routerLink: ['/pages/crud']}
        ]);
    }

    ngOnInit() {
        this.refresh();
    }

    loadCustomerGroups(event: TableLazyLoadEvent) {
        let dtFilter: { [k: string]: any; };
        if (event.filters) {
            dtFilter = Object.fromEntries(Object.entries(event.filters).map(([key, value]) => [key, (value as FilterMetadata).value]));
        }
        this.loading = true;
        console.log(event);
        let pageNumber = (event.first === 0 || event.first == undefined) ? 0 : event.first / (event.rows == undefined ? 1 : event.rows);
        this.customerGroupService.customerGroupsQueryPagePost$Json({
            body: {
                page: pageNumber,
                size: event.rows,
                filter: dtFilter
            }
        }).subscribe({
            next: data => {
                this.customerGroups = data.tutorials;
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
        this.customerGroupDialog = true;
    }

    deleteSelectedCustomerGroups() {
        this.deleteCustomerGroupsDialog = true;
    }

    editCustomerGroup(customer_group: CustomerGroup) {
        this.refresh();
        this.customerGroup = customer_group;
        this.customerGroupForm.patchValue(customer_group);
        this.customerGroupDialog = true;
    }

    deleteUser(customer_group: CustomerGroup) {
        this.deleteCustomerGroupDialog = true;
        this.customerGroup = {...customer_group};
    }

    confirmDeleteSelected() {
        this.deleteCustomerGroupsDialog = false;
        this.customerGroups = this.customerGroups.filter(val => !this.selectedCustomerGroups.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Customers Deleted', life: 3000});
        this.selectedCustomerGroups = null;
    }

    confirmDelete() {
        this.deleteCustomerGroupDialog = false;
        this.customerGroupService.customerGroupsIdDelete({id: this.customerGroup.id.toString()}).subscribe({
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
        this.customerGroup = {};
    }

    hideDialog() {
        this.refresh();
        this.customerGroupDialog = false;
        this.submitted = false;
    }

    saveUser() {
        if (this.customerGroup) {
            this.customerGroupService.customerGroupsIdPut({id: this.customerGroup.id.toString(), body: this.customerGroupForm.value}).subscribe({
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
            this.customerGroupService.customerGroupsPost$Json({body: this.customerGroupForm.value}).subscribe({
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
        return this.customerGroupForm.get('name');
    }

    get max_discount() {
        return this.customerGroupForm.get('max_discount');
    }

    refresh() {
        this.customerGroupForm.reset();
        this.selectedCustomerGroups = [];
        this.customerGroup = null;
    }
}

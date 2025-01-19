import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FilterMetadata, MessageService} from "primeng/api";
import {AppBreadcrumbService} from "../../app.breadcrumb.service";
import {Customer} from "../models/customer";
import {CustomerService} from "../services/customer.service";
import {Table, TableLazyLoadEvent, TableSelectAllChangeEvent} from "primeng/table";
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {
    @ViewChild('dt') table: Table;

    private formBuilder = inject(FormBuilder);

    customerForm = this.formBuilder.group({
        name: new FormControl("", [Validators.required]),
        surname: new FormControl("", [Validators.required]),
        phone: new FormControl("", [Validators.required]),
        address: new FormControl(""),
    });

    loading = false;

    customerDialog: boolean;

    deleteCustomerDialog: boolean = false;

    deleteCustomersDialog: boolean = false;

    customers: Customer[];

    customer: Customer;

    selectedCustomers: Customer[];

    submitted: boolean;

    rowsPerPageOptions = [10, 25, 50];

    selectAll: boolean;

    totalRecords: number;

    constructor(private customerService: CustomerService, private messageService: MessageService,
                private breadcrumbService: AppBreadcrumbService) {

        this.breadcrumbService.setItems([
            {label: 'Pages'},
            {label: 'Crud', routerLink: ['/pages/crud']}
        ]);
    }

    ngOnInit() {
        this.refresh();
    }

    loadCustomers(event: TableLazyLoadEvent) {
        let dtFilter: { [k: string]: any; };
        if (event.filters) {
            dtFilter = Object.fromEntries(Object.entries(event.filters).map(([key, value]) => [key, (value as FilterMetadata).value]));
        }
        this.loading = true;
        let pageNumber = (event.first === 0 || event.first == undefined) ? 0 : event.first / (event.rows == undefined ? 1 : event.rows);
        this.customerService.customersQueryPagePost$Json({
            body: {
                page: pageNumber,
                size: event.rows,
                filter: dtFilter
            }
        }).subscribe({
            next: data => {
                this.customers = data.tutorials;
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
        this.customerDialog = true;
    }

    deleteSelectedCustomers() {
        this.deleteCustomersDialog = true;
    }

    editCustomer(customer: Customer) {
        this.refresh();
        this.customer = customer;
        this.customerForm.patchValue(customer);
        this.customerDialog = true;
    }

    deleteCustomer(customer: Customer) {
        this.deleteCustomerDialog = true;
        this.customer = {...customer};
    }

    confirmDeleteSelected() {
        this.deleteCustomersDialog = false;
        this.customers = this.customers.filter(val => !this.selectedCustomers.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedCustomers = null;
    }

    confirmDelete() {
        this.deleteCustomerDialog = false;
        this.customerService.customersIdDelete({id: this.customer.id.toString()}).subscribe({
            next: data => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Cari Silindi',
                    life: 3000
                });
                this.table.reset();
            },
            error: err => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Hata',
                    detail: 'Cari Silinirken Hata! error: ' + err,
                    life: 3000
                });
            },
            complete: () => {
                this.refresh();
            }
        })
        this.customer = null;
    }

    hideDialog() {
        this.refresh();
        this.customerDialog = false;
        this.submitted = false;
    }

    saveCustomer() {
        if (this.customer && this.customerForm.valid) {
            this.customerService.customersIdPut({id: this.customer.id.toString(), body: this.customerForm.value}).subscribe({
                next: data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Başarılı',
                        detail: 'Cari Güncellendi',
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
                        detail: 'Cari Güncellenirken Hata! error: ' + err,
                        life: 3000
                    });
                }
            });
        } else {
            this.customerService.customersPost$Json({body: this.customerForm.value}).subscribe({
                next: data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Başarılı',
                        detail: 'Cari Oluşturuldu',
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
                        detail: 'Cari Oluşturulurken Hata! error: ' + err,
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
        return this.customerForm.get('name');
    }

    get surname() {
        return this.customerForm.get('surname');
    }

    get phone() {
        return this.customerForm.get('phone');
    }

    refresh() {
        this.customerForm.reset();
        this.selectedCustomers = [];
        this.customer = null;
    }

}

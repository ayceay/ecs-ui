import {Component, inject, ViewChild} from '@angular/core';
import {Table, TableLazyLoadEvent, TableSelectAllChangeEvent} from "primeng/table";
import {FormBuilder, Validators} from "@angular/forms";
import {FilterMetadata, MessageService} from "primeng/api";
import {AppBreadcrumbService} from "../../app.breadcrumb.service";
import {Product} from "../models/product";
import {ProductService} from "../services/product.service";
import {ProductGroup} from "../models/product-group";
import {ProductGroupService} from "../services/product-group.service";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html'
})
export class ProductComponent {

    @ViewChild('dt') table: Table;

    private formBuilder = inject(FormBuilder);

    productForm = this.formBuilder.group({
        name: ['', Validators.required],
        price: ['' , Validators.required],
        max_discount: ['', Validators.required],
        product_group_id: ['']
    });


    loading = false;

    productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[];

    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    rowsPerPageOptions = [10, 25, 50];

    productGroups: ProductGroup[];

    totalRecords: number;

    constructor(private productService: ProductService,
                private messageService: MessageService,
                private productGroupService: ProductGroupService,
                private breadcrumbService: AppBreadcrumbService) {

        this.breadcrumbService.setItems([
            {label: 'Pages'},
            {label: 'Crud', routerLink: ['/pages/crud']}
        ]);
    }

    ngOnInit() {
        this.refresh();
        this.productGroupService.productGroupsFindAllGet$Json().subscribe(productGroups => {
            this.productGroups = productGroups;
        });
    }

    loadProducts(event: TableLazyLoadEvent) {
        let dtFilter: { [k: string]: any; };
        if (event.filters) {
            dtFilter = Object.fromEntries(Object.entries(event.filters).map(([key, value]) => [key, (value as FilterMetadata).value]));
        }
        this.loading = true;
        console.log(event);
        let pageNumber = (event.first === 0 || event.first == undefined) ? 0 : event.first / (event.rows == undefined ? 1 : event.rows);
        this.productService.productsQueryPagePost$Json({
            body: {
                page: pageNumber,
                size: event.rows,
                filter: dtFilter
            }
        }).subscribe({
            next: data => {
                this.products = data.tutorials;
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
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.refresh();
        this.product = product;
        this.productForm.patchValue(product);
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = {...product};
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = null;
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.productService.productsIdDelete({id: this.product.id.toString()}).subscribe({
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
                    detail: 'Ürün Silinirken Hata! error: ' + err,
                    life: 3000
                });
            },
            complete: () => {
                this.refresh();
            }
        })
        this.product = {};
    }

    hideDialog() {
        console.log(this.productForm);
        this.refresh();
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        if (this.product) {
            this.productService.productsIdPut({
                id: this.product.id.toString(),
                body: this.productForm.value
            }).subscribe({
                next: data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Başarılı',
                        detail: 'Ürün Güncellendi',
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
                        detail: 'Ürün Güncellenirken Hata! error: ' + err,
                        life: 3000
                    });
                }
            });
        } else {
            this.productService.productsPost$Json({body: this.productForm.value}).subscribe({
                next: data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Başarılı',
                        detail: 'Ürün Oluşturuldu',
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
                        detail: 'Ürün Oluşturulurken Hata! error: ' + err,
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
        return this.productForm.get('name');
    }

    get price() {
        return this.productForm.get('price');
    }

    get max_discount() {
        return this.productForm.get('max_discount');
    }

    get product_group_id() {
        return this.productForm.get('product_group_id');
    }

    refresh() {
        this.productForm.reset();
        this.selectedProducts = [];
        this.product = null;
    }

}

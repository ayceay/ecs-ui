import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FilterMetadata, MessageService} from "primeng/api";
import {AppBreadcrumbService} from "../../app.breadcrumb.service";
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {Table, TableLazyLoadEvent, TableSelectAllChangeEvent} from "primeng/table";
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
    @ViewChild('dt') table: Table;

    private formBuilder = inject(FormBuilder);

    userForm = this.formBuilder.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        username: ['', Validators.required],
        password: ['']
    });

    loading = false;

    userDialog: boolean;

    deleteUserDialog: boolean = false;

    deleteUsersDialog: boolean = false;

    users: User[];

    user: User;

    selectedUsers: User[];

    submitted: boolean;

    rowsPerPageOptions = [10, 25, 50];

    selectAll: boolean;

    totalRecords: number;

    constructor(private userService: UserService, private messageService: MessageService,
                private breadcrumbService: AppBreadcrumbService) {

        this.breadcrumbService.setItems([
            {label: 'Pages'},
            {label: 'Crud', routerLink: ['/pages/crud']}
        ]);
    }

    ngOnInit() {
        this.refresh();
    }

    loadUsers(event: TableLazyLoadEvent) {
        let dtFilter: { [k: string]: any; };
        if (event.filters) {
            dtFilter = Object.fromEntries(Object.entries(event.filters).map(([key, value]) => [key, (value as FilterMetadata).value]));
        }
        this.loading = true;
        console.log(event);
        let pageNumber = (event.first === 0 || event.first == undefined) ? 0 : event.first / (event.rows == undefined ? 1 : event.rows);
        this.userService.usersQueryPagePost$Json({
            body: {
                page: pageNumber,
                size: event.rows,
                filter: dtFilter
            }
        }).subscribe({
            next: data => {
                this.users = data.tutorials;
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
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.deleteUsersDialog = true;
    }

    editUser(user: User) {
        this.refresh();
        this.user = user;
        this.userForm.patchValue(user);
        this.userDialog = true;
    }

    deleteUser(user: User) {
        this.deleteUserDialog = true;
        this.user = {...user};
    }

    confirmDeleteSelected() {
        this.deleteUsersDialog = false;
        this.users = this.users.filter(val => !this.selectedUsers.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedUsers = null;
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        this.userService.usersIdDelete({id: this.user.id.toString()}).subscribe({
            next: data => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Kullanıcı Silindi',
                    life: 3000
                });
                this.table.reset();
            },
            error: err => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Hata',
                    detail: 'Kullanıcı Silinirken Hata! error: ' + err,
                    life: 3000
                });
            },
            complete: () => {
                this.refresh();
            }
        })
        this.user = {};
    }

    hideDialog() {
        this.refresh();
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        if (this.user) {
            this.userService.usersIdPut({id: this.user.id.toString(), body: this.userForm.value}).subscribe({
                next: data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Başarılı',
                        detail: 'Kullanıcı Güncellendi',
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
                        detail: 'Kullanıcı Güncellenirken Hata! error: ' + err,
                        life: 3000
                    });
                }
            });
        } else {
            this.userService.usersPost$Json({body: this.userForm.value}).subscribe({
                next: data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Başarılı',
                        detail: 'Kullanıcı Oluşturuldu',
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
                        detail: 'Kullanıcı Oluşturulurken Hata! error: ' + err,
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
        return this.userForm.get('name');
    }

    get surname() {
        return this.userForm.get('surname');
    }

    get username() {
        return this.userForm.get('username');
    }

    refresh() {
        this.userForm.reset();
        this.selectedUsers = [];
        this.user = null;
    }

}

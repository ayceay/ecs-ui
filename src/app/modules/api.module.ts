/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {ApiConfiguration, ApiConfigurationParams} from './api-configuration';

import {UserService} from './services/user.service';
import {UserComponent} from "./user/user.component";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {DATE_PIPE_DEFAULT_OPTIONS, DatePipe, NgClass, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {MessageService} from "primeng/api";
import {HttpSecurityInterceptor} from "./interceptor/http-security-interceptor";

/**
 * Module that provides all services and configuration.
 */
@NgModule({
    imports: [
        ToastModule,
        ToolbarModule,
        TableModule,
        InputTextModule,
        DialogModule,
        ReactiveFormsModule,
        CardModule,
        NgIf,
        NgClass,
        ButtonModule,
        RippleModule,
        DatePipe
    ],
    exports: [],
    declarations: [UserComponent],
    providers: [
        UserService,
        ApiConfiguration,
        MessageService,
        {provide: HTTP_INTERCEPTORS, useClass: HttpSecurityInterceptor, multi: true},
        {
            provide: DATE_PIPE_DEFAULT_OPTIONS,
            useValue: {dateFormat: "dd-MM-YYYY hh:mm:ss"}
        }

    ],
})
export class ApiModule {
    static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [
                {
                    provide: ApiConfiguration,
                    useValue: params
                }
            ]
        }
    }

    constructor(
        @Optional() @SkipSelf() parentModule: ApiModule,
        @Optional() http: HttpClient
    ) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
}

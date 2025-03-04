/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Customer } from '../models/customer';
import { CustomerPaginationModel } from '../models/customer-pagination-model';
import { customersDelete } from '../fn/customer/customers-delete';
import { CustomersDelete$Params } from '../fn/customer/customers-delete';
import { customersIdDelete } from '../fn/customer/customers-id-delete';
import { CustomersIdDelete$Params } from '../fn/customer/customers-id-delete';
import { customersIdGet$Json } from '../fn/customer/customers-id-get-json';
import { CustomersIdGet$Json$Params } from '../fn/customer/customers-id-get-json';
import { customersIdGet$Xml } from '../fn/customer/customers-id-get-xml';
import { CustomersIdGet$Xml$Params } from '../fn/customer/customers-id-get-xml';
import { customersIdPut } from '../fn/customer/customers-id-put';
import { CustomersIdPut$Params } from '../fn/customer/customers-id-put';
import { customersPost$Json } from '../fn/customer/customers-post-json';
import { CustomersPost$Json$Params } from '../fn/customer/customers-post-json';
import { customersPost$Xml } from '../fn/customer/customers-post-xml';
import { CustomersPost$Xml$Params } from '../fn/customer/customers-post-xml';
import { customersQueryPagePost$Json } from '../fn/customer/customers-query-page-post-json';
import { CustomersQueryPagePost$Json$Params } from '../fn/customer/customers-query-page-post-json';
import { customersQueryPagePost$Xml } from '../fn/customer/customers-query-page-post-xml';
import { CustomersQueryPagePost$Xml$Params } from '../fn/customer/customers-query-page-post-xml';

@Injectable({ providedIn: 'root' })
export class CustomerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `customersPost()` */
  static readonly CustomersPostPath = '/customers/';

  /**
   * Create new customer.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customersPost$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customersPost$Json$Response(params: CustomersPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Customer>> {
    return customersPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * Create new customer.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customersPost$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customersPost$Json(params: CustomersPost$Json$Params, context?: HttpContext): Observable<Customer> {
    return this.customersPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Customer>): Customer => r.body)
    );
  }

  /**
   * Create new customer.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customersPost$Xml()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customersPost$Xml$Response(params: CustomersPost$Xml$Params, context?: HttpContext): Observable<StrictHttpResponse<Customer>> {
    return customersPost$Xml(this.http, this.rootUrl, params, context);
  }

  /**
   * Create new customer.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customersPost$Xml$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customersPost$Xml(params: CustomersPost$Xml$Params, context?: HttpContext): Observable<Customer> {
    return this.customersPost$Xml$Response(params, context).pipe(
      map((r: StrictHttpResponse<Customer>): Customer => r.body)
    );
  }

  /** Path part for operation `customersDelete()` */
  static readonly CustomersDeletePath = '/customers/';

  /**
   * Delete all customer.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customersDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  customersDelete$Response(params?: CustomersDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return customersDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete all customer.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customersDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customersDelete(params?: CustomersDelete$Params, context?: HttpContext): Observable<void> {
    return this.customersDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `customersQueryPagePost()` */
  static readonly CustomersQueryPagePostPath = '/customers/queryPage';

  /**
   * Get all customer as paginated.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customersQueryPagePost$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customersQueryPagePost$Json$Response(params: CustomersQueryPagePost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CustomerPaginationModel>> {
    return customersQueryPagePost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all customer as paginated.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customersQueryPagePost$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customersQueryPagePost$Json(params: CustomersQueryPagePost$Json$Params, context?: HttpContext): Observable<CustomerPaginationModel> {
    return this.customersQueryPagePost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CustomerPaginationModel>): CustomerPaginationModel => r.body)
    );
  }

  /**
   * Get all customer as paginated.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customersQueryPagePost$Xml()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customersQueryPagePost$Xml$Response(params: CustomersQueryPagePost$Xml$Params, context?: HttpContext): Observable<StrictHttpResponse<CustomerPaginationModel>> {
    return customersQueryPagePost$Xml(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all customer as paginated.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customersQueryPagePost$Xml$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customersQueryPagePost$Xml(params: CustomersQueryPagePost$Xml$Params, context?: HttpContext): Observable<CustomerPaginationModel> {
    return this.customersQueryPagePost$Xml$Response(params, context).pipe(
      map((r: StrictHttpResponse<CustomerPaginationModel>): CustomerPaginationModel => r.body)
    );
  }

  /** Path part for operation `customersIdGet()` */
  static readonly CustomersIdGetPath = '/customers/{id}';

  /**
   * Get specific customer.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customersIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  customersIdGet$Json$Response(params: CustomersIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Customer>> {
    return customersIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * Get specific customer.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customersIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customersIdGet$Json(params: CustomersIdGet$Json$Params, context?: HttpContext): Observable<Customer> {
    return this.customersIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Customer>): Customer => r.body)
    );
  }

  /**
   * Get specific customer.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customersIdGet$Xml()` instead.
   *
   * This method doesn't expect any request body.
   */
  customersIdGet$Xml$Response(params: CustomersIdGet$Xml$Params, context?: HttpContext): Observable<StrictHttpResponse<Customer>> {
    return customersIdGet$Xml(this.http, this.rootUrl, params, context);
  }

  /**
   * Get specific customer.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customersIdGet$Xml$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customersIdGet$Xml(params: CustomersIdGet$Xml$Params, context?: HttpContext): Observable<Customer> {
    return this.customersIdGet$Xml$Response(params, context).pipe(
      map((r: StrictHttpResponse<Customer>): Customer => r.body)
    );
  }

  /** Path part for operation `customersIdPut()` */
  static readonly CustomersIdPutPath = '/customers/{id}';

  /**
   * Update customer.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customersIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customersIdPut$Response(params: CustomersIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return customersIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update customer.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customersIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  customersIdPut(params: CustomersIdPut$Params, context?: HttpContext): Observable<void> {
    return this.customersIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `customersIdDelete()` */
  static readonly CustomersIdDeletePath = '/customers/{id}';

  /**
   * Delete customer.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customersIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  customersIdDelete$Response(params: CustomersIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return customersIdDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete customer.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customersIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customersIdDelete(params: CustomersIdDelete$Params, context?: HttpContext): Observable<void> {
    return this.customersIdDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}

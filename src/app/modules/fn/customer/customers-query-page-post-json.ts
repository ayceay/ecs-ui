/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CustomerPaginationModel } from '../../models/customer-pagination-model';
import { CustomerQuery } from '../../models/customer-query';

export interface CustomersQueryPagePost$Json$Params {
  authorization?: string;
      body: CustomerQuery
}

export function customersQueryPagePost$Json(http: HttpClient, rootUrl: string, params: CustomersQueryPagePost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CustomerPaginationModel>> {
  const rb = new RequestBuilder(rootUrl, customersQueryPagePost$Json.PATH, 'post');
  if (params) {
    rb.header('authorization', params.authorization, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CustomerPaginationModel>;
    })
  );
}

customersQueryPagePost$Json.PATH = '/customers/queryPage';

/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CustomerGroupPaginationModel } from '../../models/customer-group-pagination-model';
import { CustomerGroupQuery } from '../../models/customer-group-query';

export interface CustomerGroupsQueryPagePost$Xml$Params {
  authorization?: string;
      body: CustomerGroupQuery
}

export function customerGroupsQueryPagePost$Xml(http: HttpClient, rootUrl: string, params: CustomerGroupsQueryPagePost$Xml$Params, context?: HttpContext): Observable<StrictHttpResponse<CustomerGroupPaginationModel>> {
  const rb = new RequestBuilder(rootUrl, customerGroupsQueryPagePost$Xml.PATH, 'post');
  if (params) {
    rb.header('authorization', params.authorization, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: 'application/xml', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CustomerGroupPaginationModel>;
    })
  );
}

customerGroupsQueryPagePost$Xml.PATH = '/customer-groups/queryPage';

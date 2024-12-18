/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProductGroupPaginationModel } from '../../models/product-group-pagination-model';
import { ProductGroupQuery } from '../../models/product-group-query';

export interface ProductGroupsQueryPagePost$Xml$Params {
  authorization?: string;
      body: ProductGroupQuery
}

export function productGroupsQueryPagePost$Xml(http: HttpClient, rootUrl: string, params: ProductGroupsQueryPagePost$Xml$Params, context?: HttpContext): Observable<StrictHttpResponse<ProductGroupPaginationModel>> {
  const rb = new RequestBuilder(rootUrl, productGroupsQueryPagePost$Xml.PATH, 'post');
  if (params) {
    rb.header('authorization', params.authorization, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: 'application/xml', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ProductGroupPaginationModel>;
    })
  );
}

productGroupsQueryPagePost$Xml.PATH = '/product-groups/queryPage';

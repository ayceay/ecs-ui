/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProductGroup } from '../../models/product-group';

export interface ProductGroupsPost$Json$Params {
  authorization?: string;
      body: ProductGroup
}

export function productGroupsPost$Json(http: HttpClient, rootUrl: string, params: ProductGroupsPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<ProductGroup>> {
  const rb = new RequestBuilder(rootUrl, productGroupsPost$Json.PATH, 'post');
  if (params) {
    rb.header('authorization', params.authorization, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ProductGroup>;
    })
  );
}

productGroupsPost$Json.PATH = '/product-groups/';

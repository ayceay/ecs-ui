/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProductGroup } from '../../models/product-group';

export interface ProductGroupsFindAllGet$Xml$Params {
  authorization?: string;
}

export function productGroupsFindAllGet$Xml(http: HttpClient, rootUrl: string, params?: ProductGroupsFindAllGet$Xml$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProductGroup>>> {
  const rb = new RequestBuilder(rootUrl, productGroupsFindAllGet$Xml.PATH, 'get');
  if (params) {
    rb.header('authorization', params.authorization, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: 'application/xml', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ProductGroup>>;
    })
  );
}

productGroupsFindAllGet$Xml.PATH = '/product-groups/findAll';

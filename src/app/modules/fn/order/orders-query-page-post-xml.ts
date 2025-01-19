/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderPaginationModel } from '../../models/order-pagination-model';
import { OrderQuery } from '../../models/order-query';

export interface OrdersQueryPagePost$Xml$Params {
  authorization?: string;
      body: OrderQuery
}

export function ordersQueryPagePost$Xml(http: HttpClient, rootUrl: string, params: OrdersQueryPagePost$Xml$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderPaginationModel>> {
  const rb = new RequestBuilder(rootUrl, ordersQueryPagePost$Xml.PATH, 'post');
  if (params) {
    rb.header('authorization', params.authorization, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: 'application/xml', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OrderPaginationModel>;
    })
  );
}

ordersQueryPagePost$Xml.PATH = '/orders/queryPage';
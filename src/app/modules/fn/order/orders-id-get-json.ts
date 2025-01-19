/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Order } from '../../models/order';

export interface OrdersIdGet$Json$Params {
  id: string;
  authorization?: string;
}

export function ordersIdGet$Json(http: HttpClient, rootUrl: string, params: OrdersIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Order>> {
  const rb = new RequestBuilder(rootUrl, ordersIdGet$Json.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
    rb.header('authorization', params.authorization, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Order>;
    })
  );
}

ordersIdGet$Json.PATH = '/orders/{id}';

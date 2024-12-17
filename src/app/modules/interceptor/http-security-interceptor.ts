import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class HttpSecurityInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Apply the headers
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImE1IiwiaWF0IjoxNzM0NDY4MDgzLCJuYmYiOjE3MzQ0NjgwODMsImV4cCI6MTczNDU1NDQ4MywiYXVkIjoiaHR0cDovL2Vjc3BsdXMuY29tLnRyIiwiaXNzIjoiaHR0cDovL3d3dy5lY3NwbHVzLmNvbS50ciJ9.PzbERqidsqhXfy6I92YEqHFK4AJd3G41pgLOx8C9lAo')
        });

        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
}

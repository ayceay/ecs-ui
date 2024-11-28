import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class HttpSecurityInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Apply the headers
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1heSIsImlhdCI6MTczMjc5MjIzMCwiZXhwIjoxNzMyODc4NjMwfQ.dPqQJ85K8GEAX2Ef3TQFAdApVw54LqjqMRgs4qrs0u0')
        });

        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
}

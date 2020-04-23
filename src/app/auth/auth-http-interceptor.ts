import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable()

export class AuthHttpInterceptor implements HttpInterceptor {

    // Will help in modifying/configuring our http requedts
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({
            withCredentials: true
        });
        console.log(req);
        return next.handle(modifiedReq);
    }
}

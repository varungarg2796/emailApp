import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEventType
} from '@angular/common/http'
import { Observable } from 'rxjs';
// import { tap, filter } from 'rxjs/operators';


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
        // .pipe(

        //     filter( val => val.type === HttpEventType.Sent),
        //     tap( val => {
        //         console.log(val);
                // if (val.type === HttpEventType.Sent) {
                //     console.log('Request was sent to server');
                // }

                // if (val.type === HttpEventType.Response) {
                //     console.log('Got a respnse from the API', val);
                // }
    }
}

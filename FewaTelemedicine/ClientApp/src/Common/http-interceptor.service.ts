import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global.model';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private global: Global) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // All HTTP requests are going to go through this method
        // We retrieve the token, if any
        let newHeaders = req.headers;
        if (this.global.token) {
            // If we have a token, we append it to our new headers
            newHeaders = newHeaders.append('Authorization', 'Bearer ' + this.global.token);
        }
        // Finally we have to clone our request with our new headers
        // This is required because HttpRequests are immutable
        const authReq = req.clone({ headers: newHeaders });
        // Then we return an Observable that will run the request
        // or pass it to the next interceptor if any
        return next.handle(authReq);
    }
}
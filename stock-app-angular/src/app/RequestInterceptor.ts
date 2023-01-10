import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable()
export class RequestInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        return next.handle(req);
     }
}

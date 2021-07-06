import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token =localStorage.getItem("token");
    let newRequest:HttpRequest<any>;
    newRequest=request.clone({
      headers:request.headers.set("Authorization","Bearer "+ token)
    })
    return next.handle(newRequest);
  }
}
// ErrorHandling için de yazılabilir
// c# ta yazdığımız aspecs lere benziyor araya girerek bistediğimiz işlemleri yapıyor
// burada bir header oluşturarak bütün api metodları çalıştırken headerı ekliyecek

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  let clonedRequest = req;
  if(localStorage.getItem('token')){
    clonedRequest = req.clone({
      setHeaders: {
        Authorization:localStorage.getItem('token')!
      }
    })
  }
  return next(clonedRequest);
};

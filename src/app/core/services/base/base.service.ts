import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/finally';
import { ENV } from '../../env.config';

@Injectable()
export class BaseService {

  constructor(public http: HttpClient) {
  }

  get(route) {

    return this.http.get(ENV.BASE_API + route)
      .catch((error: Response) => this._handleError(error))
      .finally(() => {
      });
  }


  post(route, postBody: object) {

      return this.http.post(ENV.BASE_API + route, postBody)
        .catch((error: Response) => this._handleError(error))
        .finally(() => {
        });
    }

  delete(route) {
    
    return this.http.delete(ENV.BASE_API + route)
      .catch((error: Response) => this._handleError(error))
      .finally(() => {
      });
  }
  put(route, putData) {

    return this.http.put(ENV.BASE_API + route, putData)
      .catch((error: Response) => this._handleError(error))
      .finally(() => {
      });
  }


  upload(route: string, file: File) {

    const formData: FormData = new FormData();
    if (file) {
      formData.append('files', file, file.name);
    }
    //this.helperService.addContentTypeHeader = false;
    return this.post(route, formData);
  }

  private _handleError(err: Response): Observable<any> {

    if(err.status == 401){
      return Observable.of(401);
    }
    else{
      let errMsg = 'Error: No se puede completar la solicitud.'
      console.log(errMsg);
      return Observable.throw(errMsg);
    }
  
  }

}

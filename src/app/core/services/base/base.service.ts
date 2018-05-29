import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
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


  upload(route: string, file: File, videojuego, queHago: string) {
    const formData: FormData = new FormData();
    console.log(file);
    if (file) {
      formData.append('imagen', file, file.name);
      formData.append('videojuego', JSON.stringify(videojuego));
    }
    //this.helperService.addContentTypeHeader = false;
    //console.log("formData: ", formData);
    if(queHago == "post") {
      return this.post(route, formData);
    }

    if(queHago == "put") {
      return this.put(route, formData);
    }
    
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

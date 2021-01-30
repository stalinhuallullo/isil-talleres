import { FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';



export const CHECK_INPUT = (formulario: FormGroup, input: string, type: string, errorType: string = '', isSubmited: boolean = false): boolean => {
  if (formulario != null && errorType) {
    return formulario != null && input != null && formulario.get(input)[type] !== undefined
      && formulario.get(input)[type]
      && (formulario.get(input).dirty || formulario.get(input).touched || isSubmited)
      && formulario.get(input).errors !== null
      && formulario.get(input).errors[errorType] !== undefined
      && formulario.get(input).errors[errorType];
  }
  return formulario != null && formulario.get(input)[type] !== undefined && formulario.get(input)[type] && (formulario.get(input).dirty || formulario.get(input).touched || isSubmited);
}

export const SET_HEADERS = (needReload: boolean = false, attachToken: boolean = false, delayRequest: boolean = false, showAlert: boolean = false, element: string = '', isPrivate: boolean = true): HttpHeaders => {
  let headers = new HttpHeaders();
  if (needReload) headers = headers.set('needReload', 'true');
  if (attachToken) headers = headers.set('attachToken', 'true');
  if (delayRequest) headers = headers.set('delayRequest', 'true');
  if (showAlert) headers = headers.set('showAlert', 'true');
  if (!!element) headers = headers.set('setElement', element);
  if (!!element) headers = headers.set('setElement', element);
  if(isPrivate) headers = headers.set('isPrivate', 'true');
  return headers;
}

export const roundTo = (n:number, digits:number): number => {
  if (digits === undefined) digits = 0;
  let multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  return Math.round(n) / multiplicator;
}
export const url_assets = (url: string) => {
    return './'+url;
}



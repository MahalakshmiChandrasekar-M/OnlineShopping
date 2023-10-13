import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

constructor() {}

log(message: any) {
  console.log(message);
}

info(message: any)
{
  console.info(message);
}

trace(message: any)
{
  console.trace(message);
}

debug(message: any)
{
  console.debug(message);
}

count(message: any)
{
  console.count(message);
}

error(message: any) {
  console.error(message);
}

warn(message: any) {
  console.warn(message);
}

}

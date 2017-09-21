import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'log'
})
export class LoggerPipes implements PipeTransform {


  transform(data: any, statement?: string): any {

      if (!statement) {
          return console.log(data);
      }
      console.log(statement, data);

  }
}


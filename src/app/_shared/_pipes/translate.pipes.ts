import {Pipe, PipeTransform} from '@angular/core';
import * as langFile from '../_lang';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipes implements PipeTransform {

  language: string;

  constructor() {

      this.language = localStorage.getItem('_lang');
  }

  transform(value: string, args?: any[]): any {

      return langFile[this.language][value];
  }

}


import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'symbol'
})
export class SymbolPipe implements PipeTransform {

    filterNums(val) {

        if(!val) {
            return false;
        }

        return parseFloat( val.toString().replace(/[^0-9]+/g, "") );
    }


    transform(data: string, type: string): any {

        let value, val;

        val = this.filterNums(data);

        if(!val)
            return "";


        switch (type) {

            case 'percent':
                value = val+'%';
                break;
            case 'at':
                value = '@'+val;
                break;
            case 'star':
                value = val+'*';
                break;
            default :
                value = val;
                break;
        }

        return value;
    }
}


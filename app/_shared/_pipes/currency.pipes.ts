import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

    filterNums(val) {

        if(!val) {
            return false;
        }

        return parseFloat( val.toString().replace(/[^0-9]+/g, "") );
    }


    transform(val: string, type: string): any {

        let value, amt;

        amt = this.filterNums(val);

        if(!amt)
            return "";


        switch (type) {

            case 'dollar':
                value = '$' + amt;
                break;
            case 'rupee':
                value = '₹' + amt;
                break;
            case 'euro':
                value = '€' + amt;
                break;
            case 'pound':
                value = '£' + amt;
                break;
            default :
                value = amt;
                break;
        }

        return value;
    }
}


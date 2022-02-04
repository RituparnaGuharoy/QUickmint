import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: any, args: any): any {
    //console.log('value: ', value);
    //console.log('args: ', args);
    if (!value) {
      return null;
    } else if (!args) {
      args = '';
      return value;
    } else if (args.title == undefined && value) {
      args = '';
      return value.filter(function (item: any) {
        //console.log('item for filter', item);
        //console.log(JSON.stringify(item.name).toLowerCase().includes(args));
        return JSON.stringify(item.name).toLowerCase().includes(args);
      });
    } else if (args && value && args.title != undefined) {
      // console.log("args for filter", args)
      args = args.title.toLowerCase();
      console.log('args for filter 2', args);
      return value.filter(function (item: any) {
        //console.log('item for filter 2', item);
        //console.log(JSON.stringify(item.name).toLowerCase().includes(args));
        return JSON.stringify(item.name).toLowerCase().includes(args);
      });
    }
  }
}

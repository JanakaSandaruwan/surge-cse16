import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(modules: any, term: any): any {
     if(term === undefined) return modules;

     return modules.filter(function(module){

     	return module.name.toLowerCase().includes(term.toLowerCase());
     	})
  }

}

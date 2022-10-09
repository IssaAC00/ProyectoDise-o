import {Area} from './Area'
import {Element} from './Element'
let area1 = new Area('ds','ds',[''],'ds');
let element = null;

let setPrueba = new Set<number>();

setPrueba.add(1);
setPrueba.add(2);
setPrueba.add(1);

let lista: number[] = [1,2,3,4];

lista = lista.filter(n => n === 4);
let num:number = 0;

for(const n of lista){
    if (n === 2){
        num = n;
    }

}
// clase.cosntructor.name
console.log(area1.constructor.name);
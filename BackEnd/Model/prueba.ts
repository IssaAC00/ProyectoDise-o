import {_Area} from './Area'
import {_Element} from './Element'
let area1 = new _Area('ds','ds',[''],'ds');
let element = new _Element('dsr', 'dsr', ['v'], 'dsr', area1);

let setPrueba = new Set<number>();

setPrueba.add(1);
setPrueba.add(2);
setPrueba.add(1);

console.log(setPrueba);
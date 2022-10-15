import { Area, Floor } from './Area'
import {Element} from './Element'
import { Inspection, InspectionArea, InspectionElement, FactoryInspections, State} from './Inspection'
import { controller } from '../Controller/Controller'
//let area1 = new Area('dsd', 'dsda', ['dsdsa'], 'dasda');
//let element = new Element('dasd', 'dada', ['dad'], 'dadasd', null!);
//let pArea: Inspection = factoryInspection.getInspection(2, 2333,'hola mundo', null!, null!,null!,null!,'txt.pdf', State.Ejecutada, element);

// Flujo de agregar area

controller.registerArea('1a', 'Sala de esta', ['jps.jps'], 'A la derecha subiendo', null!);
let area1 = controller.seeArea('1a');
console.log(area1);

//Flujo de agregar Elemento.

controller.registerElement('2B', 'Pintura', ['jps.jps'], 'en la pared amarilla','1a');
let element1 = controller.seeElement('2B');
console.log(element1);

//Flujo de agregar


//console.log(pArea);

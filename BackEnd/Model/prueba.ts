import {Area} from './Area'
import {Element} from './Element'
import { Inspection, InspectionArea, InspectionElement, FactoryInspections, State} from './Inspection'
let area1 = new Area('dsd', 'dsda', ['dsdsa'], 'dasda');
let element = new Element('dasd', 'dada', ['dad'], 'dadasd', area1);
let factoryInspection: FactoryInspections = new FactoryInspections();
let pArea: Inspection = factoryInspection.getInspection(2, 2333,'hola mundo', null!, null!,null!,null!,'txt.pdf', State.Ejecutada, element);


console.log(pArea);

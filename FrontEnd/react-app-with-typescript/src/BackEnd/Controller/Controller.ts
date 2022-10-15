import { AdminArea } from './AdminArea'
import { AdminDutyManager } from './AdminDutyManger'
import { AdminElement } from './AdminElement'
import { AdminInspection } from './AdminInspection'
import { AdminSpolaige } from './AdminSpolaige'
import { AdminUser } from './AdminUser'
import { Spolaige, TypeSpolaige } from '../Model/Spolaige'
import { Area, Floor } from '../Model/Area'
import { Element } from '../Model/Element'
import { Inspection, FactoryInspections ,State, InspectionArea } from '../Model/Inspection'
import { Rol, User } from '../Model/User'
import { DutyManager, TypeWork, FactoryDutyManager} from '../Model/DutyManager'

class Controller{
    private adminArea: AdminArea = new AdminArea();
    private adminElement: AdminElement = new AdminElement();
    private adminDutyManager: AdminDutyManager = new AdminDutyManager;
    private adminInspection: AdminInspection = new AdminInspection();
    private adminSpolaige: AdminSpolaige = new AdminSpolaige();
    private adminUser: AdminUser = new AdminUser();

    // Spolaige

    public registerPolaige(id: string, description: string, type: TypeSpolaige){
        //Validar id, description && type 

        let newSpolaige = new Spolaige(id, description, type);
        this.adminSpolaige.add(newSpolaige);
    }
    
    public seePolaige(id: string){
        let polaige = this.adminSpolaige.see(id);
        console.log(polaige);
    }//preguntar como se va a ver

    public modifyPolaige(id: string, description: string, type: TypeSpolaige){
        //Validar nombre && type

        let newSpolaige = new Spolaige(id, description, type);
        this.adminSpolaige.modify(newSpolaige);
    }

    public deleteSpolaige(id: string){
        this.adminSpolaige.delete(id);
    }

    //Area

    public registerArea(id: string, description: string, images: string[], location: string, floor: Floor){
        //Validar id, description 

        let newArea = new Area(id, description, images, location, floor);
        this.adminArea.add(newArea);
    }
    
    public seeArea(idArea: string): Area{
        return this.adminArea.search(idArea);
    }//preguntar como se va a ver

    public modifyArea(id: string, description: string, images: string[], location: string, floor: Floor){
        //Validar description
        let newArea = new Area(id, description, images, location, floor);
        this.adminArea.modify(newArea);
    }

    public deleteArea(id: string){
        this.adminArea.delete(id);
    }

    //Element

    public registerElement(id: string, description: string, images: string[], location: string, idArea: string){
        //Validar id, description, busqueda area
        let area = this.adminArea.search(idArea);
        let newElement = new Element(id, description, images, location, area);
        this.adminElement.add(newElement);
    }
    
    public seeElement(idElement: string): Element{
        return this.adminElement.search(idElement);
    }//preguntar como se va a ver

    public modifyElement(id: string, description: string, images: string[], location: string, idArea: string){
        //Validar nombre && type
        let area = this.adminArea.search(idArea);
        let newElement = new Element(id, description, images, location, area);
        this.adminElement.modify(newElement);
    }

    public deleteElement(id: string){
        this.adminElement.delete(id);
    }

    //Inspection


    public registerInspection(optionInspection: number, id: number, description: string, iDate: Date, eDate: Date, dDate: Date,
                                    idDutyManager: number, PDF: string, state: State, idObjectInspect: string){
        //Validar id, description, busqueda area
        let factoryInspection = new FactoryInspections(); 
        let dutyManager = this.adminDutyManager.search(idDutyManager);
        let objectInspect: Area | Element;
        if(optionInspection === 1){
            objectInspect = this.adminArea.search(idObjectInspect);
        }else{
            objectInspect = this.adminElement.search(idObjectInspect);
        }
        let newInspection = factoryInspection.getInspection(optionInspection, id, description, iDate, eDate, dDate, dutyManager,
                                                            PDF, state, objectInspect);
        this.adminInspection.add(newInspection);
    }
    
    public seeInspection(idInspection: number): Inspection{
        return this.adminInspection.search(idInspection);
    }//preguntar como se va a ver

    //Cuando se haga el register
    public modifyInspection(id: string, description: string, images: string[], location: string, idArea: string){
        //Validar nombre && type
        let area = this.adminArea.search(idArea);
        let newElement = new Element(id, description, images, location, area);
        this.adminElement.modify(newElement);
    }

    public deleteInspection(id: number){
        this.adminInspection.delete(id);
    }

    //User

    public registerUser(email: string, password: string, rol: Rol){
        //Validar email y contra
        let newUser = new User(email, password, rol);
        this.adminUser.add(newUser);
    }
    
    public seeUser(idUser: string): User{
        return this.adminUser.search(idUser);
    }//preguntar como se va a ver

    public modifyUser(email: string, password: string, rol: Rol){
        //Validar nombre && type
        let newUser = new User(email, password, rol);
        this.adminUser.modify(newUser);
    }

    public deleteUser(email: string){
        this.adminUser.delete(email);
    }

    public login(email: string, password: string): boolean{
        let user = this.adminUser.search(email);
        if(user !== undefined && user.password === password){
            return true;
        }
        return false;
    }

    //DutyManager

    //Preguntar legal
    public registerDutyManager(optionDM:number, id: number, name: string, email: string, 
                                labor: Set<TypeWork>, managerName?: string, idManager?: number){
        //Validar email y contra
        let factoryDutyManager = new FactoryDutyManager();
        let newDutyManager = factoryDutyManager.getInspection(optionDM, id, name, email, labor, managerName, idManager);
        this.adminDutyManager.add(newDutyManager);
    }
    
    public seeDutyManager(idDutyManager: number): DutyManager{
        return this.adminDutyManager.search(idDutyManager);
    }//preguntar como se va a ver

    public modifyDutyManager(id: number, name: string, email: string, labor: Set<TypeWork>){
        //Validar nombre && type
        //let newDutyManager = new DutyManager(id, name, email, labor);
        //this.adminDutyManager.modify(newDutyManager);
    }

    public deleteDutyManager(id: number){
        this.adminDutyManager.delete(id);
    }
}

let controller = new Controller();
export { controller }
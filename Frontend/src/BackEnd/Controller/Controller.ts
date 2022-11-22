import { AdminArea } from './AdminArea'
import { AdminDutyManager } from './AdminDutyManger'
import { AdminElement } from './AdminElement'
import { AdminInspection } from './AdminInspection'
import { AdminSpolaige } from './AdminSpolaige'
import { AdminUser } from './AdminUser'
import { Spolaige, TypeSpolaige } from '../Model/Spolaige'
import { Area, Floor } from '../Model/Area'
import { Element } from '../Model/Element'
import { Inspection, FactoryInspections ,State, InspectionArea, PDF, Register } from '../Model/Inspection'
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
    public async loadSpolaige(){
        return this.adminSpolaige.load();
    }

    public registerPolaige(id: string, description: string, type: TypeSpolaige){
        //Validar id, description && type 
        let newSpolaige = new Spolaige(id, description, type);
        this.adminSpolaige.add(newSpolaige);
    }
    
    public seePolaige(id: string): Spolaige{
        let polaige = this.adminSpolaige.see(id);
        return polaige;
    }//preguntar como se va a ver

    public modifyPolaige(id: string, description: string, type: TypeSpolaige){
        //Validar nombre && type

        let newSpolaige = new Spolaige(id, description, type);
        this.adminSpolaige.modify(newSpolaige);
    }

    public deleteSpolaige(id: string){
        return this.adminSpolaige.delete(id);
    }

    //Area
    public async loadAreas(){
        return this.adminArea.load();
    }

    public registerArea(id: string, description: string, images: string[], location: string, floor: Floor){
        //Validar id, description 

        let newArea = new Area(id, description, images, location, floor);
        this.adminArea.add(newArea);
    }
    
    public seeArea(idArea: string): Area{
        return this.adminArea.search(idArea);
    }//preguntar como se va a ver

    public seeAllArea(): Area[]{
        return this.adminArea.seeAll();
    }

    public modifyArea(id: string, description: string, images: string[], location: string, floor: Floor){
        //Validar description
        let newArea = new Area(id, description, images, location, floor);
        this.adminArea.modify(newArea);
    }

    public deleteArea(id: string): boolean{
        return this.adminArea.delete(id);
    }

    //Element
    public async loadElements(){
        return this.adminElement.load(this.adminArea);
    }
    public registerElement(id: string, description: string, images: string[], location: string, idArea: string){
        //Validar id, description, busqueda area
        let area = this.adminArea.search(idArea);
        let newElement = new Element(id, description, images, location, area);
        this.adminElement.add(newElement);
    }
    
    public seeElement(idElement: string): Element{
        return this.adminElement.search(idElement);
    }//preguntar como se va a ver

    public seeAllElement(): Element[]{
        return this.adminElement.seeAll();
    }

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

    public async loadInspection(){
        this.adminInspection.load(this.adminDutyManager, this.adminArea, this.adminElement);
    }

    public registerInspection(optionInspection: number, id: number, iDate: Date, eDate: Date, dDate: Date,
                                    idDutyManager: number, PDF: PDF, result: TypeWork, state: State, idObjectInspect: string){
        //Validar id, description, busqueda area
        let factoryInspection = new FactoryInspections(); 
        let dutyManager = this.adminDutyManager.search(idDutyManager);
        let objectInspect: Area | Element;
        if(optionInspection === 0){
            objectInspect = this.adminArea.search(idObjectInspect);
        }else{
            objectInspect = this.adminElement.search(idObjectInspect);
        }
        let newInspection = factoryInspection.getInspection(optionInspection, id, iDate, eDate, dDate, dutyManager,
                                                            PDF, result, state, objectInspect);
        this.adminInspection.add(newInspection);
    }

    public createFormInspection(idInspection: number){
        this.adminInspection.createForm(idInspection);
    }

    public createRegisterForm(idInspection: number, idSpolaige: string, img: string, observation: string, description: string){
        let spolaige = this.adminSpolaige.see(idSpolaige);
        let newRegister = new Register(spolaige, img, observation, description);
        this.adminInspection.addRegister(idInspection, newRegister);
    }

    public async inspectionxState(){
        return this.adminInspection.queryIxS().then(data => console.log(data));
    }
    
    public seeInspection(idInspection: number): Inspection{
        return this.adminInspection.search(idInspection);
    }//preguntar como se va a ver

    //Cuando se haga el register
    public modifyInspection(optionInspection: number, id: number, description: string, iDate: Date, eDate: Date, dDate: Date,
        idDutyManager: number, PDF: PDF, result: TypeWork, state: State, idObjectInspect: string) {
        //Validar nombre && type
        let factoryInspection = new FactoryInspections();
        let dutyManager = this.adminDutyManager.search(idDutyManager);
        let objectInspect: Area | Element;
        if (optionInspection === 0) {
            objectInspect = this.adminArea.search(idObjectInspect);
        } else {
            objectInspect = this.adminElement.search(idObjectInspect);
        }
        let newInspection = factoryInspection.getInspection(optionInspection, id, iDate, eDate, dDate, dutyManager,
            PDF, result, state, objectInspect);
        this.adminInspection.modify(newInspection);
    }

    public deleteInspection(idInspection: number){
        this.adminInspection.delete(idInspection);
    }

    //User

    public loadUsers(){
        this.adminUser.load();
    }

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
        if(user !== null && user.password === password){
            return true;
        }
        return false;
    }

    //DutyManager

    public async loadDutyManagers(){
        return this.adminDutyManager.load();
    }

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

    public seeAllDutyManager(): DutyManager[]{
        return this.adminDutyManager.seeAll();
    }

    public modifyDutyManager(optionDM:number, id: number, name: string, email: string, labor: Set<TypeWork>, 
                            managerName?: string, idManager?: number){
        let factoryDutyManager = new FactoryDutyManager();
        let newDutyManager = factoryDutyManager.getInspection(optionDM, id, name, email, labor, managerName, idManager);
        this.adminDutyManager.modify(newDutyManager);
    }

    public deleteDutyManager(id: number){
        this.adminDutyManager.delete(id);
    }
}

let controller = new Controller();
// controller.registerArea('1a', 'Amarillo', ['pdf.pdf'], 'Entrando por arriba', 0);
// controller.registerArea('1c', 'Rojo', ['pdf.pdf'], 'Entrando por arriba', 0);
// controller.registerArea('1b', 'Verde', ['pdf.pdf'], 'Entrando por arriba', 0);

// controller.registerElement('2a', 'Pintura', ['pdf.pdf'], 'En la pared', '1a');
// controller.registerElement('2c', 'Mantel', ['pdf.pdf'], 'En el techo', '1b');
// controller.registerElement('2b', 'Verde', ['pdf.pdf'], 'Abajo', '1c');

// controller.registerUser('jbarrientossandoval@gmail.com', 'Pecorine2018', 0);
// controller.registerUser('alcon@gmail.com', 'Pascal2018', 1);
// controller.registerUser('aguila@gmail.com', 'Precuela2018', 2);

let list: Set<TypeWork> = new Set(); 
let list2: Set<TypeWork> = new Set(); 

// controller.registerDutyManager(0, 117870341, 'Josue Barrientos S', 'jbarrientossandoval@gmail.com', list.add(0).add(1));
// controller.registerDutyManager(1, 103425142, 'Jokemi', 'jbs@gmail.com', list2.add(1).add(2), 'Jose S', 1234523);

export { controller }
import { User, Resquest} from '../Model/User'
import axios from "axios";
import emailjs from '@emailjs/browser';

class AdminUser{
    private _users: User[] = [];
    private daoUser:DAOUser;
    private requets: Resquest[];

    constructor(){
        this._users = [];
        this.daoUser = new DAOUser();
        this.requets = [];
    }

    public async load(){
        if(this.daoUser.readyUser){
            this._users = await this.daoUser.getUsers();
            console.log(this._users);
        }
    }

    public async loadRequest(){
        if(this.daoUser.readyRequest){
            this.requets = await this.daoUser.getRequest();
            console.log(this.requets);
        }
    }

    public search(email: string): User{
        for(const user of this._users){
            if (user.email === email) {
                return user;
            }
        }
        return null!;
    }

    public searchRequest(resquest: Resquest): Resquest{
        for(const req of this.requets){
            if (req.user.email === resquest.user.email) {
                return req;
            }
        }
        return null!;
    }

    public isUser(user: User){
        return this.search(user.email) == null;
    }

    public isRequest(request: Resquest){
        return this.searchRequest(request) == null;
    }

    public add(user: User):boolean{
        if(this.isUser(user)){
            this._users.push(user);
            this.daoUser.createUser(user);
            return true;
        }
        return false;
    }

    public addRequest(request: Resquest):boolean{
        if(this.isUser(request.user) && this.isRequest(request)){
            console.log("HOla")
            this.requets.push(request);
            this.daoUser.createRequest(request);
            return true;
        }
        return false;
    }

    public see(email: string): User{
        return this.search(email);

    }

    public modify(user: User):boolean{
        this._users.forEach((item, index, arr) => {
            if (item.email === user.email){
                arr[index] = user;
            }
        });
        return true;
    }

    public delete(email: string):boolean{
        let user = this.search(email);
        this._users = this._users.filter(item => item !== user);
        return true;
    }
}

class DAOUser{
    private _readyUser: boolean = true;
    private _readyRequest: boolean = true;
    private readonly url = "http://localhost:5001/User";
    constructor(){

    }

    public async getUsers() {
        let result = await axios.get(this.url)
        .then(response => {
            this._readyUser = false;
            return response.data[0].map((userDB: any) => (
                new User(userDB.userMail, userDB.userPassword, userDB.rol)
            ));
        })
        .catch(error => {
            console.log(error);
        })
        return result;
    }

    public async getRequest() {
        let result = await axios.get(this.url)
        .then(response => {
            this._readyRequest = false;
            return response.data[0].map((userDB: any) => (
                new User(userDB.userMail, userDB.userPassword, userDB.rol)
            ));
        })
        .catch(error => {
            console.log(error);
        })
        return result;
    }

    private objectTOBD(user: User){
        return {
            userMail: user.email,
            userPassword: user.password,
            request: true,
            rol: user.rol
        }
    }

    private requetsTOBD(request: Resquest){
        return {
            userMail: request.user.email,
            userPassword: request.user.password,
            request: false,
            rol: request.user.rol
        }
    }

    public async createUser(user: User){
        let newUser = this.objectTOBD(user);
        await axios.post(this.url, newUser);
    }

    public async createRequest(request: Resquest){
        let newRequest = this.requetsTOBD(request);
        await axios.post(this.url + "/request", newRequest);
    }
    public async dropUser(){

    }

    public async updateUser(){
        
    }

    
    public get readyUser() : boolean {
        return this._readyUser;
    }

    public get readyRequest() : boolean {
        return this._readyRequest;
    }
    
}

export{ AdminUser };
import { User } from '../Model/User'
import axios from "axios";

class AdminUser{
    private _users: User[] = [];
    private daoUser:DAOUser;

    constructor(){
        this.daoUser = new DAOUser();
    }

    public async load(){
        if(this.daoUser.ready){
            this._users = await this.daoUser.getUsers();
            console.log(this._users);
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

    public isUser(user: User){
        return this.search(user.email) == null;
    }

    public add(user: User):boolean{
        if(this.isUser(user)){
            this._users.push(user);
            this.daoUser.createUser(user);
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
    private _ready: boolean = true;
    private readonly url = "http://localhost:5001/User";
    constructor(){

    }

    public async getUsers() {
        let result = await axios.get(this.url)
        .then(response => {
            this._ready = false;
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
            rol: user.rol
        }
    }

    public async createUser(user: User){
        let newUser = this.objectTOBD(user);
        await axios.post(this.url, newUser);
    }

    public async dropUser(){

    }

    public async updateUser(){
        
    }

    
    public get ready() : boolean {
        return this._ready;
    }
    
}

export{ AdminUser };
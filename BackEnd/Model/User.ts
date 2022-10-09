class User{
    private _email: string;
    private _password: string;
    private _rol: Rol;

    constructor(email: string, password: string, rol: Rol){
        this._email = email;
        this._password = password;
        this._rol = rol;
    }
    
    public get email(){
        return this._email;
    }

    public get password(){
        return this._password;
    }

    public get rol(){
        return this._rol;
    }

    public set email(mail: string){
        this._email = mail;
    }

    public set password(password: string){
        this.password = password;
    }
}

enum Rol{
    Adminitrador,
    Super,
    Operativo
}

export { Rol, User };
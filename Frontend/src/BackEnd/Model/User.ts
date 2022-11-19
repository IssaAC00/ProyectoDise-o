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
    Operativo,
    Direccion
}

class Resquest{
    private _email: string;
    private _rol: Rol;
    private _state: boolean;
    private _processMail: ProcessMail;

    constructor(email: string, rol: Rol, state: boolean, processMail: ProcessMail){
        this._email = email;
        this._rol = rol;
        this._state = state;
        this._processMail = processMail;
    }

    public setProcessMail(processMail: ProcessMail){

    }

    public processRequest(){
        
    }
}

interface ProcessMail{
    sendMail(user: User): boolean;
}

class MailAdministrator implements ProcessMail{
    sendMail(user: User): boolean {
        return true;
    }
}

class MailOperator implements ProcessMail{
    sendMail(user: User): boolean {
        return true;
    }
}

class MailDirector implements ProcessMail{
    sendMail(user: User): boolean {
        return true;
    }
}

class MailSolicitudFallida implements ProcessMail{
    sendMail(user: User): boolean {
        return true;
    }
}

export { Rol, User };
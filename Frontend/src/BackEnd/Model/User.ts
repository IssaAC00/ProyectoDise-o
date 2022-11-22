import emailjs from '@emailjs/browser';

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
    Administrador,
    Super,
    Operativo,
    Direccion
}

class Resquest{
    private _user: User;
    private _processMail: ProcessMail;

    constructor(user: User){
        this._user = user;
        this._processMail = this.strategyProcessMail();
    }

    private strategyProcessMail(){
        if(this._user.rol == Rol.Administrador){
            return new MailAdministrator();
        }else if (this._user.rol == Rol.Operativo){
            return new MailOperator();
        }else if (this._user.rol == Rol.Direccion){
            return new MailDirector();
        }else {
            return new MailSolicitudFallida();
        }
    }

    public processRequest(){
        this._processMail.sendMail(this._user);
    }

    
    public get user() : User {
        return this._user;
    }
    
}

interface ProcessMail{
    sendMail(user: User): boolean;
}

class MailAdministrator implements ProcessMail{
    sendMail(user: User): boolean {
        var templateParams = {
            email: user.email,
            password: user.password,
            rol: user.rol.toString(),
            responsabilidades: "Crear, eliminar y modificar area, elementos, deterioros, encargados y inpecciones.\nConsultas de encargados y inspecciones en específico, listados areas, elementos y deterioros y gráficos inspecciones"
        };
        // Strategy
        console.log(templateParams)
        emailjs.send(
            'service_k8aso0l', 
            'template_4cdby7c', 
            templateParams,
            'TRjrmP7S5sC7IoxwD'
            ). then((res: any) => {
                console.log(res.text);
        }).catch((err: any) =>console.log(err));
        return true;
    }
}

class MailOperator implements ProcessMail{
    sendMail(user: User): boolean {
        var templateParams = {
            email: user.email,
            password: user.password,
            rol: user.rol.toString(),
            responsabilidades: "Consultas de encargados y inspecciones en específicos, ademas de que puede generar formulario de sus inspecciones"
        };
        // Strategy
        console.log(templateParams)
        emailjs.send(
            'service_k8aso0l', 
            'template_4cdby7c', 
            templateParams,
            'TRjrmP7S5sC7IoxwD'
            ). then((res: any) => {
                console.log(res.text);
        }).catch((err: any) =>console.log(err));
        return true;
    }
}

class MailDirector implements ProcessMail{
    sendMail(user: User): boolean {
        var templateParams = {
            email: user.email,
            password: user.password,
            rol: user.rol.toString(),
            responsabilidades: "Consultas de encargados y inspecciones en específico, listados areas, elementos y deterioros y gráficos inspecciones"
        };
        // Strategy
        console.log(templateParams)
        emailjs.send(
            'service_k8aso0l', 
            'template_4cdby7c', 
            templateParams,
            'TRjrmP7S5sC7IoxwD'
            ). then((res: any) => {
                console.log(res.text);
        }).catch((err: any) =>console.log(err));
        return true;

    }
}



class MailSolicitudFallida implements ProcessMail{
    sendMail(user: User): boolean {
        var templateParams = {
            email: user.email,
            password: user.password,
            rol: user.rol.toString(),
            responsabilidades: ""
        };
        console.log(templateParams)
        emailjs.send(
            'service_k8aso0l', 
            'template_4cdby7c', 
            templateParams,
            'TRjrmP7S5sC7IoxwD'
            ). then((res: any) => {
                console.log(res.text);
        }).catch((err: any) =>console.log(err));
        return true;
    }
}

export { Rol, User, Resquest, ProcessMail, MailAdministrator, MailDirector, MailOperator, MailSolicitudFallida};
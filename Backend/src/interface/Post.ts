export interface User{
    userMail: string;
    userPassword: string;
    rol: number;

}

export interface Area{
    idArea: string;
    description: string;
    imagen: string;
    ubication :string;
    floorA: number;

}

export interface Element{
    idElement: string;
    description: string;
    imagen: string;
    ubication :string;
    areaID: string;
}

export interface dutyManager{
    DNIManager: number;
    name: string;
    email: string;
    inspection :boolean;
    restauration :boolean;
    conservation :boolean;
}

export interface inspection{
    idInspection: String;
    description: string;
    initialDate: Date;
    endDate :Date;
    deliveryDate: Date;
    pdf: string;
    dutyManager: number;
    state: number;
    result: number;
}


export interface estado{
    id: number;
    description: string;
}


export interface Floortype{
    id: number;
    description: string;
}



export interface inspeccionArea{
    id: number;
    idxinspeccionar: string;
}

export interface inspeccionElemento{
    id: number;
    idxinspeccionar: string;
}


export interface rol{
    id: number;
    description: string;
}

export interface Spolaige{
    id: number;
    description: string;
    type_typespolaige: number;
    
}


export interface typespolaige{
    id: number;
    description: string;
}



export interface typeWork{
    id: number;
    description: string;
}

export interface internalPerson {
    DNIManager: number;
}

export interface legalPerson {
    DNIManager: number;
    DNILegalManager: number;
    nameLegal: string;
}









/* CREATE TABLE USUARIO (
    userMail VARCHAR(150) PRIMARY KEY,
    userPassword VARCHAR(150),
    rol integer,
    FOREIGN KEY (rol) REFERENCES Rol (id)
);
 */
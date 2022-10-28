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
    nameDutyManager: string;
    emailDutyManager: string;
    typeWork :string;
}

export interface inspeccion{
    id: String;
    description: string;
    initialInspection: Date;
    endDateInspection :Date;
    dateRealice: Date;
    dutyManager: number;
    pdf: string;
    idxinspeccionarArea: string;
    idxinspeccionarElemento: string;
    result: string;
    estado: string;
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













/* CREATE TABLE USUARIO (
    userMail VARCHAR(150) PRIMARY KEY,
    userPassword VARCHAR(150),
    rol integer,
    FOREIGN KEY (rol) REFERENCES Rol (id)
);
 */
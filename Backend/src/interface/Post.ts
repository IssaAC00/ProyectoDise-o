export interface USUARIO{
    userMail: string;
    userPassword: string;
    rol: number;

}

export interface AREA{
    id: string;
    description: string;
    imagen: string;
    ubicacion :string;
    floorA: string;

}

export interface Element{
    id: string;
    description: string;
    imagen: string;
    ubicacion :string;
    detail: string;
    area: string;
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


export interface floortype{
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

export interface spolaige{
    id: number;
    description: string;
    type_typespolaige: string;
    area_id: string;
    
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
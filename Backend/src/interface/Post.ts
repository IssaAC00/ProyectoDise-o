export interface User{
    userMail: string;
    userPassword: string;
    request: boolean;
    rol: number;
}

export interface Area{
    idArea: string;
    description: string;
    image: string;
    ubication :string;
    floorA: number;

}

export interface Element{
    idElement: string;
    description: string;
    image: string;
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
    initialDate: Date;
    endDate :Date;
    deliveryDate: Date;
    pdf: string;
    dutyManager: number;
    state: number;
    result: number;
}

export interface state{
    id: number;
    description: string;
}

export interface Floortype{
    id: number;
    description: string;
}

export interface inspeccionArea{
    inspeccion_id: number;
    idArea: string;
}

export interface inspeccionElemento{
    inspeccion_id: number;
    idElement: string;
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

export interface form{
    idInspection: number;
    idSpolaige: number;
    image: string;
    observation: string;
    recomendation: string;
}



// CREATE TABLE Form (
//     idInspection integer,
//     idSpolaige integer,
//     image VARCHAR(500),
//     observation VARCHAR(200),
//     recomendation VARCHAR(200), 
//     FOREIGN KEY (idInspection) REFERENCES Inspection (idInspection),
//     FOREIGN KEY (idSpolaige) REFERENCES Spolaige (id)
// );
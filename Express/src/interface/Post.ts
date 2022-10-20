export interface USUARIO{
    userMail: string;
    userPassword: string;
    rol: number;

}






/* CREATE TABLE USUARIO (
    userMail VARCHAR(150) PRIMARY KEY,
    userPassword VARCHAR(150),
    rol integer,
    FOREIGN KEY (rol) REFERENCES Rol (id)
);
 */
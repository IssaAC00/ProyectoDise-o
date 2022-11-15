import mysql from 'mysql';

var mysqlConexion = mysql.createConnection({
    host: "brt37bqvpt7iezzi5srw-mysql.services.clever-cloud.com",
    user: "uhvkendobxsvqakn",
    password: "BDVuvKqj6S5ruZRU5uBX",
    database: "brt37bqvpt7iezzi5srw"
});

mysqlConexion.connect(error=>{
    if(error){
        console.log('No se pudo realizar la conexion')
        throw error;

    }else{
        console.log('Conexion Exitosa');
    }

})

module.exports = mysqlConexion; //Exportamos la conexion para usarla en otro lado

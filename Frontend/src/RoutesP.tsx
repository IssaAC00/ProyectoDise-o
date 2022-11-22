
import {BrowserRouter,Routes ,Route} from 'react-router-dom';
import './App.css';
import Login from './Pantallas/Login';
import  Areas  from './Pantallas/Areas';
import Contraseña from './Pantallas/Contraseña';
import SuperUsuario from './Pantallas/SuperUsuario';
import Deterioro from './Pantallas/Deterioro';
import Encargado from './Pantallas/Encargado';
import Consultas from './Pantallas/Consultas';
import TareasEncargado from './Pantallas/TareasEncargado';
import PlanInspeccion from './Pantallas/PlanInspeccion';
import Elementos from './Pantallas/Elementos';
import UsuarioOperativo from './Pantallas/UsuarioOperativo';
import Directivo from './Pantallas/DirectorOperativo';
import Registrarse from './Pantallas/Registrarse';
import Directivo2 from './Pantallas/DirectorOperativo2';
export default function RoutesP() {
    

    return (
  
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/Area" element={<Areas />} />
                <Route path="/Contraseña" element={<Contraseña />} />
                <Route path="/SuperUsuario" element={<SuperUsuario />} />
                <Route path="/Deterioro" element={<Deterioro />} />
                <Route path="/Encargado" element={<Encargado />} />
                <Route path="/PlanInspeccion" element={<PlanInspeccion />} />
                <Route path="/TareasEncarago" element={<TareasEncargado /> } />
                <Route path="/Consultas" element={<Consultas />} />
                <Route path="/Elementos" element={<Elementos />} />
                <Route path="/UsuarioOperativo" element={<UsuarioOperativo />} />
                <Route path="/DirectorOperativo" element={<Directivo />} />
                <Route path="/DirectorOperativo2" element={<Directivo2 />} />
                <Route path="/Registrarse" element={<Registrarse />} />
                
              
            </Routes>
            </BrowserRouter>
    )
  }

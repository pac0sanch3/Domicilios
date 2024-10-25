import {Fichas} from "../../index";
import {Route, Routes} from "react-router-dom";
import {ProtegerRutasAdminInstru} from "./AdminRoutes.jsx";

// paginas

import {FichaSolicitudPage} from "../../pages/index.js";

export const SolicitudRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Fichas/>}/>
                <Route element={<ProtegerRutasAdminInstru/>}>
                    <Route path="/registrar" element={<FichaSolicitudPage/>}/>
                </Route>
            </Routes>
        </>
    );
};

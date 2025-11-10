import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import PessoaForm from "./componentes/PessoaFormOOV2";
import ListaPessoas from "./componentes/ListaPessoasV2";
import VisualizaPessoa from "./componentes/VisualizaPessoaV2";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}/>
        <Route index element={<Navigate to="cadastrar" replace />} />
        <Route path="cadastrar"  element={<PessoaForm />} />
        <Route path="listar" element={<ListaPessoas />} />
        <Route path="visualizar/:tipo/:id" element={<VisualizaPessoa />} />
        <Route path="editar/:tipo/:id" element={<PessoaForm />} /> 


      </Routes>
    </BrowserRouter>
  );
}

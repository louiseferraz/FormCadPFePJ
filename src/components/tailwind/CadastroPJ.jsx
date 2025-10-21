import React from 'react';

import LabelTitle from './LabelTitle.jsx';
import Label from './Label.jsx';
import InputText from './InputText.jsx';
import Button from './Button.jsx';

function CadastroPJ() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-80">
        <LabelTitle texto="Cadastro de Pessoa Jurídica" />

        <div className="mb-4 flex flex-col">
          <Label texto="Nome:" />
          <InputText placeholder="ex: Maria" />
        </div>

        <div className="mb-4 flex flex-col">
          <Label texto="Email:" />
          <InputText placeholder="ex: nome@dominio.com" />
        </div>

        <div className="mb-4 flex flex-col">
          <Label texto="CNPJ:" />
          <InputText placeholder="ex: 00.000.000/0001-00" />
        </div>

        <div className="mb-4 flex flex-col">
          <Label texto="Endereço:" />
          <InputText placeholder="ex: St. M-Norte QNM 40 Área Especial 01 - Taguatinga, Brasília " />
        </div>

        <div className="mb-4 flex flex-col">
          <Label texto="Telefone:" />
          <InputText placeholder="ex: (61) 99999-9999" />
        </div>

        <div className="mb-4 flex flex-col">
          <LabelTitle texto="Instituição Estadual" />
        </div>

        <div className="mb-4 flex flex-col">
          <Label texto="Número:" />
          <InputText placeholder="ex: 000000" />
        </div>

        <div className="mb-4 flex flex-col">
          <Label texto="Estado:" />
          <InputText placeholder="ex: DF" />
        </div>

        <div className="mb-4 flex flex-col">
          <Label texto="Data de Registro:" />
          <InputText placeholder="ex: 01/01/2025" />
        </div>

        <Button valor="Enviar" />
      </form>
    </div>
  );
}
export default CadastroPJ;

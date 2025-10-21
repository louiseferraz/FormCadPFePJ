import React from 'react';

import LabelTitle from './LabelTitle.jsx';
import Label from './Label.jsx';
import InputText from './InputText.jsx';
import Button from './Button.jsx';

function CadastroPF() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-80">
        <LabelTitle texto="Cadastro de Pessoa Física" />

        <div className="mb-4 flex flex-col">
          <Label texto="Nome:" />
          <InputText placeholder="ex: Maria" />
        </div>

        <div className="mb-4 flex flex-col">
          <Label texto="Email:" />
          <InputText placeholder="ex: nome@dominio.com" />
        </div>

        <div className="mb-4 flex flex-col">
          <Label texto="CPF:" />
          <InputText placeholder="ex: 000.000.000-00" />
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
          <LabelTitle texto="Titulo de Eleitor" />
        </div>

        <div className="mb-4 flex flex-col">
          <Label texto="Inscrição:" />
          <InputText placeholder="ex: 0000000000000" />
        </div>

        <div className="mb-4 flex flex-col">
          <Label texto="Zona:" />
          <InputText placeholder="ex: (61) 99999-9999" />
        </div>

        <div className="mb-4 flex flex-col">
          <Label texto="Seção:" />
          <InputText placeholder="ex: (61) 99999-9999" />
        </div>

        <Button valor="Enviar" />
      </form>
    </div>
  );
}

export default CadastroPF;

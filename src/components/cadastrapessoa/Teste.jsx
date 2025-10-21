import React, {useState} from 'react';
import { Form, Input, Row, Col, Select } from 'antd';

const { Option } = Select;

const [cep, setCep] = useState('');
const [logradouro, setLogradouro] = useState('');
const [bairro, setBairro] = useState('');
const [cidade, setCidade] = useState('');
const [uf, setUF] = useState('');
const [regiao, setRegiao] = useState('');

export class BuscarCEP {
  #cep;
  #logradouro;
  #bairro;
  #cidade;
  #uf;
  #regiao;
  // Método assíncrono que busca e define os dados do endereço
  async setCep(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    const resposta = await fetch(url);
    //console.log(resposta);

    if (!resposta.ok) {
      throw new Error(`Erro ao buscar CEP: ${resposta.status}`);
    }

    const dados = await resposta.json();

    if (dados.erro) {
      throw new Error('CEP não encontrado na base do ViaCEP.');
    }

    // Populando os atributos  caso nenhum erro seja encontrado
    this.#cep = dados.cep;
    this.#logradouro = dados.logradouro;
    this.#bairro = dados.bairro;
    this.#cidade = dados.localidade;
    this.#uf = dados.uf;
    this.#regiao = dados.regiao;
  }

  // Getters públicos
  getCep() {
    return this.#cep;
  }

  getLogradouro() {
    return this.#logradouro;
  }

  getBairro() {
    return this.#bairro;
  }

  getCidade() {
    return this.#cidade;
  }

  getUf() {
    return this.#uf;
  }
  getRegiao() {
    return this.#regiao;
  }
}

export default function BuscaCEPForm() {
  return (
    <>
      <Form.Item
        label="CEP"
        name={['endereco', 'cep']}
        rules={[{ required: true, message: 'Informe o CEP!' }]}
      >
        <Input
          value={cep}
          onChange={(e) => buscarCEP(e.target.value)}
          //onBlur={(e) => buscarCEP(e.target.value)}
          placeholder="Ex: 01001-000"
          maxLength={9}
        />
      </Form.Item>

      <Form.Item
        label="Logradouro"
        name={['endereco', 'logradouro']}
        rules={[{ required: true, message: 'Informe o logradouro!' }]}
      >
        <Input value={logradouro} placeholder="Rua / Avenida" />
      </Form.Item>

      <Form.Item
        label="Bairro"
        name={['endereco', 'bairro']}
        rules={[{ required: true, message: 'Informe o bairro!' }]}
      >
        <Input value={bairro} placeholder="Bairro" />
      </Form.Item>

      <Row gutter={8}>
        <Col span={13}>
          <Form.Item
            label="Cidade"
            name={['endereco', 'cidade']}
            rules={[{ required: true, message: 'Informe a cidade!' }]}
          >
            <Input value={cidade} placeholder="Cidade" />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            label="UF"
            name={['endereco', 'uf']}
            rules={[{ required: true, message: 'Informe a UF!' }]}
          >
            <Input value={uf} placeholder="UF" maxLength={2} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Região"
            name={['endereco', 'regiao']}
            rules={[{ required: true, message: 'Selecione a região!' }]}
          >
            <Select value={endereco.regiao} placeholder="Selecione">
              <Option value="Norte">Norte</Option>
              <Option value="Nordeste">Nordeste</Option>
              <Option value="Centro-Oeste">Centro-Oeste</Option>
              <Option value="Sudeste">Sudeste</Option>
              <Option value="Sul">Sul</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

import React, { useState } from "react";
import { Form, Input, Row, Col, Select } from "antd";

const { Option } = Select;

export default function BuscaCEPForm({ form }) {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUF] = useState("");
  const [regiao, setRegiao] = useState("");
  const [enderecoRequisitado, setEndereco] = useState({
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    regiao: "",
  });

  const buscarCEP = async (valor) => {
    const cepLimpo = valor.replace(/\D/g, ""); // remove tudo que não for número

    if (cepLimpo.length !== 8) return; // só busca se tiver 8 dígitos
    //const url = new URL('https://viacep.com.br/ws/${cepLimpo}/json/');
    const url = "https://viacep.com.br/ws/" + cepLimpo + "/json/";
    console.log(url);
    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();

      if (dados.erro) {
        alert("CEP não encontrado!");
        setEndereco({
          cep: "",
          logradouro: "",
          bairro: "",
          localidade: "",
          uf: "",
        });
        return;
      }
      console.log(dados);
      setLogradouro(dados.logradouro);
      setBairro(dados.bairro);
      setCidade(dados.localidade);
      setUF(dados.uf);
      setRegiao(dados.regiao);
      setCep(dados.cep);
      setEndereco({
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        uf: dados.uf,
        regiao: dados.regiao,
      });
      form.setFieldsValue({
        endereco: {
          logradouro: enderecoRequisitado.logradouro,
          bairro: enderecoRequisitado.bairro,
          cidade: enderecoRequisitado.cidade,
          uf: enderecoRequisitado.uf,
          regiao: enderecoRequisitado.regiao,
          // cep: enderecoRequisitado.cep
        },
      });
    } catch (erro) {
      alert("Erro ao buscar o CEP.");
      console.error(erro);
    }
  };
  return (
    <>
      <Form.Item
        label="CEP"
        name={["endereco", "cep"]}
        rules={[{ required: true, message: "Informe o CEP!" }]}
      >
        <Input
          onChange={(e) => buscarCEP(e.target.value)}
          placeholder="Ex: 01001-000"
          maxLength={8}
        />
      </Form.Item>
      <Form.Item
        label="Logradouro"
        name={["endereco", "logradouro"]}
        rules={[{ required: true, message: "Informe o logradouro!" }]}
      >
        <Input value={logradouro} placeholder="Rua / Avenida" />
      </Form.Item>
      <Form.Item
        label="Bairro"
        name={["endereco", "bairro"]}
        rules={[{ required: true, message: "Informe o bairro!" }]}
      >
        <Input placeholder="Bairro" />
      </Form.Item>
      <Row gutter={8}>
        <Col span={13}>
          <Form.Item
            label="Cidade"
            name={["endereco", "cidade"]}
            rules={[{ required: true, message: "Informe a cidade!" }]}
          >
            <Input placeholder="Cidade" />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            label="UF"
            name={["endereco", "uf"]}
            rules={[{ required: true, message: "Informe a UF!" }]}
          >
            <Input placeholder="UF" maxLength={2} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Região"
            name={["endereco", "regiao"]}
            rules={[{ required: true, message: "Selecione a região!" }]}
          >
            <Select placeholder="Selecione">
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
import React, { useState } from "react";
import { Form, Input, Radio, Button, message, Space, Card } from "antd";
import EnderecoFormEXV2 from "./EnderecoFormEXV2";
import TelefoneListOOV2 from "./TelefoneListOOV2";
import PFForm from "./PFForm";
import PJForm from "./PJForm";
import PF from "../objetos/modelos/PF.mjs";
import PJ from "../objetos/modelos/PJ.mjs";
import Endereco from "../objetos/modelos/Endereco.mjs";
import Telefone from "../objetos/modelos/Telefone.mjs";
import PFDAO from "../objetos/dao/PFDAOLocalV2.mjs";
import PJDAO from "../objetos/dao/PJDAOLocalV2.mjs";

export default function PessoaFormOOV2() {
  const [form] = Form.useForm();
  const [tipo, setTipo] = useState("PF");

  const onChangeTipo = (e) => setTipo(e.target.value);

  const onFinish = (values) => {
    try {
      const end = new Endereco();
      end.setCep(values.endereco?.cep);
      end.setLogradouro(values.endereco?.logradouro);
      end.setBairro(values.endereco?.bairro);
      end.setCidade(values.endereco?.cidade);
      end.setUf(values.endereco?.uf);
      end.setRegiao(values.endereco?.regiao);

      let pessoa;

      if (values.tipo === "PF") {
        pessoa = new PF();
        pessoa.setCpf(values.cpf);
        pessoa.setTitulo(values.titulo);
      } else {
        pessoa = new PJ();
        pessoa.setCNPJ(values.cnpj);
        pessoa.setIE(values.ie);
      }

      pessoa.setNome(values.nome);
      pessoa.setEmail(values.email);
      pessoa.setEndereco(end);

      if (values.telefones) {
        values.telefones.forEach((t) => {
          const fone = new Telefone();
          fone.setDdd(t.ddd);
          fone.setNumero(t.numero);
          pessoa.addTelefone(fone);
        });
      }

      const dao = values.tipo === "PF" ? new PFDAO() : new PJDAO();
      dao.salvar(pessoa);

      message.success("Pessoa cadastrada com sucesso!");
      form.resetFields();
    } catch (e) {
      message.error("Erro ao salvar: " + e.message);
    }
  };

  return (
    <Card title="Cadastro de Pessoa" style={{ maxWidth: 900, margin: "auto" }}>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item label="Tipo de Pessoa" name="tipo" initialValue="PF">
          <Radio.Group onChange={onChangeTipo}>
            <Radio value="PF">Pessoa Física</Radio>
            <Radio value="PJ">Pessoa Jurídica</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Nome"
          name="nome"
          rules={[{ required: true, message: "Informe o nome!" }]}
        >
          <Input placeholder="Nome completo ou razão social" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Informe o e-mail!" },
            { type: "email", message: "Formato de e-mail inválido!" },
          ]}
        >
          <Input placeholder="exemplo@email.com" />
        </Form.Item>

        <EnderecoFormEXV2 form={form} />
        <TelefoneListOOV2 form={form} />

        <Space direction="vertical" style={{ width: "100%" }}>
          {tipo === "PF" ? <PFForm /> : <PJForm />}
          <Button type="primary" htmlType="submit" block>
            Salvar
          </Button>
        </Space>
      </Form>
    </Card>
  );
}

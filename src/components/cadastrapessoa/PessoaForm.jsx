import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  Row,
  Col,
  message,
} from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import EnderecoForm from './EnderecoForm';
import TelefoneList from './TelefoneList';
import './pessoaform.css';
import PFForm from './PFForm';
import PJForm from './PJForm';
import BuscaCepForm from './BuscaCepForm';

function PessoaForm() {
  const [tipo, setTipo] = useState('PF');
  const [form] = Form.useForm();
  const [mostrarTopo, setMostrarTopo] = useState(false);

  function onFinish(values) {
    console.log('📋 Dados submetidos:', values);
    message.success('Dados armazenados localmente (modo formulário).');
  }

  function onChangeTipo(e) {
    const novoTipo = e.target.value;
    setTipo(novoTipo);

    // Pega os valores atuais do formulário
    const valoresAtuais = form.getFieldsValue();

    // Reseta todos os campos, mas mantém o tipo selecionado
    form.resetFields();
    form.setFieldsValue({
      ...valoresAtuais,
      tipo: novoTipo,
    });
  }

  // Mostra/esconde o botão conforme a rolagem
  useEffect(function () {
    function verificarScroll() {
      if (window.scrollY > 200) {
        setMostrarTopo(true);
      } else {
        setMostrarTopo(false);
      }
    }
    window.addEventListener('scroll', verificarScroll);
    return () => window.removeEventListener('scroll', verificarScroll);
  }, []);

  // Função para rolar suavemente até o topo
  function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="main-scroll">
      <div className="form-container">
        <h2>
          Cadastro de {tipo === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
        </h2>

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Tipo de Pessoa"
            name="tipo"
            initialValue="PF"
            style={{ marginBottom: 10 }}
          >
            <Radio.Group onChange={onChangeTipo}>
              <Radio value="PF">Pessoa Física</Radio>
              <Radio value="PJ">Pessoa Jurídica</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Nome"
            name="nome"
            rules={[{ required: true, message: 'Informe o nome!' }]}
          >
            <Input placeholder="Nome completo ou razão social" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Informe o e-mail!' },
              { type: 'email', message: 'Formato de e-mail inválido!' },
            ]}
          >
            <Input placeholder="exemplo@email.com" />
          </Form.Item>

          <BuscaCepForm />
          <TelefoneList form={form} />

          {tipo === 'PF' ? <PFForm /> : <PJForm />}

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={onFinish} block>
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Botão flutuante de voltar ao topo */}
      <button
        className={`scroll-top-button ${mostrarTopo ? '' : 'hidden'}`}
        onClick={voltarAoTopo}
        title="Voltar ao topo"
      >
        <ArrowUpOutlined />
      </button>
    </div>
  );
}

export default PessoaForm;

import { Form, Input, DatePicker } from "antd";

export default function PJForm() {
  return (
    <>
      <Form.Item
        label="CNPJ"
        name="cnpj"
        rules={[{ required: true, message: "Informe o CNPJ!" }]}
      >
        <Input placeholder="Somente números" maxLength={14} />
      </Form.Item>

      <Form.Item label="Inscrição Estadual" name="ie">
        <Input placeholder="Informe a inscrição estadual" />
      </Form.Item>

      <Form.Item label="Data de Registro" name="dataRegistro">
        <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
      </Form.Item>
    </>
  );
}

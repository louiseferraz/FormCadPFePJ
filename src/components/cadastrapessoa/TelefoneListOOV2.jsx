import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function TelefoneListOOV2() {
  return (
    <Form.List name="telefones">
      {(fields, { add, remove }) => (
        <>
          <Space align="baseline">
            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              Adicionar Telefone
            </Button>
          </Space>

          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              align="baseline"
              style={{ display: "flex", marginTop: 8 }}
            >
              <Form.Item
                {...restField}
                name={[name, "ddd"]}
                label="DDD"
                rules={[{ required: true, message: "Informe o DDD!" }]}
              >
                <Input placeholder="61" style={{ width: 80 }} />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, "numero"]}
                label="Número"
                rules={[{ required: true, message: "Informe o número!" }]}
              >
                <Input placeholder="99999-9999" style={{ width: 150 }} />
              </Form.Item>

              <MinusCircleOutlined
                onClick={() => remove(name)}
                style={{ color: "red" }}
              />
            </Space>
          ))}
        </>
      )}
    </Form.List>
  );
}


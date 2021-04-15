import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Radio, Tag, Image } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "./dynamicForms.css";

const { TextArea } = Input

export const questionLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export const questionTailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

export const alternativeLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 24 },
};

export const alternativeTailLayout = {
  wrapperCol: { offset: 3, span: 24 },
};

export const Field = ({ name, label, required = true, message = "Campo obrigatório", field, fieldKey, children }) => (
  <Form.Item
    {...field}
    name={name}
    label={label ? label : null}
    fieldKey={fieldKey}
    rules={[
      {
        required: { required },
        message: { message },
      },
    ]}
  >
    {children}
  </Form.Item>
)

export const InputField = ({
  name,
  label,
  required = true,
  message = "Campo obrigatório",
  placeholder,
  value,
  onChange = null,
  field,
  fieldKey,
  size = { minRows: 1, maxRows: 3 },
  disabled = false,
}) => (
  <Field name={name} label={label} field={field} fieldKey={fieldKey} required={required} message={message}>
    <TextArea
      name={name}
      className="formInput"
      placeholder={placeholder}
      onChange={onChange}
      autoSize={size}
      defaultValue={value}
      disabled={disabled}
    />
  </Field>
)

export const ImageUpload = ({ name, label, imageChange, field, fieldKey }) => {
  const [preview, setPreview] = useState(false);
  const [file, setFile] = useState();

  useEffect(() => {
    imageChange(file);
  }, [file])

  return (
    <Field name={name} label={label} field={field} fieldKey={fieldKey} required={false}>
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={file => {
          setFile(file);
          setPreview(URL.createObjectURL(file))
          return false;
        }}
      >
        {preview
          ?
          <img src={preview} alt="avatar" style={{ width: '100%' }} />
          :
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        }
      </Upload>
    </Field>
  )
}

const Alternative = ({ name, required = true, message = "Campo obrigatório", value, onChange, field, fieldKey }) => (
  <Field name={name} field={field} fieldKey={fieldKey} required={required} message={message}>
    <div className="alternativeWrapper">
      <Radio.Button
        type="default"
        value={value}
        className="alternative"
      >
        {value}
      </Radio.Button>
      <Input
        name={name}
        placeholder="Alternartiva"
        className="alternative"
        onChange={(e) => onChange(e, value)}
      />
    </div>
  </Field>
)

export const Alternatives = ({ name, label, onChange, required = true, message, field, fieldKey }) => {
  const [alternatives, setAlternatives] = useState({ correct: "A" })
  const [selected, setSelected] = useState("A");

  const handleSelect = e => { setSelected(e.target.value); setAlternatives({ ...alternatives, correct: selected }) };
  const handleAlternativeChange = (e, key) => setAlternatives({ ...alternatives, [key]: e.target.value })

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  useEffect(() => {
    const event = {};
    event.target = {}
    event.target.value = alternatives;

    onChange(event);
  }, [alternatives])

  return (
    <Field name={name} label={label} required={required} message={message} field={field} fieldKey={fieldKey}>
      <Form
        {...alternativeLayout}
        name="questionsForm"
        size={"large"}
        scrollToFirstError
      >
        <Form.List
          name="alternatives"
        >
          {(fields, { add, remove }, { errors }) => (
            <Radio.Group onChange={handleSelect} style={{ "width": "100%" }} value={selected} defaultValue={"A"}>
              {fields.map((field, index) => (
                <Alternative field={field} onChange={handleAlternativeChange} value={letters[index]} />
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => { add() }} icon={<PlusOutlined />}>
                  Adicionar alternativa
              </Button>
              </Form.Item>
            </Radio.Group>
          )}
        </Form.List>
      </Form>
    </Field>
  )
}

export const QuestionText = ({ index, field, onChange, imageChange, remove }) => (
  <div className="questionWrapper">
    <Form.Item {...questionTailLayout}>
      <h5>{`Questão ${index + 1}:`}</h5>
    </Form.Item>
    <InputField
      name={[field.name, 'head']}
      label="Enunciado"
      field={field}
      fieldKey={[field.fieldKey, 'head']}
      placeholder="Enunciado da questão"
      message="Por favor, insira enunciado da questão!"
      onChange={(e) => onChange(e, field.fieldKey, 'header')}
    />
    <ImageUpload
      name={[field.name, 'image']}
      fieldKey={[field.fieldKey, 'image']}
      label="Imagem"
      imageChange={(img) => imageChange(field.fieldKey, img)}
    />
    <Form.Item {...questionTailLayout}>
      <Button
        type="dashed"
        className="formButtonDelete"
        onClick={() => remove()}
        icon={<MinusCircleOutlined />}
      >
        Remover questão
      </Button>
    </Form.Item>
  </div>
)

export const QuestionAlternatives = ({ index, field, onChange, imageChange, remove }) => (
  <div className="questionWrapper">
    <Form.Item {...questionTailLayout}>
      <h5>{`Questão ${index + 1}:`}</h5>
    </Form.Item>
    <InputField
      name={[field.name, 'head']}
      label="Enunciado"
      field={field}
      fieldKey={[field.fieldKey, 'head']}
      placeholder="Enunciado da questão"
      message="Por favor, insira enunciado da questão!"
      onChange={(e) => onChange(e, field.fieldKey, 'header')}
    />
    <Alternatives
      name={`alternative_${index + 1}`}
      label="Alternativas"
      fieldKey={[field.fieldKey, 'alternative']}
      message="Por favor, insira alteranativa!"
      onChange={(e) => onChange(e, field.fieldKey, 'alternatives')}
    />
    <ImageUpload
      name={`image_${index + 1}`}
      fieldKey={[field.fieldKey, 'image']}
      label="Imagem"
      imageChange={(img) => imageChange(field.fieldKey, img)}
    />
    <Form.Item {...questionTailLayout}>
      <Button
        {...questionTailLayout}
        type="dashed"
        className="formButtonDelete"
        onClick={() => remove()}
        icon={<MinusCircleOutlined />}
      >
        Remover questão
      </Button>
    </Form.Item>
  </div>
)

export const AnswerText = ({
  index,
  header = "",
  image = false,
  value,
  size = { minRows: 3, maxRows: 10 },
  onChange,
  layout = questionLayout,
  tailLayout = questionTailLayout,
  disabled = false
}) => (
  <>
    <h3 className="answerTitle">
      {`Questão ${index + 1}:`}
    </h3>
    <div className="questionWrapper">
      <Form.Item {...tailLayout} className="answerHeader" >
        {header}
      </Form.Item>
      {image &&
        <Form.Item {...tailLayout}>
          <div className="answerImage">
            <Image src={image} />
          </div>
        </Form.Item>
      }
      <InputField
        name={index}
        field={layout}
        label="Resposta"
        placeholder="Insira a resposta da questão"
        message="Insira resposta da questão!"
        value={value}
        onChange={(e) => onChange(e)}
        size={size}
        disabled={disabled}
      />
    </div>
  </>
)

export const AnswerAlternatives = ({
  index,
  header = "",
  image = false,
  alternatives,
  value = null,
  onChange,
  layout = questionLayout,
  tailLayout = questionTailLayout,
  disabled = false
}) => {

  console.log(value)

  const [selected, setSelected] = useState(value);
  const entries = Object.entries(alternatives);

  const handleSelect = e => {
    onChange(e);
    setSelected(e.target.value);
  }

  return (
    <>
      <h3 className="answerTitle">
        {`Questão ${index + 1}:`}
      </h3>
      <div className="questionWrapper">
        <Form.Item {...tailLayout} className="answerHeader" >
          {header}
        </Form.Item>
        {image &&
          <Form.Item {...tailLayout}>
            <div className="answerImage">
              <Image src={image} />
            </div>
          </Form.Item>
        }
        <Form.Item {...layout} label={`Alternativas`}>
          <Radio.Group onChange={handleSelect} name={index} style={{ "width": "100%" }} value={selected} disabled={disabled}>
            {entries.map((alternative, idx) => (
              <div className="alternativeAnswerWrapper" key={idx}>
                <Radio.Button
                  type="default"
                  value={alternative[0]}
                  className="alternative"
                >
                  {alternative[0]}
                </Radio.Button>
                <Tag className="alternativeText">
                  {alternative[1]}
                </Tag>
              </div>
            ))}
          </Radio.Group>
        </Form.Item>
      </div>
    </>
  )
}
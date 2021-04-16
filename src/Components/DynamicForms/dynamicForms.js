import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Radio, Tag, Image } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "./dynamicForms.css";

const { TextArea } = Input

const questionLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const questionTailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const alternativeLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 24 },
};

const alternativeTailLayout = {
  wrapperCol: { offset: 3, span: 24 },
};

export const Field = ({
  name,
  field,
  label,
  required = true,
  message = "Campo obrigatório",
  children,
  layout,
}) => (

  <Form.Item
    {...layout}
    {...field}
    name={name}
    label={label ? label : null}
    rules={[
      {
        required: required,
        message: { message },
      },
    ]}
  >
    {children}
  </Form.Item>
)

export const InputField = ({
  name,
  field,
  label,
  required = true,
  message = "Campo obrigatório",
  placeholder,
  value,
  onChange = null,
  layout,
  size = { minRows: 1, maxRows: 3 },
  disabled = false,
}) => (
  <Field
    name={name}
    label={label}
    required={required}
    message={message}
    field={field}
    layout={layout}
  >
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

export const ImageUpload = ({
  name,
  field,
  label,
  required = true,
  imageChange,
  layout
}) => {

  const [preview, setPreview] = useState(false);
  const [file, setFile] = useState();

  useEffect(() => {
    imageChange(file);
  }, [file])

  return (
    <Field
      name={name}
      field={field}
      label={label}
      required={required}
      layout={layout}
    >
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

const Alternative = ({
  name,
  field,
  required = true,
  message = "Campo obrigatório",
  value,
  onChange,
  layout
}) => (

  <Field layout={layout}>
    <div className="alternativeWrapper">
      <Radio.Button
        className="alternative"
        type="default"
        value={value}
      >
        {value}
      </Radio.Button>
      <Field
        name={name}
        field={field}
        requiered={required}
        message={message}
      >
        <Input
          className="alternative"
          name={name}
          placeholder="Alternartiva"
          onChange={(e) => onChange(e, value)}
        />
      </Field>
    </div>
  </Field>

)

export const Alternatives = ({
  name,
  field,
  label,
  onChange,
  required = true,
  message,
  layout,
  tailLayout,
  optionLayout
}) => {

  const [alternatives, setAlternatives] = useState({ correct: "A" })
  const [selected, setSelected] = useState("A");

  const handleSelect = e => {
    setSelected(e.target.value);
    setAlternatives({ ...alternatives, correct: e.target.value })
  };

  const handleAlternativeChange = (e, key) => {
    setAlternatives({ ...alternatives, [key]: e.target.value });
  };

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  useEffect(() => {
    const event = {};
    event.target = {}
    event.target.value = alternatives;

    onChange(event);
  }, [alternatives])

  return (
    <Field
      name={name}
      field={field}
      label={label}
      required={required}
      message={message}
      layout={layout}
    >
      <Form.List name="alternatives">
        {(fields, { add, remove }, { errors }) => (
          <Radio.Group
            onChange={handleSelect}
            style={{ "width": "100%" }}
            value={selected}
            defaultValue={"A"}
          >
            {fields.map((field, index) => (
              <Alternative
                name={letters[index]}
                field={field}
                value={letters[index]}
                onChange={handleAlternativeChange}
                layout={optionLayout}
              />
            ))}
            <Field layout={layout}>
              <Button type="dashed" onClick={() => { add() }} icon={<PlusOutlined />}>
                Adicionar alternativa
              </Button>
            </Field>
          </Radio.Group>
        )}
      </Form.List>
    </Field>
  )
}

export const QuestionText = ({
  name,
  index,
  field,
  layout = questionLayout,
  tailLayout = questionTailLayout,
  onChange = () => { },
  imageChange,
  remove,
}) => (

  <div className="questionWrapper">
    <Field layout={tailLayout}>
      <h5>{`Questão ${index + 1}:`}</h5>
    </Field>
    <InputField
      name={[name, 'head']}
      field={field}
      label="Enunciado"
      placeholder="Enunciado da questão"
      message="Por favor, insira enunciado da questão!"
      layout={layout}
      onChange={(e) => onChange(e, index, 'header')}
    />
    <ImageUpload
      name={[name, 'image']}
      field={field}
      label="Imagem"
      required={false}
      layout={layout}
      imageChange={(img) => imageChange(img, index)}
    />
    <Field layout={tailLayout}>
      <Button
        type="dashed"
        className="formButtonDelete"
        onClick={() => remove()}
        icon={<MinusCircleOutlined />}
      >
        Remover questão
      </Button>
    </Field>
  </div>
)

export const QuestionAlternatives = ({
  name,
  index,
  field,
  layout = questionLayout,
  tailLayout = questionTailLayout,
  optionLayout = alternativeLayout,
  onChange = () => { },
  imageChange,
  remove,
}) => (

  <div className="questionWrapper">
    <Field layout={tailLayout}>
      <h5>{`Questão ${index + 1}:`}</h5>
    </Field>
    <InputField
      name={[name, 'head']}
      field={field}
      label="Enunciado"
      placeholder="Enunciado da questão"
      message="Por favor, insira enunciado da questão!"
      layout={layout}
      onChange={(e) => onChange(e, index, 'header')}
    />
    <Alternatives
      name={[name, 'alternatives']}
      field={field}
      label="Alternativas"
      message="Por favor, insira alteranativa!"
      layout={layout}
      tailLayout={tailLayout}
      optionLayout={optionLayout}
      onChange={(e) => onChange(e, index, 'alternatives')}
    />
    <ImageUpload
      name={[name, 'image']}
      field={field}
      label="Imagem"
      required={false}
      layout={layout}
      imageChange={(img) => imageChange(img, index)}
    />
    <Field layout={tailLayout}>
      <Button
        type="dashed"
        className="formButtonDelete"
        onClick={() => remove()}
        icon={<MinusCircleOutlined />}
      >
        Remover questão
      </Button>
    </Field>
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
      <Field layout={tailLayout} className="answerHeader" >
        {header}
      </Field>
      {image &&
        <Field layout={tailLayout}>
          <div className="answerImage">
            <Image src={image} />
          </div>
        </Field>
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
        <Field layout={tailLayout} className="answerHeader" >
          {header}
        </Field>
        {image &&
          <Field layout={tailLayout}>
            <div className="answerImage">
              <Image src={image} />
            </div>
          </Field>
        }
        <Field layout={layout} label={`Alternativas`}>
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
        </Field>
      </div>
    </>
  )
}
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Radio, Tag, Image } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "./dynamicForms.css";

const { TextArea } = Input

const questionLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const questionTailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

const alternativeLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 24 },
};

export const Field = ({
  name,
  field,
  label,
  required = true,
  message = "Campo obrigatório",
  initialValue,
  children,
  layout,
}) => (

  <Form.Item
    {...layout}
    {...field}
    name={name}
    label={label ? label : null}
    initialValue={initialValue}
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
  initialValue,
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
    initialValue={initialValue}
  >
    <TextArea
      name={name}
      className="formInput"
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      autoSize={size}
      disabled={disabled}
    />
  </Field>
)

export const ImageUpload = ({
  name,
  field,
  label,
  initialValue = undefined,
  required = true,
  onChange = () => {},
  layout
}) => {

  const [preview, setPreview] = useState(initialValue);
  const [file, setFile] = useState();

  useEffect(() => onChange(file), [file]);

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
          <img src={preview} alt="avatar" style={{ maxWidth: '100%', maxHeight: '100%' }} />
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

export const Alternatives = ({
  name,
  field,
  label,
  initialValue = false,
  initialCorrect = false,
  onChange = null,
  correctChange = null,
  required = true,
  message,
  layout,
  tailLayout,
  optionLayout
}) => {

  const [selected, setSelected] = useState(initialCorrect ? initialCorrect : 'A');
  const [alternatives, setAlternatives] = useState(initialValue);
  const [start, setStart] = useState(true);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const handleSelect = e => { setSelected(e.target.value); correctChange(e.target.value) };
  const alternativeChange = (e, index) => setAlternatives({ ...alternatives, [index]: e.target.value });
  
  const startFields = add => {
    Object.keys(initialValue).map(item => add());
    setStart(false);
  }

  useEffect(() => onChange(alternatives), [alternatives]);

  return (
    <Field
      name={name}
      field={field}
      label={label}
      required={required}
      message={message}
      layout={layout}
    >
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <Radio.Group
            value={selected}
            onChange={handleSelect}
            defaultValue={selected}
          > 
            {start && initialValue && fields.length === 0 && startFields(add)}
            {fields.map((field, index) => (
              <div className="alternativeWrapper">
                <Radio.Button
                  className="alternative-button"
                  value={letters[index]}
                >
                  {letters[index]}
                </Radio.Button>
                <Form.Item
                  field={field}
                  fieldKey={[field.fieldKey, letters[index]]}
                  name={field.name}
                  initialValue={initialValue[letters[index]]}
                  style={{width: "60%"}}
                >
                  <Input
                    className="alternative-input"
                    placeholder="Alternativa"
                    onChange={(e) => alternativeChange(e, letters[index])}
                  />
                </Form.Item>
                <MinusCircleOutlined
                  className="alternative-delete"
                  onClick={() => remove(field.name)}
                />
              </div>
            ))}
            <Field layout={layout} >
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
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
  initialValue = false,
  layout = questionLayout,
  tailLayout = questionTailLayout,
  onChange = null,
  remove
}) => {

  const [question, setQuestion] = useState({});

  const questionChange = (section, value) => setQuestion({ ...question, [section]: value })

  useEffect(() => onChange(question),  [question])

  return (
    <div className="questionWrapper">
      <Field layout={tailLayout}>
        <h5>{`Questão ${index + 1}:`}</h5>
      </Field>
      <InputField
        name={[name, 'heading']}
        field={field}
        label="Enunciado"
        placeholder="Enunciado da questão"
        message="Por favor, insira enunciado da questão!"
        layout={layout}
        onChange={(value) => questionChange('heading', value)}
        initialValue={initialValue.heading}
      />
      <ImageUpload
        name={[name, 'image']}
        field={field}
        label="Imagem"
        required={false}
        layout={layout}
        onChange={(value) => questionChange('image', value)}
        initialValue={initialValue.preview}
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
}

export const QuestionAlternatives = ({
  name,
  index,
  field,
  initialValue = false,
  layout = questionLayout,
  tailLayout = questionTailLayout,
  optionLayout = alternativeLayout,
  onChange = () => { },
  remove,
}) => {

  const [question, setQuestion] = useState(initialValue ? initialValue : {correct: 'A'});

  const questionChange = (section, value) => setQuestion({ ...question, [section]: value })

  useEffect(() => onChange(question), [question])

  return (
    <div className="questionWrapper">
      <Field layout={tailLayout}>
        <h5>{`Questão ${index + 1}:`}</h5>
      </Field>
      <InputField
        name={[name, 'heading']}
        field={field}
        label="Enunciado"
        placeholder="Enunciado da questão"
        message="Por favor, insira enunciado da questão!"
        layout={layout}
        onChange={(value) => questionChange('heading', value)}
        initialValue={initialValue.heading}
      />
      <Alternatives
        name={[name, 'alternatives']}
        field={field}
        label="Alternativas"
        message="Por favor, insira alteranativa!"
        layout={layout}
        tailLayout={tailLayout}
        optionLayout={optionLayout}
        onChange={(value) => questionChange('alternatives', value)}
        correctChange={(value) => questionChange('correct', value)}
        initialValue={initialValue.alternatives}
        initialCorrect={initialValue.correct}
      />
      <ImageUpload
        name={[name, 'image']}
        field={field}
        label="Imagem"
        required={false}
        layout={layout}
        onChange={(value) => questionChange('image', value)}
        initialValue={initialValue.preview}
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
}

export const AnswerText = ({
  index,
  heading = "",
  image = false,
  initialValue = false,
  size = { minRows: 3, maxRows: 10 },
  onChange = null,
  layout = questionLayout,
  tailLayout = questionTailLayout,
  disabled = false
}) => (

  <div className="questionWrapper">
    <h5 className="answerTitle">
      {`Questão ${index + 1}:`}
    </h5>
    <Field layout={tailLayout}>
      <span className="answerHeading">{heading}</span>
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
      initialValue={initialValue}
      onChange={value => onChange(index, value)}
      size={size}
      disabled={disabled}
    />
  </div>

)

export const AnswerAlternatives = ({
  index,
  heading = "",
  image = false,
  alternatives,
  initialValue = false,
  onChange = null,
  layout = questionLayout,
  tailLayout = questionTailLayout,
  disabled = false
}) => {

  const [selected, setSelected] = useState(initialValue);
  const entries = Object.entries(alternatives);

  const handleSelect = e => {setSelected(e.target.value); onChange(index, e.target.value);}

  return (

    <div className="questionWrapper">
      <h5 className="answerTitle">
        {`Questão ${index + 1}:`}
      </h5>
      <Field layout={tailLayout}>
        <span className="answerHeading">{heading}</span>
      </Field>
      {image &&
        <Field layout={tailLayout}>
          <div className="answerImage">
            <Image src={image} />
          </div>
        </Field>
      }
      <Field layout={layout} label={`Alternativas`} name={index} initialValue={initialValue}>
        <Radio.Group onChange={handleSelect} style={{ "width": "100%" }} value={selected} disabled={disabled}>
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

  )
}
import React, { useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Input, InputNumber, Button, DatePicker, Upload, Checkbox, message, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { useSession } from "../../Context/SessionContext";
import { useHistory } from "react-router-dom";
import "./NovaProva.css";

const { TextArea } = Input

const examLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 24 },
};

const examTailLayout = {
  wrapperCol: { offset: 2, span: 24 },
};

const questionLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 24 },
};

const questionTailLayout = {
  wrapperCol: { offset: 3, span: 24 },
};

const alternativeLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 24 },
};

const alternativeTailLayout = {
  wrapperCol: { offset: 3, span: 24 },
};

const Field = ({ name, label, required = true, message = "Campo obrigatório", field, fieldKey, children }) => (
  <Form.Item
    {...field}
    name={name}
    label={label ? <label style={{ fontSize: "large" }}> {label} </label> : null}
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

const InputField = ({ name, label, required = true, message = "Campo obrigatório", placeholder, func, field, fieldKey }) => (
  <Field name={name} label={label} field={field} fieldKey={fieldKey} required={required} message={message}>
    <TextArea
      placeholder={placeholder}
      onChange={func}
      rows={1}
      autoSize
    />
  </Field>
)

const InputNumericField = ({ name, label, required = true, message = "Campo obrigatório", placeholder, min, max, func }) => (
  <Field name={name} label={label} required={required} message={message}>
    <InputNumber
      placeholder={placeholder}
      min={min}
      max={max}
      onChange={func}
    />
  </Field>
)

const ImageUpload = ({ name, label, func, field, fieldKey }) => {
  const [preview, setPreview] = useState(false);
  const [file, setFile] = useState();

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

const Alternative = ({ name, required = true, message = "Campo obrigatório", value, func, field, fieldKey }) => (
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
        onChange={func}
        className="alternative"
      />
    </div>
  </Field>
)

const Alternatives = ({ name, label, required = true, message, func, field, fieldKey }) => {
  const [value, setValue] = useState(0);
  const handleChange = e => setValue(e.target.value);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

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
            <Radio.Group onChange={handleChange} style={{ "width": "100%" }} value={value}>
              {fields.map((field, index) => (
                <Alternative field={field} value={letters[index]} />
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

const QuestionText = ({ index, field, func }) => (
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
      func={func}
    />
    <ImageUpload
      name={[field.name, 'image']}
      fieldKey={[field.fieldKey, 'image']}
      label="Imagem"
    />
  </div>
)

const QuestionAlternatives = ({ index, field, func }) => (
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
      func={func}
    />
    <Alternatives 
      name={`alternative_${index + 1}`}
      label="Alternativas"
      fieldKey={[field.fieldKey, 'alternative']}
      message="Por favor, insira alteranativa!"
      func={func} 
    />
    <ImageUpload
      name={`image_${index + 1}`}
      fieldKey={[field.fieldKey, 'image']}
      label="Imagem"
    />
  </div>
)

export default function NovaProva(props) {
  const [exam, setExam] = useState([])
  const [questions, setQuestions] = useState([])
  const [questionType, setQuestionType] = useState([])

  const query = new URLSearchParams(props.location.search);
  const course = query.get("course")

  function examChange(e) {
    console.log(e)
    /* setExam({ ...exam, [e.target.name]: e.target.value }); */
  }

  function examChangeDate(e) {
    console.log(e)
  }

  function questionChange(e) {
    console.log(e)
  }

  const examSubmit = values => {
    console.log(values)
  };

  return (
    <Base>
      <div className="pageRoot">
        <div className="formWrapper">
          <Form
            {...examLayout}
            name="examForm"
            onFinish={examSubmit}
            size={"large"}
            scrollToFirstError
          >
            <Form.Item {...examTailLayout}>
              <h1>Nova Prova</h1>
            </Form.Item>
            <InputField
              name="name"
              label="Título"
              placeholder="Título da prova"
              message="Por favor, insira título da prova!"
              func={examChange}
            />
            <Field name="startDate" label="Início" message="Por favor, insira início da prova!">
              <DatePicker
                placeholder="Início da prova"
                showTime
                format="DD-MM-YYYY HH:mm"
                name="startDate"
                onChange={examChangeDate}
              />
            </Field>
            <Field name="endDate" label="Término" message="Por favor, insira término da prova!">
              <DatePicker
                placeholder="Término da prova"
                showTime
                format="DD-MM-YYYY HH:mm"
                name="startDate"
                onChange={examChangeDate}
              />
            </Field>
            <InputNumericField
              name="value"
              label="Valor"
              placeholder="Valor"
              min={1}
              max={100}
              message="Por favor, insira valor da prova!"
              func={examChange}
            />
            <Field label="Questões">
              <div className="questionsWrapper">
                <Form
                  {...questionLayout}
                  name="questionsForm"
                  size={"large"}
                  scrollToFirstError
                >
                  <Form.List
                    name="questions"
                  >
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field, index) => {
                          if (questionType[index] === "text")
                            return <QuestionText index={index} field={field} func={questionChange} />

                          if (questionType[index] === "alternatives")
                            return <QuestionAlternatives index={index} field={field} func={questionChange} />
                        })}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => { add(); setQuestionType([...questionType, "text"]) }}
                            icon={<PlusOutlined />}
                            style={{ "margin-right": "2%" }}
                          >
                            Adicionar questão aberta
                          </Button>
                          <Button
                            type="dashed"
                            onClick={() => { add(); setQuestionType([...questionType, "alternatives"]) }}
                            icon={<PlusOutlined />}
                          >
                            Adicionar questão fechada
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form>
              </div>
            </Field>
            <Form.Item {...examTailLayout}>
              <Button type="primary" htmlType="submit">
                Criar
            </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Base>
  );
}

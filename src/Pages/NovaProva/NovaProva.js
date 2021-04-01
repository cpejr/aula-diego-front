import React, { useEffect, useState } from "react";
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
  wrapperCol: { span: 20 },
};

const examTailLayout = {
  wrapperCol: { offset: 2, span: 20 },
};

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

const Field = ({ name, label, required = true, message = "Campo obrigatório", field, fieldKey, children }) => (
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

const InputField = ({ name, label, required = true, message = "Campo obrigatório", placeholder, onChange = null, field, fieldKey }) => (
  <Field name={name} label={label} field={field} fieldKey={fieldKey} required={required} message={message}>
    <TextArea
      className="formInput"
      placeholder={placeholder}
      onChange={onChange}
      autoSize={{ minRows: 1, maxRows: 3 }}
    />
  </Field>
)

const ImageUpload = ({ name, label, imageChange, field, fieldKey }) => {
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

const Alternatives = ({ name, label, onChange, required = true, message, field, fieldKey }) => {
  const [alternatives, setAlternatives] = useState({correct: "A"})
  const [selected, setSelected] = useState("A");

  const handleSelect = e => {setSelected(e.target.value); setAlternatives({...alternatives, correct: selected})};
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

const QuestionText = ({ index, field, onChange, imageChange, remove }) => (
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

const QuestionAlternatives = ({ index, field, onChange, imageChange, remove }) => (
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

export default function NovaProva(props) {
  const [exam, setExam] = useState([])
  const [questions, setQuestions] = useState({})
  const [questionType, setQuestionType] = useState([])
  const [images, setImages] = useState([]);

  const query = new URLSearchParams(props.location.search);
  const course = query.get("course")

  const { session } = useSession();

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  const configFiles = {
    headers: {
      authorization: "BEARER " + session.accessToken,
      "Content-Type": "multipart/form-data",
      processData: false,
      contentType: false,
    },
  };

  function questionChange(e, key, section) {
    const question = questions[key];

    setQuestions({
      ...questions,
      [key]: {
        ...question,
        [section]: e.target.value
      }
    })
  }

  function imageChange(key, image) {
    setImages({ ...images, [key]: image });
  }

  function questionAdd(add, type) {
    add();
    setQuestionType([...questionType, type]);
  }

  function questionDelete(remove, fieldName, index, key) {
    delete questions[key];
    delete images[key];
    questionType.splice(index, 1);

    remove(fieldName);
    setQuestions(questions);
    setImages(images);
    setQuestionType(questionType);
  }

  const examSubmit = async values => {
    const exam = {
      ...values,
      start_date: values['start_date'].format('YYYY-MM-DD HH:mm:ss'),
      end_date: values['end_date'].format('YYYY-MM-DD HH:mm:ss'),
      course_id: course,
      body: questions
    }

    const keys = Object.keys(images);

    for await (const key of keys) {

      const file = {
        user_id: session.user.id,
        file_name: `${exam.name} ${key}`,
        file_type: images[key].type
      }

      await api
        .post("file", file, config)
        .then(fileId => {
          const formData = new FormData();
          formData.append(fileId.data.file_id, images[key]);

          api
            .post("file_upload", formData, configFiles)
            .catch(err => {
              message.error("Não foi possível criar a prova!");
            })

          exam.body[key].image = fileId.data.file_id;

          console.log(exam)
        })
        .catch(err => {
          message.error("Não foi possível criar a prova!");
        })
    }

    api
      .post("exam", exam, config)
      .then(message.success("Prova criada com sucesso!"))
      .catch(err => {
        message.error("Não foi possível criar a prova!");
      })
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
            />
            <Field name="start_date" label="Início" message="Por favor, insira início da prova!">
              <DatePicker
                name="start_date"
                placeholder="Início da prova"
                showTime
                format="DD-MM-YYYY HH:mm"
              />
            </Field>
            <Field name="end_date" label="Término" message="Por favor, insira término da prova!">
              <DatePicker
                name="end_date"
                placeholder="Término da prova"
                showTime
                format="DD-MM-YYYY HH:mm"               
              />
            </Field>
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
                            return <QuestionText
                              index={index}
                              field={field}
                              onChange={questionChange}
                              imageChange={imageChange}
                              remove={() => questionDelete(remove, field.name, index, field.key)}
                            />

                          if (questionType[index] === "alternatives")
                            return <QuestionAlternatives
                              index={index}
                              field={field}
                              onChange={questionChange}
                              imageChange={imageChange}
                              remove={() => questionDelete(remove, field.name, index, field.key)}
                            />
                        })}
                        <Form.Item {...questionLayout}>
                          <div className="addButtonsWrapper">
                            <Button
                              className="formButton"
                              type="dashed"
                              onClick={() => questionAdd(add, "text")}
                              icon={<PlusOutlined />}
                              style={{ "margin-right": "2%" }}
                            >
                              Adicionar questão aberta
                            </Button>
                            <Button
                              className="formButton"
                              type="dashed"
                              onClick={() => questionAdd(add, "alternatives")}
                              icon={<PlusOutlined />}
                            >
                              Adicionar questão fechada
                            </Button>
                          </div>
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
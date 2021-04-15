import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Input, Button, DatePicker, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSession } from "../../Context/SessionContext";
import { Field, InputField, QuestionText, QuestionAlternatives, questionLayout } from "../../Components/DynamicForms/dynamicForms"
import { useHistory } from "react-router-dom";
import pt_BR from 'antd/es/date-picker/locale/pt_BR';
import "./NovaProva.css";

const examLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 24 },
};

const examTailLayout = {
  wrapperCol: { offset: 4, span: 24 },
};

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
    console.log(values)

    const exam = {
      ...values,
      start_date: values['start_date'].format('YYYY-MM-DD HH:mm:ss'),
      end_date: values['end_date'].format('YYYY-MM-DD HH:mm:ss'),
      course_id: course,
      questions: questions
    }

    const keys = Object.keys(images);

    for await (const key of keys) {
      if (images[key] !== undefined) {
        const file = {
          user_id: session.user.id,
          file_name: `${exam.name} ${key}`,
          file_type: images[key].type,
          file_original: images[key].name
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
  
            exam.questions[key].image = fileId.data.file_id;
  
            console.log(exam)
          })
          .catch(err => {
            message.error("Não foi possível criar a prova!");
          })
      }
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
      <div className="newExamRoot">
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
                locale={pt_BR}
                showTime
                format="DD-MM-YYYY HH:mm"
              />
            </Field>
            <Field name="end_date" label="Término" message="Por favor, insira término da prova!">
              <DatePicker
                name="end_date"
                placeholder="Término da prova"
                locale={pt_BR}
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

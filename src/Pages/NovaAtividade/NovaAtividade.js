import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Switch, Button, DatePicker, message, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSession } from "../../Context/SessionContext";
import { Field, InputField, QuestionText, QuestionAlternatives, questionLayout } from "../../Components/DynamicForms/dynamicForms"
import { useHistory } from "react-router-dom";
import pt_BR from 'antd/es/date-picker/locale/pt_BR';
import "./NovaAtividade.css";

const exerciseLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 24 },
};

const exerciseTailLayout = {
  wrapperCol: { offset: 4, span: 24 },
};

export default function NovaProva(props) {
  const [exercise, setExercise] = useState([])
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

  function imageChange(image, key) {
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

  const exerciseSubmit = async values => {
    console.log(values)

    /* const exercise = {
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
          file_name: `${exercise.name} ${key}`,
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
                message.error("Não foi possível criar a atividade!");
              })

            exercise.questions[key].image = fileId.data.file_id;

            console.log(exercise)
          })
          .catch(err => {
            message.error("Não foi possível criar a atividade!");
          })
      }
    }

    api
      .post("exercise", exercise, config)
      .then(message.success("Atividade criada com sucesso!"))
      .catch(err => {
        message.error("Não foi possível criar a atividade!");
      }) */
  };

  return (
    <Base>
      <div className="newExamRoot">
        <div className="formWrapper">
          <Form
            {...exerciseLayout}
            name="exerciseForm"
            onFinish={exerciseSubmit}
            size={"large"}
            scrollToFirstError
          >
            <Form.Item {...exerciseTailLayout}>
              <h1>Nova Atividade</h1>
            </Form.Item>
            <Form.Item>
              <Input name="test" />
            </Form.Item>
            <InputField
              name="name"
              label="Título"
              placeholder="Título da atividade"
              message="Por favor, insira título da atividade!"
            />
            {/* <Field name="start_date" label="Início" message="Por favor, insira início da atividade!">
              <DatePicker
                name="start_date"
                placeholder="Início da atividade"
                locale={pt_BR}
                showTime
                format="DD-MM-YYYY HH:mm"
              />
            </Field>
            <Field name="end_date" label="Término" message="Por favor, insira término da atividade!">
              <DatePicker
                name="end_date"
                placeholder="Término da atividade"
                locale={pt_BR}
                showTime
                format="DD-MM-YYYY HH:mm"
              />
            </Field> */}
            <Field name="evaluate" label="Avaliativa" required={false} initialValues={false}>
              <Switch />
            </Field>
            <Field label="Questões" >
              <div className="questionsWrapper">
                <Form.List name="questions">
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => {
                        if (questionType[index] === "text")
                          return <QuestionText
                            name={index}
                            index={index}
                            field={field}
                            imageChange={imageChange}
                            remove={() => questionDelete(remove, field.name, index, field.key)}
                          />

                        if (questionType[index] === "alternatives")
                          return <QuestionAlternatives
                            name={index}
                            index={index}
                            field={field}
                            imageChange={imageChange}
                            remove={() => questionDelete(remove, field.name, index, field.key)}
                          />
                      })}
                      <Form.Item>
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
              </div>
            </Field>
            <Form.Item {...exerciseTailLayout}>
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

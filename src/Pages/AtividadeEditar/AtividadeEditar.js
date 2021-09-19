/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Switch, Button, DatePicker, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSession } from "../../Context/SessionContext";
import { Field, InputField, QuestionText, QuestionAlternatives } from "../../Components/DynamicForms/dynamicForms"
import { useHistory } from "react-router-dom";
import moment from "moment"
import pt_BR from 'antd/es/date-picker/locale/pt_BR';
import "./AtividadeEditar.css";

const exerciseLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 24 },
};

const exerciseTailLayout = {
  wrapperCol: { offset: 4, span: 24 },
};

export default function AtividadeEditar(props) {
  const [exercise, setExercise] = useState(false)
  const [questions, setQuestions] = useState(false)
  const [evaluate, setEvaluate] = useState(false);
  const [reset, setReset] = useState(false);
  const [start, setStart] = useState(true);

  const { session } = useSession();
  const history = useHistory();

  const exercise_id = props.match.params.id;

  const config = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
  };

  const configFileGet = {
    headers: {
      authorization: "BEARER " + session.accessToken,
    },
    responseType: "blob",
  };

  const configFilePost = {
    headers: {
      authorization: "BEARER " + session.accessToken,
      "Content-Type": "multipart/form-data",
      processData: false,
      contentType: false,
    },
  };

  useEffect(() => {
    api
      .get(`/exercise/${exercise_id}`, config)
      .then(async response => {
        Promise.all(
          Object.values(response.data.questions).map(question => question.image).map(async (image, index) => {
            if (image !== undefined)
              await api
                .get(`/file_get/${image}`, configFileGet)
                .then(file => {
                  response.data.questions[index].preview = URL.createObjectURL(file.data);
                  Promise.resolve("");
                });
          })
        )
          .then(() => {
            const types = [];

            Object.values(response.data.questions).map(question => {
              types.push((question.alternatives === undefined ? 'text' : 'alternatives'))
            });

            setQuestions(types);
            setEvaluate(response.data.evaluate);
            setExercise(response.data);
          });
      })
      .catch(err => { message.error("Não foi possível carregar dados da prova!") });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startFields(add) {
    questions.map(item => add());
    setStart(false);
  }

  function questionAdd(add, type) {
    add();
    setQuestions([...questions, type])
  };

  function questionDelete(remove, fieldName, index) {
    delete exercise.questions[index];
    questions.splice(index, 1);

    remove(fieldName);
    setExercise(exercise);
    setQuestions(questions);
  }

  const exerciseChange = (name, value) => setExercise({ ...exercise, [name]: value });
  const questionChange = (name, value) => setExercise({ ...exercise, questions: { ...exercise.questions, [name]: value } })

  const evaluateChange = (value) => {
    setEvaluate(value);
    setExercise({ ...exercise, evaluate: value, questions: {} })
    setQuestions([]);
  }

  const exerciseSubmit = async () => {

    console.log(exercise)

    Promise.all(
      Object.values(exercise.questions).map(question => question.image).map(async (image, index) => { 

        if (image !== undefined && typeof image !== 'string') {

          const file = {
            user_id: session.user.id,
            file_name: `${exercise.name} ${index}`,
            file_type: image.type,
            file_original: image.name
          }

          await api
            .post("file", file, config)
            .then(async response => {

              const formData = new FormData();
              formData.append(response.data.file_id, image);

              await api
                .post("file_upload", formData, configFilePost)
                .catch(err => { message.error("Não foi possível eidtar a atividade!") })

              exercise.questions[index].image = response.data.file_id;
              Promise.resolve("");
            })
            .catch(err => { message.error("Não foi possível eidtar a atividade!") })
        }
      }))
      .then(() => {
        api
          .put(`exercise/${exercise.id}`, exercise, config)
          .then(() => {
            message.success("Atividade criada com sucesso!");
            history.push(`/curso/gerenciar/${exercise.course_id}`);
          })
          .catch(err => {
            message.error("Não foi possível eidtar a atividade!");
          })
      });
  };

  return (
    <Base>
      <div className="newExamRoot">
        <div className="formWrapper">
          {exercise &&
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
              <InputField
                name="name"
                label="Título"
                placeholder="Título da atividade"
                message="Por favor, insira título da atividade!"
                onChange={value => exerciseChange('name', value)}
                initialValue={exercise.name}
              />
              <Field name="start_date" label="Início" message="Por favor, insira início da atividade!" initialValue={moment(exercise.start_date)}>
                <DatePicker
                  name="start_date"
                  placeholder="Início da atividade"
                  locale={pt_BR}
                  showTime
                  format="DD-MM-YYYY HH:mm"
                  onChange={e => exerciseChange('start_date', e._d)}
                />
              </Field>
              <Field name="end_date" label="Término" message="Por favor, insira término da atividade!" initialValue={moment(exercise.end_date)}>
                <DatePicker
                  name="end_date"
                  placeholder="Término da atividade"
                  locale={pt_BR}
                  showTime
                  format="DD-MM-YYYY HH:mm"
                  onChange={e => exerciseChange('end_date', e._d)}
                />
              </Field>
              <Field name="evaluate" label="Avaliativa" required={false}>
                <Switch checked={evaluate} onChange={value => evaluateChange(value)} disabled />
              </Field>
              <Field label="Questões" >
                <div className="questionsWrapper">
                  <Form.List name="questions">
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {start && fields.length === 0 && questions.length > 0 && startFields(add)}

                        {fields.map((field, index) => {
                          if (reset) {
                            fields = [];
                            setReset(false);
                            return;
                          }

                          if (questions[index] === "text")
                            return <QuestionText
                              name={index}
                              index={index}
                              field={field}
                              onChange={value => questionChange(index, value)}
                              remove={() => questionDelete(remove, field.name, index)}
                              initialValue={exercise.questions[index]}
                            />

                          if (questions[index] === "alternatives")
                            return <QuestionAlternatives
                              name={index}
                              index={index}
                              field={field}
                              onChange={value => questionChange(index, value)}
                              remove={() => questionDelete(remove, field.name, index)}
                              initialValue={exercise.questions[index]}
                            />
                        })}
                        <Form.Item>
                          <div className="addButtonsWrapper">
                            {!evaluate &&
                              <Button
                                className="formButton"
                                type="dashed"
                                onClick={() => questionAdd(add, "text")}
                                icon={<PlusOutlined />}
                                style={{ "margin-right": "2%" }}
                              >
                                Adicionar questão aberta
                          </Button>
                            }
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
          }
        </div>
      </div>
    </Base>
  );
}

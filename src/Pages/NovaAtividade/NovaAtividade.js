/* eslint-disable array-callback-return */
import React, { useState } from "react";
import Base from "../../Components/Base/Base";
import api from "../../services/api";
import { Form, Switch, Button, DatePicker, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSession } from "../../Context/SessionContext";
import {
  Field,
  InputField,
  QuestionText,
  QuestionAlternatives,
} from "../../Components/DynamicForms/dynamicForms";
import { useHistory } from "react-router-dom";
import pt_BR from "antd/es/date-picker/locale/pt_BR";
import "./NovaAtividade.css";
import handleError from "../../utils/handleError";

const exerciseLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 24 },
};

const exerciseTailLayout = {
  wrapperCol: { offset: 4, span: 24 },
};

export default function NovaProva(props) {
  const query = new URLSearchParams(props.location.search);
  const course = query.get("course");

  const [exercise, setExercise] = useState({
    evaluate: false,
    course_id: course,
  });
  const [questions, setQuestions] = useState([]);
  const [evaluate, setEvaluate] = useState(false);
  const [reset, setReset] = useState(false);

  const { session } = useSession();
  const history = useHistory();

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

  function questionAdd(add, type) {
    add();
    setQuestions([...questions, type]);
  }

  function questionDelete(remove, fieldName, index) {
    delete exercise.questions[index];
    questions.splice(index, 1);

    remove(fieldName);
    setExercise(exercise);
    setQuestions(questions);
  }

  const exerciseChange = (name, value) =>
    setExercise({ ...exercise, [name]: value });
  const questionChange = (name, value) =>
    setExercise({
      ...exercise,
      questions: { ...exercise.questions, [name]: value },
    });

  const evaluateChange = (value) => {
    setEvaluate(value);
    setExercise({ ...exercise, evaluate: value, questions: {} });
    setQuestions([]);
  };

  const exerciseSubmit = async () => {
    Promise.all(
      Object.values(exercise.questions)
        .map((question) => question.image)
        .map(async (image, index) => {
          if (image !== undefined) {
            const file = {
              user_id: session.user.id,
              file_name: `${exercise.name} ${index}`,
              file_type: image.type,
              file_original: image.name,
            };

            const formData = new FormData();
            formData.append(file.user_id, image);

            await api
              .post("file_upload", formData, configFiles)
              .then(({ data: { file_ids } }) => {
                const file_id = file_ids[0];
                exercise.questions[index].image = file_id;
              })
              .catch((err) => {
                handleError(err, "Não foi possível criar a atividade!");
              });
          }
        })
    ).then(() => {
      api
        .post("exercise", exercise, config)
        .then(() => {
          message.success("Atividade criada com sucesso!");
          history.push(`/curso/gerenciar/${course}`);
        })
        .catch((err) => {
          handleError(err, "Não foi possível criar a atividade!");
        });
    });
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
            <InputField
              name="name"
              label="Título"
              placeholder="Título da atividade"
              message="Por favor, insira título da atividade!"
              onChange={(value) => exerciseChange("name", value)}
            />
            <Field
              name="start_date"
              label="Início"
              message="Por favor, insira início da atividade!"
            >
              <DatePicker
                name="start_date"
                placeholder="Início da atividade"
                locale={pt_BR}
                showTime
                format="DD-MM-YYYY HH:mm"
                onChange={(e) => exerciseChange("start_date", e._d)}
              />
            </Field>
            <Field
              name="end_date"
              label="Término"
              message="Por favor, insira término da atividade!"
            >
              <DatePicker
                name="end_date"
                placeholder="Término da atividade"
                locale={pt_BR}
                showTime
                format="DD-MM-YYYY HH:mm"
                onChange={(e) => exerciseChange("end_date", e._d)}
              />
            </Field>
            <Field name="evaluate" label="Avaliativa" required={false}>
              <Switch onChange={(value) => evaluateChange(value)} />
            </Field>
            <Field label="Questões">
              <div className="questionsWrapper">
                <Form.List name="questions">
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => {
                        if (reset) {
                          fields = [];
                          setReset(false);
                          return;
                        }

                        if (questions[index] === "text")
                          return (
                            <QuestionText
                              name={index}
                              index={index}
                              field={field}
                              onChange={(value) => questionChange(index, value)}
                              remove={() =>
                                questionDelete(remove, field.name, index)
                              }
                            />
                          );

                        if (questions[index] === "alternatives")
                          return (
                            <QuestionAlternatives
                              name={index}
                              index={index}
                              field={field}
                              onChange={(value) => questionChange(index, value)}
                              remove={() =>
                                questionDelete(remove, field.name, index)
                              }
                            />
                          );
                      })}
                      <Form.Item>
                        <div className="addButtonsWrapper">
                          {!evaluate && (
                            <Button
                              className="formButton"
                              type="dashed"
                              onClick={() => questionAdd(add, "text")}
                              icon={<PlusOutlined />}
                              style={{ "margin-right": "2%" }}
                            >
                              Adicionar questão aberta
                            </Button>
                          )}
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

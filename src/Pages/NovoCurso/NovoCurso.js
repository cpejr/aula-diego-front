import React from "react";
import "./NovoCurso.css";
import Base from "../../Components/Base/Base";
import { Input, Form } from 'antd';

export default function NovoCurso() {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
      };
      const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };
    return (
        <Base>
        <div className="formContainer">
            <h1 className='TitleNovoCurso' >Criar novo Curso</h1>
            <Form {...layout}>
                <Form.Item name="nome" label="Nome">
                    <Input size="large" />
                </Form.Item>
                <Form.Item name="note" size="large" label="Note" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="note" size="large" label="Note" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
        </div>
        </Base>
    );
}
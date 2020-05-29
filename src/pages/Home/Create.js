import React, { useState } from 'react';
import { Form, Input, Button, DatePicker } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
const { TextArea } = Input;

const Create = ({ history }) => {

    const [state, setState] = useState({
        number: null,
        date_created: null,
        date_supply: null,
        comment: null
    });

    const handleSubmit = () => {

        const invoice = {
            id: uuidv4(),
            ...state
        };

        axios.post(`http://localhost:3004/invoices`,{...invoice})
            .then(res => {
                if(res.status === 201){
                    history.push('/');
                }
            })
    };

    return (
        <div>
            <Form
                layout={'vertical'}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                onFinishFailed={() => {}}
                style={{
                    maxWidth: 500
                }}
            >
                <Form.Item
                    label="Number"
                    name="number"
                    rules={[{ required: true, message: 'Enter a invoice number!' }]}
                >
                    <Input
                        addonAfter={<SettingOutlined />}
                        placeholder={'Invoice number'}
                        value={state.number}
                        onChange={e => setState(s => ({...s, number: Number(e.target.value)}))}
                    />
                </Form.Item>
                <Form.Item
                    label="Invoice date"
                    name="date_created"
                    rules={[{ required: true, message: 'Enter a invoice date' }]}
                >
                    <DatePicker
                        style={{ width: '100%'}}
                        value={state.date_created}
                        onChange={(_,value) => setState(s => ({...s, date_created: value}))}
                    />
                </Form.Item>
                <Form.Item
                    label="Supply date"
                    name="date_supply"
                    rules={[{ required: true, message: 'Enter a supply date' }]}
                >
                    <DatePicker
                        style={{ width: '100%'}}
                        value={state.date_supply}
                        onChange={(_,value) => setState(s => ({...s, date_supply: value}))}
                    />
                </Form.Item>
                <Form.Item
                    label="Comment"
                    name="comment"
                    rules={[{ required: true, message: 'Enter a message' }]}
                >
                    <TextArea
                        value={state.comment}
                        onChange={e => setState(s => ({...s, comment: e.target.value}))}
                        name={'comment'}
                        placeholder="Your message"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Send
                </Button>
            </Form>
        </div>
    )
};

export default Create
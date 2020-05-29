import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Spin } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import moment from 'moment';
const { TextArea } = Input;

const Create = ({ history, match }) => {

    const { id } = match.params;

    const [isFetched, setFetched] = useState(false);
    const [state, setState] = useState({
        number: null,
        date_created: null,
        date_supply: null,
        comment: null
    });

    useEffect(() => {
        axios.get(`http://localhost:3004/invoices/${id}`)
            .then(res => {
                if(res.status === 200){
                    const { data } = res;
                    setState(state => ({
                        ...state,
                        number: data.number,
                        date_created: data.date_created,
                        date_supply: data.date_supply,
                        comment: data.comment
                    }));
                    setFetched(true);
                }
            })
    },[ id ]);


    const handleSubmit = () => {

        const invoice = {
            id: uuidv4(),
            ...state
        };

        axios.put(`http://localhost:3004/invoices/${id}`,{...invoice})
            .then(res => {
                if(res.status === 200){
                    history.push('/');
                }
            })
    };


    if(!isFetched){
        return <Spin />
    }

    return (
        <div>
            <Form
                layout={'vertical'}
                name="invoice"
                initialValues={{
                    "number": state.number,
                    "date_created": moment(state.date_created, 'YYYY-MM-DD'),
                    "date_supply": moment(state.date_supply, 'YYYY-MM-DD'),
                    "comment": state.comment,
                }}
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
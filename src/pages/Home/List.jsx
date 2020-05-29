import React, { useEffect, useState } from 'react';
import { Table, Space, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import axios from 'axios';
import { Button } from 'antd'

const Home = ({ history }) => {

    const [list, setList] = useState([]);
    const [isFetched, setFetched] = useState(true);

    useEffect(() => {
        setFetched(false);
        axios.get('http://localhost:3004/invoices?_sort=date_created&_order=desc')
            .then(res => {
                if(res.status === 200){
                    setFetched(true);
                    setList(res.data);
                }
            })

    },[]);

    const handleDelete = id => {
        setFetched(false);
        axios.delete(`http://localhost:3004/invoices/${id}`)
            .then(res => {
                if(res.status === 200){
                    setFetched(true);
                    setList(list => list.filter(item => item.id !== id))
                }
            })
    };

    const columns = [
        {
            title: 'Invoice',
            dataIndex: 'date_created',
            key: 'date_created',
        },
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Supply',
            dataIndex: 'date_supply',
            key: 'date_supply',
        },
        {
            title: 'Message',
            dataIndex: 'comment',
            key: 'comment',
            render: text => text.length > 80 ? <div>{text.slice(0,80)}...</div> : text
        },
        {
            title: 'Action',
            key: 'number',
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <Button
                            type={'primary'}
                            icon={<EditOutlined />}
                            onClick={() => history.push(`/update/${record.id}`)}
                        />
                        <Button
                            type={'primary'}
                            danger icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.id)}
                        />
                    </Space>
                )
            },
        },
    ];

    return (
        <div>
            <Button
                onClick={() => history.push('/create')}
                type={'primary'}
                style={{
                    marginBottom: '20px'
                }}
            >Add invoice</Button>
            {
                list.length && <Spin spinning={!isFetched}><Table columns={columns} dataSource={list} pagination={false} /></Spin>
            }
        </div>
    )
};

export default Home
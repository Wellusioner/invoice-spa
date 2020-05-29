import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './pages/Home/List';
import Create from './pages/Home/Create';
import Edit from './pages/Home/Edit';
import {Layout} from "antd";
const { Header, Content, Footer } = Layout;


export default () => {
    return (
        <BrowserRouter>
            <Layout className="layout">
                <Header>
                    <div style={{ color: '#fff'}}>INVOICES APP</div>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">
                        <Switch>
                            <Route path={'/'} exact={true} component={Home}/>
                            <Route path={'/create'} exact={true} component={Create}/>
                            <Route path={'/update/:id'} exact={true} component={Edit}/>
                        </Switch>
                    </div>
                </Content>
            </Layout>
        </BrowserRouter>
    )
};
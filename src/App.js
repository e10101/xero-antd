import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import './App.css';
import FindPeople from './components/FindPeople';

const { Content, Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout className="layout">
        <div>
          <div id="logo">
            <img src="//www.xero.com/etc/designs/xero-cms/clientlib/assets/img/logo/logo-xero-blue.svg" alt="Xero" />
          </div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Find People</Menu.Item>
          </Menu>
        </div>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Find People</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ minHeight: 480 }}>
            <FindPeople />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Created by <a href="https://github.com/e10101" >Yishi Guo</a>, UI framework: <a href="https://ant.design/">Ant Design</a>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;

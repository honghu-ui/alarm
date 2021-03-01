import React from "react";

import {Layout, Menu, Breadcrumb} from 'antd';

const {SubMenu} = Menu;
const {Content, Sider} = Layout;

import './App.scss';

import PandaIcon from '$components/menu-icon/panda-icon';
import BreadCrumbs from '$hooks/breadcrumb/breadcrumb';

import appContext from '$contexts/app-context';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.onCollapse = this.onCollapse.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);

        this.state = {
            collapsed: false,
            config: {
                themes: ['white', 'dark', 'yellow'],
                theme: 'white',
                toggleTheme: this.toggleTheme,
                btn: {
                    switch: '切换主题'
                },
            }
        };
    }

    onCollapse(collapsed){
        this.setState({collapsed});
    }

    toggleTheme(t){
        const config = Object.assign({}, this.state.config);
        config.theme = t;
        this.setState({
            config: config
        })
    }

    render() {
        const { collapsed } = this.state;

        return (
            <appContext.Provider value={this.state.config}>
                <Layout className="apusic-app-view">
                    <Layout style={{ minHeight: '100vh' }}>
                        <Sider width={200} collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                            <div className="apusic-app-view-logo">
                                智能告警服务
                            </div>
                            <Menu mode="inline" theme="dark" defaultSelectedKeys={['overview']}>
                                <Menu.Item key="overview" icon={<PandaIcon />}>
                                    <span>概览</span>
                                </Menu.Item>
                                <SubMenu key="sub1" title="告警" icon={<PandaIcon/>}>
                                    <Menu.Item key="event">告警事件</Menu.Item>
                                    <Menu.Item key="analyse">告警分析</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title="告警收敛" icon={<PandaIcon/>}>
                                    <Menu.Item key="rule">规则收敛</Menu.Item>
                                    <Menu.Item key="ai">AI智能收敛</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" title="告警通知" icon={<PandaIcon/>}>
                                    <Menu.Item key="notice">通知组</Menu.Item>
                                    <Menu.Item key="strategy">通知策略</Menu.Item>
                                    <Menu.Item key="template">通知模板</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub4" title="集成" icon={<PandaIcon/>}>
                                    <Menu.Item key="monitor">监控系统</Menu.Item>
                                    <Menu.Item key="work">协作服务</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{padding: '0 24px 24px'}}>
                            <BreadCrumbs items={[{ name: 'Home'}, { name: 'Overview'}]}/>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                Content
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </appContext.Provider>
        );
    }
}

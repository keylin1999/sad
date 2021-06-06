import React, { useEffect, useState } from 'react';
// import './App.css';
import { Container, Button, Grid, Input, Item, Header, Segment, Form, Image, Advertisement } from 'semantic-ui-react';

import { Link } from "react-router-dom";


function HomePage() {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [storeAccount, setStoreAccount] = useState("")
    const [storePwd, setStorePwd] = useState("")

    function accountChange(e) {
        setAccount(e.target.value);
    }
    function pwdChange(e) {
        setPassword(e.target.value);
    }
    function storeAccountChange(e) {
        setStoreAccount(e.target.value);
    }

    function storePwdChange(e) {
        setStorePwd(e.target.value);
    }

    const img_url = `url("https://aniseblog.tw/wp-content/uploads/2019/08/1566147631-3955b0cbeeb7b17e165186d46f3b3cce.jpg")`

    return (
        <Container style={{ padding: 100, backgroundImage: img_url }}>
            <Segment placeholder>
                <Grid columns={2} centered={true} stackable>
                    <Grid.Row>
                        <Header as='h1'>長興街遠距點餐系統</Header>
                    </Grid.Row>
                    <Grid.Row>

                        <Grid.Column verticalAlign='middle'>
                            <Segment placeholder>
                                <Form>
                                    <Header>點餐系統</Header>
                                    <Form.Input
                                        icon='user'
                                        iconPosition='left'
                                        label='帳號'
                                        placeholder='Username'
                                        onChange={accountChange}
                                        value={account}
                                        focus
                                    />
                                    <Form.Input
                                        icon='lock'
                                        iconPosition='left'
                                        label='密碼'
                                        type='password'
                                        focus
                                        placeholder='Password'
                                        onChange={pwdChange}
                                        value={password}
                                    />
                                    <Link to="/user">
                                        <Button primary>登入點餐系統</Button>
                                    </Link>
                                </Form>
                            </Segment>
                        </Grid.Column>

                        <Grid.Column verticalAlign='middle'>
                            <Segment placeholder>
                                <Form>
                                    <Header>店家系統</Header>
                                    <Form.Input
                                        icon='user'
                                        iconPosition='left'
                                        label='店家帳號'
                                        placeholder='Username'
                                        focus
                                        onChange={storeAccountChange}
                                        value={storeAccount}
                                    />
                                    <Form.Input
                                        icon='lock'
                                        iconPosition='left'
                                        label='店家密碼'
                                        type='password'
                                        focus
                                        placeholder='Password'
                                        onChange={storePwdChange}
                                        value={storePwd}
                                    />
                                    <Link to="/store">
                                        <Button primary content='登入'>登入店家系統</Button>
                                    </Link>
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    );
}

export default HomePage;

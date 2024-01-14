import '../../Css/LoginCss.css'
import React from 'react';
import { LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';

const Login = ({ notificationLogin }) => {
    const history = useHistory()
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    const handleLogin = async (values) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(values?.email, values?.password);

            notificationLogin('success', "Login success");
            history.push("/");
        } catch (error) {
            notificationLogin('error', error.code);
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
            history.push("/")
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className='login-sigup' style={{ minHeight: screenHeight - 46 }}>
            <div style={{ padding: '0 30px' }}>
                <Form name="basic"
                    style={{
                        width: '100%',
                        padding: '0 30px',
                        height: '500px',
                        boxShadow: '1px 1px 20px #ffff'
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleLogin}
                    autoComplete="off"
                    className='form-login'
                >
                    <div style={{ paddingTop: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Form.Item
                            name="email"
                            style={{ display: 'flex', justifyContent: 'center' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email',
                                },
                            ]}
                        >
                            <Input style={{ width: '300px' }} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            style={{ display: 'flex', justifyContent: 'center' }}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                style={{ width: '300px' }}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                    </div>

                    <Form.Item wrapperCol={{ offset: 0.5 }} style={{ paddingBottom: '20px', margin: '10px' }}>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ backgroundColor: 'black', height: '40px', width: '200px', fontWeight: 'bolder' }}>
                            <p style={{ fontSize: '17px' }}>Login</p>
                        </Button>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 0.5 }} style={{ paddingBottom: '20px', margin: '10px' }}>
                        <Button type="primary" onClick={() => history.push("/register")} style={{ backgroundColor: 'White', height: '40px', width: '200px', color: 'black', fontWeight: 'bolder' }}>
                            Sign up
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 0.5 }}>
                        <Button
                            style={{ margin: '10px', marginRight: 10, backgroundColor: 'red', color: 'white', width: '200px', height: '40px', fontWeight: 'bolder' }}
                            onClick={handleGoogleLogin}>
                            <icon style={{ padding: '5px' }}><GoogleOutlined /></icon>
                            Google
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
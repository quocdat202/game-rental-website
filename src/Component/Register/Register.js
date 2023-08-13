import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import '../../Css/RegisterCss.css'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

const Register = ({ notificationLogin }) => {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const history = useHistory()

    const handleSignUp = async (value) => {
        console.log("🚀 ~ file: Register.js:12 ~ handleSignUp ~ value:", value)

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        // const phoneRegex = /^\d{9}$/;
        if (!emailRegex.test(value?.email)) {
            alert("Please enter a valid email address")
            // return false;
            // openNotification('top')
        }
        // else if (!phoneRegex.test(value?.phoneNumber)) {
        //     alert("Please enter a valid phone number")
        //     return false;
        // } 
        else if (value?.password.length < 6) {
            alert("Please enter a password of 6 characters or more")
            return false;
        }
        else if (value?.confirmPassword !== value?.password) {
            alert("Passwords do not match")
            return false;
        } else {
            try {
                const result = await firebase.auth().createUserWithEmailAndPassword(value?.email, value?.password);

                // Cập nhật thông tin người dùng với tên đăng nhập
                await result.user.updateProfile({
                    displayName: value?.username,
                    // photoURL
                });
                history.push("/login")
                notificationLogin('success', 'Register success !')
                console.log('Thông tin người dùng:', result.user.displayName);
            } catch (error) {
                console.log(error.message);
                notificationLogin('error', 'Email, password is incorrect or email already exists')

            }
        }
    }

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
        <div className='login-sigup' style={{ minHeight: screenHeight - 40 }} >
            <div style={{ padding: '0 30px' }}>
                <Form name="basic"
                    style={{
                        width: '100%',
                        padding: '0 30px',
                        height: '600px'
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleSignUp}
                    autoComplete="off"
                    className='form-login'
                >
                    <div style={{ paddingTop: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Form.Item
                            name="username"
                            style={{ display: 'flex', justifyContent: 'center' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your User Name!',
                                },
                            ]} >
                            <Input style={{ width: '300px' }} placeholder='Username' />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            style={{ display: 'flex', justifyContent: 'center' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}>
                            <Input style={{ width: '300px' }} placeholder='Email' />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            style={{ display: 'flex', justifyContent: 'center' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]} >
                            <Input.Password style={{ width: '300px' }} placeholder='Password' />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            style={{ display: 'flex', justifyContent: 'center' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Confirm your password!',
                                },
                            ]} >
                            <Input.Password style={{ width: '300px' }} placeholder='Confirm Password' />
                        </Form.Item>
                    </div>
                    <Form.Item
                        wrapperCol={{
                            offset: 0.5,
                        }}
                        style={{
                            paddingBottom: '20px'
                        }} >
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
export default Register;
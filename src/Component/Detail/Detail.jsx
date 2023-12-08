import React from 'react';
import { Carousel, Button, Form, Input, message, Col, Row } from 'antd';
import { useState, useEffect } from 'react'
import { Avatar, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import '../../Css/DetailCss.css'
import { useHistory } from 'react-router-dom'

const Detail = ({ match, addToCart }) => {

    const contentStyle = {
        height: '460px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        border: '10px solid'
    };

    const history = useHistory();

    const urlDetail = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${match?.match?.params?.id}`;

    const [data, setData] = useState()
    useEffect(() => {
        request()
    }, [])

    const request = async () => {

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ce2234ad95msh9d8c5043404fc84p1913a6jsn5df080088056',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(urlDetail, options);
            const result = await response.json();
            setData(result)
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{ padding: '30px 30px', justifyContent: 'center', display: 'flex', }}>
            <div style={{ color: 'white', paddingRight: '10px' }} onClick={() => history.push('/store')}>
                <ArrowLeftOutlined />
            </div>

            <Row>
                <Col span={24} style={{ padding: '0 0' }} >
                    <div className='game-name'>
                        <h1 style={{ maxWidth: '100%' }}>{data?.title}</h1>
                    </div>

                    <div style={{ paddingRight: '35px' }}>
                        <Carousel autoplay>
                            {
                                data?.screenshots?.map((item) => {
                                    return (
                                        <div style={contentStyle}>
                                            <img style={{ width: '100%' }} src={item?.image} />
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                </Col>

                <div style={{ width: '100%', padding: '50px 0' }} >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                            <h1>Communication:&nbsp;</h1>
                            <Avatar size={100} src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png' />
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', paddingTop: '20px' }}>
                            <div className='game-genre'>
                                <h1>Game genre: {data?.genre}</h1>
                            </div>
                            <div className='game-platform'>
                                <h1>Platform: {data?.platform}</h1>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px 0', flexWrap: 'wrap' }}>
                        <Button className='btn' style={{ margin: '10px' }} onClick={() => addToCart(data)}>
                            ADD TO CART
                        </Button>

                        <Button className='btn' style={{ margin: '10px' }} onClick={() => addToCart(data)}>
                            RENT THIS GAME WITH 0,05$ FOR 1 HOUR
                        </Button>
                    </div>
                </div>
                <div style={{ paddingRight: '35px' }}>
                    <div className='description'>
                        <div style={{ marginTop: '20px' }}>
                            <h1>Game information</h1>
                            {data?.description}
                        </div>
                    </div>
                </div>
            </Row>
        </div>

    );
};

export default Detail;
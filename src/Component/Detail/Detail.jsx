import React from 'react';
import { Carousel, Button, Form, Input, message, Col, Row } from 'antd';
import { useState, useEffect } from 'react'
import { Avatar, Space } from 'antd';
import { ArrowLeftOutlined, ShoppingCartOutlined, RightSquareOutlined } from '@ant-design/icons';
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
            <Row>
                <Col span={12} style={{ padding: '0 0' }} >
                    <div className='game-name'>
                        <h1 style={{ width: '1200px', textAlign: 'center' }}>{data?.title}</h1>
                    </div>

                    <div style={{ paddingRight: '35px', marginTop: '50px' }}>
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

                <Col span={12} style={{ marginTop: '80px', border: '1px solid #ff4500', borderRadius: '5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ paddingTop: '20px' }}>
                            <div className='description'>
                                <div>
                                    <h1 style={{ fontSize: 'large' }}>Information game</h1>
                                    {data?.description}
                                </div>
                            </div>
                        </div>

                        <div style={{ paddingTop: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', backgroundColor: 'black', borderRadius: '5px' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                    <h1 style={{ fontSize: 'large', paddingLeft: '15px' }}>Communication:&nbsp;</h1>
                                    <Avatar size={50} src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png' />
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <div className='game-genre'>
                                        <h1 style={{ fontSize: 'large' }}>Game genre: {data?.genre}</h1>
                                    </div>
                                    <div className='game-platform'>
                                        <h1 style={{ fontSize: 'large' }}>Platform: {data?.platform}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px 0', flexWrap: 'wrap' }}>
                        <Button className='btn' style={{ margin: '20px' }} onClick={() => addToCart(data)}>
                            <ShoppingCartOutlined /> ADD TO CART
                        </Button>

                        <Button className='btn' style={{ margin: '20px' }} onClick={() => addToCart(data)}>
                            <RightSquareOutlined /> RENT THIS GAME WITH 0,05$ FOR 1 HOUR
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>

    );
}

export default Detail;
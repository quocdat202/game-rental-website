import '../../Css/HomeCss.css'
import React from 'react';
import { useState, useEffect } from 'react'
import { Carousel, Row, Col, Divider, Button, Card } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { useHistory } from 'react-router-dom'
import nodata from "../../Images/nodata.jpg"
import "../../Css/UserCss.css"

const Spiderman1 = "https://cdn.neowin.com/news/images/uploaded/2022/08/1660227400_marvels-spider-man-keyart-01-en-10jun22.jpg";
const Spiderman2 = "https://cdn.cloudflare.steamstatic.com/steam/apps/1817190/ss_971beba92204ad268878b23aa5288cc4f2118788.1920x1080.jpg?t=1672784176";
const TLOU = "https://cdn.wallpapersafari.com/33/29/eywhRb.jpg";
const RE4 = "https://cdn.jornaldebrasilia.com.br/wp-content/uploads/2022/10/21143516/RE4-2.jpg";
const DS = "https://s.yimg.com/uu/api/res/1.2/1krKB7Fmm5zERVPu4WqWvg--~B/aD0xMDgwO3c9MTkyMDthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/os/creatr-uploaded-images/2023-01/918e3fd0-9d1b-11ed-bbfb-3c1d442192f8.cf.jpg";

const contentStyle = {
    height: '600px',
    width: '100%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const Imgstyle = {
    padding: '10px'
};

const { Meta } = Card;

const Home = ({ addToCart }) => {
    const [data, setData] = useState()
    const [offset, setOffset] = useState(0)
    const [valueSearch, setValueSearch] = useState();
    const [limit, setLimit] = useState(10)
    const history = useHistory()

    useEffect(() => {
        request()
    }, [valueSearch])

    const request = async (value) => {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games${valueSearch ? '?category=' + valueSearch : ''}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ce2234ad95msh9d8c5043404fc84p1913a6jsn5df080088056',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            value ? setData(result.filter((item) => item?.title?.toLowerCase().includes(value.toLowerCase()))) : setData(result)
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='Home-container'>
            <div className='slide-show'>
                <Carousel autoplay className='slide-img'>
                    <div>
                        <img style={contentStyle} src={Spiderman1} />
                    </div>
                    <div>
                        <img style={contentStyle} src={Spiderman2} />
                    </div>
                    <div>
                        <img style={contentStyle} src={TLOU} />
                    </div>
                    <div>
                        <img style={contentStyle} src={RE4} />
                    </div>
                    <div>
                        <img style={contentStyle} src={DS} />
                    </div>
                </Carousel>
            </div>
            <div className='games'>
                <div className='content'>
                    {
                        data?.length > 0 ? data.slice(offset, offset + limit).slice(0, 6).map((item, index) => {
                            return (
                                <Card
                                    key={index}
                                    hoverable
                                    style={{
                                        width: 320,
                                        height: 390,
                                        paddingBottom: 10,
                                        marginBottom: 20,
                                        marginRight: 20,
                                    }}
                                    cover={
                                        <div>
                                            <Button type="link" onClick={() => history.push(`/game/${item?.id}`)} style={{ padding: 0 }}>
                                                <img alt={item?.thumbnail} src={item?.thumbnail} style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} />
                                            </Button>
                                        </div>
                                    }
                                    actions={[
                                        <span style={{ fontWeight: '500', color: 'black' }}>Price: ${(item?.id * 23).toLocaleString()}</span>,
                                        <button className='glow-on-hover' onClick={() => addToCart(item)}>ADD TO CART</button>
                                    ]}
                                >
                                    <div onClick={() => history.push(`/game/${item?.id}`)}>
                                        <Meta
                                            title={item?.title}
                                        />
                                        <div className="card-description"
                                            style={{
                                                height: '70px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical'
                                            }}>
                                            {item?.short_description}
                                        </div>
                                    </div>
                                </Card>
                            )
                        }) : <div>
                            <img style={{ width: '80%' }} src={nodata} />
                        </div>
                    }
                </div>
            </div>
            <div>
                <div className="footer-container">
                    <Row justify="space-around" align="middle">
                        <Col xs={24} sm={12} md={6}>
                            <h3 className="footer-heading">Contact Us</h3>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h1 style={{ padding: '5px' }}><FacebookOutlined /></h1>
                                <h1 style={{ padding: '5px' }}><TwitterOutlined /></h1>
                                <h1 style={{ padding: '5px' }}><InstagramOutlined /></h1>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={6} style={{ borderLeft: '1px solid #ff4500' }}>
                            <h3 className="footer-heading">About Us</h3>
                            <p className="footer-text">Discover the gaming world with Gamer Zone. We bring you the latest updates, reviews, and community events.</p>
                        </Col>
                        <Col xs={24} sm={12} md={6} style={{ borderLeft: '1px solid #ff4500' }}>
                            <h3 className="footer-heading">Popular Games</h3>
                            <p className="footer-text">Explore the top trending games and stay ahead in the gaming community.</p>
                        </Col>
                        <Col xs={24} sm={12} md={6} style={{ borderLeft: '1px solid #ff4500' }}>
                            <h3 className="footer-heading">Connect</h3>
                            <p className="footer-text">Join our gaming community to connect with fellow gamers, share experiences, and participate in events.</p>
                        </Col>
                    </Row>
                </div>
            </div>
        </div >
    );
};

export default Home;

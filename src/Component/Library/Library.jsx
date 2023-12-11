import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import { useHistory } from 'react-router-dom'
import cartEmty from "../../Images/cartEmty.png"

const Library = ({ user }) => {
    const { Meta } = Card
    const history = useHistory()
    const [dataCart, setDataCart] = useState()

    const totalMoney = () => {
        let totalMoney = 0
        if (dataCart.length > 0) {
            dataCart.forEach(element => {
                totalMoney += (element.id * 23)
            });
        }
        return totalMoney
    }

    useEffect(() => {
        const inCart = localStorage.getItem(`carts${user?.uid}`)
        if (inCart) {
            setDataCart(JSON.parse(inCart))
        }
    }, []);
    return (
        <div>
            {
                dataCart?.length > 0 ? <div style={{ paddingTop: 30, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    <h2 style={{ color: 'white' }}>Total Money:&nbsp;{dataCart?.length > 0 ? totalMoney().toLocaleString() + "$" : ''}</h2>&nbsp;&nbsp;
                    <Button className='btn' style={{ margin: '10px' }} >
                        Rent now
                    </Button>
                </div> : ''
            }


            <div className='games'>
                <div className='content'>
                    {
                        dataCart?.length > 0 ? dataCart?.map((item) => {
                            return (
                                <Card
                                    onClick={() => history.push(`/game/${item?.id}`)}
                                    hoverable
                                    style={{
                                        width: 320,
                                        height: 390,
                                        paddingBottom: 10,
                                        marginBottom: 20,
                                        marginRight: 20
                                    }}
                                    cover={
                                        <img alt={item?.thumbnail} src={item?.thumbnail} />
                                    }
                                    actions={[
                                        <span style={{ fontWeight: '500', color: 'black' }}>Price: {(item?.id * 23).toLocaleString()}$</span>,
                                    ]}
                                >

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

                                </Card>
                            )
                        }) :
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', color: 'white', alignItems: 'center' }}>
                                <img style={{ width: '50%' }} src={cartEmty} />
                                <span >Cart is empty</span>
                            </div>
                    }
                </div>
            </div>
        </div >
    );
};

export default Library;
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import { useHistory } from 'react-router-dom'
import cartEmty from "../../Images/cartEmty.png"
import '../../Css/LibraryCss.css'

// ... (imports)

const Library = ({ user }) => {
    const { Meta } = Card;
    const history = useHistory();
    const [dataCart, setDataCart] = useState();

    const totalMoney = () => {
        let totalMoney = 0;
        if (dataCart.length > 0) {
            dataCart.forEach(element => {
                totalMoney += (element.id * 23);
            });
        }
        return totalMoney;
    };

    const removeFromCart = (itemId) => {
        // Xóa sản phẩm khỏi giỏ hàng dựa trên itemId
        const updatedCart = dataCart.filter(item => item.id !== itemId);
        setDataCart(updatedCart);
        // Lưu giỏ hàng mới vào localStorage
        localStorage.setItem(`carts${user?.uid}`, JSON.stringify(updatedCart));
    };

    useEffect(() => {
        const inCart = localStorage.getItem(`carts${user?.uid}`);
        if (inCart) {
            setDataCart(JSON.parse(inCart));
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
            {/* ... */}
            <div style={{paddingLeft: '10%'}}>
                <div className='content'>
                    {dataCart?.length > 0 ? dataCart?.map((item) => (
                        <Card
                            key={item.id}
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
                        >
                            <Meta
                                title={item?.title}
                            />
                            <div className="card-description">
                                {item?.short_description}
                            </div>
                            <div className="card-actions">
                                <span style={{ fontWeight: '500', color: 'black' }}>Price: {(item?.id * 23).toLocaleString()}$</span>
                                <Button type="link" style={{ borderRadius: '5px', border: '2px solid #ff4500', backgroundColor: 'black', color: 'white', height: '50px', width: '100px', fontSize: '16px' }} onClick={() => removeFromCart(item.id)} danger>
                                    Remove
                                </Button>
                            </div>
                        </Card>

                    )) : (
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', color: 'white', alignItems: 'center', marginRight: '5%' }}>
                            <img style={{ width: '50%' }} src={cartEmty} />
                            <span >Cart is empty</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Library;

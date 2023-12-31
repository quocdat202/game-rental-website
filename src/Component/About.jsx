import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, QRCode, Col } from 'antd';
import { useState } from 'react';
import '../Css/AboutCss.css'

const About = () => {
    const [size, setSize] = useState(260);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const increase = () => {
        setSize((prevSize) => {
            const newSize = prevSize + 10;
            if (newSize > 300) {
                return 300;
            }
            return newSize;
        });
    };
    const decline = () => {
        setSize((prevSize) => {
            const newSize = prevSize - 10;
            if (newSize < 48) {
                return 48;
            }
            return newSize;
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: screenHeight - 46 }} className='container'>
            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Button.Group
                    style={{
                        padding: '35px'
                    }} >
                    <Button onClick={decline} disabled={size <= 48} icon={<MinusOutlined />}>
                        Smaller
                    </Button>
                    <Button onClick={increase} disabled={size >= 300} icon={<PlusOutlined />}>
                        Larger
                    </Button>
                </Button.Group>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Col style={{ background: 'white', width: size }} className='QR-Code'>
                    <QRCode
                        errorLevel="H"
                        size={size}
                        iconSize={size / 4}
                        value="https://game-rental-website.vercel.app/"
                    // icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                    />
                </Col>
            </div>
        </div>
    );
};
export default About;
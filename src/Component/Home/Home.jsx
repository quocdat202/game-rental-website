import '../../Css/HomeCss.css'
import React from 'react';
import { Carousel } from 'antd';
import { Image } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
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

const Home = () => {
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

            <div className='game-played-the-most'>
                <h1>Played the most</h1>

                <Image
                    style={Imgstyle}
                    height={406}
                    width={300}
                    src="https://cdn.cdkeys.com/500x706/media/catalog/product/5/d/5de6658946177c5f23698932_19_.jpg"
                />

                <Image
                    style={Imgstyle}
                    height={406}
                    width={300}
                    src="https://cdn.cdkeys.com/500x706/media/catalog/product/s/g/sgvsvsfv.jpg"
                />

                <Image
                    style={Imgstyle}
                    height={406}
                    width={300}
                    src="https://cdn.cdkeys.com/500x706/media/catalog/product/f/a/fadad.jpg"
                />

                <Image
                    style={Imgstyle}
                    height={406}
                    width={300}
                    src="https://cdn.cdkeys.com/500x706/media/catalog/product/e/g/egs_wildhearts_koeitecmogamescoltd_s2_1200x1600-398fdb8dbc918051f99347ebe0335973_3_.jpg"
                />

            </div>
            <div className='Update'>
                <h1>Update</h1>

                <Image
                    style={Imgstyle}
                    height={406}
                    width={300}
                    src="https://cdn.cdkeys.com/500x706/media/catalog/product/c/a/call-of-duty-modern-warfare-pc-cd-keys-discount_1.jpg"
                />

                <Image
                    style={Imgstyle}
                    height={406}
                    width={300}
                    src="https://cdn.cdkeys.com/500x706/media/catalog/product/o/u/outlast-2.jpg"
                />
                <Image
                    style={Imgstyle}
                    height={406}
                    width={300}
                    src="https://cdn.cdkeys.com/500x706/media/catalog/product/u/n/uno_pc_cover.jpg"

                />

                <Image
                    style={Imgstyle}
                    height={406}
                    width={300}
                    src="https://cdn.cdkeys.com/500x706/media/catalog/product/z/h/zhtghzj_1_1_1.jpg"

                />

            </div>
            <div>
                <div id="footer">
                    <p>&copy; 2023 Your Game Store. All rights reserved. |
                        <a href="#">Terms of Service</a> |
                        <a href="#">Privacy Policy</a>
                    </p>
                    <div class="social-icons">
                        <a href="#" target="_blank"><FacebookOutlined /></a>
                        <a href="#" target="_blank"><TwitterOutlined /></a>
                        <a href="#" target="_blank"><InstagramOutlined /></a>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Home;
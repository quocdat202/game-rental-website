import '../../Css/StoreCss.css'
import React from 'react';
import { Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import { Card, FloatButton, Pagination, TreeSelect } from 'antd';
import { useHistory } from 'react-router-dom'
import nodata from "../../Images/nodata.jpg"

const { Meta } = Card;

const Store = ({ user, openNotificationWithIcon, addToCart }) => {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const history = useHistory()
  const [data, setData] = useState()
  const [valueSearch, setValueSearch] = useState();



  const { Search } = Input;
  const treeData = [
    {
      value: "shooter",
      title: "Shooter",
    },
    {
      value: "mmoarpg",
      title: "MMOARPG",
    },
    {
      value: "arpg",
      title: "Action Role-Playing Game",
    },
    {
      value: "strategy",
      title: "Strategy",
    },
    {
      value: "fighting",
      title: "Fighting",
    },
    {
      value: "racing",
      title: "Racing",
    },
    {
      value: "sports",
      title: "Sports",
    },
    {
      value: "cardgame",
      title: "Card Game",
    },
    {
      value: "moba",
      title: "MOBA",
    },
    {
      value: "fantasy",
      title: "Fantasy",
    },
  ];


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

  const handlePageChange = (page, pageSize) => {
    const newOffset = (page - 1) * pageSize;
    setOffset(newOffset);
    setLimit(pageSize);
  };
  const onChange = (newValue) => {
    setValueSearch(newValue);
  };
  return (
    <div style={{ paddingBottom: 50 }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '50px 10px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          <Search
            placeholder="Search name game"
            onSearch={request}
            style={{
              width: 300,
              marginLeft: 10
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TreeSelect
            showSearch
            treeIcon={true}
            style={{
              width: 200,
            }}
            value={valueSearch}
            dropdownStyle={{
              maxHeight: 400,
              overflow: 'auto',
            }}
            placeholder="Select category"
            allowClear
            treeDefaultExpandAll
            onChange={onChange}
            treeData={treeData}
          />
        </div>
      </div>

      <div className='games'>
        <div className='content'>
          {
            data?.length > 0 ? data.slice(offset, offset + limit).map((item, index) => {
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

      <FloatButton.BackTop className='btn-totop' visibilityHeight={100} />

      <div>
        {
          data?.length > 0 && (
            <Pagination
              current={Math.floor(offset / limit) + 1}
              pageSize={limit}
              total={data.length}
              onChange={handlePageChange}
              className='pagination'
            />
          )
        }
      </div>
    </div>
  );
};

export default Store;
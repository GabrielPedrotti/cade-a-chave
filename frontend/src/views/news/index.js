import React, { useState, useContext, useEffect } from 'react';
import SideMenu from '../../components/SideMenu';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const News = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [news, setNews] = useState([]);

    
    const getNews = async () => {
        try {
          const maxBodyLength = 5;

          const response = await axios.get('https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=73B3YG8WVMX0ASGW',  {
            maxBodyLength,
          })
          setNews(response.data.feed) 
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => {
        if (!user) {
            navigate("/");
        }else {
          getNews();
        }
    }, [user]);

    return (
        <div className='flex'>
          <SideMenu />
          <div className="ml-10 pr-10">
            <div className="pt-10 h-20 pb-4 flex items-center">
              <h1 h1 className='text-[32px] font-bold font-plus-jakarta-sans mt-10 mb-10'>Notícias</h1>
            </div>
            {news?.length > 0 && (
              <div className="bg-[#F6F6F6] pt-4 pb-4">
                {news.slice(0, 6).map((item) => (
                  <div key={item.url} className="mx-4 p-4 mb-4 pb-4 bg-[#FFF]">
                    <h2 className="text-xl font-bold">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" hover:text-gray-600 pb-10 font-dm-sans"
                      >
                        {item.title}
                      </a>
                    </h2>
                  </div>
                ))}
            </div>
            )}
            
            {news && news?.length === 0 && (
              <div className="flex items-center justify-center w-full h-full pl-20">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            )}
          </div>
        </div>
    );
}

export default News;
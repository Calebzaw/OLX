import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { PageArea, Fake, OthersArea, BreadCrumb } from './styled';
import { PageContainer } from '../../components/mainComponents';
import useApi from '../../helpers/OlxAPI';
import Aditem from '../../components/partials/Aditem'

export default function Page(){

    const api = useApi();
    const [loading, setLoading] = useState(true)
    const [meInfo, setMeInfo] = useState({});

    useEffect(()=>{
        const getAdInfo = async () => {
            const json = await api.getMe();
            setMeInfo(json)
            console.log(json)
            // setLoading(false)
        }
        getAdInfo();
        // eslint-disable-next-line
    },[])

    return(
        <PageContainer>
            <PageArea>
                <div className='leftSide'>
                    <div className='box'>
                        <div className='adImg'>
                            {loading && <Fake height={300} />}
                        </div>
                        <div className='adInfo'>
                            <div className='adName'>
                                {loading && <Fake height={20} />}
                            </div>
                            <div className='adDescription'>
                                {loading && <Fake height={100}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rightSide'>
                    <div className='box box-padding'>
                        {loading && <Fake height={20} />}
                    </div>
                    {loading && <Fake height={50} />}
                </div>
            </PageArea>
            <OthersArea>
                {/* {adInfo.others && 
                    <>
                        <h2>Outras Ofertas do Vendedor</h2>
                        <div className='list'>
                            {adInfo.others.map((i,k)=>
                                <Aditem key={k} data={i}/>
                            )}
                        </div>
                    </>
                } */}
            </OthersArea>
        </PageContainer>
    )
}
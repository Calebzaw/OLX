import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { PageArea, Fake, OthersArea, BreadCrumb } from './styled';
import { useParams } from 'react-router-dom';
import { PageContainer } from '../../components/mainComponents';
import useApi from '../../helpers/OlxAPI';
import Aditem from '../../components/partials/Aditem'

export default function Page(){

    const api = useApi();
    const { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [adInfo, setAdInfo] = useState("");

    useEffect(()=>{
        const getAdInfo = async (id) => {
            const json = await api.getAd(id, true);
            setAdInfo(json)
            setLoading(false)
        }
        getAdInfo(id);
        // eslint-disable-next-line
    },[])

    const formatDate = (date) => {
        let cdate = new Date(date);
        let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setenbro', 'outubro', 'novembro', 'dezenbro']
    
        let cday = cdate.getDate();
        let cmonth = cdate.getMonth();
        let cyear = cdate.getFullYear();

        return `${cday} de ${months[cmonth]} de ${cyear}`
    }

    return(
        <PageContainer>
            {adInfo.category &&
                <BreadCrumb>
                    Você está aqui:
                    <Link to='/'>Home</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                    / {adInfo.title}
                </BreadCrumb>
            }
            <PageArea>
                <div className='leftSide'>
                    <div className='box'>
                        {adInfo.images && adInfo.images.length > 0 &&
                            <div className='adImg'>
                                {loading && <Fake height={300} />}
                                    <Slide>
                                        {adInfo.images.map(i=> 
                                            <div key={i.url} className='each-slide'>
                                                <img src={i.url} alt="..."/>
                                            </div>
                                        )}
                                    </Slide>
                            </div>
                        }
                        <div className='adInfo'>
                            <div className='adName'>
                                {loading && <Fake height={20} />}
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated && 
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className='adDescription'>
                                {loading && <Fake height={100}/>}
                                {adInfo.description}
                                <hr/>
                                {adInfo.views && 
                                    <small>Visualizações: {adInfo.views}</small>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rightSide'>
                    <div className='box box-padding'>
                        {loading && <Fake height={20} />}
                        {adInfo.priceNegotiable && 
                            "Preço Negociável"
                        }
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className="price">Preço: <span>R$ {adInfo.price}</span></div>
                        }
                    </div>
                    {loading && <Fake height={50} />}
                    {adInfo.userInfo && 
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} className="contactSeller" target="_blank" rel="noreferrer">Fale com o vendedor</a>
                            <div className='created-by box box-padding'>
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>E-mail: {adInfo.userInfo.email}</small>
                            </div>
                        </>
                    }
                </div>
            </PageArea>
            <OthersArea>
                {adInfo.others && 
                    <>
                        <h2>Outras Ofertas do Vendedor</h2>
                        <div className='list'>
                            {adInfo.others.map((i,k)=>
                                <Aditem key={k} data={i}/>
                            )}
                        </div>
                    </>
                }
            </OthersArea>
        </PageContainer>
    )
}
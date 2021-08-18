import { useState, useEffect } from 'react'
import { PageArea, SearchArea } from './styled'
import { PageContainer  } from '../../components/mainComponents'
import { Link } from 'react-router-dom';
import useApi from '../../helpers/OlxAPI';
import Aditem from '../../components/partials/Aditem';

export default function Page(){

    const api = useApi();

    const [stateList, setStateList] = useState([])
    const [catList, setCatList] = useState([])
    const [adList, setAdList] = useState([])

    useEffect(()=>{
        const getState = async () => {
            const slist = await api.getStates();
            setStateList(slist)
        }
        getState();
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        const getCat = async () => {
            const clist = await api.getCategories();
            setCatList(clist)
        }
        getCat();
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort: 'asc',
                limit: 4
            });
            setAdList(json.ads)
        }
        getRecentAds();
        // eslint-disable-next-line
    },[])

    return(
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method='GET' action='/ads'>
                            <input type='text' name='q' placeholder='O que você procura?'/>
                            <select name='state'>
                                {stateList.map((i,k)=>
                                    <option value={i.name} key={k}>{i.name}</option>
                                )}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="catList">
                        {catList && catList.map((i,k)=>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className="catItem">
                                <img src={i.img} alt="" />
                                <span>{i.name}</span>
                            </Link>
                        )}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className='list'>
                        {adList.map((i,k)=>
                            <Aditem key={k} data={i}/>
                        )}
                    </div>
                    <Link to='ads' className="seeAll">Ver todos {'>>'} </Link>
                    
                    <hr/>

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </PageArea>
            </PageContainer>
        </>
    )
}
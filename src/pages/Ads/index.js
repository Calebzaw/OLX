import { useState, useEffect } from 'react'
import { PageArea } from './styled'
import { PageContainer  } from '../../components/mainComponents'
import { useLocation, useHistory } from 'react-router-dom';
import useApi from '../../helpers/OlxAPI';
import Aditem from '../../components/partials/Aditem';

let timer;

export default function Page(){

    const api = useApi();
    const history = useHistory();

    const useQstring = () => {
        return new URLSearchParams( useLocation().search );
    }

    const query = useQstring()

    const [q, setQ] = useState( query.get('q') != null ? query.get('q') : '' )
    const [cat, setCat] = useState( query.get('cat') != null ? query.get('cat') : '' )
    const [state, setState] = useState( query.get('state') != null ? query.get('state') : '' )

    const [adsTotal, setAdsTotal] = useState(0)
    const [stateList, setStateList] = useState([])
    const [catList, setCatList] = useState([])
    const [adList, setAdList] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [resultOpacity, setResultOpacity] = useState(1)
    const [loading, setLoading] = useState(true)

    const getAdsList = async () => {
        setLoading(true)
        let offset = (currentPage-1)*9;

        const json = await api.getAds({
            sort: 'desc',
            limit: 9,
            q,
            cat,
            state,
            offset
        });
        setAdList(json.ads)
        setAdsTotal(json.total)
        setResultOpacity(1)
        setLoading(false)
    }

    useEffect(()=>{
        if(adList.length > 0)
            setPageCount(Math.ceil( adsTotal / adList.length ))
            else
            setPageCount(0)
            // eslint-disable-next-line
    },[adsTotal])

    useEffect(()=>{
        setResultOpacity(0.3)
        getAdsList();
        // eslint-disable-next-line
    },[currentPage])

    useEffect(()=>{
        let qString = [];

        if(q){
            qString.push(`q=${q}`)
        }
        if(cat){
            qString.push(`cat=${cat}`)
        }
        if(state){
            qString.push(`state=${state}`)
        }

        history.replace({
            search: `?${qString.join("&")}`
        })
        
        if(timer){
            clearTimeout(timer)
        }

        timer = setTimeout(getAdsList, 1000)
        setCurrentPage(1)
        setResultOpacity(0.3)
        // eslint-disable-next-line
    }, [q,cat,state])

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

    let pagination = []

    for(let i = 0; i < pageCount; i++){
        pagination.push(i+1)
    }

    return(
        <PageContainer>
            <PageArea>
                <div className='leftSide'>
                    <form method='GET'>
                        <input 
                            type='text' 
                            name='q' 
                            placeholder='O que você procura?' 
                            value={q}
                            onChange={e=>setQ(e.target.value)}
                        />

                        <div className='filterName'>Estado:</div>
                            <select name='state' value={state} onChange={e=>setState(e.target.value)}>
                            
                                <option></option>
                                {stateList.map((i,k)=>
                                    <option key={k} value={i.name}>{i.name}</option>
                                )}
                            </select>

                        <div className='filterName'>Categoria:</div>
                        <ul>
                            {catList.map((i,k) =>
                                <li 
                                    key={k} value={i.name} 
                                    className={cat===i.slug ? 'categoryItem active' : 'categoryItem'}
                                    onClick={()=>setCat(i.slug)}
                                >
                                    <img src={i.img} alt=""/>
                                    <span>{i.name}</span>
                                </li>
                            )}
                        </ul>
                    </form>
                </div>
                <div className='rightSide'>

                    <h2>Resultados:</h2>

                    {loading && adList.length === 0 &&
                        <div className='listWarning'>Carregando</div>
                    }  

                    {!loading && adList.length === 0 &&
                        <div className='listWarning'>Nenhum Resultado Encontrado</div>
                    }    

                    <div className="list" style={{opacity:resultOpacity}}>
                        {adList.map((i,k)=>
                            <Aditem key={k} data={i} />
                        )}
                    </div>

                    <div className="pagination">
                        {pagination.map((i,k)=>
                            <div onClick={()=>setCurrentPage(i)} className={i===currentPage?'pagItem active' : 'pagItem'}>
                                {i}
                            </div>
                        )}
                    </div>

                </div>
            </PageArea>
        </PageContainer>
    )
}
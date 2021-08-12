import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { PageArea } from './styled'
import { PageContainer, PageTittle, ErrorMessage } from '../../components/mainComponents'
import useApi from '../../helpers/OlxAPI';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export default function Page(){

    const api = useApi();
    const history = useHistory()

    const fileField = useRef()

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [price, setPrice] = useState('')
    const [priceNegotiable, setPriceNegotiable] = useState(false)
    const [desc, setDesc] = useState('')
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories()
            setCategories(cats)
        }
        getCategories()
        // eslint-disable-next-line
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];

        if(!title.trim()){
            errors.push("Sem Título")
        }
        if(!category){
            errors.push("Sem Categoria")
        }

        if(errors.length === 0){

            const fData = new FormData();

            fData.append('title', title)
            fData.append('price', price)
            fData.append('priceneg', priceNegotiable)
            fData.append('desc', desc)
            fData.append('cat', category)

            if(fileField.current.files.length > 0){
                for(let i = 0; i < fileField.current.files.length; i++){
                    fData.append('img', fileField.current.files[i])
                }
            }

            const json = await api.addAd(fData);

            if(!json.error){
                history.push(`/ad/${json.id}`)
                return
            }else{
                setError(json.error)
            }

        }else {
            setError(errors.join("\n"));
        }

        setDisabled(false)
    }

    const priceMask = createNumberMask({
        prefix:'R$ ',
        includeThousandsSeparator:true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol: ','
    })

    return(
        <PageContainer>
            <PageTittle>Postar um Anúncio</PageTittle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }

                <form onSubmit={handleSubmit}>
                    <label className='area'>
                        <div className="area-tittle">Título</div>
                        <div className="area-input">
                            <input
                                type="text" 
                                disabled={disabled}
                                value={title}
                                onChange={e=>setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area-tittle">Categoria</div>
                        <div className="area-input">
                            <select
                                disabled={disabled}
                                onChange={e=>setCategory(e.target.value)}
                                required
                            >
                                <option></option>
                                {categories && categories.map(i=>
                                    <option key={i._id} value={i._id}>{i.name}</option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area-tittle">Preço</div>
                        <div className="area-input">
                            <MaskedInput 
                                mask={priceMask}
                                placeholder="R$ "
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e=>setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area-tittle">Preço Negociável</div>
                        <div className="area-input">
                            <input 
                                type='checkbox'
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={e=>setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area-tittle">Descrição</div>
                        <div className="area-input">
                            <textarea
                                disabled={disabled}
                                value={desc}
                                onChange={e=>setDesc(e.target.value)}
                            ></textarea>
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area-tittle">Imagens (1 ou mais)</div>
                        <div className="area-input">
                            <input
                                type="file"
                                disabled={disabled}
                                multiple
                                ref={fileField}
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area-tittle"></div>
                        <div className="area-input">
                            <button disabled={disabled}>Adicionar Anúncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}
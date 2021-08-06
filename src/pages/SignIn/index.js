import { useState } from 'react'
import { PageArea } from './styled'
import { PageContainer, PageTittle, ErrorMessage } from '../../components/mainComponents'
import useApi from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';

export default function Page(){

    const api = useApi();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        
        const json = await api.login(email, password);

        if(json.error){
            setError(json.error)
        }else{
            doLogin(json.token, remember);
            window.location.href = "/";
        }

        setDisabled(false);
    }

    return(
        <PageContainer>
            <PageTittle>Login</PageTittle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className='area'>
                        <div className="area-tittle">Email</div>
                        <div className="area-input">
                            <input
                                type="email" 
                                disabled={disabled}
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area-tittle">Senha</div>
                        <div className="area-input">
                            <input 
                                type="password" 
                                disabled={disabled}
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area-tittle">Lembrar Senha</div>
                        <div className="area-input">
                            <input 
                                type="checkbox" 
                                disabled={disabled}
                                checked={remember}
                                onChange={()=>setRemember(!remember)}
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className="area-tittle"></div>
                        <div className="area-input">
                            <button disabled={disabled}>Fazer Login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}
import { useState } from 'react';
import axios_mod from '../axioss';
import './Auth.css';

let option;
let setOption;
let username;
let email;

function Auth() {
    [option, setOption] = useState(<Login/>);

    const setLogin = () => {
        setOption(<Login/>);
    };

    const setSign = () => {
        setOption(<VerificationForm/>);
    };

    return (
        <div id='auth-root' className='root'>
            <div className="blur">
                <section id='auth-win'>
                    <header id="auth-firm">
                        <div id='auth-logo'>
                            <img src="/big-logo.svg" alt="Main Logo"/>
                            <h1>Moulin Rouge <span>Restaurant</span></h1>
                        </div>
                        <strong>Register now and you will be aware of our events and offers!</strong>
                        <div id='auth-buttons'>
                            <button type="button" onClick={setLogin}>Login</button>
                            <button type="button" onClick={setSign}>Sign in</button>
                        </div>
                    </header>
                    <main id='auth-main'>
                        {option}
                    </main>
                </section>
            </div>
        </div>
    );
}

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPssw] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios_mod.post('user/login/', {email, password,});
            if(response.status === 200){
                axios_mod.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.tokens['refresh']
                window.alert(response.data.tokens['refresh'])
            };
            setEmail("")
            setPssw("")
        }catch (e){
            console.error(e);
        };
    }

    return (
        <>
            <header>
                <h2>WELCOME AGAIN</h2>
                <strong>Fill the the following fields</strong>
            </header>
            <form onSubmit={handleSubmit} method='POST'>
                <div>
                    <label htmlFor="email" className="auth-inputs">Email:
                        <input type="email" name="email" id="email" placeholder='example@gmail.com' defaultValue={email} onChange={e => setEmail(e.target.value)} required/>
                    </label>
                    <label htmlFor="password" className="auth-inputs">Password:
                        <input type="password" name="password" id="password" placeholder='**********' defaultValue={password} onChange={e => setPssw(e.target.value)} required/>
                    </label>
                </div>
                <button type="submit">LOGIN</button>
            </form>
        </>
    )
}

function SignUp() {
    const [name, setName] = useState('');
    const [phone_number, setPhone] = useState('');
    const [password, setPssw] = useState('');
    const [password_confirmation, setPsswc] = useState('');
    const [verification_code, setVC] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios_mod.post('user/register/', {name, username, email, phone_number, password, password_confirmation, verification_code});
            if(response.status === 200) {
                axios_mod.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.tokens['refresh']
                window.alert(response.data.tokens['refresh'])
            }
        }catch (error){
            console.error(error);
        }
    };

    return (
        <>
            <header>
                <h2>JOIN US</h2>
                <strong>Register now and you will be aware of our events and offers!</strong>
            </header>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="auth-inputs">Name:
                        <input type="text" name="name" id="name" placeholder='whats your name?' defaultValue={name} onChange={e => setName(e.target.value)} required/>
                    </label>
                    <label htmlFor="phone" className="auth-inputs">Phone:
                        <input type="tel" name="phone_number" id="phone" placeholder='+00-00000000' defaultValue={phone_number} onChange={e => setPhone(e.target.value)} required/>
                    </label>
                    <label htmlFor="password" className="auth-inputs">Password:
                        <input type="password" name="password" id="password" placeholder='**********' defaultValue={password} onChange={e => setPssw(e.target.value)} required/>
                    </label>
                    <label htmlFor="passwordc" className="auth-inputs">Confirm Password:
                        <input type="password" name="password_confirmation" id="passwordc"  placeholder='**********' defaultValue={password_confirmation} onChange={e => setPsswc(e.target.value)} required/>
                    </label>
                    <label htmlFor="vc" className="auth-inputs">Verification Code:
                        <input type="number" name="verification_code" id="vc"  placeholder='******' defaultValue={verification_code} onChange={e => setVC(e.target.value)} required/>
                    </label>
                </div>
                <button type="submit" formMethod='POST'>SIGN UP</button>
            </form>
        </>
    );
}

function VerificationForm() {
    let setUsr;
    let setEmail;
    [username, setUsr] = useState('');
    [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios_mod.post('user/verify/', {username, email});
            if(response.status === 200) {
                window.alert(response.statusText)
                setOption(<SignUp/>)
            }
        }catch (error){
            console.error(error);
        }
    };

    return (
        <>
            <header>
                <h2>JOIN US</h2>
                <strong>Register now and you will be aware of our events and offers!</strong>
            </header>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="auth-inputs">Username:
                    <input type="text" name="username" id="username"  placeholder='how would like we call you?' defaultValue={username} onChange={e => setUsr(e.target.value)} required/>
                    </label>
                    <label htmlFor="email" className="auth-inputs">Email:
                    <input type="email" name="email" id="email"  placeholder='example@gmail.com' defaultValue={email} onChange={e => setEmail(e.target.value)} required/>
                    </label>
                </div>
                <button type="submit">SEND</button>
            </form>
        </>
    );
}

export default Auth
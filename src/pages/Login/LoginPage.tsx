import style from './loginPage.module.css';
import Button from '../../components/global/Button/Button';
import Input from '../../components/global/Input/Input';
import { useState } from 'react';



 

const LoginPage = () => {

    const[showLogin, setShowLogin] = useState(true);

    const toggleForm = () => {
        setShowLogin(!showLogin);
    }
    
    const [inputData, setInputData] = useState({
        email:"",
        password:""
        });
    
    const inputHandler = (type: string, value: any): void => {
        setInputData((prevState) => ({
            ...prevState,
            [type]: value
        }));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setInputData(event.target.value);
    }
    return(
    <div className={style.container}>
        <div className={style.logo}>
            <img className={style.logo_icon} src='icons/blog-solid.svg'/>
            <h1 className={style.logo_name}>log</h1>
            <p className={style.logo_description}>Sign in or create an account</p>
        </div>

        <div className={`${style.login_container} ${showLogin ? style.active:style.hide}`}> 
            <div className={style.text_container}>
                <div className={style.login}>
                        <h1 className={style.heading}>Sign In</h1>
                        <p className={style.description_login}>New user? <a href="#" onClick={toggleForm}>Create Account</a></p>
                        <div className={style.input}>
                            
                            <Input
                            label="Email address"
                            type="email"
                            placeholder="Enter your email address"
                            value={inputData.email}
                            onChange={handleChange}
                            >
                            </Input>
                            
                            <Input
                            label="Password"
                            type="password"
                            placeholder="Enter password"
                            value={inputData.password}
                            onChange={handleChange}
                            >
                            </Input>

                            <Button className={style.button}>
                                Continue
                            </Button>                       
                        </div> 
                </div>
            </div>
        </div>
                <div className={`${style.register_container} ${showLogin ? style.hide:style.active}`}> 
                    <div className={style.text_container}>
                        <div className={style.register}>
                            <h1 className={style.heading}>Create an account</h1>
                            <p className={style.description_register1}>Sign up with email</p>
                            <p className={style.description_register2}>Already have an account? <a href="#" onClick={toggleForm}>Sign in</a></p>
                            <div className={style.input}>
                                
                                <Input
                                label="Email address"
                                type="email"
                                placeholder="Enter your email address"
                                value={inputData.email}
                                onChange={handleChange}
                                >
                                </Input>
                                
                                <Input
                                label="Password"
                                type="password"
                                placeholder="Enter password"
                                value={inputData.password}
                                onChange={handleChange}
                                >
                                </Input>

                                <Button className={style.button}>
                                    Continue
                                </Button>                       
                            </div> 
                        </div>     
                    </div>
                </div>
    </div>
    );
}


export default LoginPage;


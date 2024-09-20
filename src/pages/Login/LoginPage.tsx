import style from './loginPage.module.css';
import Button from '../../components/global/Button/Button';
import Input from '../../components/global/Input/Input';
import { useState, useContext } from 'react';
import axios, { AxiosError } from "axios";
import { AuthContext } from './../../context/authContext';
import { useNavigate } from 'react-router-dom';





const LoginPage = () => {

    const [showLogin, setShowLogin] = useState(true);

    const toggleForm = () => {
        setShowLogin(!showLogin);
    }

    const [inputData, setInputData] = useState({
        email: "",
        username: "",
        password: "",
        name: ""
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

    }

    // SERVER SIDE CONNECTION register FUNC
    const handleReg = async (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8800/api/auth/register", inputData)
        } catch (err) {
            if (err instanceof AxiosError)
                setError(err?.response?.data);
        }
    }

    // SERVER SIDE CONNECTION login FUNC
    const authContext = useContext(AuthContext);
    if (!authContext)
        throw new Error("AuthContext must be within AuthContextProvider, loginpage");
    const { login } = authContext; // const login = authContext.login;

    const handleLogin = async (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        try {
            await login(inputData);
            navigate("/");
        } catch (err) {
            if (err instanceof AxiosError)
                setError(err?.response?.data)
        }
    }

    return (
        <div className={style.container}>
            <div className={style.logo}>
                <img className={style.logo_icon} src='icons/blog-solid.svg' />
                <h1 className={style.logo_name}>log</h1>
                <p className={style.logo_description}>Sign in or create an account</p>
            </div>

            <div className={`${style.login_container} ${showLogin ? style.active : style.hide}`}>
                <div className={style.text_container}>
                    <div className={style.login}>
                        <h1 className={style.heading}>Sign In</h1>
                        <p className={style.description_login}>New user? <a className={style.linkToggle} href="#" onClick={toggleForm}>Create Account</a></p>
                        <div className={style.input}>

                            <Input
                                label="Username"
                                name="username"
                                type="username"
                                placeholder="Enter your username"
                                value={inputData.username}
                                onChange={handleChange}
                            >
                            </Input>

                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Enter password"
                                value={inputData.password}
                                onChange={handleChange}
                            >
                            </Input>

                            <p style={{ color: "red" }}>{error}</p>

                            <Button onClick={handleLogin} className={style.button}>
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${style.register_container} ${showLogin ? style.hide : style.active}`}>
                <div className={style.text_container_register}>
                    <div className={style.register}>
                        <h1 className={style.heading}>Create an account</h1>
                        <p className={style.description_register1}>Sign up with email</p>
                        <p className={style.description_register2}>Already have an account? <a className={style.linkToggle} href="#" onClick={toggleForm}>Sign in</a></p>
                        <div className={style.input}>

                            <Input
                                label="Username"
                                name="username"
                                placeholder="Enter a username"
                                value={inputData.username}
                                onChange={handleChange}
                            >
                            </Input>

                            <Input
                                label="Email address"
                                name="email"
                                type="email"
                                placeholder="Enter your email address"
                                value={inputData.email}
                                onChange={handleChange}
                            >
                            </Input>

                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Enter password"
                                value={inputData.password}
                                onChange={handleChange}
                            >
                            </Input>

                            <p style={{ color: "red" }}>{error}</p>
                            {/* {error && error} */}


                            <Button onClick={handleReg} className={style.button}>
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


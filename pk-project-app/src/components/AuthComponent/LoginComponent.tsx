import { useEffect, useState } from "react";
import { Col, Container, Row, Navbar, Button, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Style.css";
import { useNavigate } from "react-router"
import { IToken, IUser } from "../../state";
import { setToken } from "../../state/userToken/action";
import { setUserInfo } from "../../state/userInfo/action";
import { setLoggedIn } from "../../state/loggedIn/action";
import HandleDownload from "../FileUploadComponent/HandleDownloadComponent";

const LoginComponent = () => {
    const iToken = useSelector<IToken>((state) => state.token);
    // @ts-ignore
    const userInfo = useSelector<IState, IUser>((state) => state.userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        retryToken();
        async function retryToken() {
            if(returnTokenLS() !== "" || returnTokenLS() !== null) {
                // @ts-ignore
                await dispatch(setToken({token: returnTokenLS()}));
                await dispatch(setUserInfo(returnUserInfoLS()))
            }
        }
    }, [])
    
    const returnTokenLS = () => {return localStorage.getItem("token");}
    const returnUserInfoLS = () => {
        let userInfo = localStorage.getItem("userInfo") || "";
        return JSON.parse(userInfo);
    }

    const logOut = async () => {
        // @ts-ignore
        if(iToken.token !== "") {
            await dispatch(setToken({token: ""}));
            await dispatch(setLoggedIn({loggedIn: false}));
            localStorage.setItem("token", "");
            localStorage.setItem("userInfo", "");
            window.location.reload();
            await navigate(`/`);
        }
    }

    return (
        <>
            <Navbar className="navbar">
                <Container>
                    <Navbar.Brand className="logo" href="/">PKproject</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text> 
                        
                        {// @ts-ignore
                        iToken.token === "" && <><Link className="navbar-link" to='/login'>
                            <button className="nav-button" type="submit">Zaloguj się</button>
                        </Link>
                        <Link className="navbar-link" to='/register'>
                        <button className="nav-button" type="submit">Rejestracja</button>
                        </Link></>}

                        {// @ts-ignore
                            iToken.token !== "" && <Container className="d-flex justify-content-center align-items-center">
                                {/* <Nav.Link href="/raports">Raporty</Nav.Link> */}
                                {<img width="40" height="40" className="rounded mx-auto d-block profile-image" src={// @ts-ignore
                                    userInfo.photo ? "data:image/jpeg;base64," + userInfo.photo : "https://kis.agh.edu.pl/wp-content/uploads/2021/01/default-avatar.jpg"} 
                                    alt="avatar"
                                 /> }
                                <span className="d-block m-2 fw-bolder text-black-80">
                                    {userInfo.firstname} {userInfo.lastname}</span>
                                <Link className="navbar-link" to='/profile'>
                                    <button className="nav-button" type="submit">Profil</button>
                                </Link>          
                                <button className="nav-button" onClick={logOut}>Wyloguj się</button>        
                            </Container>

                        }
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default LoginComponent;
import { useEffect, useState } from "react";
import { Col, Container, Row, Navbar, Button, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router"
import { IToken, IUser } from "../../state";
import { setToken } from "../../state/userToken/action";
import { setUserInfo } from "../../state/userInfo/action";
import { setLoggedIn } from "../../state/loggedIn/action";

const LoginComponent = () => {
    const iToken = useSelector<IToken>((state) => state.token);
    // @ts-ignore
    const userInfo = useSelector<IUser>((state) => state.userInfo);
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
            <Navbar>
                <Container>
                    <Navbar.Brand href="/">LOGO</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text> 
                        
                        {// @ts-ignore
                        iToken.token === "" && <><Link to='/login'>
                            <Button type="submit">Zaloguj się</Button>
                        </Link>
                        <Link to='/register'>
                        <Button type="submit">Rejestracja</Button>
                        </Link></>}

                        {// @ts-ignore
                            iToken.token !== "" && <Container className="d-flex justify-content-center align-items-center">
                                <Nav.Link href="/raports">Raporty</Nav.Link>
                                <img width="40" height="40" className="rounded mx-auto d-block" src={// @ts-ignore
                                    userInfo.photo ? userInfo.photo : "https://kis.agh.edu.pl/wp-content/uploads/2021/01/default-avatar.jpg"} 
                                    alt="avatar"
                                 />
                                <span className="d-block m-2">{
                                    // @ts-ignore
                                    userInfo.username}</span>
                                <Button onClick={logOut}>Wyloguj się</Button>
                                <Link to='/profile'>
                                    <Button type="submit">Profil</Button>
                                </Link>
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
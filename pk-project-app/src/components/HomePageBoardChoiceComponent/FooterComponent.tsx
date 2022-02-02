import { Container } from "react-bootstrap";
import "./Style.css";


const FooterComponent = () => {

    return (
        <Container className="page-footer font-small blue pt-4 foot">
        
            <div className="footer-copyright text-center py-3">© 2020 Copyright:
                <a href="/"> Emil Saracyn Praca Dyplomowa</a>
            </div>

        </Container>
    )
}

export default FooterComponent;
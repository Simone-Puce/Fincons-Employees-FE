import './FooterComponent.css'

const FooterComponent = () => {
    return (
        <div className='row m-0 footer-style mb-1 pb-1 pt-3'>
            <div className='d-flex justify-content-center footer-text background-style mt-2 mb-0 pb-0'>
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            Tecnologies
                        </div>
                        <div className="col text-center">
                            Copyright
                        </div>
                        <div className="col text-center">
                            About us
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            React
                        </div>
                        <div className="col text-center">
                            Cookie
                        </div>
                        <div className="col text-center">
                            Sede
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            Java
                        </div>
                        <div className="col text-center">
                            Privacy
                        </div>
                        <div className="col text-center">
                            ITS
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                        </div>
                        <div className="col text-center">
                        </div>
                        <div className="col text-center footer-text">
                            <p className='footer-text'>Team</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterComponent;
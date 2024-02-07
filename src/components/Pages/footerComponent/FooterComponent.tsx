import './FooterComponent.css'


const FooterComponent = () => {
    return (
        <div className='row m-0 footer-style mb-3 pb-3 pt-3'>
            <div className='d-flex justify-content-center footer-text background-style'>
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

<div className='row'>
    <table className="table table-style-footer mb-0 ">
        <thead className="table-background-style">
            <tr className='text-center table-background-style'>
                <th className='table-background-style'>Tecnologies</th>
                <th className='table-background-style'>Copyright 2024</th>
                <th className='table-background-style'>About us</th>
            </tr>
        </thead>
        <tbody className='table-background-style'>
            <tr className='table-background-style align-middle'>
                <td className='text-center table-background-style align-middle' >React</td>
                <td className='text-center table-background-style align-middle' >Cookie</td>
                <td className='text-center table-background-style align-middle' >Fincons Lecce</td>
            </tr>
            <tr className='table-background-style align-middle'>
                <td className='text-center table-background-style align-middle' >Java</td>
                <td className='text-center table-background-style align-middle' >Privacy</td>
                <td className='text-center table-background-style align-middle' >ITS Apulia Digital Maker</td>
            </tr>
        </tbody>
    </table>
</div>
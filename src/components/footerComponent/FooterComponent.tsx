import './FooterComponent.css'


const FooterComponent = () => {
    return (
        <footer className='footer fixed-bottom mt-auto py-3 bg-dark'>
            <div className='d-flex justify-content-center container stick'>
                <span className='text-white '> My footer</span>
            </div>
        </footer>
    );
}

export default FooterComponent;
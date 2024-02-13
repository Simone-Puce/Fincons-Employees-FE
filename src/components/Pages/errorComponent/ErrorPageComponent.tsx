import { useNavigate } from "react-router-dom";

const ErrorPageComponent = () => {
    const navigate = useNavigate()

    return (
        <div className="mt-5 pt-3 footer-manager">
            <div className="card col-md-6 offset-md-3 mt-5 card-style">
                <h3 className="text-center mt-2"> You cant access this page, press the button to go back </h3>
                <div className="card-body">
                    <div className="d-flex justify-content-center">
                        <button
                            type="button"
                            className="btn btn-back"
                            onClick={() => navigate("/employees")}
                        >
                            <i className="bi bi-caret-left-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPageComponent;
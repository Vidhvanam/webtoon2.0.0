import { useNavigate } from "react-router-dom"
import noImg from "../img/noimage.png"

function NotFound() {
    const navigator = useNavigate()
    return (
        <div className="main-container">
            <div className="sub-container">
                <div className="flex-col-box color-gray">
                    <img src={noImg} />
                    <h3>Page Not Found.</h3>
                    <button className="btn btn-primary" onClick={() => navigator("/")}>Go Back Home</button>
                </div>
            </div>
        </div>
    )
}
export default NotFound

export default function CreateSeriesNav({ children, pageName, hasSearch, handelData }) {

    return (
        <div className="main-container">
            <div className="page-heading">
                <div>
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <span>{pageName}</span>
                        {hasSearch && <input type="text" onChange={(e) => handelData(e.target.value)} className="page-search" placeholder="Series Name , Author " />}
                    </div>
                </div>
            </div>
            <div className="subscribes-container">
                {children}
            </div>
        </div>
    )
}
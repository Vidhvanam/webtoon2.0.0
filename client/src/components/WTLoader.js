import RotateLoader from "react-spinners/RotateLoader";
const override = {

    color: "var(--main-color)"
};
const loader = {
    display: "flex",
    position: "relative",
    top: "94px",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 94px)"
}
export default function WTLoader() {
    return (
        <div style={loader}>
            <RotateLoader
                cssOverride={override}
                size={15}
                color="var(--main-color)"
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}


import Page from "../Page"
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import noImg from "../../img/noimage.png"
import { ImUserPlus } from "react-icons/im";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'


function Pramotions() {
    const navigetor = useNavigate()
    const [pramotionsSeries, setPramotionsSeries] = useState()

    useEffect(() => {
        axios
            .get(`http://localhost:6969/api/pramotions/all`)
            .then((series) => {
                console.log(series.data);

                setPramotionsSeries(series.data.seriesInfo);
            })
            .catch((err) => console.log(err));

    }, []);



    const handleDelete = (item) => {

        Swal.fire({
            title: `Are you sure you want to delete  "${item.name}"?`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            showCancelButton: "Cancel",
            icon: 'warning'
        }
        ).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {


            } else
                Swal.fire(' Cancelled', '', 'error')

        })

    }
    return (

        <Page pageName="Pramote series" hasSearch={true}>

            <div className='overflow-auto'>
                {/* {console.log(filteredSeries, allSeries)} */}
                <table className="table table-striped series-table">
                    <thead className='table-heading'>
                        <tr className='p-5'>
                            <th>Series Img</th>
                            <th>Series Name</th>
                            <th>Series Author</th>
                            <th>Series Ratting</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {pramotionsSeries.map(item => {
                            return (
                                <tr key={item._id}>
                                    <td>
                                        <img src={process.env.REACT_APP_IMG_PATH + item.img} className="table-img" alt="..." onError={(e) => e.target.src = noImg} />

                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.author}</td>
                                    <td>{item.ratting} / 5</td>
                                    <td>
                                        <button className="btn btn-danger m-1">Delete</button>
                                        <button className="btn btn-success m-1" onClick={() => {
                                            console.log("cliked");
                                            // navigate(`/ManageSeries/${item._id}`)
                                        }}>Edit</button>

                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {!pramotionsSeries.length ? (
                    <div className="flex-col-box color-gray">
                        <img src={noImg} />
                        <h3>No Series found.</h3>
                        <h5>Searching of series only works with Series name and Author.</h5>

                    </div>
                ) : null}
            </div>
        </Page>

    )
}
export default Pramotions
import Page from "../Page"
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import noImg from "../../img/noimage.png"
import { ImUserPlus } from "react-icons/im";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Pagination from '../pagination/Pagination';
import Swal from 'sweetalert2'
import Slider from "../Slider";

let PageSize = 5;

function Promotions() {
    const navigetor = useNavigate()
    const [allSeries, setAllSeries] = useState([])
    const [filteredSeries, setFilteredSeries] = useState([])
    const [promotionsSeries, setpromotionsSeries] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const handelFilteredSeries = (value) => {
        setCurrentPage(1)
        const searchedData = allSeries.filter(series => {
            if (series.name.toLowerCase().includes(value.toLowerCase())) {
                return true
            }
            if (series.author.toLowerCase().includes(value.toLowerCase())) {
                return true
            }
        })
        console.log(searchedData);
        setFilteredSeries(searchedData)
    }
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredSeries.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredSeries]);

    useEffect(() => {
        axios.get(`http://localhost:6969/api/series/filter/all`)
            .then(res => {
                setAllSeries(res.data.series)
                setFilteredSeries(res.data.series)

            })
        axios
            .get(`http://localhost:6969/api/promotions/filter/all`)
            .then((series) => {
                // console.log(series.data);

                setpromotionsSeries(series.data.promotions);

            })
            .catch((err) => console.log(err));

    }, []);

    const handleDelete = (id) => {

        Swal.fire({
            title: `Are you sure you want to remove series from being Promoted ?`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            showCancelButton: "Cancel",
            icon: 'warning'
        }
        ).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:6969/api/promotions/remove/${id}`)
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.type === "success") {

                            setpromotionsSeries(prev => prev.filter(item => item.s_id !== id));
                        }
                        Swal.fire(res.data.message, '', res.data.type)
                    })
                    .catch((err) => Swal.fire('Not deleted', '', 'error')
                    );

            } else
                Swal.fire(' Cancelled', '', 'error')

        })

    }
    return (

        <Page pageName="promote series" hasSearch={true} data={filteredSeries} handelData={handelFilteredSeries}>

            <div className='overflow-auto'>
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
                        {currentTableData.map(item => {
                            return (
                                <tr key={item._id}>
                                    <td>
                                        <img src={process.env.REACT_APP_IMG_PATH + item.img} className="table-img" alt="..." onError={(e) => e.target.src = noImg} />

                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.author}</td>
                                    <td>{item.ratting} / 5</td>
                                    <td>
                                        {promotionsSeries.map(item => item.s_id).includes(item._id) ? <button className="btn btn-danger m-1" onClick={() => handleDelete(item._id)}>Remove from promotion</button> :
                                            <button className="btn btn-success m-1">Promote</button>
                                        }



                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={filteredSeries.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
            {!promotionsSeries.length ? (
                <div className="flex-col-box color-gray">
                    <img src={noImg} />
                    <h3>Not Promoted any series.</h3>
                    <h5>Promoted series will be shown on slidbar.</h5>

                </div>
            ) : <div className="d-flex overflow-hidden flex-column text-center mt-5 gap-4" >
                <h1>Preview</h1>
                <Slider /></div>}
        </Page>

    )
}
export default Promotions
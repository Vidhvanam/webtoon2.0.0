import React, { useState, useMemo, useEffect } from 'react';
import Pagination from '../../pagination/Pagination';
import axios from 'axios';
// import data from './data/mock-data.json';
import Page from "../../Page"
import Swal from 'sweetalert2'
import "./editSeries.css"
import noImg from "../../../img/noimage.png"
import { useNavigate } from 'react-router-dom';
let PageSize = 5;

export default function App() {
    const navigate = useNavigate()
    const [allSeries, setSeries] = useState([])
    const [filteredSeries, setFilteredSeries] = useState([])

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredSeries.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredSeries]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}api/series/filter/all`)
            .then(res => {
                setSeries(res.data.series)
                setFilteredSeries(res.data.series)
            })
    }, [])
    const handelFilteredSeries = (value) => {
        setCurrentPage(1)
        const searchedData = allSeries.filter(series => {
            if (series.name.toLowerCase().includes(value.toLowerCase())) {
                return true
            }
            if (series.author?.name.toLowerCase().includes(value.toLowerCase())) {
                return true
            }
        })
        setFilteredSeries((prev) => searchedData)
    }
    const fireAlert = (series) => {
        Swal.fire({
            title: `Are you sure you want to delete  "${series.name}"?`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            showCancelButton: "Cancel",
            icon: 'warning'
        }
        ).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.post(`${process.env.REACT_APP_API}api/series/admin/deleteSeries/one`, series)
                    .then(res => {
                        console.log(res);
                        setSeries(prev => prev.filter(item => item._id !== series._id))
                        setFilteredSeries(prev => prev.filter(item => item._id !== series._id))
                        Swal.fire('Series deleted', '', 'success');


                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire('Not deleted', '', 'error')

                    });

            } else
                Swal.fire(' Cancelled', '', 'error')

        })
    }

    return (
        <>
            <Page pageName="Edit Series" hasSearch={true} data={filteredSeries} handelData={handelFilteredSeries}>
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
                            {currentTableData.map(item => {
                                return (
                                    <tr key={item._id}>
                                        <td>
                                            <img src={process.env.REACT_APP_IMG_PATH + item.img} className="table-img" alt="..." onError={(e) => e.target.src = noImg} />

                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.author?.name}</td>
                                        <td>{item.ratting} / 5</td>
                                        <td>
                                            <button className="btn btn-danger m-1" onClick={() => fireAlert(item)}>Delete</button>
                                            <button className="btn btn-success m-1" onClick={() => {
                                                console.log("cliked");
                                                navigate(`/ManageSeries/${item._id}`)
                                            }}>Edit</button>

                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {!filteredSeries.length ? (
                        <div className="flex-col-box color-gray">
                            <img src={noImg} />
                            <h3>No Series found.</h3>
                            <h5>Searching of series only works with Series name and Author.</h5>

                        </div>
                    ) : null}
                </div>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={filteredSeries.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </Page>
        </>
    );
}

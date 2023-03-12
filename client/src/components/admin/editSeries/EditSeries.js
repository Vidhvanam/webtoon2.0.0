import React, { useState, useMemo, useEffect } from 'react';
import Pagination from '../../pagination/Pagination';
import axios from 'axios';
// import data from './data/mock-data.json';
import Page from "../../Page"
import Swal from 'sweetalert2'
import "./editSeries.css"
import noImg from "../../../img/noimage.png"
let PageSize = 5;

export default function App() {
    const [allSeries, setSeries] = useState([])
    const [filteredSeries, setFilteredSeries] = useState([])

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredSeries.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredSeries]);
    useEffect(() => {
        axios.get(`http://localhost:6969/api/series/filter/all`)
            .then(res => {
                setSeries(res.data.series)
                setFilteredSeries(res.data.series)
            })
    }, [])
    const handelFilteredSeries = (value) => {
        const searchedData = allSeries.filter(series => {
            if (series.name.includes(value)) {
                return true
            }
            if (series.author.includes(value)) {
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
                axios()
                Swal.fire('Series deleted', '', 'success');

            } else
                Swal.fire(' Cancelled', '', 'error')

        })
    }

    return (
        <>
            <Page pageName="Edit Series" hasSearch={true} data={filteredSeries} handelData={handelFilteredSeries}>
                <div>
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
                                            <button className="btn btn-danger" onClick={() => fireAlert(item)}>Delete</button>
                                            <button className="btn btn-success mx-1">Edit</button>

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
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={filteredSeries.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            </Page>
        </>
    );
}

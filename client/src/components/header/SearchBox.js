import axios from "axios"
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";
import Pagination from '../pagination/Pagination';
let PageSize = 5;


export default function SearchBox() {
    const wrapperRef = useRef(null);
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
            })
    }, [])

    useEffect(() => {

        const element = document.getElementById("searched-series")
        const searchBox = document.getElementById("search-box-header")
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                searchBox.value = ""
                setFilteredSeries([])
                element.style.display = "none"
                searchBox.style.width = "auto"

            } else {
                element.style.display = "block"
                searchBox.style.width = "300px"

            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
    const handleChange = (value) => {
        setCurrentPage(1)

        const searchedData = allSeries.filter(series => {
            if (series.name.toLowerCase().includes(value.toLowerCase())) {
                return true
            }
            if (series.author.toLowerCase().includes(value.toLowerCase())) {
                return true
            }
        })
        setFilteredSeries((prev) => searchedData)
    }

    return <div className="search-container" ref={wrapperRef}>

        <input onChange={(e) => handleChange(e.target.value)} id="search-box-header" className="form-control me-2 d-inline search-box-header" type="search" placeholder="Search" aria-label="Search" />
        <div className="searched-series" id="searched-series">
            <div className="p-ab">
                {filteredSeries.length !== 0 ?

                    currentTableData.map(series => {
                        return (
                            <NavLink to={`/series/${series._id}`} key={series._id} className="d-flex flex-row gap-2 searced-item">

                                <div className="img-container">
                                    <img src={process.env.REACT_APP_IMG_PATH + series.img} alt="no-img" />
                                </div>
                                <div className="series-info d-flex flex-column">
                                    <span>{series.name}</span>
                                    <div>

                                        <span>{series.author} | </span>
                                        <span>{series.genres.join(' / ')}</span>

                                    </div>

                                </div>
                            </NavLink>
                        )
                    })

                    : <center>Not found</center>}

                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={filteredSeries.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </div>
    </div>

}
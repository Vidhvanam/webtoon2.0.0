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

let PageSize = 5;




function MagageSeries() {
    const { id } = useParams();
    const navigetor = useNavigate()
    const [series, setSeries] = useState();
    const [episodesData, setEpisodesData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return episodesData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, episodesData]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}api/series/${id}`)
            .then((series) => {
                console.log(series.data);

                setSeries(series.data.seriesInfo);
            })
            .catch((err) => console.log(err));

    }, []);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}api/episodes/${id}`)
            .then((episodes) => {
                // console.log(episodes.data.episodeInfo);

                setEpisodesData(episodes.data.episodeInfo);
            })
            .catch((err) => console.log(err));
    }, [series]);

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
                axios.post(`${process.env.REACT_APP_API}api/episodes/deleteEpisode/${item._id}`, { url: "", status: "removed", name: item.name })
                    .then(res => {
                        console.log(res);
                        if (res.data.type === "success") {
                            setEpisodesData(prev => prev.map(ep => {
                                console.log(ep._id, item._id);
                                if (ep._id === item._id) {
                                    return res.data.newEpData[0]
                                } else {
                                    return ep
                                }
                            }
                            ))
                        }
                        Swal.fire(res.data.message, '', res.data.type);


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

        <Page pageName="manage series">
            <div className="d-flex flex-row gap-2 flex-wrap manage-series-box">

                {
                    series ? (
                        <>
                            <div className="img-container">
                                <img src={process.env.REACT_APP_IMG_PATH + series?.img} className="card-img-top" alt="..." onError={(e) => e.target.src = noImg} />

                            </div>
                            <div className="series-dec flex-grow-1 p-4 d-flex flex-column justify-content-between">
                                <div className="d-flex justify-content-between">
                                    <div className="">

                                        <span>{series?.genres.join(' / ')}</span>
                                        <h5 className="card-title">{series?.name}</h5>
                                        <span className="flex-row-box gap-1">
                                            <ImUserPlus className="series-icon " />
                                            <b>{series?.subscribers}</b>
                                        </span>
                                        <span>{series.completed ? "completed" : "on going"}</span>
                                    </div>
                                    <div >
                                        <MdModeEditOutline onClick={() => navigetor(`/EditSeriesInfo/${series._id}`)} style={{ fontSize: "2rem", backgroundColor: "#e7e2e2a8", padding: "5px", color: "black", margin: "5px" }} />
                                        {/* <MdDelete style={{ fontSize: "2rem", backgroundColor: "#e7e2e2a8", padding: "5px", color: "black", margin: "5px" }} /> */}

                                    </div>
                                </div>
                                <div className="row-2">
                                    <span>Created {new Date(series.date).toDateString()}</span>
                                    <div>
                                        <button className="btn btn-primary mt-2" onClick={() => navigetor(`/ManageSeries/addEpisode?series_id=${series._id}&total_ep=${episodesData.length}`)}>Add Edisodes</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null
                }
            </div>
            {episodesData.length !== 0 ? (
                <div className='table-responsive'>
                    {/* {console.log(filteredSeries, allSeries)} */}
                    <table className="table .table-responsive bg-light series-table mt-5">
                        <thead className='table-heading'>
                            <tr className='p-5'>
                                <th width="10%">Ep Number</th>
                                <th width="30%">Ep Title</th>
                                <th width="10%">Status</th>
                                <th width="20%">Ep Publish Date</th>
                                <th width="30%">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {currentTableData.map(item => {
                                return (
                                    <tr key={item._id} className={item?.status === "removed" ? "removed-ep" : ""}>
                                        <td>{item.ep_num}</td>
                                        <td>{item.name}</td>
                                        <td className="text-danger">{item?.status ? item.status : "published"}</td>
                                        <td>{new Date(item.createdDate).toDateString()}</td>
                                        <td>
                                            <button className="btn btn-danger m-1" onClick={() => handleDelete(item)} disabled={item?.status === "removed"}>Delete</button>
                                            <button className="btn btn-success m-1" onClick={() => {
                                                // console.log("cliked");
                                                navigetor(`/EditEpisode?id=${item._id}&name=${item.name}&url=${item.url}`)
                                            }}>Edit</button>
                                            <button className="btn btn-primary m-1" onClick={() => navigetor(`/episode/${item.url}`)} disabled={item?.status === "removed"}>Preview</button>

                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={episodesData.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            ) : (
                <>
                    <div className="flex-col-box color-gray">
                        <img src={noImg} />
                        <h3>No Edisodes found.</h3>
                        <h5>Add first edisode of the series.</h5>

                        <button className="btn btn-primary mt-2" onClick={() => navigetor(`/ManageSeries/addEpisode?series_id=${series._id}&total_ep=${episodesData.length}`)}>Add Edisodes</button>

                    </div>
                </>
            )
            }
        </Page>

    )
}
export default MagageSeries
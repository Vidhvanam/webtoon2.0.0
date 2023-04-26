import Page from "../../Page"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect, useMemo } from "react"
import Pagination from '../../pagination/Pagination';
import noImg from "../../../img/noimage.png"
import Swal from 'sweetalert2'

let PageSize = 5;

export default function AddAuthor() {
    const [mode, setMode] = useState("insert")
    const [allAuthors, setAllAuthors] = useState([])
    const [newAuthor, setNewAuthor] = useState({
        name: "",
        email: "",
        phone: "",
        introduction: '',
    })
    const [error, setError] = useState({
        name: "",
        email: "",
        phone: "",
        introduction: ""
    })

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return allAuthors.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, allAuthors]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}api/author/filter/all`)
            .then(res => {
                setAllAuthors(res.data.authors.filter(author => author?.status !== "removed"))
            })
    }, [])


    const formValidation = () => {
        let flag = true
        if (newAuthor.name.length < 2) {
            setError(prev => ({ ...prev, name: "Enter proper name" }))
            flag = false
        } else {
            setError(prev => ({ ...prev, name: "" }))
        }
        const emailRegex = /^[A-Za-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (!emailRegex.test(newAuthor.email)) {
            setError(prev => ({ ...prev, email: "Enter valid email" }))
            flag = false

        } else {
            setError(prev => ({ ...prev, email: "" }))
        }
        const phoneRegex = /^[0-9]{10}$/

        if (!phoneRegex.test(newAuthor.phone)) {
            setError(prev => ({ ...prev, phone: "Enter valid phone number" }))
            flag = false

        } else {
            setError(prev => ({ ...prev, phone: "" }))
        }
        if (newAuthor.introduction.length > 100 || newAuthor.introduction.length < 20) {
            setError(prev => ({ ...prev, introduction: "introduction should be between 20 to 100 character" }))
            flag = false

        } else {
            setError(prev => ({ ...prev, introduction: "" }))
        }
        return flag
    }
    const onSubmit = (e) => {
        e.preventDefault();

        const flag = formValidation()
        if (flag) {
            if (mode === "insert") {
                axios.post(`${process.env.REACT_APP_API}api/author/addAuthor`, newAuthor)
                    .then(res => {
                        // alert(res.data.type)
                        toast[res.data.type](res.data.message);
                        if (res.data.type === "success") {
                            setAllAuthors(prev => ([...prev, res.data.newAuthor]))
                        }
                        setNewAuthor({
                            name: "",
                            email: "",
                            phone: "",
                            introduction: ""
                        })


                    })
            } else {
                Swal.fire({
                    title: `Are you sure you want to update "${newAuthor.name}"?`,
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    showCancelButton: "Cancel",
                    icon: 'warning'
                }
                ).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        axios.post(`${process.env.REACT_APP_API}api/author/update`, newAuthor)
                            .then(res => {
                                if (res.data.type === "success") {
                                    setAllAuthors(prev => prev.map(author => {
                                        if (author._id === newAuthor._id) {
                                            return newAuthor
                                        } else {
                                            return author
                                        }
                                    }))
                                    Swal.fire('Author updated', '', 'success');

                                }
                                setMode("insert")
                                setNewAuthor({
                                    name: "",
                                    email: "",
                                    phone: "",
                                    introduction: ""
                                })


                            })
                            .catch(err => {
                                console.log(err);
                                Swal.fire('Not updated', '', 'error')

                            });

                    } else
                        Swal.fire(' Cancelled', '', 'error')

                })
            }

        } else {
            console.log('invalid form');
            toast.info("Please fill the form correctly");
        }


    }
    const addData = (e) => {
        const { name, value } = e.target;
        setNewAuthor(prev => ({ ...prev, [name]: value }))
    }
    const updateAuthor = (author) => {
        setError({
            name: "",
            email: "",
            phone: "",
            introduction: ""
        })
        setMode("edit")
        setNewAuthor(author)
    }
    const deleteAuthor = (author) => {
        Swal.fire({
            title: `Are you sure you want to remove  "${author.name}"?`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            showCancelButton: "Cancel",
            icon: 'warning'
        }
        ).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.post(`${process.env.REACT_APP_API}api/author/remove/${author._id}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.type === "success") {

                            setAllAuthors(prev => prev.filter(item => item._id !== author._id))
                            Swal.fire('Author removed', '', 'success');
                        }


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
        <Page pageName="Manage Authors">
            {console.log(newAuthor)}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBa={false}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
                theme="light"
            />
            <div className=" d-flex align-items-center justify-content-center">
                <div className="bg-white col-md-8 w-100">
                    <form className="p-4 rounded shadow-md" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" value={newAuthor.name} name="name" className="form-control" placeholder="Author Name" onChange={addData} />
                            {error.name.length > 0 && <small className='invalid-feedback d-block'>{error.name}</small>}

                        </div>
                        <div className="mt-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" value={newAuthor.email} name="email" className="form-control" placeholder="Author's Email" onChange={addData} />
                            {error.email.length > 0 && <small className='invalid-feedback d-block'>{error.email}</small>}

                        </div>
                        <div className="mt-3">
                            <label htmlFor="phone" className="form-label">
                                Phone Number
                            </label>
                            <input type="number" value={newAuthor.phone} name="phone" className="form-control" placeholder="Auhtor's phone number" onChange={addData} />
                            {error.phone.length > 0 && <small className='invalid-feedback d-block'>{error.phone}</small>}

                        </div>
                        <div className="mt-3 mb-3">
                            <label htmlFor="introduction" className="form-label">Introductoin</label>
                            <textarea name="introduction" value={newAuthor.introduction} cols="20" rows="6" className="form-control"
                                placeholder="Introduction of Author" onChange={addData}></textarea>
                            {error.introduction.length > 0 && <small className='invalid-feedback d-block'>{error.introduction}</small>}
                        </div>

                        <button className="btn btn-primary">
                            {mode === "insert" ? "Add Author" : "Update Author"}
                        </button>
                        {mode === "edit" && <button className="btn btn-primary mx-2" onClick={() => {
                            setMode("insert")
                            setNewAuthor({
                                name: "",
                                email: "",
                                phone: "",
                                introduction: ""
                            })

                        }}>
                            Cancel
                        </button>}
                    </form>
                </div>
            </div>
            <div className='overflow-auto mt-5'>
                {/* {console.log(filteredSeries, allSeries)} */}
                <table className="table table-striped series-table">
                    <thead className='table-heading'>
                        <tr className='p-5'>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Intro.</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {currentTableData.map(item => {
                            return (
                                <tr key={item._id}>

                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.introduction}</td>

                                    <td>
                                        <button className="btn btn-danger m-1" onClick={() => deleteAuthor(item)}>Delete</button>
                                        <button className="btn btn-success m-1" onClick={() => updateAuthor(item)}>Edit</button>

                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {!allAuthors.length ? (
                    <div className="flex-col-box color-gray">
                        <img src={noImg} />
                        <h3>No authors to show.</h3>

                    </div>
                ) : null}
            </div>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={allAuthors.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />

        </Page>
    )
}
import React, { useContext } from 'react'
import { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { Loader } from '../components/Loader'
import { EmployeeList } from '../components/EmployeeList'

export const EmployeesPage = () => {
    const [employees, setEmployees] = useState([])
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItemsCount, setTotalItemsCount] = useState()
    const pageSize = 5
    const portionSize = 3
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rigthPortionPageNumber = portionNumber * portionSize

    const fetchEmployees = useCallback(async () => {
        try {
            const fetched = await request(`/api/employee?page=${currentPage}&limit=${pageSize}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            const quantity = await request(`/api/employee?page=${currentPage}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            const results = fetched.results
            setTotalItemsCount(quantity.length)
            setEmployees(results)
        } catch (e) { }
    }, [token, request, currentPage, pageSize])

    useEffect(() => {
        fetchEmployees()
    }, [fetchEmployees])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && <EmployeeList employees={employees} fetchEmployees={fetchEmployees} currentPage={currentPage} />}
            <ul className="pagination">
                {portionNumber > 1 &&
                    <li><button onClick={() => { setPortionNumber(portionNumber - 1) }}>Prev</button></li>}
                {pages.filter(p => p >= leftPortionPageNumber && p <= rigthPortionPageNumber)
                    .map((p) => {
                        return <li key={p} className={currentPage === p ? 'active' : 'waves-effect'}><a href="#!"
                            onClick={(e) => { setCurrentPage(p) }} key={p}>{p}</a></li>
                    })}
                {portionCount > portionNumber &&
                    <li><button onClick={() => { setPortionNumber(portionNumber + 1) }}>Next</button></li>}
            </ul>
        </>
    )
}
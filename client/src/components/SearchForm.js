import React, { useState } from 'react'


export const SearchForm = (props) => {
    const [search, setSearch] = useState('')
    const SearchSubmit = async () => {
        try {
            const res = await props.request(`/api/employee/search?search=${search}`, 'GET', null, {
                Authorization: `Bearer ${props.token}`
            })
            const employee = res.employee
            props.setTotalItemsCount(res.employee.length)
            props.setEmployees(employee)
        } catch (e) { }
    }
    return (
        <form className='searchFrom'>
            <div className='input-field'>
                <input
                    placeholder="Search"
                    id="search"
                    type="text"
                    value={search}
                    className='yellow-input'
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div>
                <button onClick={SearchSubmit} className='btn green accent-4'>Найти</button>
            </div>
        </form>

    )
}





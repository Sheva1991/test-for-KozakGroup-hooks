import React, { useContext, useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

export const EmployeeList = ({ employees, fetchEmployees, currentPage }) => {
    const { token } = useContext(AuthContext)
    const { request } = useHttp()
    const [editeMode, setEditeMode] = useState('')
    const [fullname, setFullname] = useState('')
    const [gender, setGender] = useState('')
    const [contacts, setContacts] = useState('')
    const [salary, setSalary] = useState('')
    const [position, setPosition] = useState('')
    const [reload, setReload] = useState(false)

    useEffect(() => {
        if (reload) {
            fetchEmployees()
            setReload(false)
        }
    }, [fetchEmployees, reload])
    if (!employees.length) {
        return <p className='center'>Работников пока нет</p>
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>ФИО</th>
                    <th>Пол</th>
                    <th>Контактная информация</th>
                    <th>Дата добавления/дата обновления</th>
                    <th>Оклад</th>
                    <th>Должность</th>
                </tr>
            </thead>

            <tbody>
                {employees.map((employee, index) => {
                    const deleteEmployer = async (e) => {
                        try {
                            const date = new Date().toLocaleDateString()
                            await request(`/api/employee/delete/${employee._id}`, 'DELETE', {
                                fullname: employee.fullname,
                                gender: employee.gender,
                                contacts: employee.contacts,
                                dateOfCreate: `${date}`,
                                salary: employee.salary,
                                position: employee.position,
                            }, {
                                Authorization: `Bearer ${token}`
                            })
                        } catch (e) { }
                        setReload(true)
                    }
                    const updateEmployer = async (e) => {
                        try {
                            const date = new Date().toLocaleDateString()
                            await request(`/api/employee/update/${employee._id}`, 'POST', {
                                fullname: fullname !== '' ? fullname : employee.fullname,
                                gender: gender !== '' ? gender : employee.gender,
                                contacts: contacts !== '' ? contacts : employee.contacts,
                                dateOfCreate: `${date}`,
                                salary: salary !== '' ? salary : employee.salary,
                                position: position !== '' ? position : employee.position,
                            }, {
                                Authorization: `Bearer ${token}`
                            })
                        } catch (e) { }
                        setEditeMode('')
                        setReload(true)

                    }
                    return (
                        <tr key={employee._id} id={employee._id}>
                            <td>{(currentPage - 1) * 5 + index + 1}</td>
                            <td style={{ maxWidth: '200px', overflow: 'hidden' }}>
                                {editeMode === employee._id ?
                                    <div className="input-field">
                                        <input placeholder={employee.fullname}
                                            id={`fullname + ${employee._id}`}
                                            type="text"
                                            value={fullname ? fullname : employee.fullname}
                                            onChange={(e) => {
                                                setFullname(e.target.value)
                                            }}
                                        />
                                    </div> : employee.fullname}
                            </td>
                            <td style={{ maxWidth: '200px', overflow: 'hidden' }}>
                                {editeMode === employee._id ?
                                    <div className="input-field">
                                        <input placeholder={employee.gender}
                                            id={`gender + ${employee._id}`}
                                            type="text"
                                            value={gender ? gender : employee.gender}
                                            onChange={e => setGender(e.target.value)}
                                        />
                                    </div> : employee.gender}
                            </td>
                            <td style={{ maxWidth: '200px', overflow: 'hidden' }}>
                                {editeMode === employee._id ?
                                    <div className="input-field">
                                        <input placeholder={employee.contacts}
                                            id={`contacts + ${employee._id}`}
                                            type="text"
                                            value={contacts ? contacts : employee.contacts}
                                            onChange={e => setContacts(e.target.value)}
                                        />
                                    </div> : employee.contacts}
                            </td>
                            <td style={{ maxWidth: '200px', overflow: 'hidden' }}>{employee.dateOfCreate}</td>
                            <td style={{ maxWidth: '200px', overflow: 'hidden' }}>
                                {editeMode === employee._id ?
                                    <div className="input-field">
                                        <input placeholder={employee.salary}
                                            id={`salary + ${employee._id}`}
                                            type="text"
                                            value={salary ? salary : employee.salary}
                                            onChange={e => setSalary(e.target.value)}
                                        />
                                    </div> : employee.salary}
                            </td>
                            <td style={{ maxWidth: '200px', overflow: 'hidden' }}>
                                {editeMode === employee._id ?
                                    <div className="input-field">
                                        <input placeholder={employee.position}
                                            id={`position + ${employee._id}`}
                                            type="text"
                                            value={position ? position : employee.position}
                                            onChange={e => setPosition(e.target.value ? e.target.value : e.target.defaultValue)}
                                        />
                                    </div> : employee.position}
                            </td>
                            <td> {editeMode === employee._id ? <button className='btn green accent-4' onClick={updateEmployer}>Save</button> :
                                <button className='btn light-blue darken-2' onClick={(e) => {
                                    let thisForm = e.target.parentElement.parentElement.getAttribute('id')
                                    setEditeMode(thisForm)
                                }}>Change</button>
                            }
                            </td>
                            <td><button className='btn red accent-4' onClick={event => deleteEmployer(event, employee._id)}>Delete</button></td>
                        </tr>
                        // getElementById(employee._id).getAttribute('id')
                    )
                })}
            </tbody>
        </table>
    )
}
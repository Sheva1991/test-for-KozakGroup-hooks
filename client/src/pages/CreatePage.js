import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [fullname, setFullname] = useState('')
    const [gender, setGender] = useState('')
    const [contacts, setContacts] = useState('')
    const [salary, setSalary] = useState('')
    const [position, setPosition] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async () => {
        try {
            const date = new Date().toLocaleDateString()
            await request('/api/employee/create', 'POST', {
                fullname: fullname,
                gender: gender,
                contacts: contacts,
                dateOfCreate: `${date}`,
                salary: salary,
                position: position,
            }, {
                Authorization: `Bearer ${auth.token}`
            })
        } catch (e) { }
        history.push(`/employees`)

    }
    return (
        <div className='row'>
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className='card blue darken-1'>
                    <div className='card-content white-text'>
                        <div className="input-field">
                            <input placeholder="ФИО"
                                id="fullname"
                                type="text"
                                value={fullname}
                                className='yellow-input'
                                onChange={e => setFullname(e.target.value)}
                            />
                            <label htmlFor="link">ФИО</label>
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Пол"
                                id="gender"
                                type="text"
                                value={gender}
                                className='yellow-input'
                                onChange={e => setGender(e.target.value)}
                            />
                            <label htmlFor="link">Пол</label>
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Контакты"
                                id="contacts"
                                type="text"
                                value={contacts}
                                className='yellow-input'
                                onChange={e => setContacts(e.target.value)}
                            />
                            <label htmlFor="link">Контакты</label>
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Зарплата"
                                id="salary"
                                type="text"
                                value={salary}
                                className='yellow-input'
                                onChange={e => setSalary(e.target.value)}
                            />
                            <label htmlFor="link">Зарплата</label>
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Должность"
                                id="position"
                                type="text"
                                value={position}
                                className='yellow-input'
                                onChange={e => setPosition(e.target.value)}
                            />
                            <label htmlFor="link">Должность</label>
                        </div>
                        <button className='btn yellow darken-4' onClick={pressHandler}>Добавить работника в базу</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
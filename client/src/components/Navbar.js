import React from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const Navbar = (isAuthenticated) => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
                <span className="brand-logo">Сотрудники фирмы</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/create' >Создать</NavLink></li>
                    <li><NavLink to='/employees'>Сотрудники</NavLink></li>
                    <li><a href='/' onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}
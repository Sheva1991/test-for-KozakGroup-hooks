import React from 'react'
import { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useEffect } from 'react'
import { useMessage } from '../hooks/message.hook'
import { useHistory } from 'react-router-dom'

export const RegisterPage = () => {
    const history = useHistory()
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()

    const [form, setForm] = useState({
        email: '',
        password: '',
        login: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
            if (data.message) {
                history.push(`/`)
            }
        } catch (e) {
        }
    }

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>База сотрудников</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Регистрация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите Email"
                                    id="email"
                                    name='email'
                                    type="email"
                                    className="yellow-input"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите Логин"
                                    id="login"
                                    name='login'
                                    type="text"
                                    className="yellow-input"
                                    value={form.login}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="login">Login</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    name='password'
                                    type="password"
                                    className="yellow-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="card-action">
                            <button
                                className="btn lighten-1 black-text"
                                onClick={registerHandler}
                                disabled={loading}>
                                Регистрация
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
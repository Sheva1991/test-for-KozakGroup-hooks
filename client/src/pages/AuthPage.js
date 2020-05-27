import React, { useContext } from 'react'
import { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useEffect } from 'react'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()

    const [form, setForm] = useState({
        login: '',
        password: ''
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
        history.push(`/register`)
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) { }
    }


    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>База сотрудников</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите Login"
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
                                className="btn yellow darken-4"
                                style={{ marginRight: '10px' }}
                                onClick={loginHandler}
                                disabled={loading}>
                                Войти
                            </button>
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
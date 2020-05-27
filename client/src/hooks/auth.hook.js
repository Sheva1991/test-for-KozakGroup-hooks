import { useState, useCallback, useEffect } from 'react'

const storageName = 'employeeData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [employeeId, setEmployeeId] = useState(null)
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setEmployeeId(id)

        localStorage.setItem(storageName, JSON.stringify({
            employeeId: id, token: jwtToken
        }))
    }, [])
    const logout = useCallback(() => {
        setToken(null)
        setEmployeeId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.employeeId)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, employeeId, ready }
}
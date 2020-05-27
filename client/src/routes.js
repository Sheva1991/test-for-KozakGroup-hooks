import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { EmployeesPage } from './pages/EmployeesPage'
import { CreatePage } from './pages/CreatePage'
import { AuthPage } from './pages/AuthPage'
import { RegisterPage } from './pages/RegisterPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/employees' exact>
                    <EmployeesPage />
                </Route>
                <Route path='/create' exact>
                    <CreatePage />
                </Route>
                <Redirect to='/create' />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path='/' exact >
                    <AuthPage />
                </Route>
                <Route path='/register' exact >
                    <RegisterPage />
                </Route>
                <Redirect to='/' />
            </Switch>
        )
    }
}
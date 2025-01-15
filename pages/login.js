import React from 'react'
import Header from '@/components/Header/Header'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import LoginForm from '@/components/LoginForm/LoginForm'
import Footer from '@/components/Footer/Footer'


const Login = () => {
    return (
        <>
            <div>
                <Header />
                <NavigationBar />
                <LoginForm />
                <Footer />
            </div>
        </>
    )
}

export default Login
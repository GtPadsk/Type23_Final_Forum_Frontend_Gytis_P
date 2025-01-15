import React from 'react'
import Header from '@/components/Header/Header'
import LoginForm from '@/components/LoginForm/LoginForm'
import Footer from '@/components/Footer/Footer'


const Login = () => {
    return (
        <>
            <div>
                <Header />
                <LoginForm />
                <Footer />
            </div>
        </>
    )
}

export default Login
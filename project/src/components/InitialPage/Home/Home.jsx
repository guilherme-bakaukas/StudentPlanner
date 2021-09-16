import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './Home.css'

import Logo from '../Logo/Logo'
import Nav from '../Nav/Nav'
import Routes from '../Routes'


export default function Home() {
    return (
        <BrowserRouter>
            <div className="home">
                <aside className="sidenav">
                <Logo />
                <Nav />
                </aside>
                <aside className='page-content'>
                <Routes />
                </aside>
            </div>
        </BrowserRouter>
    )
}
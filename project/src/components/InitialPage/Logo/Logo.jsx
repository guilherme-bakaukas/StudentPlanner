import './Logo.css'
import logoImage from  '../../../assets/logo.png'
import React from 'react'


export default function Logo() {
    return(
        <aside className="logo">
            <img src={logoImage} alt="logo"/>
        </aside>
    )
}
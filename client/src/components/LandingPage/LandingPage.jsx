import React from "react";
import { Link } from 'react-router-dom';
import './LandingPage.module.css';

export default function LandingFunction() {
    return (
        <div>
            <Link to='/home'>
                <h1>Bienvenidos</h1>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}



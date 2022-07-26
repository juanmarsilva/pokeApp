import React from "react";
import { Link } from 'react-router-dom';
import './LoadingPage.css';

export default function LandingFunction() {
    return (
        <div class="center-on-page">
            <h1>Bienvenidos</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}

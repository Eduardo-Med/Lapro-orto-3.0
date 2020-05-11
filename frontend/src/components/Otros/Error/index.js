import React from 'react'
import Imagen from '../../../images/broken-teeth.jpg'
import './styles.css'

function Error() {
    return (
        <div className="row rowError">
            <div class="error-container">
                <div>
                    <img src={Imagen} alt="broken-teeth"/>
                </div>

                <div>
                    <h1>Uuups. . .</h1>
                    <p>Esta página no existe!</p>
                </div>
            </div>
        </div>
    )
}

export default Error

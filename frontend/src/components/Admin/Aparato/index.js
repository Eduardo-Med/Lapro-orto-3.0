import React  from "react";


export default function Aparato({imagen,titulo,descripcion}) {
    return ( 
        <div class="cardd">
            <div class="cardd-info-container">
                <h2>Titulo dientito</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies tristique mauris.
                    Aenean
                    hendrerit eleifend nibh, quis sollicitudin dui convallis sit amet. In tincidunt sed est
                    vitae
                    venenatis.
                    Vestibulum et ligula turpis. Praesent cursus tincidunt ligula, sit amet maximus nisl posuere
                    vel.
                    Nunc
                    blandit ipsum non dui consequat elementum. Suspendisse sagittis semper nunc.
                </p>
            </div>

            <div class="cardd-image-container">
                <img class="cardd-image" src={`data:image/png;base64,${Buffer.from(imagen).toString("base64")}`} alt={titulo}/>
            </div>
        </div>

    )
}
 
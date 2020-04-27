import React, {useState} from 'react'
import {Container, Grid, TextField, Button} from '@material-ui/core'

export default function SolicitarCuenta({enviar}) {

    const [datosForm, setDatosForm] = useState({});
    const handleInputChange = (event) => {
        event.persist();
        setDatosForm({...datosForm, [event.target.name]: event.target.value});
      }


    return (
        <Container style={{border: 2, borderColor: 'black', borderStyle:'solid'}}>
            <h2>CONTACTANOS</h2>
            <Grid>
                <TextField id="nombre" name="nameContactanos" label="nombre" variant="outlined"onChange={handleInputChange} />
            </Grid> 
            <Grid>
                <TextField id="mail" name="correo" label="correo" variant="outlined" onChange={handleInputChange}/>
            </Grid>
            <Grid>
                <TextField id="telefono" name="telefono" label="telefono" variant="outlined"onChange={handleInputChange} />
            </Grid> 
            <Grid>
                <TextField id="Descripcion" name="descripcion" label="Descripcion" variant="outlined" multiline onChange={handleInputChange}/>
            </Grid>
            <Grid>
                <Button variant="contained" color="secondary" onClick={()=>enviar(datosForm)}>Enviar</Button>
            </Grid>  
        </Container>
    )
}

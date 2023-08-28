import React from 'react'
import { TextField } from '@mui/material'

const TextArea = (props) => {
    return (
        <TextField
            margin="normal"
            required={true}
            sx={{
                width: '100%',
                margin: '5px',
                fontSize: '12px'

            }}
            color="success"
            value={props.value}
            helperText={props.helperText}
            onChange={(e) => props.setValue(e.target.value)}
            id={props.id}
            type={props.type}
            label={props.label}
            name={props.name}
        />
    )
}

export default TextArea
import { Stack, Typography } from '@mui/material'


export default function PageNotFound(){
    return (
        <Stack justifyContent='center' alignItems='center' paddingTop={10}>
            <Typography variant='h1' fontWeight={500}>404</Typography>
            <Typography variant='h5' color='gray'>Page not found</Typography>
        </Stack>
    )
}
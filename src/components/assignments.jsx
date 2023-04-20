import Typography from  '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import {Link as RRLink} from 'react-router-dom';

export default function Assignments(){
    return (
      <Box textAlign='left' p={5} sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        '& > *': {
          flexBasis: '400px',
          position: 'relative',
        }
      }}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant='h5' gutterBottom>Compound Interest Calculator</Typography>
            <Typography>
              Compounding interest, as opposed to simple interest, is the situation where your wealth increases exponentially because you earn interest on your total investments, the aggregation of your principal amount and the interest it incurs.
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={RRLink} to="./grow-calculator">View Project</Button>
            <Button href="https://github.com/Kumar-ayush-singh/MUI-assignments/tree/main/src">View Code</Button>
          </CardActions>
        </Card>
        

        {/* with dynamic andonment */}
        <Card elevation={3}>
          <CardContent>
            <Typography variant='h5' gutterBottom>Select as Input Adornment</Typography>
            <Typography>
             Trying to implement select as input adornment use case: selecting country code for a number
            </Typography>
          </CardContent>
          <CardActions>{/*for adjustment only*/}<Button sx={{
            visibility: 'hidden',
            pointerEvents: 'none',
          }}/>
          </CardActions>
          <CardActions sx={{
            position: 'absolute',
            bottom: 0,
          }}>
            <Button component={RRLink} to="./dynamic-adornment">View Project</Button>
            <Button href='https://github.com/Kumar-ayush-singh/MUI-assignments/blob/main/src/components/dynamicAdornment.jsx'>View Code</Button>
          </CardActions>
        </Card>
      </Box>
    )
}
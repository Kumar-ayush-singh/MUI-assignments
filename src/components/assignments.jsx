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
      <Box width='400px' textAlign='left' p={5}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant='h5' gutterBottom>Compound Interest Calculator</Typography>
            <Typography>
            Compounding interest, as opposed to simple interest, is the situation where your wealth increases exponentially because you earn interest on your total investments, the aggregation of your principal amount and the interest it incurs.
            </Typography>
          </CardContent>
          <CardActions>
            <Link component={RRLink} to={'/grow-calculator'}>
              <Button component={RRLink} to="./grow-calculator">View Project</Button>
            </Link>
            <Link href="https://github.com/Kumar-ayush-singh/MUI-assignments/tree/main/src">
              <Button>View Code</Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
    )
}
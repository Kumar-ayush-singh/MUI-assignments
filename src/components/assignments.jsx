import { Box, Card, CardContent, CardActions, Typography, Button, Link } from "@mui/material"
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
            <Link href="#">
              <Button>View Code</Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
    )
}
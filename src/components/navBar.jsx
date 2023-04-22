import { Construction, KeyboardArrowDown } from "@mui/icons-material";
import { AppBar, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

export default function NavBar(){
    const [calcMenuAnchorEl, setCalcMenuAnchorEl] = useState(null);
    const isCalcMenuOpen = Boolean(calcMenuAnchorEl);

    const handleCalcClick = (_event) => {
        setCalcMenuAnchorEl(_event.target);
    }
    const handleCalcMenuClose = () => {
        setCalcMenuAnchorEl(null);
    }


    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge='start' color='inherit' href="/">
                    <Construction/>
                </IconButton>
                <Typography variant="h6" color='inherit' component='div' flexGrow={2} textAlign='left' textTransform='uppercase'>
                    Under Construction
                </Typography>
                <Stack spacing={2} direction='row'>
                    <Button color="inherit">Assignment</Button>
                    <Button 
                        color='inherit' 
                        endIcon={<KeyboardArrowDown/>}
                        id='calc-button'
                        aria-controls={isCalcMenuOpen ? 'clac-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={isCalcMenuOpen ? 'true' : undefined}
                        onClick={handleCalcClick}
                    >
                        Calculators
                    </Button>
                    <Button color='inherit'>Features</Button>
                    <Button color='inherit'>About</Button>
                </Stack>

                <Menu 
                    anchorEl={calcMenuAnchorEl} 
                    open={isCalcMenuOpen} 
                    onClose={handleCalcMenuClose}
                    MenuListProps={{
                        'aria-labelledby': 'calc-button'
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    PaperProps={{
                        style: {
                            width: calcMenuAnchorEl ? calcMenuAnchorEl.offsetWidth : 'initial',
                        }
                    }}
                >
                    <MenuItem>SIP</MenuItem>
                    <MenuItem>Lumpsum</MenuItem>
                    <MenuItem>CAGR</MenuItem>
                    <MenuItem>Inflation</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}
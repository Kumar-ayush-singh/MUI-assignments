import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import { styled } from "@mui/material";

const styles = theme => ({
    Tooltip: {
        backgroundColor: 'white',
        color: 'red',
        fontSize: '1rem',
        border: '2px solid blue',
    },
    arrow: {
        color: 'white',
    },
});

export const CustomTooltip = styled( ({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))( ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`] : {
        backgroundColor: 'white',
        color: theme.palette.error.main, 
        padding: '10px',
        fontSize: '0.8rem',
        maxWidth: '120px',
        boxShadow: theme.shadows[3],
    },
    [`& .${tooltipClasses.arrow}::before`] : {
        color: 'white',
        boxShadow: theme.shadows[1]
    }
}));


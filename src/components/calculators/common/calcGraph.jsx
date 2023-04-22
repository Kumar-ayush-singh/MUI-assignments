import useTheme from "@mui/material/styles/useTheme"

import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Legend, Tooltip } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function CalcGraph({
    primary,
    secondary
}) {
    const theme = useTheme();

    return (
        <Doughnut data={{
            labels: [primary.label, secondary.label],
            datasets: [
              {
                label: 'amount',
                data: [primary.value, secondary.value],
                backgroundColor: [theme.palette.calculatorGraph.main, theme.palette.calculatorGraph.light],
                borderColor: ['#00000000', '#00000000'],
                hoverOffset: 0,
              }
            ]
          }} options={{
            hover: 'none',
            cutout: '65%',
            plugins: {
              legend: {
                onClick: () => {},
                labels: {
                  usePointStyle: true,
                  pointStyle: "rectRot",
                  font: {
                    family: 'roboto'
                  }
                }
              },
            }
          }} 
        />
    )
}

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface LineChartProps {
    data: { time: string; value: number }[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map((item) => new Date(item.time)),
        datasets: [
            {
                label: 'Time Trend',
                data: data.map((item) => item.value),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="w-full">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineChart;

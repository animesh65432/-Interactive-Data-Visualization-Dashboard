import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

interface LineChartProps {
    data: { time: string; value: number }[];
    height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, height = 400 }) => {
    console.log(data)
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

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                type: 'time' as const,
                time: {
                    unit: 'day' as const,
                },
                ticks: {
                    source: 'auto' as const,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="w-full" style={{ height: `${height}px` }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineChart;

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface BarChartProps {
    data: { category: string; totalTime: number }[];
    onBarClick: (category: string) => void;
}

const BarChart: React.FC<BarChartProps> = ({ data, onBarClick }) => {
    console.log(data)
    const chartData = {
        labels: data.map((item) => item.category),
        datasets: [
            {
                label: 'Total Time Spent (hours)',
                data: data.map((item) => item.totalTime),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        onClick: (event: any, elements: any[]) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                onBarClick(data[index].category);
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
    };

    return (
        <div className="w-full">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;

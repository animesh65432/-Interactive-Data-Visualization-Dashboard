import { useState } from 'react';
import { BarChartComponent, LineChart } from "./index"
import { useSelector } from "react-redux"
import { RootState } from "../store"

const Dashboard: React.FC = () => {
    const data = useSelector((state: RootState) => state.datareducer.data)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [lineChartData, setLineChartData] = useState<{ time: string; value: number }[]>([]);

    const totalTimeofA = data.reduce((acc, cur) => acc + cur.A, 0)
    const totalTimeofB = data.reduce((acc, cur) => acc + cur.B, 0)
    const totalTimeofC = data.reduce((acc, cur) => acc + cur.C, 0)
    const totalTimeofd = data.reduce((acc, cur) => acc + cur.D, 0)
    const totalTimeofE = data.reduce((acc, cur) => acc + cur.E, 0)
    const totalTimeofF = data.reduce((acc, cur) => acc + cur.F, 0)

    const barChartData = [
        { category: 'A', totalTime: totalTimeofA },
        { category: 'B', totalTime: totalTimeofB },
        { category: 'C', totalTime: totalTimeofC },
        { category: 'D', totalTime: totalTimeofd },
        { category: 'E', totalTime: totalTimeofE },
        { category: 'F', totalTime: totalTimeofF },
    ];

    const fetchLineChartData = (category: string) => {
        const filteredData = data
            .map((entry) => ({
                time: entry.Day,
                value: Number(entry[category as keyof typeof entry]),
            }))
            .filter((item) => !isNaN(item.value));

        const aggregatedData = filteredData.reduce<{ [key: string]: number }>((acc, item) => {
            if (acc[item.time] !== undefined) {
                acc[item.time] += item.value;
            } else {
                acc[item.time] = item.value;
            }
            return acc;
        }, {});

        const uniqueFilteredData = Object.entries(aggregatedData).map(([time, value]) => ({
            time,
            value,
        }));

        setLineChartData(uniqueFilteredData);
    };



    return (
        <main className="w-full min-h-screen p-4">

            <section className="flex flex-col gap-8">
                <article className="w-full">
                    <div className="w-full max-w-[450px] md:max-w-[900px] mx-auto">
                        <BarChartComponent
                            data={barChartData}
                            onBarClick={(category) => {
                                setSelectedCategory(category);
                                fetchLineChartData(category);
                            }}
                        />
                    </div>
                </article>

                {selectedCategory && (
                    <article className="w-full">
                        <div className="w-full max-w-[450px] md:max-w-[900px] mx-auto">
                            <h2 className="text-xl font-semibold mb-4">Trend for {selectedCategory}</h2>
                            <LineChart data={lineChartData} />
                        </div>
                    </article>
                )}
            </section>
        </main>
    );
};

export default Dashboard
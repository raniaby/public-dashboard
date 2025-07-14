import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Spin } from "antd";
import { useIsMobile } from "../../hooks/useMobile";

const COLORS = ["#a855f7", "#eab308"];

type TodoChartProps = {
  isLoading: boolean;
  todoSummaries?: {
    meta: {
      total: number;
      completed: number;
      incomplete: number;
      completionRate: number;
    };
  };
};

const TodosChart = ({ isLoading, todoSummaries }: TodoChartProps) => {
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!todoSummaries) {
    return null;
  }

  const data = [
    { name: "Completed", value: todoSummaries.meta.completed },
    { name: "Incomplete", value: todoSummaries.meta.incomplete },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const percentage = ((value / todoSummaries.meta.total) * 100).toFixed(0);
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p
            className={`font-bold ${
              payload[0].name === "Completed"
                ? "text-purple-500"
                : "text-yellow-500"
            }`}
          >
            {value} tasks ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={isMobile ? 60 : 80}
            outerRadius={isMobile ? 90 : 120}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            isAnimationActive={false}
            labelLine={isMobile ? false : true}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
              name,
            }) => {
              if (isMobile) {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={10}
                  >
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              } else {
                return `${name} ${(percent * 100).toFixed(0)}%`;
              }
            }}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TodosChart;

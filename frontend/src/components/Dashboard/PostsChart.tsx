import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Spin } from "antd";
import { useGetDashboardSummaryQuery } from "../../store/posts/postsApi";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      shortName: string;
      userName: string;
      postsCount: number;
    };
  }>;
  label?: string;
}

const PostsChart = () => {
  const { data: chartData, isLoading } = useGetDashboardSummaryQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!chartData) {
    return null;
  }

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{data.userName}</p>
          <p className="text-blue-600">
            Posts: <span className="font-bold">{data.postsCount}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ left: 20, right: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="shortName"
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Bar
            dataKey="postsCount"
            fill="#22c55e"
            name="Number of Posts"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PostsChart;

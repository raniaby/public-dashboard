import { Card, Statistic } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useGetUsersQuery } from "../store/users/usersApi";
import { useGetPostsQuery } from "../store/posts/postsApi";
import { useGetTodosQuery } from "../store/todos/todosApi";
import PostsChart from "../components/Dashboard/PostsChart";
import TodosChart from "../components/Dashboard/TodosChart";

const DashboardPage = () => {
  const { data: usersData } = useGetUsersQuery({ pageSize: 10 });
  const { data: posts } = useGetPostsQuery({});
  const { data: todos, isLoading: isTodosLoading } = useGetTodosQuery();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Monitor key metrics and performance indicators
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Card
          variant="borderless"
          className="hover:shadow-md transition-shadow flex-1 basis-[240px]"
        >
          <Statistic
            title="Total Users"
            value={usersData?.total || 0}
            prefix={<UserOutlined className="text-blue-500" />}
          />
        </Card>
        <Card
          variant="borderless"
          className="hover:shadow-md transition-shadow flex-1 basis-[240px]"
        >
          <Statistic
            title="Total Posts"
            value={posts?.length || 0}
            prefix={<FileTextOutlined className="text-green-500" />}
          />
        </Card>
        <Card
          variant="borderless"
          className="hover:shadow-md transition-shadow flex-1 basis-[240px]"
        >
          <Statistic
            title="Completed Tasks"
            value={todos?.meta.completed || 0}
            prefix={<CheckCircleOutlined className="text-purple-500" />}
          />
        </Card>
        <Card
          variant="borderless"
          className="hover:shadow-md transition-shadow flex-1 basis-[240px]"
        >
          <Statistic
            title="Completion Rate"
            value={todos?.meta.completionRate || 0}
            suffix="%"
            prefix={<TrophyOutlined className="text-yellow-500" />}
          />
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-[2]">
          <Card
            title="Posts by User"
            variant="borderless"
            className="hover:shadow-md transition-shadow h-full"
          >
            <PostsChart />
          </Card>
        </div>
        <div className="flex-1">
          <Card
            title="Todo Status"
            variant="borderless"
            className="hover:shadow-md transition-shadow h-full"
          >
            <TodosChart isLoading={isTodosLoading} todoSummaries={todos} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

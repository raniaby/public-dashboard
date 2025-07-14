import { Table, Input, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useGetUsersQuery, type User } from "../../store/users/usersApi";
import { useState } from "react";
import type { SorterResult } from "antd/es/table/interface";
import { useDebounce } from "../../hooks/useDebounce";

const UsersTable = () => {
  const [searchText, setSearchText] = useState("");
  const [sortField, setSortField] = useState<string>();
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend">();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const debouncedSearch = useDebounce(searchText);

  const { data: usersData, isLoading } = useGetUsersQuery({
    search: debouncedSearch,
    sortField,
    sortOrder,
    page,
    pageSize,
  });

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPage(1);
  };

  const handleTableChange = (
    pagination: any,
    _: any,
    sorter: SorterResult<User> | SorterResult<User>[]
  ) => {
    if (!Array.isArray(sorter)) {
      setSortField(sorter.field as string);
      setSortOrder(sorter.order as "ascend" | "descend" | undefined);
    }
    setPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      sorter: true,
      width: 200,
      className: "font-medium",
    },
    {
      title: "Username",
      key: "username",
      dataIndex: "username",
      sorter: true,
      width: 150,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      sorter: true,
      width: 250,
      render: (email) => (
        <a
          href={`mailto:${email}`}
          className="text-blue-500 hover:text-blue-700"
        >
          {email}
        </a>
      ),
    },
    {
      title: "Company",
      key: "company.name",
      dataIndex: ["company", "name"],
      sorter: true,
      width: 200,
      render: (name) => name || "-",
    },
    {
      title: "Website",
      key: "website",
      dataIndex: "website",
      sorter: true,
      width: 200,
      render: (website) => (
        <a
          href={`https://${website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          {website}
        </a>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
        <p className="text-gray-600">
          Manage user information across the platform
        </p>
      </div>

      <Card className="shadow-sm overflow-hidden">
        <div className="mb-6">
          <Input
            placeholder="Search users..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
            className="max-w-xl rounded-lg border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white"
          />
        </div>

        <Table<User>
          columns={columns}
          dataSource={usersData?.data}
          loading={isLoading}
          rowKey="id"
          onChange={handleTableChange}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: usersData?.total || 0,
            position: ["bottomRight"],
            pageSizeOptions: [5, 10, 20, 50, 100],
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`,
            showQuickJumper: true,
          }}
          scroll={{ x: true }}
          className="overflow-x-auto"
        />
      </Card>
    </div>
  );
};

export default UsersTable;

import { Breadcrumb, Button, Drawer, Space, Table } from "antd";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import type { User } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilter from "./UsersFilter";
import { useState } from "react";

const coloumns = [
{
  title: "ID",
  dataIndex: "id",
  key: "id",
},

  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_text:string, record: User) => (
      <Link to={`/users/${record.id}`}>
       {record.firstName} {record.lastName}
      </Link>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
]



export default function Users() {

  const [drawerOpen, setDrawerOpen] = useState(false);

     const [filterForm] = Form.useForm();

     const onFilterChange = (changedValues: any) => {
      console.log(changedValues);
     }
  // ✅ Fetch users via React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await getUsers();
      return res.data; // ✅ must return data
    },
  });

      const {user} = useAuthStore();

      if(user?.role !== "admin") {
        return <Navigate to="/" replace={true} />
      }




  return (
    <>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          {
            title: <Link to="/">Dashboard</Link>,
          },
          {
            title: "Users",
          },
        ]}
      />

      {/* ✅ Handle Loading */}
      {isLoading && <div>Loading...</div>}

      {/* ✅ Handle Error */}
      {isError && (
        <div style={{ color: "red" }}>{(error as Error).message}</div>
      )}

                <Form form={filterForm} onValuesChange={onFilterChange}>
                    <UsersFilter>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() =>{setDrawerOpen(true)}}>
                            Add User
                        </Button>
                    </UsersFilter>
                </Form>

      {/* ✅ Render Users */}
      {data && (
        <div style={{ marginTop: 16 }}>
          <Table columns={coloumns} dataSource={data}  rowKey="id"/>
        </div>
      )}

      <Drawer title="Add User"
       open={drawerOpen} onClose={() => { setDrawerOpen(false)}}
          width={720}
          styles={{ body: { backgroundColor: "#fff" } }}
          destroyOnClose={true}
          extra={
          <Space>
              <Button onClick={() => {setDrawerOpen(false)}}>Cancel</Button>
            <Button type="primary" onClick={() => {}}>Submit</Button>
          </Space>
          }
        
        >


      </Drawer>
    </>
  );
}

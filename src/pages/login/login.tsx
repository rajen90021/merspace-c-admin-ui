
import {
  Layout,
  Card,
  Space,
  Form,
  Input,
  Checkbox,
  Button,
  Flex,
  Alert,
  
} from "antd";
import {
  LockFilled,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import Logo from "../../components/icons/Logo";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Credentials } from "../../types";
import { login } from "../../http/api";
import { self } from '../../http/api';


const loginUser = async (credentials: Credentials) => {
  const {data }=   await login(credentials);
  return data;
};


const getSelfInfo = async () => {
 const {data }=   await self();
  return data;
}

export default function Login() {


const {data: selfData ,refetch}= useQuery({

    queryKey: ['selfInfo'],
    queryFn: async ()=>{
      const {data} = await getSelfInfo();
      return data;
    },
    enabled: false, // disable automatic query on mount
  });

  const { mutate ,isPending ,isError ,error}= useMutation({
   
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: async ()=>{
      // get self info
      await refetch();
      console.log("user data ",selfData);
      // store in the state
      console.log("Login successful");
    }
  });

 

  return (
    <Layout
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Space direction="vertical" align="center" size="large">
        {/* Header / Logo Section */}
        <Layout.Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Logo />
        </Layout.Content>

        {/* Login Card */}
        <Card
          bordered={false}
          style={{ width: 320 }}
          title={
            <Space
              style={{
                width: "100%",
                fontSize: 16,
                justifyContent: "center",
              }}
            >
              <LockFilled />
              Sign In
            </Space>
          }
        >
          <Form
            name="login-form"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={(values) => {
                                mutate({ email: values.username, password: values.password });
                                console.log(values);
                            }}>
                            {isError && (
                                <Alert
                                    style={{ marginBottom: 24 }}
                                    type="error"
                                    message={error?.message}
                                />
                            )}
            {/* Username */}
            <Form.Item
              name="username"
              label="Email"
              rules={[
                { required: true, message: "Please input your username!" },
                { type: "email", message: "Email is not valid" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your email"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Form.Item>

            {/* Remember me + Forgot password */}
            <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="#" id="login-form-forgot">
                Forgot password?
              </a>
            </Flex>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ borderRadius: 6 }}
                loading={isPending}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </Layout>
  );
}

import {
  Button,
  Card,
  Col,
  List,
  Row,
  Skeleton,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import Icon from "@ant-design/icons";
import { useAuthStore } from "../store";
import { BarChartIcon } from "../components/icons/BarChart";
import BasketIcon from "../components/icons/BasketIcon";
import { Link } from "react-router-dom";
import { useEffect, useState, type ComponentType } from "react";

const { Title, Text } = Typography;

const list = [
  {
    OrderSummary: "Peperoni, Margarita ...",
    address: "Bandra, Mumbai",
    amount: 1200,
    status: "preparing",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
];

interface CardTitleProps {
  title: string;
  PrefixIcon: ComponentType<unknown>;
}

const CardTitle = ({ title, PrefixIcon }: CardTitleProps) => {
  return (
    <Space>
      <Icon component={PrefixIcon} />
      {title}
    </Space>
  );
};

function HomePage() {
  const { user } = useAuthStore();
  const [seconds, setSeconds] = useState(0);
  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  // Convert seconds into mm:ss format
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={4}>Welcome, {user?.firstName} 😀</Title>
        </Col>
        <Col>
          <Tag
            color="green"
            style={{
              fontSize: "1rem",
              padding: "6px 5px",
              marginBottom: "5px",
            }}
          >
            ⏱ {formatTime(seconds)}
          </Tag>
        </Col>
      </Row>
      <Row className="mt-4" gutter={16}>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic title="Total orders" value={52} />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Total sale"
                  value={70000}
                  precision={2}
                  prefix="₹"
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card
                title={<CardTitle title="Sales" PrefixIcon={BarChartIcon} />}
                bordered={false}
              ></Card>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Card
            bordered={false}
            title={<CardTitle title="Recent orders" PrefixIcon={BasketIcon} />}
          >
            <List
              className="demo-loadmore-list"
              loading={false}
              itemLayout="horizontal"
              loadMore={true}
              dataSource={list}
              renderItem={(item) => (
                <List.Item>
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      title={
                        <a href="https://ant.design">{item.OrderSummary}</a>
                      }
                      description={item.address}
                    />
                    <Row style={{ flex: 1 }} justify="space-between">
                      <Col>
                        <Text strong>₹{item.amount}</Text>
                      </Col>
                      <Col>
                        <Tag color="volcano">{item.status}</Tag>
                      </Col>
                    </Row>
                  </Skeleton>
                </List.Item>
              )}
            />
            <div style={{ marginTop: 20 }}>
              <Button type="link">
                <Link to="/orders">See all orders</Link>
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;

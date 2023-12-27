import { Avatar, Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { getLogin } from "../../API";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await getLogin(values);
      const { reason, token } = response;

      if (reason === "Success.") {
        // Lưu token vào localStorage
        localStorage.setItem("token", token);

        // Chuyển hướng đến /dashboard
        navigate("/");

        // Hiển thị thông báo thành công
        message.success("Login successfully");
      } else {
        // Hiển thị thông báo lỗi
        message.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Xử lý lỗi
      console.error(error);
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="Login"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 300, marginLeft: 650 }}>
        <div className="TopSection" style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <Avatar size={40} src={"https://cdn-icons-png.flaticon.com/512/8002/8002111.png"} icon={<UserOutlined />} style={{ marginRight: 10, marginLeft: 20, marginTop: 15 }} />
        <Title level={3}>
            Nahama
        </Title>
        </div>
        <Form name="login" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Tên đăng nhập"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
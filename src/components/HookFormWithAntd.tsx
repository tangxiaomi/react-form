import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useForm, Controller } from "react-hook-form";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};


export const HookFormWithAntd = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<any>();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
  console.log(errors);
};

// const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={handleSubmit(onFinish)}
      autoComplete="off"
    >
      <Controller
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Form.Item label="用户名" required help={errors.username && "Please input your username!"} validateStatus={errors.username ? 'error' : ''} >
            <Input {...field} />
          </Form.Item>
        )}
      />

        <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Form.Item label="密码" required help={errors.password && "Please input your password!"} validateStatus={errors.password ? 'error' : ''} >
            <Input {...field} />
          </Form.Item>
        )}
      />

      <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

import { useState } from 'react';

export default function NativeForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value); // 实时校验
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'username':
        error = !value ? '用户名必填' : '';
        break;
      case 'email':
        error = !value.includes('@') ? '邮箱格式错误' : '';
        break;
      case 'password':
        error = value.length < 6 ? '密码至少6位' : '';
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(errors).every((x) => !x);
    if (isValid) {
      console.log('提交成功:', formData);
    }
  };

  const isFormValid = Object.values(formData).every((x) => x) && 
                     Object.values(errors).every((x) => !x);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>用户名</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
      </div>

      <div>
        <label>邮箱</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <div>
        <label>密码</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>

      <button type="submit" disabled={!isFormValid}>
        提交
      </button>
    </form>
  );
}
import { useContext } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormContext } from '../../../contexts/FormContext.tsx';
import { type FormData } from '../../../types/formTypes.ts';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dateOfBirth: yup.date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .typeError('Please enter a valid date'),
});

interface FormStep1Props {
  nextStep: () => void;
}

export default function FormStep1({ nextStep }: FormStep1Props) {
  const { formData, updateFormData } = useContext(FormContext)!;
  
  const { register, handleSubmit, formState: { errors, isValid }, watch, control } = useForm<Partial<FormData>>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
    },
    mode: 'onChange', // 实时校验模式
  });
  // 作用：在组件内部监听一个或多个字段值的变化，触发组件重新渲染。默认不监听任何字段，必须指明字段名才可以
  // 适用场景：需要实时响应字段变化的简单逻辑（如显示/隐藏字段、简单计算）。
   const firstNameShow = watch('firstName');
  //  const [username, email] = watch(['username', 'email']); // 监听多个字段
//   二、useWatch：隔离重渲染（性能优化）
//   作用：在子组件中监听字段变化，避免父组件因字段变化而重新渲染。
//   适用场景：表单字段较多或需要优化性能时，将监听逻辑隔离到子组件。


  const onSubmit = (data: Partial<FormData>) => {
    updateFormData(data);
    nextStep();
  };

  // 子组件

  interface ChildLastNameProps {
    control: any;
  }

  const ChildLastName = ({ control }: ChildLastNameProps) => {
    const lastName = useWatch({ control, name: 'lastName' }); // 隔离监听
    return (
    <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" {...register('lastName')} />
        <p>子组件接收的用户名: {lastName}</p>
        {errors.lastName && <span className="error">{errors.lastName.message}</span>}
      </div> 
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-step">
      <h2>Basic Information</h2>
      
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" {...register('firstName')} />
        <p>{firstNameShow}</p> {/* 实时显示用户名 */}
        {errors.firstName && <span className="error">{errors.firstName.message}</span>}
      </div>
      
      <ChildLastName control={control}/>
      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input 
          id="dateOfBirth" 
          type="date" 
          {...register('dateOfBirth')} 
          max={new Date().toISOString().split('T')[0]}
        />
        {errors.dateOfBirth && <span className="error">{errors.dateOfBirth.message}</span>}
      </div>
      
      <div className="form-actions">
        <button type="submit" className="text-red-100 text-9xl bg-blue-100" disabled={!isValid}>Next</button>
      </div>
    </form>
  );
}
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormContext } from '../contexts/FormContext';
import { type FormData } from '../types/formTypes.ts';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase, one lowercase, one number and one special character'
    )
    .required('Password is required'),
});

interface FormStep3Props {
  nextStep: () => void;
  prevStep: () => void;
}

export default function FormStep3({ nextStep, prevStep }: FormStep3Props) {
  const { formData, updateFormData } = useContext(FormContext)!;
  
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<FormData>>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: formData.email,
      password: formData.password,
    }
  });

  const onSubmit = (data: Partial<FormData>) => {
    updateFormData(data);
    nextStep();
    console.log('123')
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-step">
      <h2>Account Information</h2>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>
      
      <div className="form-actions">
        <button type="button" className="btn-prev" onClick={prevStep}>Back</button>
        <button type="submit" className="btn-next">Next</button>
      </div>
    </form>
  );
}

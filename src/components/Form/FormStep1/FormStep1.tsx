import { useContext } from 'react';
import { useForm } from 'react-hook-form';
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
  
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<FormData>>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
    }
  });

  const onSubmit = (data: Partial<FormData>) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-step">
      <h2>Basic Information</h2>
      
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" {...register('firstName')} />
        {errors.firstName && <span className="error">{errors.firstName.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" {...register('lastName')} />
        {errors.lastName && <span className="error">{errors.lastName.message}</span>}
      </div>
      
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
        <button type="submit" className="btn-next">Next</button>
      </div>
    </form>
  );
}
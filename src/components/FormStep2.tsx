import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormContext } from '../contexts/FormContext';
import { type FormData } from '../types/formTypes.ts';

const schema = yup.object({
  country: yup.string().required('Country is required').nullable().defined(),
  gender: yup.string().required('Gender is required').nullable().defined(),
});

interface FormStep2Props {
  nextStep: () => void;
  prevStep: () => void;
}

export default function FormStep2({ nextStep, prevStep }: FormStep2Props) {
  const { formData, updateFormData } = useContext(FormContext)!;
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<FormData>>({
    resolver: yupResolver(schema),
    defaultValues: {
      country: formData.country,
      gender: formData.gender,
    }
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        updateFormData({ avatar: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: Partial<FormData>) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-step">
      <h2>Personal Details</h2>
      
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select id="country" {...register('country')}>
          <option value="">Select Country</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
        </select>
        {errors.country && <span className="error">{errors.country.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select id="gender" {...register('gender')}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
        {errors.gender && <span className="error">{errors.gender.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="avatar">Avatar (Optional Upload)</label>
        <input 
          id="avatar"
          type="file" 
          accept="image/*" 
          onChange={handleAvatarChange} 
        />
        {avatarPreview && (
          <div className="avatar-preview">
            <img src={avatarPreview} alt="Avatar preview" />
          </div>
        )}
      </div>
      
      <div className="form-actions">
        <button type="button" className="btn-prev" onClick={prevStep}>Back</button>
        <button type="submit" className="btn-next">Next</button>
      </div>
    </form>
  );
}
import { createContext, useState, type ReactNode } from 'react';
import { type FormData, type FormContextType, type SubmissionStatus } from '../types/formTypes.ts';
export const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    gender: '',
    avatar: null,
    email: '',
    password: '',
  });
  
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus | null>(null);

  const updateFormData = (newData: Partial<FormData>) => {
    // 可以拿做最新的prev, 如果直接使用formData 多次调用的情况下拿到的可能不是最新的
    setFormData((prev: FormData) => ({ ...prev, ...newData }));
  };

  return (
    <FormContext.Provider value={{
      formData,
      updateFormData,
      currentStep,
      setCurrentStep,
      submissionStatus,
      setSubmissionStatus
    }}>
      {children}
    </FormContext.Provider>
  );
};
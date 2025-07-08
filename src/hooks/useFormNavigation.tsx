import { useContext } from 'react';
import { FormContext } from '../contexts/FormContext';

export const useFormNavigation = () => {
  const { currentStep, setCurrentStep } = useContext(FormContext);
  
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  return { nextStep, prevStep, currentStep };
};
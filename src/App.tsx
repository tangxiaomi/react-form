import { useContext } from 'react';
import { FormContext, FormProvider } from './contexts/FormContext';
import FormProgress from './components/FormProgress/FormProgress';
import FormStep1 from './components/Form/FormStep1/FormStep1';
import FormStep2 from './components/FormStep2';
import FormStep3 from './components/FormStep3';
import FormStep4 from './components/FormStep4';
import Notification from './components/Notification';
import NativeForm from './components/NativeForm';
import 'antd/dist/reset.css'; 
import { Button } from 'antd';
import '@/styles/Form.scss';
import AntdForm from './components/AntdForm';
import { HookFormWithAntd } from './components/HookFormWithAntd';

export default function App() {
  return (
    <FormProvider>
      <FormContent />
    </FormProvider>
  );
}

function FormContent() {
  const { currentStep, setCurrentStep } = useContext(FormContext)!;
  
  const nextStep = () => setCurrentStep(prev => {console.log('123'); return Math.min(prev + 1, 4)});
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className='app-container'>
      <h1>Multi-Step Registration</h1>
      
      <FormProgress />
      
      <div className='form-wrapper'>
        <HookFormWithAntd/>
        <AntdForm/>
        <NativeForm/>
        <Button type="primary">Button</Button>
        {currentStep === 1 && <FormStep1 nextStep={nextStep} />}
        {currentStep === 2 && <FormStep2 nextStep={nextStep} prevStep={prevStep} />}
        {currentStep === 3 && <FormStep3 nextStep={nextStep} prevStep={prevStep} />}
        {currentStep === 4 && <FormStep4 prevStep={prevStep} />}
      </div>
      
      <Notification />
    </div>
  );
}
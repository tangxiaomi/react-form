import { useContext } from 'react';
import { FormContext } from '../../contexts/FormContext';
import styles from  './Progress.module.scss';

const steps = ['Basic Info', 'Details', 'Account', 'Confirmation'];

export default function FormProgress() {
  const { currentStep } = useContext(FormContext)!;
  console.log(currentStep)
  
  return (
    <div className={styles.progressContainer}>
      {steps.map((step, index) => (
        <div 
          key={step}
          className={`${styles.progressStep} ${index + 1 <= currentStep ? styles.active : ''}`}
        >
          <div className={styles.stepNumber}>{index + 1}</div>
          <div className={styles.stepLabel}>{step}</div>
        </div>
      ))}
    </div>
  );
}
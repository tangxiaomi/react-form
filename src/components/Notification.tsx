import { useContext } from 'react';
import { FormContext } from '../contexts/FormContext';

export default function Notification() {
  const { submissionStatus, setSubmissionStatus } = useContext(FormContext)!;
  
  if (!submissionStatus) return null;
  
  return (
    <div className={`notification ${submissionStatus.success ? 'success' : 'error'}`}>
      <p>{submissionStatus.message}</p>
      <button 
        onClick={() => setSubmissionStatus(null)}
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
}

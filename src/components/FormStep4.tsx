import { useContext, useState } from 'react';
import { FormContext } from '../contexts/FormContext';

interface FormStep4Props {
  prevStep: () => void;
}

export default function FormStep4({ prevStep }: FormStep4Props) {
  const { formData, setSubmissionStatus } = useContext(FormContext)!;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmissionStatus({ success: true, message: 'Registration successful!' });
    } catch (error) {
        console.log(error);
      setSubmissionStatus({ 
        success: false, 
        message: 'Registration failed. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-step">
      <h2>Confirmation</h2>
      
      <div className="summary">
        <h3>Please review your information:</h3>
        
        <div className="summary-item">
          <strong>Name:</strong> {formData.firstName} {formData.lastName}
        </div>
        
        <div className="summary-item">
          <strong>Date of Birth:</strong> {formData.dateOfBirth.toString()}
        </div>
        
        <div className="summary-item">
          <strong>Country:</strong> {formData.country}
        </div>
        
        <div className="summary-item">
          <strong>Gender:</strong> {formData.gender}
        </div>
        
        {formData.avatar && (
          <div className="summary-item">
            <strong>Avatar:</strong> {formData.avatar.name}
          </div>
        )}
        
        <div className="summary-item">
          <strong>Email:</strong> {formData.email}
        </div>
      </div>
      
      <div className="form-actions">
        <button type="button" className="btn-prev" onClick={prevStep}>Back</button>
        <button 
          type="button" 
          className="btn-submit" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </div>
    </div>
  );
}

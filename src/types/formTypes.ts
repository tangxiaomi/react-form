export interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  gender: string;
  avatar: File | null;
  email: string;
  password: string;
}

export interface SubmissionStatus {
  success: boolean;
  message: string;
}

export interface FormContextType {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  submissionStatus: SubmissionStatus | null;
  setSubmissionStatus: (status: SubmissionStatus | null) => void;
}
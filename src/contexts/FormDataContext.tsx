import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { GetawayFormData } from '../types/getaway';

export interface SubmissionResult {
  payload: GetawayFormData;
  status: 'SUCCESS' | 'API_ERROR' | 'NETWORK_ERROR' | 'LOCAL_SAVE';
  statusCode: number | null;
}

interface FormDataContextProps {
  submissionData: SubmissionResult | null;
  setSubmissionData: React.Dispatch<React.SetStateAction<SubmissionResult | null>>;
}

const FormDataContext = createContext<FormDataContextProps | undefined>(undefined);

export const useFormData = (): FormDataContextProps => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};

export const FormDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [submissionData, setSubmissionData] = useState<SubmissionResult | null>(null);

  return (
    <FormDataContext.Provider value={{ submissionData, setSubmissionData }}>
      {children}
    </FormDataContext.Provider>
  );
};
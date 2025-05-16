import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../contexts/UserAuthContext';
import StepIndicator from './StepIndicator';
import StepSelfie from './StepSelfie';
import StepSelfiePrev from './StepSelfiePrev';
import StepIdFront from './StepIdFront';
import StepIdFrontPrev from './StepIdFrontPrev';
import StepIdBack from './StepIdBack';
import StepIdBackPrev from './StepIdBackPrev';
import StepReview from './StepReview';
import StepSubmit from './StepSubmit';

const TOTAL_STEPS = 8;

const RegistrationWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { registrationData } = useUserAuth();
  const navigate = useNavigate();

  const goToNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <StepSelfie onNext={goToNext} />;
      case 2:
        return <StepSelfiePrev onNext={goToNext} onBack={goToPrevious} />;
      case 3:
        return <StepIdFront onNext={goToNext} onBack={goToPrevious} />;
      case 4:
        return <StepIdFrontPrev onNext={goToNext} onBack={goToPrevious} />;
      case 5:
        return <StepIdBack onNext={goToNext} onBack={goToPrevious} />;
      case 6:
        return <StepIdBackPrev onNext={goToNext} onBack={goToPrevious} />;
      case 7:
        return <StepReview onNext={goToNext} onBack={goToPrevious} />;
      case 8:
        return <StepSubmit onDone={() => navigate('/login')} />;
      default:
        return <StepSelfie onNext={goToNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">Verificación de Identidad</h1>
          {currentStep < 8 && (
            <button
              onClick={() => navigate('/login')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancelar
            </button>
          )}
        </div>
      </header>

      <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      <main className="flex-1 flex flex-col p-4">
        {renderCurrentStep()}
      </main>
    </div>
  );
};

export default RegistrationWizard;
import React, { useState } from "react";

const steps = [
  "Persoonlijke gegevens ",
  "Boek instellingen ",
  "Programma & bestellingen",
];

const MultiStepComponent1 = ({ onValueChange, activeComponent }) => {
  const [activeStep, setActiveStep] = useState(activeComponent);

  const handleStepClick = (index) => {
    setActiveStep(index);

    onValueChange(index); // Update active step
  };

  return (
    <div className="stepper-containerx">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`stepx ${index === activeStep ? "active" : ""}`}
          onClick={() => handleStepClick(index)}
        >
          <span className="step-labelx">{step}</span>
        </div>
      ))}

      {/* <div className="navigation">
                <button onClick={() => setActiveStep(activeStep - 1)} disabled={activeStep === 0}>
                    Previous
                </button>
                <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    disabled={activeStep === steps.length - 1}
                >
                    Next
                </button>
            </div> */}
    </div>
  );
};

export default MultiStepComponent1;

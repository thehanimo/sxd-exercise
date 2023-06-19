import React from "react";

import { useActor } from "@xstate/react";
import { ProgressBar as PB, Step } from "react-step-progress-bar";

function ProgressBar({ appMachineService }) {
  const [{ value }] = useActor(appMachineService);
  let percent = 0;
  if (value === "survey") percent = 50;
  if (value === "confirmation") percent = 100;
  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-container">
        <PB
          percent={percent}
          filledBackground="#212529"
          unfilledBackground="#CCC"
          height={4}
        >
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              >
                {index + 1}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              >
                {index + 1}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              >
                {index + 1}
              </div>
            )}
          </Step>
        </PB>
      </div>
    </div>
  );
}

export default ProgressBar;

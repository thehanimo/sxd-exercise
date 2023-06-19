import React from "react";

import { useActor } from "@xstate/react";
import { useState } from "react";

function Confirmation({ appMachineService }) {
  const [
    {
      context: { userInfo, survey },
    },
    send,
  ] = useActor(appMachineService);
  const [submitted, setSubmitted] = useState(false);

  const goBack = () => {
    send({ type: "BACK_TO_SURVEY" });
  };

  const submit = () => {
    setSubmitted(true);
  };

  if (submitted)
    return (
      <div className="bg">
        <div className="form-container">
          <h1 style={{ marginBottom: 48, textAlign: "center" }}>
            Your submission has been recorded
          </h1>
          <button
            className="button"
            style={{ marginTop: 16, alignSelf: "center" }}
            onClick={() => send({ type: "RESET" })}
          >
            Start over
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg">
      <div className="form-container">
        <h1 style={{ marginBottom: 48 }}>Confirmation</h1>
        <label className="input-label">Name</label>
        <div className="input">{userInfo.name}</div>
        <label className="input-label">Email</label>
        <div className="input">{userInfo.email}</div>
        {survey.questions.map((question) => (
          <>
            <label className="input-label">
              {question.q}
              {question.required && "*"}
            </label>
            {question.type === "radio" ? (
              <div className="input">
                {survey.responses[question.name] || "None"}
              </div>
            ) : (
              <div className="input">
                {question.options
                  .filter(
                    (x) => (survey.responses[question.name] || {})[x] === true
                  )
                  .join(", ") || "None"}
              </div>
            )}
          </>
        ))}
        <div className="button-group">
          <button className="button" style={{ marginTop: 16 }} onClick={goBack}>
            Back
          </button>
          <button className="button" style={{ marginTop: 16 }} onClick={submit}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;

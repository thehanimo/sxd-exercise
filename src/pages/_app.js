import React from "react";

import { useMachine } from "@xstate/react";
import { appMachine } from "../appMachine";

import "@/styles/app.css";
import "react-step-progress-bar/styles.css";
import Confirmation from "../Components/Confirmation/Confirmation";
import Survey from "../Components/Survey/Survey";
import UserInformation from "../Components/UserInformation/UserInformation";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import Head from "next/head";

function App() {
  const [state, , service] = useMachine(appMachine);
  return (
    <>
      <Head>
        <title>SXD Frontend Exercise</title>
      </Head>
      <div>
        <ProgressBar appMachineService={service} />
        {state.value === "userInfo" && (
          <UserInformation appMachineService={service} />
        )}
        {state.value === "survey" && <Survey appMachineService={service} />}
        {state.value === "confirmation" && (
          <Confirmation appMachineService={service} />
        )}
      </div>
    </>
  );
}

export default App;

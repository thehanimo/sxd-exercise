import { useMachine } from "@xstate/react";
import { appMachine } from "./appMachine";

import './App.css';
import Confirmation from './Components/Confirmation/Confirmation';
import Survey from './Components/Survey/Survey';
import UserInformation from './Components/UserInformation/UserInformation';

import ProgressBar from "./Components/ProgressBar/ProgressBar";

function App() {
  const [state, send, service] = useMachine(appMachine);
  return (
    <div>
      <ProgressBar appMachineService={service}/>
      {state.value === "userInfo" && <UserInformation appMachineService={service}/>}
  {state.value === "survey" && <Survey appMachineService={service}/>}
  {state.value === "confirmation" && <Confirmation appMachineService={service}/>}
    </div>
  )
  
}

export default App;

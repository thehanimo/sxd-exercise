import { useMachine } from "@xstate/react";
import { appMachine } from "./appMachine";

import './App.css';
import Confirmation from './Components/Confirmation/Confirmation';
import Survey from './Components/Survey/Survey';
import UserInformation from './Components/UserInformation/UserInformation';

function App() {
  const [state, send, service] = useMachine(appMachine);
  if (state.value === "userInfo") return <UserInformation appMachineService={service}/>;
  if (state.value === "survey") return <Survey appMachineService={service}/>;
  return <Confirmation appMachineService={service}/>;
}

export default App;

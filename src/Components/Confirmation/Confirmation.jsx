import { useActor } from '@xstate/react';
import './Confirmation.css';

function Confirmation({appMachineService}) {
  const [{context: {userInfo, survey}}, send] = useActor(appMachineService);
  
  const goBack = () => {
    send({ type: 'BACK_TO_SURVEY' });
  }

  return (
    <div className='bg'>
      <div className='form-container'>
        <h1 style={{marginBottom: 48}}>Confirmation</h1>
        <label className='input-label'>Name</label>
        <div className='input'>{userInfo.name}</div>
        <label className='input-label'>Email</label>
        <div className='input'>{userInfo.email}</div>
        {survey.questions.map(question=>(
          <>
            <label className='input-label'>{question.q}</label>
            {question.type === "radio" ? (
              <div className='input'>{survey.responses[question.name] || "None"}</div>
            ) : (
              <div className='input'>{Object.keys(survey.responses[question.name] || {}).filter(x=>survey.responses[question.name][x] === true).join(", ") || "None"}</div>
            )}
            
          </>
        ))}
        <div className='button-group'>
          <button className='button' style={{marginTop: 16}} onClick={goBack}>Back</button>
          <button className='button' style={{marginTop: 16}}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;

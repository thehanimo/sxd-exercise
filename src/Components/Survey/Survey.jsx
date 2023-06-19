import { useState } from 'react';
import './Survey.css';
import { useActor } from '@xstate/react';

function Survey({appMachineService}) {
  const [{context: {survey}}, send] = useActor(appMachineService);
  const {questions} = survey;

  const [responses, setResponses] = useState(survey.responses);
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(survey.hasSubmittedOnce)

  const recordResponse = (e)=>{
    const {value, name, checked, type} = e.target;
    const _responses = responses;
    if (type === 'radio') {
      _responses[name] = value;
    } else {
      if (!_responses[name]) _responses[name] = {}
      _responses[name][value] = checked
    }
    setResponses({..._responses})
  }

  const verify = (force = true) => {
    if (!hasSubmittedOnce && !force) return;
    for(let i = 0; i < questions.length; i += 1){
      if (questions[i].required && !responses[questions[i].name]) return false;
    }
    return true;
  }

  const submit = ()=>{
    if (!hasSubmittedOnce) setHasSubmittedOnce(true);
    if (verify(true)) {
        send({ type: 'SUBMIT_SURVEY', survey: {
            responses,
          } });
    }
  }

  const goBack = ()=>{
    send({ type: 'BACK_TO_USER_INFO' });
  }

  return (
    <div className='bg'>
      <div className='form-container'>
        <h1 style={{marginBottom: 48}}>Survey</h1>
        {questions.map(question=>(
          <div style={{marginBottom: 16, width: "100%"}}>
          <label className='input-label'>{question.q}</label>
          {hasSubmittedOnce && question.required && !responses[question.name] && <p className='input-error-label' style={{marginTop: -2, marginBottom: 4}}>Please select a value</p>}
          {question.options.map(opt=>(
              <div className='mcq-group'>
                <input className='mcq-input' type={question.type} id={opt} name={question.name} value={opt} onChange={recordResponse} checked={question.type === 'radio'? responses[question.name] === opt : (responses[question.name] || {})[opt] === true}/>
                <label className="mcq-label" htmlFor={question.name}>{opt}</label>
              </div>
          ))}
          </div>
        ))}
        <div className='button-group'>
          <button className='button' style={{marginTop: 16}} onClick={goBack}>Back</button>
          <button className='button' style={{marginTop: 16}} onClick={submit}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Survey;

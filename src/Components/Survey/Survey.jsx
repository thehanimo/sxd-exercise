import { useEffect, useState } from 'react';
import './Survey.css';

function Survey() {
  const questions = [
    {
      q: 'Which city are you currently located in?',
      name: 'city',
      type: "radio",
      required: true,
      options: [
        "New York City",
        "Los Angeles",
        "Other"
      ]
    },
    {
      q: 'How did you hear about us?',
      name: 'hear',
      required: true,
      type: "radio",
      options: [
        "Facebook",
        "Instagram",
        "Other"
      ]
    },
    {
      q: 'What brands do you like?',
      name: 'brand',
      required: false,
      type: "checkbox",
      options: [
        "Uniqlo",
        "Zara",
        "Massimo Dutti",
      ]
    }
  ]
  const [responses, setResponses] = useState({});
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false)

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

  const submit = ()=>{
    setHasSubmittedOnce(true);
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
                <input className='mcq-input' type={question.type} id={opt} name={question.name} value={opt} onChange={recordResponse}/>
                <label className="mcq-label" for={question.name}>{opt}</label>
              </div>
          ))}
          </div>
        ))}
        <button className='button' style={{marginTop: 16}} onClick={submit}>Next</button>
      </div>
    </div>
  );
}

export default Survey;

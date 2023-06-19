import { useEffect, useState } from 'react';
import './Confirmation.css';

function Confirmation() {
  return (
    <div className='bg'>
      <div className='form-container'>
        <h1 style={{marginBottom: 48}}>Confirmation</h1>
        <label className='input-label'>Name</label>
        <div className='input'>Hani Mohammed</div>
        <label className='input-label'>Email</label>
        <div className='input'>Hani Mohammed</div>
        <label className='input-label'>Which city are you currently located in?</label>
        <div className='input'>New York City</div>
        <label className='input-label'>How did you hear about us?</label>
        <div className='input'>Other</div>
        <label className='input-label'>What brands do you like?</label>
        <div className='input'>Uniqlo, Zara</div>
        <button className='button' style={{marginTop: 16}}>Submit</button>
      </div>
    </div>
  );
}

export default Confirmation;

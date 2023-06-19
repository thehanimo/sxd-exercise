import { useEffect, useState } from 'react';
import './UserInformation.css';

function UserInformation() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false)

    const verify = () => {
        if (!hasSubmittedOnce) return;
        let flag = true;
        if (name.trim().length === 0) {
          setNameError("Name is required");
          flag = false;
        } else if (name.length > 50) {
            setNameError("Please enter an abbreviated name");
          flag = false;
        } else {
          setNameError("");
        }
    
        if (email.trim().length === 0) {
          setEmailError("Email is required");
          flag = false;
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
          setEmailError("Invalid email");
          flag = false;
        } else {
          setEmailError("");
        }
    
        return flag;
      };

    const submit = ()=> {
        if (!hasSubmittedOnce) setHasSubmittedOnce(true);
    }

    useEffect(()=>{
        if (hasSubmittedOnce) verify();
    }, [hasSubmittedOnce, name, email])
  return (
    <div className='bg'>
      <div className='form-container'>
        <h1 style={{marginBottom: 48}}>User Information</h1>
        <label className='input-label'>Name</label>
        {nameError && <label className='input-error-label'>{nameError}</label>}
        <input className={`input ${nameError?"input-error": ""}`} onChange={(e) => setName(e.target.value)} value={name} />
        <div className='input-label'>Email</div>
        {emailError && <label className='input-error-label'>{emailError}</label>}
        <input className={`input ${nameError?"input-error": ""}`} onChange={(e) => setEmail(e.target.value)} value={email} />
        <button className='button' style={{marginTop: 16}} onClick={submit}>Next</button>
      </div>
    </div>
  );
}

export default UserInformation;

import { useEffect, useState } from 'react';
import './UserInformation.css';
import { useActor } from '@xstate/react';

function UserInformation({appMachineService}) {
    const [{context: {userInfo}}, send] = useActor(appMachineService);
    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [hasSubmittedOnce, setHasSubmittedOnce] = useState(userInfo.hasSubmittedOnce)

    const verify = (force = false) => {
        if (!hasSubmittedOnce && !force) return;
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
        if (verify(true)) {
            send({ type: 'SUBMIT_USER_INFO', userInfo: {
                name,
                email
              } });
        }
    }

    useEffect(()=>{
        if (hasSubmittedOnce) verify();
    }, [hasSubmittedOnce, name, email])
  return (
    <div className='bg'>
      <div className='form-container'>
        <h1 style={{marginBottom: 48}}>User Information</h1>
        <label className='input-label' id="name-label">Name</label>
        {nameError && <label className='input-error-label'>{nameError}</label>}
        <input aria-labelledby="name-label" className={`input ${nameError?"input-error": ""}`} onChange={(e) => setName(e.target.value)} value={name} />
        <label className='input-label' id="email-label">Email</label>
        {emailError && <label className='input-error-label'>{emailError}</label>}
        <input aria-labelledby="email-label" className={`input ${nameError?"input-error": ""}`} onChange={(e) => setEmail(e.target.value)} value={email} />
        <button className='button' style={{marginTop: 16}} onClick={submit}>Next</button>
      </div>
    </div>
  );
}

export default UserInformation;

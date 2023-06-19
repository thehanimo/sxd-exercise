import './UserInformation.css';

function UserInformation() {
  return (
    <div className='bg'>
      <div className='form-container'>
        <h1 style={{marginBottom: 48}}>User Information</h1>
        <label className='input-label'>Name</label>
        <input className='input'/>
        <div className='input-label'>Email</div>
        <input className='input'/>
        <button className='button' style={{marginTop: 16}}>Next</button>
      </div>
    </div>
  );
}

export default UserInformation;

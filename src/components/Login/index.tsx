import { useState, useRef, useEffect } from 'react'
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { store } from '../../app/store';
import { useSelector } from 'react-redux';
import { addUserCompany,getAccessCode } from '../../features/users/usersSlice'
import './index.css'

export default function App() {

  const [inputValue, setInputValue] = useState("");
  const previousInputValue = useRef("");

  useEffect(() => {

    previousInputValue.current = inputValue;
    const accessCode = String(inputValue).toUpperCase();
     if (accessCode == 'SEMBCORP') {
      store.dispatch(addUserCompany('SEMBCORP'));
      navigate('/SEMBCORP');
    }
  }, [inputValue]);

  const navigate = useNavigate();
  const AccessCode = useSelector(getAccessCode);

  return (
    <MDBContainer className="Login" style={{display:'flex',justifyContent:'center',marginBottom:'50px'}}>
      <MDBCard >
        <MDBCardImage src='https://www.newswire.com/blog/wp-content/uploads/2019/03/monitoring.jpg' className='img-fluid' position='top' alt='...' />


        <MDBCardBody>
          <MDBInput label='ACCESS CODE' type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
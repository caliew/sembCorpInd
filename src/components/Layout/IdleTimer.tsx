/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useIdleTimer } from 'react-idle-timer';
import { MDBRow,MDBCol } from 'mdb-react-ui-kit';
import { useTranslation } from 'react-i18next';

export default function AuthLayout () {
  const timeout = 10000
  const [remaining, setRemaining] = useState(timeout)
  const [elapsed, setElapsed] = useState(0)
  const [lastActive, setLastActive] = useState(new Date())
  const [isIdle, setIsIdle] = useState(false)

  const handleOnActive = () => { 
    console.log(elapsed,'..ACTIVE..')
    setIsIdle(false);
  }
  const handleOnIdle = () => {
    console.log(elapsed,'..IDLER..')
    setIsIdle(true)
  }
  const handleOnTimer = () => {
    // store.dispatch(fetchTeaWarehouseSensors());
  }

  const { t, i18n } = useTranslation();

  const { reset,pause,resume,getRemainingTime,getLastActiveTime,getElapsedTime } = useIdleTimer(
    {
      timeout,
      onActive: handleOnActive,
      onIdle: handleOnIdle
    }
  )

  const handleReset = () => reset()
  const handlePause = () => pause()
  const handleResume = () => resume()

  useEffect(() => {
    setRemaining(getRemainingTime())
    const lastActiveTime = getLastActiveTime();
    if (lastActiveTime !== null) {
      setLastActive(lastActiveTime);
    }
    setElapsed(getElapsedTime())

    const interval = setInterval(() => {
      setRemaining(getRemainingTime());
      const lastActiveTime = getLastActiveTime();
      if (lastActiveTime !== null) {
        setLastActive(lastActiveTime);
      };
      setElapsed(getElapsedTime());
      if (getElapsedTime() > 30000 ) {
        console.log('getElapsedTime=',getElapsedTime());
        handleOnTimer();
        reset();
      };
      return () => {
        clearInterval(interval);
      };
    }, 1000)

  }, [])

  return (
    <div className="container" style={{marginTop:'100px'}}>
      <MDBRow className=' bg-light text-dark align-items-center justify-content-center'>
        <MDBCol size='2'><p className='fs-6'>LAPSED:{(elapsed/1000).toFixed(0)}s</p></MDBCol>
        <MDBCol size='6'><p className='fs-6'>LAST ACTIVE: {format(lastActive, 'MM-dd HH:MM')} <span/> IDLE: {String(isIdle).toUpperCase()}</p></MDBCol>
        <MDBCol size='4' >
          <div className='align-items-center justify-content-center pt-2'>
            <button type="button" className='btn btn-primary btn-sm' onClick={handleReset}>RESET</button>
            <button type="button" className='btn btn-primary btn-sm' onClick={handlePause}>PAUSE</button>
            <button type="button" className='btn btn-primary btn-sm' onClick={handleResume}>RESUME</button>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

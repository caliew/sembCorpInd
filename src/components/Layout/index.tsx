import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Header from './Header'
import IdleTimer from './IdleTimer';
import { MDBNavbar, MDBCol, MDBContainer, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBCollapse } from 'mdb-react-ui-kit';
import { getCompanyName } from '../../features/users/usersSlice';
import { useTranslation } from 'react-i18next';

const Layout = () => {

  const { t, i18n } = useTranslation();
  const [timeout, setTimeout] = useState(false)
  let companyName = useSelector(getCompanyName)

  const [showNavCentred, setShowNavCentred] = useState(true);
  
  const CompanyWithVis = ['BALAKONG茶仓温控监管中心']

  function toggleTimeout() {
    setTimeout(!timeout);
  }

  const getNavBar1 = () => {
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-dark text-white fixed-top">
        <div className="container-fluid vh-12" >
            <MDBCol size='2'>
              {/* <img src={logo} className="App-logo" alt="logo" /> */}
              <p className="pink-text m-1 text-center"><MDBIcon icon="warehouse" size="1x" /></p>
            </MDBCol>
            <MDBCol size='8'>
              <p className="mb-n1">TEAX ALLIANCE SDN BHD</p>
              <p className='fs-6'>{t('title')}</p>
            </MDBCol>
            <MDBCol size='2'><Header toggle={toggleTimeout}/></MDBCol>
        </div>
      </div>
    )
  }
  const getNavBar2 = () => {
    return ( 
      <div className="navbar navbar-expand-lg navbar-light bg-dark text-white fixed-top justify-content-center" >
        <MDBNavbar expand='lg' dark bgColor='dark' style={{height:'10px'}}>   
            <MDBCollapse navbar show={false} className=''>
              <MDBNavbarNav fullWidth={true} >
                <MDBNavbarItem>
                  <li className='fs-8 px-5'><MDBIcon fab icon="accusoft" />{companyName}</li>
                </MDBNavbarItem>
                { CompanyWithVis.includes(String(companyName).toUpperCase()) && getMenu() }
                <MDBNavbarItem><li className='fs-8 px-5'><Link to="/">LOGOUT</Link></li></MDBNavbarItem>
                <MDBNavbarItem>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
      </div>
    )
  }
  const getMenu = () => {
    return (
      <>
        <MDBNavbarItem><li className='fs-8 px-5' ><Link to="/main">HOME</Link></li></MDBNavbarItem>
        <MDBNavbarItem><li className='fs-8 px-5' ><Link to="/visz">VISZ</Link></li></MDBNavbarItem>
      </>
    )
  }

  return (
    <div>
      { getNavBar2() }
        { timeout && <IdleTimer />}
        <MDBContainer fluid className='App'>
          <Outlet/>
        </MDBContainer>
      <MDBContainer className=''>
      </MDBContainer>
    </div>
  )
}

export default Layout

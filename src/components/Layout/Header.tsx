import { Link } from "react-router-dom";
import { MDBTypography } from 'mdb-react-ui-kit';

const Header = ({toggle}:{toggle:any}) => {

    return (
        <MDBTypography>
            <ul>
                <li><p className='fs-6 m-0'><Link to="/">HOME</Link></p></li>
                {/* <li><p className='fs-6 m-0'><Link to="sensors">SENSORS</Link></p></li> */}
                {/* <li><p className="fs-6 m-0" onClick={()=>toggle()}>TIMEOUT</p></li> */}
                {/* <li><Link to="newPost"><p className='fs-6 m-0'>NEW POST</p></Link></li> */}
            </ul>
        </MDBTypography >
    )
}

export default Header
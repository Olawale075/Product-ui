import { Link, NavLink } from "react-router-dom";
import { AiFillHome, AiFillBell, AiFillSetting } from "react-icons/ai"
const Sidebar = () => {
    return (
        <div className="bg-light vh-100">
            <div className="text-center p-3">
                <img src={process.env.PUBLIC_URL + '/Avatar.png'} className='rounded-circle img-fluid' 
                style={{maxWidth : '100px'}}/>
                <h6>Oluwaseun Matanmi</h6>
            </div>
            <div className="px-5">
                <NavLink className='sidebar__link' to='/'>
                    <p><AiFillHome /></p>
                    <p className="mx-3">Dashboard</p>
                </NavLink>
                <Link className='sidebar__link' to='/notifications'>
                    <p><AiFillBell /></p>
                    <p className="mx-3">Notifications</p>
                </Link>
                <Link className='sidebar__link' to='/notification'>
                    <p><AiFillSetting /></p>
                    <p className="mx-3">Settings</p>
                </Link>
            </div>

        </div>
    )
}

export default Sidebar;
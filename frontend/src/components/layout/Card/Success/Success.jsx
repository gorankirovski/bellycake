import {React, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import MetaData from '../../MetaData'
import './Success.css'
import { clearCart } from '../../../../actions/cartActions';
const Success = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, []);

  return (
    <>
    <MetaData title={`Payment Successful`}/>
    <div className=''>
        <div className="success_box">
          <div className='thanks_massage'>
            <h2>Thanks for shopping with us</h2>
            <p >Your order has been recieved, you will be notified upon delivery.</p>
            <Link to='/' className='btnss more_shopping_btn' style={{textDecoration: 'none', color: 'black', fontWeight: 'bold'}}>Done</Link>
          </div>
        </div>
    </div>
    </>
  )
}

export default Success
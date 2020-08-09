/**
 * Footer
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const isHome = ()=>{
    return location.pathname.includes("home");
};

const Footer = () => (
   <div className="rct-footer footer d-flex justify-content-between align-items-center">
       <div className="container">
           <div className="row">
               <div className="col-lg d-lg-flex align-items-center">
                   <ul className="nav justify-content-center justify-content-lg-start text-3">
                       <li className="nav-item"><Link className="nav-link" to="/about-us">About Us</Link></li>
                       <li className="nav-item"><Link className="nav-link" to="#">Support</Link></li>
                       <li className="nav-item">
                           {isHome() &&
                           <a className="nav-link" href={"/home#how-it-works"} >How it works</a>
                           }
                           {!isHome() &&
                           <Link className="nav-link" to={"/app/how-it-works"} >How it works</Link>
                           }
                       </li>
                       <li className="nav-item"><Link className="nav-link" to="/terms-and-conditions">Terms & Conditions</Link></li>
                   </ul>
               </div>
               <div className="col-lg d-lg-flex justify-content-lg-end mt-3 mt-lg-0">
                   <ul className="social-icons justify-content-center">
                       <li className="social-icons-facebook">
                           <a data-toggle="tooltip"
                              href="http://www.facebook.com/hamro.remit.96"
                              target="_blank"
                              title="Facebook"
                              data-original-title="Facebook">
                               <i className="fa fa-facebook-f"/>
                           </a>
                       </li>
                       <li className="social-icons-twitter">
                           <a data-toggle="tooltip"
                              href="http://www.twitter.com/"
                              target="_blank"
                              title="Twitter"
                              data-original-title="Twitter">
                               <i className="fa fa-twitter"/>
                           </a>
                       </li>
                       <li className="social-icons-google">
                           <a data-toggle="tooltip"
                              href="http://www.google.com/"
                              target="_blank" title="Google"
                              data-original-title="Google">
                               <i className="fa fa-google"/>
                           </a>
                       </li>
                       <li className="social-icons-youtube">
                           <a data-toggle="tooltip"
                              href="http://www.youtube.com/"
                              target="_blank"
                              title="Youtube"
                              data-original-title="Youtube">
                               <i className="fa fa-youtube"/>
                           </a>
                       </li>
                   </ul>
               </div>
           </div>
           <div className="footer-copyright pt-3 pt-lg-2 mt-2">
               <div className="row">
                   <div className="col-lg">
                       <p className="text-center text-lg-left mb-2 mb-lg-0">Copyright © 2020 <a href="#">Hamro Remit</a>. All
                           Rights Reserved.</p>
                   </div>
               </div>
           </div>
       </div>
   </div>
);

export default Footer;

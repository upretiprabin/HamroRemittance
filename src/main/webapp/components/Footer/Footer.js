/**
 * Footer
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Footer = () => (
   <div className="rct-footer footer d-flex justify-content-between align-items-center">
       <div className="container">
           <div className="row">
               <div className="col-lg d-lg-flex align-items-center">
                   <ul className="nav justify-content-center justify-content-lg-start text-3">
                       <li className="nav-item"><a className="nav-link" href="#">About Us</a></li>
                       <li className="nav-item"><a className="nav-link" href="#">Support</a></li>
                       <li className="nav-item"><a className="nav-link" href="#">FAQ</a></li>
                       <li className="nav-item"><a className="nav-link" href="#">How it works</a></li>
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
                   <div className="col-lg d-lg-flex align-items-center justify-content-lg-end">
                       <ul className="nav justify-content-center">
                           <li className="nav-item"><a className="nav-link" href="#">Security</a></li>
                           <li className="nav-item"><a className="nav-link" href="#">Terms</a></li>
                           <li className="nav-item"><a className="nav-link" href="#">Privacy</a></li>
                       </ul>
                   </div>
               </div>
           </div>
       </div>
   </div>
);

export default Footer;

import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function Footer() {
    return (
        <footer id="footer" className="footer dark-background">
            <div className="container footer-top">
                <div className="row gy-4">
                    <div className="col-md-12">
                        <p className="text-center footer-popular-cities">
                            <strong>Popular Cities</strong> :
                            <a href="sivam-one-way-taxi-chennai.html">Chennai</a> |
                            <a href="sivam-one-way-taxi-bangalore.html">Bangalore</a> |
                            <a href="sivam-one-way-taxi-tirupati.html">Tirupati</a> |
                            <a href="sivam-one-way-taxi-pondicherry.html">Pondicherry</a> |
                            Vellore | Trichy | Salem | Thriuvannamalai | Kallakurichi | Hosur
                            | Cuddalore | Neyveli | Erode | Karur | Thanjavur | Kumbakonam |
                            Chidambaram | Kanniyakumari | Madurai | Tiruchendur | Palani |
                            Kodaikanal | Namakkal | Karur | Kanchipuram | Krishnagiri |
                            Perumbalur | Ooty | Tenkasi | Tiruppur
                        </p>
                    </div>
                    <div className="col-lg-3 col-md-6 footer-about">
                        <a href="index.html" className="logo d-flex align-items-center">
                            <span className="sitename">Sivam Oneway Taxi</span>
                        </a>
                        <div className="footer-contact pt-3">
                            <p>
                                No.4, 2nd Street, Karpaga Vinayagar Street, Perungudi, Chennai -
                                600096.
                            </p>
                            <p className="mt-3">
                                <span className="contact-icon"
                                ><i className="bi bi-telephone"></i
                                ></span>
                                <span>+91 98417 66590</span>
                            </p>
                            <p>
                                <span className="contact-icon"><i className="bi bi-envelope"></i></span>
                                <span>sivamonewaytaxi2022@gmail.com</span>
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 footer-links">
                        <h4>Airport Outstation Taxi</h4>
                        <ul>
                            <li><a href="#">Chennai Airport One Way Taxi</a></li>
                            <li><a href="#">Bangalore Airport One Way Taxi</a></li>
                            <li><a href="#">Tirupati Airport One Way Taxi</a></li>
                            <li><a href="#">Hydrapad Airport One Way Taxi</a></li>
                            <li><a href="#">Coimbatore Airport One Way Taxi</a></li>
                            <li><a href="#">Trichy Airport One Way Taxi</a></li>
                            <li><a href="#">Madurai Airport One Way Taxi</a></li>
                            <li><a href="#">Salem Airport One Way Taxi</a></li>
                            <li><a href="#">Vellore Airport One Way Taxi</a></li>
                            <li><a href="#">Thoothukudi Airport One Way Taxi</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-3 footer-links">
                        <h4>Chennai One Way Taxi</h4>
                        <ul>
                            <li><a href="#">One Way Taxi Chennai to Bangalore</a></li>
                            <li><a href="#">One Way Taxi Chennai to Tirupati</a></li>
                            <li><a href="#">One Way Taxi Chennai to Pondy</a></li>
                            <li><a href="#">One Way Taxi Chennai to Vellore</a></li>
                            <li><a href="#">One Way Taxi Chennai to Salem</a></li>
                            <li><a href="#">One Way Taxi Chennai to Trichy</a></li>
                            <li><a href="#">One Way Taxi Chennai to Coimbatore</a></li>
                            <li><a href="#">One Way Taxi Chennai to Madurai</a></li>
                            <li><a href="#">One Way Taxi Chennai to Cuddalore</a></li>
                            <li><a href="#">One Way Taxi Chennai to Kanyakumari</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-12 footer-links">
                        <h4>One Way Outstation Taxi</h4>
                        <ul>
                            <li><a href="#">One Way Taxi Bangalore to Chennai</a></li>
                            <li><a href="#">One Way Taxi Tirupati to Chennai</a></li>
                            <li><a href="#">One Way Taxi Madurai to Trichy</a></li>
                            <li><a href="#">One Way Taxi Coimbatore to Kodaikanal</a></li>
                            <li><a href="#">One Way Taxi Coimbatore to Salem</a></li>
                            <li><a href="#">One Way Taxi Pondy to Chennai</a></li>
                            <li><a href="#">One Way Taxi Salem to Bangalore</a></li>
                            <li><a href="#">One Way Taxi Rameshwaram to Madurai</a></li>
                            <li><a href="#">One Way Taxi Madurai to Kodaikanal</a></li>
                            <li><a href="#">One Way Taxi Thriuvannamalai to Chennai</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container copyright text-center pb-0">
                <p className="text-center footer-menu-link">
                    <a href="#">Terms of Use</a> | <a href="#">Cancellation Policy</a> |
                    <a href="#">Privacy Policy</a> | <a href="#">FAQs</a>
                </p>
                <div className="social-links d-flex justify-content-center my-4">
                    <a href=""><i className="bi bi-twitter-x"></i></a>
                    <a href=""><i className="bi bi-facebook"></i></a>
                    <a href=""><i className="bi bi-instagram"></i></a>
                    <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
                <p>
                    <span>Copyright</span> © 2025
                    <span className="px-1 sitename">Sivam One Way Taxi</span>
                    <span>All Rights Reserved</span>
                </p>
            </div>
        </footer>
    );
}
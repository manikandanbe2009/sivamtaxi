import Image from "next/image";
export default function Header() {
    return (
        <header id="header" className="header d-flex align-items-center sticky-top">
            <div
                className="container-fluid container-xl position-relative d-flex align-items-center"
            >
                <a href="index.html" className="logo d-flex align-items-center me-auto">
                    <h1 className="sitename">Sivam Oneway Taxi</h1>
                    <span>.</span>
                </a>

                <nav id="navmenu"   className="navmenu">
                    <ul>
                        <li>
                            <a href="/" className="active">Home<br /></a>
                        </li>
                        <li><a href="/about">About</a></li>
                        <li><a href="tariff.html">Tariff</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="cities.html">Cities</a></li>
                        <li><a href="faq.html">Faq</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                </nav>
                <a className="btn-getstarted" href="index.html#about">Book Cab</a>
            </div>
        </header>
    );
}   
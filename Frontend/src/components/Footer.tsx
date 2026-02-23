import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#12141C] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">
              Trade<span className="text-crypto-purple">Bull Forex</span>
            </h2>
            <p className="text-gray-400 mb-6 max-w-xs">
              The most trusted Forex trading platform, empowering traders with
              innovative tools and unparalleled security.
            </p>

            <div className="flex space-x-4">
              <a
                href="#!"
                className="text-gray-400 hover:text-crypto-purple transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#!"
                className="text-gray-400 hover:text-crypto-purple transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#!"
                className="text-gray-400 hover:text-crypto-purple transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#!"
                className="text-gray-400 hover:text-crypto-purple transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="#!"
                className="text-gray-400 hover:text-crypto-purple transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>

            <div className="mt-6">
              <p className="text-white font-semibold mb-2">Nearby Address</p>

              <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4 max-w-md">
                <div className="h-10 w-10 rounded-lg bg-crypto-purple/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-crypto-purple"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.5 10c0 7-7.5 11-7.5 11S4.5 17 4.5 10a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    AUDITORIUM, BGS PU COLLEGE MAHALAKSHMI LAYOUT, 2nd Phase,
                    2nd Stage, Bengaluru, Karnataka 560086
                  </p>

                  <Link
                    to="https://www.google.com/maps/search/?api=1&query=AUDITORIUM%2C%20BGS%20PU%20COLLEGE%20MAHALAKSHMI%20LAYOUT%2C%20Bengaluru%2C%20Karnataka%20560086"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-sm text-crypto-purple hover:text-white transition-colors"
                  >
                    View on Google Maps →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#!"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  Exchange
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  Wallet
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  API
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  Institutional
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  DeFi Platform
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#!"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  Market Data
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#!"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  Legal & Privacy
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Forex. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#!"
                className="text-gray-400 hover:text-crypto-purple text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#!"
                className="text-gray-400 hover:text-crypto-purple text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#!"
                className="text-gray-400 hover:text-crypto-purple text-sm transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

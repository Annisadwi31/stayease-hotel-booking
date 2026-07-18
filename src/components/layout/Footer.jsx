import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">About Hotel</h3>
            <p className="text-slate-400 leading-relaxed">
              StayEase is a modern hotel booking platform for comfortable stays, easy reservations, and premium hospitality.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-slate-400">
              <li>Home</li>
              <li>Rooms</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">Contact</h3>
            <p className="text-slate-400">123 StayEase Avenue</p>
            <p className="text-slate-400">info@stayease.com</p>
            <p className="text-slate-400">+62 812 3456 7890</p>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">Social Media</h3>
            <div className="flex items-center gap-3 text-slate-200">
              <a href="#" aria-label="Facebook" className="rounded-full border border-slate-700 p-3 text-slate-200 hover:bg-slate-800">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Instagram" className="rounded-full border border-slate-700 p-3 text-slate-200 hover:bg-slate-800">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Twitter" className="rounded-full border border-slate-700 p-3 text-slate-200 hover:bg-slate-800">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © 2026 StayEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

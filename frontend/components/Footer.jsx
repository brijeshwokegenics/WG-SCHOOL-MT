"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Description */}
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-white text-2xl font-bold mb-3">
            School<span className="text-blue-500">MockTest</span>
          </h4>
          <p className="text-gray-400 leading-relaxed max-w-md">
            Secure, scalable, and smart assessment platform for modern institutions.
            Build, manage, and scale your tests with ease.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h5 className="text-white font-semibold mb-3 uppercase tracking-wide">
            Product
          </h5>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white transition">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Integrations
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h5 className="text-white font-semibold mb-3 uppercase tracking-wide">
            Company
          </h5>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} MockTestPro. All rights reserved.
      </div>
    </footer>
  );
}

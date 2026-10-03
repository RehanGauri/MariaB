import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import Button from "@/components/ui/Button";

const FooterColumn = ({ title, links }) => (
  <div className="flex flex-col gap-2 *:text-gray-500">
    <span className="font-semibold tracking-wide text-black mb-1">{title}</span>
    {links.map((link) => (
      <span
        key={link}
        className="hover:text-black transition cursor-pointer text-sm"
      >
        {link}
      </span>
    ))}
  </div>
);

const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-200 mt-20">
      {/* Newsletter row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 md:px-12 py-10 border-b border-zinc-200">
        <div>
          <h3 className="text-lg font-semibold tracking-wide">
            Join our newsletter
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            We&apos;ll send you updates once per week.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Email address"
            className="border border-zinc-300 rounded-lg px-4 py-2 text-sm w-full sm:w-64 outline-none focus:border-black transition"
          />
          <Button text="SUBSCRIBE" classNames="bg-black text-white justify-center w-full sm:w-auto" />
        </div>
      </div>

      {/* Link columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-12 py-10">
        <FooterColumn
          title="Information"
          links={[
            "Returns and Exchange",
            "Privacy Policy",
            "Payment Process",
            "FAQs",
            "Track Your Order",
            "Blogs",
          ]}
        />
        <FooterColumn
          title="Customer Care"
          links={[
            "About Maria.B",
            "Contact Us",
            "Shipping Policy",
            "Terms and Conditions",
          ]}
        />
        <FooterColumn
          title="Shop"
          links={["Women", "Men", "Kids", "Brides", "M.Basics"]}
        />

        {/* Social column — spans full width on mobile so icons don't cramp into the 2-col grid */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
          <span className="font-semibold tracking-wide text-black mb-1">
            Follow Us
          </span>
          <div className="flex gap-4 text-xl">
            <a href="#" aria-label="Facebook" className="hover:scale-110 transition">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram" className="hover:scale-110 transition">
              <FaInstagram />
            </a>
            <a href="#" aria-label="TikTok" className="hover:scale-110 transition">
              <FaTiktok />
            </a>
            <a href="#" aria-label="YouTube" className="hover:scale-110 transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-6 md:px-12 py-6 border-t border-zinc-200 text-xs text-gray-500 text-center sm:text-left">
        <span>&copy; {new Date().getFullYear()} Maria.B. All rights reserved.</span>
        <span>Maria.B. clone by Rehan using NextJS.</span>
      </div>
    </footer>
  );
};

export default Footer;
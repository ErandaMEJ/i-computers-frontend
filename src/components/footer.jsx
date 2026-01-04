import { Link } from "react-router-dom";



export default function Footer() {
  return (
    <footer className="w-full bg-accent text-secondary border-t border-secondary/10">        
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-secondary/70">
      <div className="flex flex-wrap justify-center md:justify-center gap-x-6 gap-y-2">
          <img src="/logo.png" alt="Logo" className=" h-8 w-8 mr-4 "/>
          <Link className="hover:text-primary transition" to="/products">Products</Link>
          <Link className="hover:text-primary transition" to="/about">About</Link>
          <Link className="hover:text-primary transition" to="/contact">Contact</Link>
          <a className="hover:text-primary transition" href="tel:+9471123456">+94 71 123 456</a>          
        </div>
        &copy; {new Date().getFullYear()} SL Computers. All rights reserved.
      </div>
    </footer>
  );
}

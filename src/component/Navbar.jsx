import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" flex gap-x-3 py-4 px-16 bg-[#D9D9D9]/60 backdrop-blur-sm sticky top-0 w-full">
      <Link href="/">Home</Link>
      <Link href="/cart">Cart</Link>
      <Link href="/sell">Become a seller</Link>
    </nav>
  );
};

export default Navbar;

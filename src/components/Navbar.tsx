import Image from "next/image";
import Link from "next/link";

type NavItemProps = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

const links: Links = {
  authenticated: [
    { label: "Explore", href: "/explore" },
    { label: "Suggestions", href: "/suggestions" },
    { label: "Settings", href: "/settings" },
  ],
  unauthenticated: [
    { label: "Movies", href: "/movies" },
    { label: "Tv Shows", href: "/tv-shows" },
    {
      label: "Suggest me",
      href: "/suggest",
      icon: (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
          height="20px"
          width="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      ),
    },
  ],
};

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M11.6265 9.74683L13.3331 8.04016L11.6265 6.3335"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.50684 8.04004H13.2868"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.84017 13.3332C4.8935 13.3332 2.50684 11.3332 2.50684 7.99984C2.50684 4.6665 4.8935 2.6665 7.84017 2.6665"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function NavItem({ label, href, icon }: NavItemProps) {
  return (
    <li className="group">
      <Link
        href={href}
        className="text-Grey/300 hover:text-Grey/100 group-has-[.active]:text-Primary/400 flex items-center gap-2 font-medium transition-colors duration-300 group-has-[.active]:font-semibold"
      >
        {label}
        {icon}
      </Link>
    </li>
  );
}

export default function Navbar() {
  const isAuthenticated: boolean = true;

  return (
    <nav className="bg-blur sticky top-0 z-30 mb-12 py-3 backdrop-blur-lg">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image src="/images/logo.svg" alt="Watchify" width={40} height={20} />
        </Link>
        <ul className="flex gap-8">
          {links[isAuthenticated ? "authenticated" : "unauthenticated"].map(
            ({ label, href, icon }) => (
              <NavItem key={href} label={label} href={href} icon={icon} />
            )
          )}
          {isAuthenticated ? (
            <li>
              <button className="text-Grey/300 hover:text-Grey/100 flex items-center gap-2 font-medium transition-colors duration-300">
                {icon}
                Logout
              </button>
            </li>
          ) : (
            <NavItem
              label="Login"
              href="/login"
              icon={<span className="rotate-180">{icon}</span>}
            />
          )}
        </ul>
      </div>
    </nav>
  );
}

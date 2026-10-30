import { useState } from "react";
import { Link } from "react-router";
import { MenuIcon } from "lucide-react-motion";

import "../styles/navbar.css";

const Navbar = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const navigation = [
    {
      title: "View",
      links: [
        {
          target: "/items",
          title: "Items",
        },
        {
          target: "/categories",
          title: "Categories",
        },
        {
          target: "/locations",
          title: "Locations",
        },
      ]
    },
    {
      title: "Create",
      color: "green",
      links: [
        {
          target: "/item/create",
          title: "New Item",
        },
        {
          target: "/category/create",
          title: "New Category",
        },
        {
          target: "/location/create",
          title: "New Location",
        },
      ]
    },
  ];

  return (
    <>
      <header className="site-header">
        <div className="title">
          <h1>
            <Link to="/">Stardew Valley Helper</Link>
          </h1>
        </div>

        <div className="menu-icon mobile">
          <MenuIcon size={90} onClick={(e) => toggleMenu(e)} />
        </div>
      </header>
      <nav className="site-nav mobile">
        <ul className={mobileMenuVisible ? "menu show" : "menu"}>
        {navigation &&
            navigation.map((set) => (
              <>
              <li key={set.title}>
                {
                  set.links.map((link, i) => {
                    return (
                      <Link key={i} to={link.target} onClick={() => setMobileMenuVisible(false)} className={`navlink-${set.color}`}>
                      {link.title}
                    </Link>
                    )
                  })
                }
              </li>
              </>
            ))}
        </ul>
      </nav>
      <nav className="site-nav desktop">
        <ul className="menu">
        {navigation &&
            navigation.map((set) => (
              <>
              <li key={set.title}>
                {
                  set.links.map((link, i) => {
                    return (
                      <Link key={i} to={link.target} className={`navlink-${set.color}`}>
                      {link.title}
                    </Link>
                    )
                  })
                }
              </li>
              </>
            ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

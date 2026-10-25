import { useState } from "react";
import { Link } from "react-router";
import { MenuIcon } from "lucide-react-motion";

import "../styles/navbar.css";

const LinkItem = ({ items, setMobileMenuVisible = null }) => {
  if(setMobileMenuVisible) {
    return (
      <li key={items[0].title}>
        <Link onClick={() => setMobileMenuVisible(false)} to={items[0].target}>{items[0].title}</Link> 
        <Link onClick={() => setMobileMenuVisible(false)} to={items[1].target}>{items[1].title}</Link> 
      </li>
    )
  } else {
    return (
      <li key={items[0].title}>
        <Link to={items[0].target}>{items[0].title}</Link> 
        <Link to={items[1].target}>{items[1].title}</Link> 
      </li>
    )
  }
}

const Navbar = () => {
	const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
	
  const toggleMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };
  
  const navigation = [
    [
      {
        target: "/items",
        title: "Items"
      },
      {
        target: "/item/create",
        title: "New Item"
      }
    ],
    [
      {
        target: "/itemtypes",
        title: "Item Types"
      },
      {
        target: "/itemtype/create",
        title: "New Item Type"
      }
    ],
    [
      {
        target: "/locations",
        title: "Locations"
      },
      {
        target: "/location/create",
        title: "New Location"
      }
    ]
  ]

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
          {navigation && navigation.map(set => (
            <LinkItem items={set} isMobileMenu={true} setMobileMenuVisible={setMobileMenuVisible} />
          ))}
        </ul>
      </nav>
      <nav className="site-nav desktop">
        <ul className="menu">
          {navigation && navigation.map(set => (
            <LinkItem items={set} />
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

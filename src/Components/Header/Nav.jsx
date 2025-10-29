import DropDown from "./DropDown";
import { Link } from "react-router";

export default function Nav({ setMobileToggle }) {
  return (
    <ul className="cs_nav_list fw-medium">
      <li>
        <Link to="/" onClick={() => setMobileToggle(false)}>
          Home
        </Link>
      </li>

      <li>
        <Link to="/about" onClick={() => setMobileToggle(false)}>
          About Us
        </Link>
      </li>
      <li className="menu-item-has-children">
        <Link to="/tour" onClick={() => setMobileToggle(false)}>
          Tour
        </Link>
        <DropDown>
          <ul>
            <li>
              <Link to="/tour/domestic" onClick={() => setMobileToggle(false)}>
                Domestic
              </Link>
            </li>
            <li>
              <Link to="/tour/international" onClick={() => setMobileToggle(false)}>
                International
              </Link>
            </li>
          </ul>
        </DropDown>
      </li>
      <li className="menu-item-has-children">
        <Link to="/destination" onClick={() => setMobileToggle(false)}>
          Destination
        </Link>
        <DropDown>
          <ul>
            <li>
              <Link to="/destination" onClick={() => setMobileToggle(false)}>
                Destination
              </Link>
            </li>
            <li>
              <Link to="/destination/destination-details" onClick={() => setMobileToggle(false)}>
                Destination Details
              </Link>
            </li>
          </ul>
        </DropDown>
      </li>

      <li>
        <Link to="/contact" onClick={() => setMobileToggle(false)}>
          Contact
        </Link>
      </li>
    </ul>
  );
}

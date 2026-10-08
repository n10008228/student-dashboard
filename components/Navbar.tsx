
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const links = [
    { href: "/", label: "Dashboard", icon: "◈" },
    { href: "/tasks", label: "Task Manager", icon: "☑" },
    { href: "/timer", label: "Study Timer", icon: "◷" },
  ];

  // Toggle the navigation menu on mobile devices.
  function toggleMenu() {
    setMenuOpen((previous) => !previous);
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">S</span>
        <div>
          <strong>STUDENT</strong>
          <small>DASHBOARD</small>
        </div>
      </div>

      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
      >
        {menuOpen ? "Close Menu" : "Open Menu"}
      </button>

      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={
              pathname === link.href
                ? "nav-link active"
                : "nav-link"
            }
          >
            <span className="nav-icon">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="avatar">ST</div>
        <div>
          <strong>Student Account</strong>
          <small>Productivity Workspace</small>
        </div>
      </div>
    </aside>
  );
}

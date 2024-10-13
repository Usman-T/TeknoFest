import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Bell, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const handleLogout = (e) => {
    e.preventDefault();
  };

  const headerItems = [
    {
      name: "Home",
      link: "/home",
    },
    {
      name: "About us",
      link: "/aboutus",
    },
    {
      name: "Competitions",
      link: "/competitions",
    },
  ];
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="h-6 w-6" />
            <span className="text-lg font-semibold">Mehtab</span>
          </Link>
          <nav className="hidden md:flex space-x-4">
            {headerItems.map((i) => (
              <Link
                to={i.link}
                className="text-sm font-medium hover:text-primary"
              >
                {i.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

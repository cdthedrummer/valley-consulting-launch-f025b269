
import React from "react";
import { Link, Location } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface ServicesMenuProps {
  location: Location;
}

export const ServicesMenu: React.FC<ServicesMenuProps> = ({ location }) => {
  const services = [
    { name: "Advertising", path: "/services#google-ads" },
    { name: "SEO", path: "/services#seo" },
    { name: "Consulting", path: "/services#consulting" },
    { name: "All Services", path: "/services" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`font-medium ${
            location.pathname === "/services" ? "text-hvcg-blue" : "text-gray-600"
          }`}>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {services.map((service) => (
                <li key={service.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={service.path}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">{service.name}</div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

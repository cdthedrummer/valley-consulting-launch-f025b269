
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

interface IndustriesMenuProps {
  location: Location;
}

export const IndustriesMenu: React.FC<IndustriesMenuProps> = ({ location }) => {
  const industries = [
    { name: "HVAC", path: "/industries/hvac" },
    { name: "Plumbing", path: "/industries/plumbing" },
    { name: "Fencing", path: "/industries/fencing" },
    { name: "Deck & Patio", path: "/industries/deck-patio" },
    { name: "Flooring", path: "/industries/flooring" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`font-medium ${
            location.pathname.includes("/industries") ? "text-hvcg-blue" : "text-gray-600"
          }`}>Industries</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {industries.map((industry) => (
                <li key={industry.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={industry.path}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">{industry.name}</div>
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

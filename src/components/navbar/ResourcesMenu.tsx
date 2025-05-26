
import React from "react";
import { Link, Location } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Download, Bot, Sparkles } from "lucide-react";

interface ResourcesMenuProps {
  location: Location;
}

export const ResourcesMenu: React.FC<ResourcesMenuProps> = ({ location }) => {
  const isResourcesActive = location.pathname.startsWith("/resources");

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              navigationMenuTriggerStyle(),
              "font-medium transition-colors hover:text-hvcg-blue bg-transparent",
              isResourcesActive ? "text-hvcg-blue" : "text-gray-600"
            )}
          >
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-[400px]">
              <div className="grid gap-1">
                <h3 className="font-medium leading-none mb-2 text-hvcg-blue-dark">Free Resources</h3>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    to="/resources"
                  >
                    <div className="flex items-center">
                      <Download className="mr-2 h-4 w-4 text-hvcg-green" />
                      <div className="text-sm font-medium leading-none">Marketing Checklist</div>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Free 20-point checklist for contractor marketing
                    </p>
                  </Link>
                </NavigationMenuLink>
              </div>
              
              <div className="grid gap-1">
                <h3 className="font-medium leading-none mb-2 text-purple-600">Premium Tools</h3>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    to="/resources/ai-copilot"
                  >
                    <div className="flex items-center">
                      <Bot className="mr-2 h-4 w-4 text-purple-600" />
                      <div className="text-sm font-medium leading-none">AI Copilot</div>
                      <Sparkles className="ml-1 h-3 w-3 text-purple-600" />
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      AI-powered marketing advice for local contractors
                    </p>
                  </Link>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

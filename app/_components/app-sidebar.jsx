"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Milestone,
  ChefHat,
  Footprints,
  Tent,
  Trees,
  Waves,
  ForkKnife,
  Beer,
  IceCream,
  Coffee,
  Building,
  BedSingle,
  BusFront,
  Home,
  ChevronsUpDown,
  Droplet,
  Landmark,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarFooter,
} from "../../components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Switch } from "../../components/ui/switch";
import localidades from "./localidades.json";
import { useMapContext } from "./MapContext"; 

export function AppSidebar() {
  const { visibleCategories, setVisibleCategories, setSelectedLocalidad } =
    useMapContext(); 

  const handleSwitchChange = (subItemTitle, checked) => {
    setVisibleCategories((prevStates) => ({
      ...prevStates,
      [subItemTitle]: checked,
    }));
  };

  const toggleSwitch = (subItemTitle) => {
    const currentState = visibleCategories[subItemTitle] || false;
    handleSwitchChange(subItemTitle, !currentState); 
  };

  const handleLocalidadSelect = (localidad) => {
    setSelectedLocalidad(localidad); 
  };

  const items = [
    {
      title: "Turismo",
      icon: Milestone,
      subItems: [
        { title: "Caminatas", icon: Footprints },
        { title: "Parques", icon: Trees },
        { title: "Ríos", icon: Waves },
        { title: "Diques", icon: Droplet },
        { title: "Monumentos", icon: Landmark },
      ],
    },
    {
      title: "Gastronomía",
      icon: ChefHat,
      subItems: [
        { title: "Restaurantes", icon: ForkKnife },
        { title: "Bares", icon: Beer },
        { title: "Heladerías", icon: IceCream },
        { title: "Cafeterias", icon: Coffee },
      ],
    },
    {
      title: "Hospedajes",
      icon: Home,
      subItems: [
        { title: "Hoteles", icon: Building },
        { title: "Casas", icon: Home },
        { title: "Camping", icon: Tent },
        { title: "Hostels", icon: BedSingle },
      ],
    },
    {
      title: "Transporte",
      icon: BusFront,
      subItems: [
        { title: "Ida", icon: BusFront },
        { title: "Vuelta", icon: BusFront },
      ],
    },
  ];

  return (
    <Sidebar variant="floating">
      <SidebarContent className="pl-2 select-none  subpixel-antialiased">
        <SidebarGroup>
          <Link href={"/"}>
            <Image
              className="m-2 flex pt-4 pb-2"
              src={"/logo.svg"}
              width={140}
              height={140}
              alt="logo"
            />
          </Link>
          <SidebarGroupLabel>Tu guía para San Luis</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu className="gap-0">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible
                      defaultOpen={false}
                      className="group/collapsible"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronsUpDown className="h-4 w-5 absolute right-4 hover:bg-gray-200 rounded transition ease-in-out" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem
                              key={subItem.title}
                              className="flex items-center"
                            >
                              <div
                                className="flex cursor-pointer gap-0.5 w-full hover:text-slate-900"
                                onClick={() => toggleSwitch(subItem.title)}
                              >
                                <subItem.icon className="w-4 h-4 mt-0.5" />
                                <span className="ml-2 text-sm">
                                  {subItem.title}
                                </span>
                              </div>
                              <Switch
                                className="switch-chico mt-0.5"
                                checked={
                                  visibleCategories[subItem.title] || false
                                }
                                onCheckedChange={(checked) =>
                                  handleSwitchChange(subItem.title, checked)
                                }
                              />
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="shadow border text-xs">
                  <p> Elegir Localidad: </p>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                {localidades.map((localidad) => (
                  <DropdownMenuItem
                    key={localidad.nombre}
                    onClick={() => handleLocalidadSelect(localidad)}
                  >
                    <span className="hover:text-primary text-xs cursor-pointer">
                      {localidad.nombre}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

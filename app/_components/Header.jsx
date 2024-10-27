import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div>
      <div>
        <Image src={"/logo.svg"} width={100} height={100} alt="logo" />
        <ul>
          <li className="md:flex gap-10 ">contacto</li>
          <li>publicate</li>
        </ul>
      </div>
      <div>
        <Button className="flex gap-2"><Plus className="h-5 w-5"/> your add</Button>
        <Button variant="outline">Login</Button>
      </div>
    </div>
  );
}

export default Header;

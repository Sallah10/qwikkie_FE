// src/components/dashboard/DashboardHeader.tsx
import Image from "next/image";
import Logo from "@/public/1techlink.jpg";

interface DashboardHeaderProps {
  title: string;
  description: string;
}

export default function DashboardHeader({
  title,
  description,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row gap-4 mb-2 mx-8">
      <Image src={Logo} alt="Logo" width={50} height={50} />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

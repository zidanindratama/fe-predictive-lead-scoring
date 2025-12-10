"use client";

import { useState, useEffect } from "react";
import {
  DOC_SECTIONS,
  DocSidebar,
} from "@/components/main/documentation/doc-sidebar";
import { IntroSection } from "@/components/main/documentation/sections/intro";
import { ArchitectureSection } from "@/components/main/documentation/sections/architecture";
import { BackendSection } from "@/components/main/documentation/sections/backend";
import { FrontendSection } from "@/components/main/documentation/sections/frontend";
import { MlSection } from "@/components/main/documentation/sections/ml-engine";
import { DeploymentSection } from "@/components/main/documentation/sections/deployment";

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of DOC_SECTIONS) {
        const element = document.getElementById(section.id);
        if (
          element &&
          element.offsetTop <= scrollPosition &&
          element.offsetTop + element.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="container mx-auto px-4 md:px-8 pt-32 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="hidden lg:block lg:col-span-3 relative">
          <DocSidebar activeSection={activeSection} />
        </aside>

        <div className="lg:col-span-9 space-y-24">
          <IntroSection />
          <ArchitectureSection />
          <BackendSection />
          <FrontendSection />
          <MlSection />
          <DeploymentSection />
        </div>
      </div>
    </main>
  );
}

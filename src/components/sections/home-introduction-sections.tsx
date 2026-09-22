import { ExpertiseOverviewSection } from "@/components/sections/home-expertise-overview";
import { HomePositioningSection } from "@/components/sections/home-positioning-section";
import styles from "./home-positioning-section.module.css";

export function HomeIntroductionSections() {
  return (
    <div className={`${styles.introduction} relative isolate overflow-clip bg-[#fefefe]`}>
      <HomePositioningSection />
      <ExpertiseOverviewSection />
    </div>
  );
}

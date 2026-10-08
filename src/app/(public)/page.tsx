import {
  AboutSection,
  ContactSection,
  HeroSection,
  ProjectsSection,
  about,
  contact,
  experience,
  getCompactProjects,
  getFeaturedProjects,
  hero,
  workSection,
} from "@/modules/portfolio";

export default function HomePage() {
  return (
    <main>
      <HeroSection hero={hero} contact={contact} />
      <ProjectsSection
        heading={workSection.heading}
        intro={workSection.intro}
        featured={getFeaturedProjects()}
        compact={getCompactProjects()}
      />
      <AboutSection about={about} experience={experience} />
      <ContactSection contact={contact} />
    </main>
  );
}

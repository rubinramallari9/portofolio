import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rubinramallari.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rubin Ramallari",
    url: siteUrl,
    jobTitle: "Full Stack Developer",
    description:
      "A passionate full stack developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    sameAs: [
      "https://github.com/rubinramallari",
      "https://linkedin.com/in/rubinramallari",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Python",
      "Django",
      "Web Development",
      "Software Engineering",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        <Navigation />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

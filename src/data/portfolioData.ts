/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-ignore
import fotoProfilBaru from "../assets/images/myphoto.jpg";
// @ts-ignore
import whispxrImage from "../assets/images/whispxr.jpeg";
// @ts-ignore
import assetraImage from "../assets/images/assetra.jpeg";
// @ts-ignore
import ctfImage from "../assets/images/ctf.png";
//@ts-ignore
import certificateImage from "../assets/images/certificate.png";
//@ts-ignore
import bookImage from "../assets/images/book.png";
//@ts-ignore
import celahImage from "../assets/images/celah.png";
//@ts-ignore
import portfolioImage from "../assets/images/portfolio.png";

export interface Skill {
  name: string;
  category: string;
  level: string; // e.g. "Database", "Backend", "Frontend", "Runtime"
  icon: string; // Lucide icon name
  color: string; // Tailwind-friendly color class or hex values
  percentage: number; // e.g. 90%
  tools?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string; // Picsum image or local path
  isCreative?: boolean;
  isLiveSite?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  image: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    subTitle: string;
    description: string;
    aboutMe: string;
    avatarUrl: string;
    email: string;
    location: string;
    phone: string;
    availability: string;
    isAvailable: boolean;
    experienceYears: string;
    resumeUrl: string;
    education: string;
    gpa: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    instagram: string;
    twitter?: string;
  };
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  experiences: Experience[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Qwyn Celine Djimondo",
    firstName: "Qwyn",
    lastName: "Dji",
    title: "Cybersecurity Specialist & Informatics Student",
    subTitle: "Google Student Ambassador & Cybersecurity Researcher",
    description: "Building technology with security in mind. I'm an Informatics student at President University passionate about cybersecurity and software development, continuously growing through hands-on projects, leadership experiences, and real-world challenges.",
    aboutMe: "Technology has always been more than just writing code to me. I enjoy understanding how systems work, identifying security risks, and building solutions that are both functional and secure. As an Informatics student specializing in Cybersecurity at President University, I'm continuously growing through hands-on projects and real-world challenges.",
    avatarUrl:  fotoProfilBaru, 
    email: "qwyndji@gmail.com",
    location: "Cikarang, Indonesia",
    phone: "+62 812-xxxx-xxxx",
    availability: "Available for cybersecurity projects & internships",
    isAvailable: true,
    experienceYears: "Student",
    resumeUrl: "https://drive.google.com/file/d/1t80EeAZcMxTzYMm_1RmR06uzYZNVn_Z8/view?usp=sharing", 
    education: "President University (Informatics, Candidate for Bachelor)",
    gpa: "3.70 / 4.00"
  },
  socialLinks: {
    github: "https://github.com/Qwyndji",
    linkedin: "https://www.linkedin.com/in/qwyn-celine-djimondo-79a280322/",
    instagram: "https://www.instagram.com/qwyndji?igsh=YzIzc2QxcXY4NjBu&utm_source=qr",
  },
  skills: [
    {
      name: "Digital Forensics",
      category: "Cybersecurity",
      level: "Advanced",
      icon: "Search",
      color: "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30",
      percentage: 88,
      tools: ["FTK Imager", "Autopsy", "NetworkMiner", "Exiftool"]
    },
    {
      name: "Network Security",
      category: "Networking",
      level: "Advanced",
      icon: "Network",
      color: "from-indigo-500/20 to-indigo-505/5 text-indigo-400 border-indigo-500/30",
      percentage: 85,
      tools: ["Wireshark", "Cisco Packet Tracer", "Ubuntu", "Kali Linux"]
    },
    {
      name: "Ethical Hacking",
      category: "Offensive Security",
      level: "Advanced",
      icon: "Activity",
      color: "from-rose-500/20 to-rose-500/5 text-rose-400 border-rose-500/30",
      percentage: 85,
      tools: ["Kali Linux", "OSINT", "Burp Suite", "DVWA", "Wazuh", "Nmap"]
    },
    {
      name: "Web Programming",
      category: "Development",
      level: "Intermediate",
      icon: "Code2",
      color: "from-violet-500/20 to-violet-500/5 text-violet-400 border-violet-500/30",
      percentage: 88,
      tools: ["PHP", "JavaScript", "Python", "Next.js", "TypeScript", "React", "Vite", "Tailwind CSS", "Firebase", "Framer Motion", "MYSQL", "C++", "Laravel"]
    },
    {
      name: "UI/UX Design",
      category: "Design",
      level: "Advanced",
      icon: "Palette",
      color: "from-pink-500/20 to-pink-500/5 text-pink-400 border-pink-500/30",
      percentage: 83,
      tools: ["Figma", "Canva"]
    },
    {
      name: "Cryptography",
      category: "Cybersecurity",
      level: "Intermediate",
      icon: "Lock",
      color: "from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30",
      percentage: 70
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "WHISPXR: Secure Encrypted Platform",
      description: "Designed the UI/UX for WHISPXR, an end-to-end encrypted messaging platform, with a focus on usability, accessibility, and a smooth user experience. Worked alongside developers to translate security features into an intuitive interface.",
      techStack: ["UI/UX Design", "Figma", "Design System", "Prototyping"],
      liveUrl: "https://whispxr.vercel.app/",
      githubUrl: "https://github.com/Qwyndji",
      image: whispxrImage,
    },
    {
      id: "proj-2",
      title: "Assetra: AI Security Assessment",
      description: "Developed an AI-powered chatbot for Assetra to support NIST Cybersecurity Framework (CSF) assessments through interactive conversations. Focused on prompt engineering, contextual response design, and seamless web integration to help users identify security gaps and better understand compliance requirements.",
      techStack: ["AI Chatbot", "Risk Mapping", "Security Compliance", "Prompt Engineering", "NIST CSF"],
      liveUrl: "https://github.com/Qwyndji",
      githubUrl: "https://github.com/Qwyndji",
      image: assetraImage,
    },
    {
      id: "proj-3",
      title: "Interactive Personal Portfolio & Security Showcase",
      description: "Designed and developed this personal portfolio website to showcase my technical expertise in cybersecurity and software development. Built with a highly responsive, eye-safe premium slate dark design, smooth viewport scroll tracking, interactive DecryptedText animations, and a rich modal showcase featuring active search and filtering filters.",
      techStack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "UI/UX Design"],
      liveUrl: "https://qwyndji.vercel.app/",
      githubUrl: "https://github.com/Qwyndji",
      image: portfolioImage,
      isLiveSite: true,
    },
    {
      id: "proj-4",
      title: "Library Management System",
      description: "Developed a web-based Library Management System to simplify book borrowing and administrative processes. Implemented user authentication, book and category management, rental tracking, and reporting features while designing a structured relational database and applying CRUD operations throughout the application.",
      techStack: ["PHP", "MySQL", "CRUD", "Database Design", "Web Development", "Authentication"],
      githubUrl: "https://github.com/Qwyndji/Book-Library-System",
      image: bookImage,
    },
    {
      id: "proj-5",
      title: "Capture The Flag (CTF) Challenges",
      description: "Capture The Flag competitions have been an important part of my cybersecurity journey, allowing me to transform theory into practical experience. Competing across multiple cybersecurity domains, I earned 2nd Place in the PU CTF 2026 Digital Forensics Track(2026) and 8th Place in the PU CTF 2025 Ethical Hacking Track(2025), while continuously strengthening my technical and problem-solving skills.",
      techStack: ["OSINT", "Vulnerability Assessment", "Web Exploitations", "Cryptography", "FTK Imager", "Autopsy"],
      image: ctfImage,
    },
    {
      id: "proj-6",
      title: "Celah Mimpi: Short Film",
      description: "Directed and wrote the screenplay for Celah Mimpi, a short film created for the FLS2N Competition. Led the creative vision from concept development to production, collaborating with the team to transform ideas into a meaningful visual story while strengthening my leadership, communication, and storytelling skills.",
      techStack: ["Director", "Screenwriter", "Storytelling", "Creative Leadership", "Video Production"],
      image: celahImage,
      isCreative: true,
    }
  ],
  certificates: [
    {
      id: "cert-1",
      title: "Junior Network Administrator Certification",
      issuer: "BNSP (BPPTIK)",
      date: "Dec 2025",
      credentialUrl: "https://bpptik.kominfo.go.id",
      image: certificateImage,
    }
  ],
  experiences: [
    {
      id: "exp-1",
      role: "Google Student Ambassador",
      company: "President University",
      period: "Apr 2026 - Present",
      description: [
        "Selected as one of 2,000 ambassadors from a pool of 81,000+ applicants to advocate modern Google technologies on campus.",
        "Facilitate hands-on Google Cloud and Gemini AI workshops and build digestible cybersecurity content material to boost digital literacy.",
        "Collaborate with a national matrix of student leaders to introduce advanced Google technologies in academic and local events."
      ],
      skills: ["Google Cloud", "Gemini AI", "Community Leadership", "Event Coordination"]
    },
    {
      id: "exp-3",
      role: "Vice Head of Student Passion & Talent Division",
      company: "PUMA Informatics - HIMA Informatics",
      period: "Aug 2025 - Present",
      description: [
        "Assist in leading the Student Passion & Talent Division by coordinating programs that help Informatics students develop their interests, talents, and personal growth.",
        "Work closely with other division members to plan and execute student development activities that promote collaboration, engagement, and continuous learning."
      ],
      skills: ["Event Organization", "Leadership", "Talent Development", "Collaboration", "Teamworking"]
    },
    {
      id: "exp-4",
      role: "Head of Community Service Division",
      company: "Public Campus Ministry Jakarta (PCM Jakarta)",
      period: "2025 - Present",
      description: [
        "Lead the Community Service Division by managing members and coordinating community outreach programs that create a positive impact through service and volunteer initiatives.",
        "Worked in the Communication & Digital Division (Komdigi) in 2025, branding community feeds and designing digital media assets."
      ],
      skills: ["Outreach Coordination", "Instagram Branding", "Komdigi Content Design"]
    }
  ]
};

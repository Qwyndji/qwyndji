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
    description: "Informatics Student specializing in Cybersecurity at President University. Engaged in digital forensics, network analysis, ethical hacking, and CTF competitions.",
    aboutMe: "I am an Informatics student specializing in Cybersecurity at President University with hands-on experience in digital forensics, network analysis, ethical hacking, and CTF competitions. Eager to apply technical knowledge and investigative skills in real-world cybersecurity challenges, aiming to contribute to a professional cybersecurity environment while continuously developing my expertise.",
    avatarUrl:  fotoProfilBaru, 
    email: "qwyndji@gmail.com",
    location: "Cikarang, Indonesia",
    phone: "+62 812-xxxx-xxxx",
    availability: "Available for cybersecurity projects & internships",
    isAvailable: true,
    experienceYears: "Student",
    resumeUrl: "https://drive.google.com/file/d/1evHJhrtcNO6iy6Nftx0gRk4gpE1ytmqH/view?usp=sharing", 
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
      tools: ["FTK Imager", "Autopsy", "NetworkMiner"]
    },
    {
      name: "Network Security",
      category: "Networking",
      level: "Advanced",
      icon: "Network",
      color: "from-indigo-500/20 to-indigo-505/5 text-indigo-400 border-indigo-500/30",
      percentage: 88,
      tools: ["Wireshark", "Cisco Packet Tracer", "Ubuntu", "Kali Linux"]
    },
    {
      name: "Ethical Hacking",
      category: "Offensive Security",
      level: "Advanced",
      icon: "Activity",
      color: "from-rose-500/20 to-rose-500/5 text-rose-400 border-rose-500/30",
      percentage: 85,
      tools: ["Kali Linux", "OSINT", "Burp Suite", "DVWA", "Wazuh"]
    },
    {
      name: "Cryptography",
      category: "Cybersecurity",
      level: "Intermediate",
      icon: "Lock",
      color: "from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30",
      percentage: 70
    },
    {
      name: "Web Programming",
      category: "Development",
      level: "Intermediate",
      icon: "Code2",
      color: "from-violet-500/20 to-violet-500/5 text-violet-400 border-violet-500/30",
      percentage: 80,
      tools: ["PHP", "JS", "Python", "Next.js", "TypeScript", "React", "Vite", "Tailwind CSS", "Firebase", "Framer Motion"]
    },
    {
      name: "UI/UX Design",
      category: "Design",
      level: "Advanced",
      icon: "Palette",
      color: "from-pink-500/20 to-pink-500/5 text-pink-400 border-pink-500/30",
      percentage: 90,
      tools: ["Figma", "Canva"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "WHISPXR: Secure Encrypted Platform",
      description: "Designed robust UI/UX elements and collaborated on implementing high-grade hybrid encryption (RSA-OAEP & AES-256-GCM) to establish seamless, fully end-to-end encrypted chats.",
      techStack: ["UI/UX Design"],
      liveUrl: "https://whispxr.vercel.app/",
      githubUrl: "https://github.com/Qwyndji",
      image: whispxrImage,
    },
    {
      id: "proj-2",
      title: "Assetra: AI Security Assessment",
      description: "Configured a context-aware secure LLM chatbot with strict prompt constraints aligned with top cybersecurity guidelines to automate threats mapping and system risk analysis.",
      techStack: ["AI Chatbot", "Risk Mapping", "Security Compliance", "Prompt Engineering"],
      liveUrl: "https://github.com/Qwyndji",
      githubUrl: "https://github.com/Qwyndji",
      image: assetraImage,
    },
    {
      id: "proj-3",
      title: "Network Security & Configuration",
      description: "Architectured secure logical VLAN structures and topological nodes scaling Cisco Packet Tracer layouts, coupled with active traffic isolation testing on specialized Ubuntu server builds.",
      techStack: ["Cisco Packet Tracer", "VLAN Segments", "Ubuntu Server", "Traffic Analysis", "Wireshark"],
      liveUrl: "https://github.com/Qwyndji",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: "proj-4",
      title: "Capture The Flag (CTF) Challenges",
      description: "Conquered competitive cybersecurity arenas. Successfully achieved 2nd Place out of 30 Teams in PU CTF Digital Forensics Track (April 2026) and 8th Place out of 38 Teams in PU CTF Ethical Hacking Track (October 2025).",
      techStack: ["OSINT", "Reverse Engineering", "Web Exploitations", "Cryptography", "FTK Imager", "Autopsy"],
      liveUrl: "https://github.com/Qwyndji",
      image: ctfImage,
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
        "Serve as Vice Head of Division (Aug 2025 - Present) managing student programming labs and executing large-scale hackathons.",
        "Assisted in coordinating student development camps and department-specific cybersecurity events as Member (2024 - 2025)."
      ],
      skills: ["Event Organization", "Leadership", "Talent Development", "Collaboration"]
    },
    {
      id: "exp-4",
      role: "Head of Community Service Division",
      company: "Public Campus Ministry Jakarta (PCM Jakarta)",
      period: "2025 - Present",
      description: [
        "Appointed as Head of Community Service (2026-Present) facilitating community programs and leading outreach resources.",
        "Worked in the Communication & Digital Division (Komdigi) in 2025, branding community feeds and designing digital media assets."
      ],
      skills: ["Outreach Coordination", "Instagram Branding", "Komdigi Content Design"]
    }
  ]
};

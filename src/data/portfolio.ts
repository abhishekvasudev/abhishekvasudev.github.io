export interface SocialLink {
  name: string;
  url: string;
  icon: "linkedin" | "github" | "twitter";
}

export interface WorkExperienceRole {
  title: string;
  period: string;
  location?: string;
  description?: string;
  link?: { label: string; url: string };
  highlights: string[];
  techStack?: string;
  platform?: string;
  others?: string;
}

export interface WorkExperienceGroup {
  company: string;
  employmentType: "Full-time" | "Freelance" | "Internship";
  roles: WorkExperienceRole[];
}

export interface Project {
  title: string;
  period: string;
  description: string;
  techStack: string;
  role: string;
  link?: string;
}

export interface Skill {
  name: string;
  level: string;
  percentage: number;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  aggregate: string;
}

export interface PositionOfResponsibility {
  title: string;
  description: string;
}

export const profile = {
  name: "Abhishek Vasudev",
  title: "iOS Engineer",
  location: "London, United Kingdom",
  email: "abhishekvasudev7@gmail.com",
  linkedin: "https://www.linkedin.com/in/abhishek-vasudev",
  website: "https://www.abhishekvasu.dev",
  image: "/images/profile2.jpg",
  social: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/abhishek-vasudev", icon: "linkedin" as const },
    { name: "GitHub", url: "https://github.com/abhishekvasudev/", icon: "github" as const },
    { name: "X (Twitter)", url: "https://x.com/abhishekvasude1", icon: "twitter" as const },
  ],
};

export const about = {
  intro: [
    "I am an enthusiast whose passion is coding and software development. I am an organized, collaborative, results-driven iOS application developer developing robust code for high volume business solutions. I have keen interest of writing user-friendly, readable, clean, maintainable source code, and the desire to learn more from challenging projects.",
    "I am on a journey to learn and grow as a full stack software developer and iOS development is one of the stepping stones. I also exercise team building and leadership skills which helps me stay connected to my past knowledge, cherish the current project with my team and aim higher for the future.",
  ],
  mobilePractices: [
    "Implementing SOLID principles in native iOS Development using Swift and SwiftUI",
    "Developing strong architecture practices (MVC vs MVVM & more)",
    "Building strong code review & code quality practices (leveraging CI/CD, TDD, & more)",
    "Developing effective hiring & team building practices",
    "Implementing reactive programming using Combine framework.",
  ],
  otherSkills: [
    "Leadership / Team building",
    "Design Patterns",
    "Object-Oriented Programming",
    "JSON / REST API",
    "Git / Bitbucket",
    "Agile / Scrum",
  ],
  leadership: [
    "In 2017, I lead my team, of 6 developers, to the grand finale of the Smart India Hackathon 2017.",
    "From 2015 till 2018, I co-founded Team Special Projects Initiative (Team SPI) and held the responsibility of Vice - President.",
    "Conducted Hackathons and seminars about different skill set, competitive programming and project development in college",
    "In 2013, I lead a team of 45 students as president of the team Techedge (technical society of High School) to host Dewang Mehta Memorial Interschool IT competition.",
    "Co - founded robotics club in school to promote robotics in High School",
  ],
  quote: {
    text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin",
    closing: "If you feel the same and have a role to involve me in, please get in touch.",
  },
};

export const workExperience: WorkExperienceGroup[] = [
  {
    company: "Expedia Group",
    employmentType: "Full-time",
    roles: [
      {
        title: "Software Development Engineer III - iOS",
        period: "October 2025 - Present",
        location: "London, United Kingdom · Hybrid",
        highlights: [
          "Driving the architectural evolution of the Experience Platform by introducing highly scalable, resilient solutions and streamlining developer workflows.",
          "Leading large-scale dependency migrations and modularizing the codebase to significantly reduce build times and enhance system maintainability.",
          "Architecting AI workflows, autonomous agents, and MCP servers to automate internal processes and accelerate development delivery cycles.",
          "Optimizing code quality and system performance through the adoption of emerging engineering standards and performance-driven techniques.",
          "Mentoring cross-functional teams and facilitating technical knowledge-sharing to ensure seamless project releases and collective growth.",
          "Enhancing the developer experience and overall architecture of the Experience Platform.",
          "Actively participating in learning sessions, sharing knowledge, and incorporating feedback to foster improvement for myself and others.",
          "Exploring new techniques to improve code quality and performance.",
          "Providing support to other teams to ensure smooth development and project release.",
          "Introducing scalable solutions to the platform.",
          "Working on Expedia Bookings app and corresponding brands using Swift and SwiftUI.",
          "Actively developing scalable features and solutions across EG apps and internal tools.",
          "Collaborated with other developers across teams to form a guild of iOS developers for knowledge sharing and increasing productivity.",
          "Participated and won in a hackathon using the latest iOS feature SharePlay.",
          "Achieved reducing regression time by 90% by optimizing and organizing the related steps and process.",
        ],
        techStack: "Swift, SwiftUI",
      },
      {
        title: "Software Development Engineer III - iOS",
        period: "May 2023 - October 2025",
        location: "Gurugram, Haryana, India · Hybrid",
        highlights: [
          "Continued evolution of the Experience Platform and Expedia Bookings app using Swift and SwiftUI.",
          "Led large-scale dependency migrations and modularization efforts to reduce build times.",
          "Formed an iOS developer guild for cross-team knowledge sharing and productivity.",
          "Won a hackathon leveraging SharePlay.",
          "Reduced regression time by 90% through process optimization.",
        ],
        techStack: "Swift, SwiftUI",
      },
      {
        title: "Software Development Engineer II - iOS",
        period: "October 2021 - May 2023",
        location: "Gurugram, Haryana, India",
        highlights: [
          "Developed scalable features and solutions across Expedia Group apps and internal tools.",
          "Contributed to platform architecture and developer workflow improvements.",
          "Collaborated with cross-functional teams on Swift and SwiftUI delivery.",
        ],
        techStack: "Swift, SwiftUI",
      },
    ],
  },
  {
    company: "Mutual Mobile",
    employmentType: "Full-time",
    roles: [
      {
        title: "Software Engineer | iOS Application Developer",
        period: "February 2020 - October 2021",
        location: "Hyderabad, Telangana, India",
        highlights: [
          "Led iOS development on Magic Mountain App.",
          "Responsible for organizing & keeping members on task.",
          "Managed the Architecture, CI/CD, and full development lifecycle standards of the iOS app.",
          "Contributed to brainstorming sessions for new app features that attract 50% more audience to the app.",
        ],
        techStack: "Swift, SwiftUI, Combine",
        platform: "XCode, Sublime Text",
        others: "App Center, Jira, Bitbucket, Sourcetree, SendBird, AppsFlyer, HealthKit",
      },
    ],
  },
  {
    company: "Infosys Limited",
    employmentType: "Full-time",
    roles: [
      {
        title: "Software Engineer | iOS Developer",
        period: "July 2018 – February 2020",
        link: { label: "Apple Store Application", url: "https://apps.apple.com/us/app/apple-store/id375380948" },
        highlights: [
          "Core team member of Apple's team: iOS Centre of Excellence.",
          "Successfully enhanced existing features by reducing 50% of the pending bugs.",
          "Contributed towards adding new features.",
          "Worked with client to understand new requirements, business logic, etc.",
          "Implemented credible code solutions using SOLID principles.",
        ],
        techStack: "Swift, TML(Javascript+Swift), Java",
        platform: "XCode, Atom, SQL Developer, NetBeans",
      },
    ],
  },
  {
    company: "Pararthya",
    employmentType: "Freelance",
    roles: [
      {
        title: "Freelance Web Developer",
        period: "October 2017 - January 2018",
        highlights: [
          "Developed the company website: http://pararthya.com/",
          "Worked on SEO for the website and integrated email service.",
          "Successfully optimized image size for the fast load of the website.",
          "Implemented dynamic JavaScript code for the website.",
        ],
        techStack: "Bootstrap, HTML, CSS, JavaScript",
        platform: "Atom",
      },
    ],
  },
  {
    company: "Comezo Infotech Pvt. Ltd.",
    employmentType: "Internship",
    roles: [
      {
        title: "Intern : Web Developer",
        period: "June 2017 - August 2017",
        highlights: [
          "Developed the company website and worked on a few more projects.",
          "Successfully developed an efficient and mobile responsive website with dynamic JavaScript and JQuery codes.",
          "Responsible for Search Engine Optimization for the website.",
        ],
        techStack: "HTML, CSS, JavaScript, Bootstrap, MySQL, PHP",
        platform: "Atom, SublimeText",
      },
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Apple Store Application (ASA)",
    period: "November 2018 - February 2020",
    description:
      "Apple's app for their store representing apple.com. User can buy and track products. User can also book sessions or events happening in nearby Apple Stores",
    techStack: "Swift, JavaScript",
    role: "Front end, Responsible for enhancement and maintaining existing features, creating proof of concept for new features.",
  },
  {
    title: "Park Assist",
    period: "August 2017 - November 2017",
    description:
      "A mobile application used to help a user by showing nearby parking spaces under the radius of 1 km. The application either takes the current position or the user given address as the search point. The application also provides parking management to the parking owners. The available spaces and booking of a space happen in real time. This is achieved with the use of Firebase.",
    techStack: "React Native, CSS, JSON, Firebase, draw.io",
    role: "Both Front-end and back-end, prepared PowerPoint Presentation",
  },
  {
    title: "Teacher Assessment",
    period: "February 2017 - Present",
    description:
      "It is a software tool for evaluating teacher performance based on student feedback. Students will get opportunity to grade their teachers so that university can bring improvements in teaching process of faculty. The software evaluates the performance of teacher based on the inputs provided by the students. This will help the new students to know about the teaching faculty and the university to bring improvements in the faculty.",
    techStack: "Java core, JavaFX, MySQL, CSS",
    role: "Front-end, Back-end",
  },
  {
    title: "Quiz",
    period: "December 2016 - June 2018",
    description:
      "A standalone application for conducting multiple choice based quiz or tests where a user can make test and students can give test.",
    techStack: "Java Core, Java Swing",
    role: "Front-end, Back-end",
  },
];

export const achievements = [
  "Shortlisted for fast-track batch (consisting of 28 members) out of 4000 candidates at Infosys.",
  "Secured first position in IT Batch in graduation.",
  "Secured first position in graduation batch.",
  "Secured Gold and Silver Medal at National Cyber Olympiad in year 2012 and 2013 respectively.",
];

export const skills: Skill[] = [
  { name: "Swift", level: "Intermediate", percentage: 70 },
  { name: "SwiftUI", level: "Intermediate", percentage: 70 },
  { name: "Combine", level: "Intermediate", percentage: 60 },
  { name: "MVC / MVVM", level: "Intermediate", percentage: 60 },
  { name: "JSON / REST API", level: "Intermediate", percentage: 60 },
  { name: "Java Core", level: "Intermediate", percentage: 50 },
  { name: "Git / Bitbucket", level: "Intermediate", percentage: 50 },
  { name: "HTML5, CSS3, JavaScript", level: "Intermediate", percentage: 50 },
  { name: "Bootstrap", level: "Intermediate", percentage: 50 },
  { name: "MySQL & Firebase", level: "Intermediate", percentage: 50 },
  { name: "Python", level: "Beginner", percentage: 30 },
  { name: "React Native", level: "Beginner", percentage: 25 },
];

export const education: Education[] = [
  {
    degree: "B.Tech | Information Technology",
    institution: "GGSIPU",
    period: "2014 - 2018",
    aggregate: "Aggregate: 83.2%",
  },
  {
    degree: "Senior Secondary (XII)",
    institution: "BVB Mehta Vidyalaya",
    period: "2013 - 2014",
    aggregate: "Aggregate: 81.40%",
  },
  {
    degree: "Secondary (X)",
    institution: "BVB Mehta Vidyalaya",
    period: "2011 - 2012",
    aggregate: "Aggregate: 9.2 CGPA (87.40%)",
  },
];

export const positionsOfResponsibility: PositionOfResponsibility[] = [
  {
    title: "Team Leader, Smart India Hackathon 2017",
    description: "Led Team SPI, consisting of 6 members, shortlisted for grand finale",
  },
  {
    title: "Vice President, Special Projects Initiative (SPI)",
    description:
      "Core team member of Special Projects Initiative (SPI) of IT Department of college. Conducted inter section IT department Hackathon.",
  },
  {
    title: "President, Techedge Club",
    description:
      "Elected as President of Techedge Club, Computer Society, at Bharatiya Vidya Bhavan's Mehta Vidyalaya. Conducted Dewang Mehta Memorial Inter School IT Competition.",
  },
  {
    title: "Event Organizer, Innoviz 2016",
    description: "Organized 2 events at the annual techno-cultural fest, Innoviz 2016, at college.",
  },
];

export const downloads = [
  { label: "Download Portfolio", url: "/AbhishekVasudevPortfolio.pdf" },
  { label: "Download Resume", url: "/AbhishekVasudevResume.pdf" },
];

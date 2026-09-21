// Personal content supplied by Ayan; edit here for future content revisions.
export const portfolio = {
  "profile": {
    "name": "Ayan Siddiqui",
    "title": "Mechatronics Engineering Student",
    "school": "Toronto Metropolitan University (TMU)",
    "degree": "Bachelor of Engineering — Mechatronics Engineering",
    "graduation": "April 2028",
    "location": "Milton, Ontario, Canada",
    "headline": "Engineering across hardware, software, and AI.",
    "intro": "I’m a Mechatronics Engineering student at TMU building across mechanical design, robotics, AI, and software — from Formula SAE hardware and autonomous robots to applications and computer vision systems.",
    "status": "Open to 2027 co-op and internship opportunities.",
    "email": "ayan.siddiqui@torontomu.ca",
    "linkedin": "https://linkedin.com/in/ayansidd",
    "github": "https://github.com/ayansiddiqui25"
  },
  "experiences": [
    {
      "company": "RecAbility",
      "role": "Engineering Design Intern",
      "dates": "Feb 2026 – Present",
      "location": "Toronto, Ontario",
      "description": "Engineering design work on a powerchair football mechanism.",
      "points": [
        "Develop SolidWorks CAD models and assemblies, defining component geometry, tolerances, interfaces, and clearances.",
        "Produce technical and manufacturing drawings and bills of materials for fabrication.",
        "Conduct QA/QC reviews against engineering specifications and regulations; review fitment, packaging, and manufacturability.",
        "Support design reviews and engineering documentation."
      ],
      "skills": [
        "SolidWorks",
        "CAD",
        "Technical Drawings",
        "BOMs",
        "QA/QC",
        "Mechanical Design",
        "Design for Manufacturing"
      ]
    },
    {
      "company": "Rusteze Auto Detailing",
      "role": "Co-Owner",
      "dates": "May 2025 – Present",
      "location": "Milton, Ontario",
      "description": "Co-founded and operate an automotive detailing business serving 150+ customers.",
      "points": [
        "Improved service turnaround time by approximately 25%.",
        "Grew monthly revenue by approximately 40% during the first year.",
        "Standardized operating and equipment-preparation workflows.",
        "Handle scheduling, customer communication, service quality, and operations."
      ],
      "skills": [
        "Operations",
        "Process Improvement",
        "Entrepreneurship",
        "Customer Experience",
        "Workflow Optimization"
      ]
    },
    {
      "company": "SheHacksPurple",
      "role": "Project Management Intern",
      "dates": "Sep 2025 – Dec 2025",
      "location": "Toronto, Ontario",
      "description": "Worked on DevSecStation, a secure coding and application-security education platform.",
      "points": [
        "Coordinated cross-functional workstreams in Jira, tracking requirements, owners, dependencies, blockers, and milestones.",
        "Helped structure an AppSec learning path and analytics and reporting plans.",
        "Created technical and project documentation; supported a community that grew to 100+ members."
      ],
      "skills": [
        "Jira",
        "Looker Studio",
        "Metricool",
        "Plausible",
        "Circle"
      ]
    },
    {
      "company": "KKC Consulting",
      "role": "Software Engineering Intern",
      "dates": "May 2025 – Sep 2025",
      "location": "Toronto, Ontario",
      "description": "Worked on KKC Classroom, a live educational software platform.",
      "points": [
        "Developed frontend product features and translated stakeholder requirements into working functionality.",
        "Tested and iterated based on feedback.",
        "Worked with Next.js, TypeScript/JavaScript, Tailwind CSS, Firebase, and Figma."
      ],
      "skills": [
        "Next.js",
        "JavaScript",
        "TypeScript",
        "Firebase",
        "Figma",
        "Frontend Development"
      ]
    }
  ],
  "projects": [
    {
      "id": "qasam",
      "name": "Qasam",
      "type": "Mobile / Web Product",
      "image": "App screenshots to come",
      "description": "A Muslim prayer habit and accountability app designed to reduce phone distractions and build consistency around the five daily prayers.",
      "points": [
        "Designed and developed the product from concept to launch, including the user experience and product flows.",
        "Built secure accounts, prayer tracking, app-blocking workflows, accountability features, and persistent user-scoped data.",
        "Used Supabase Auth, PostgreSQL, and Row Level Security to protect user data.",
        "Published to the Apple App Store."
      ],
      "tech": [
        "Next.js",
        "TypeScript",
        "Supabase Auth",
        "PostgreSQL",
        "Row Level Security"
      ],
      "result": "Published on the App Store",
      "link": "https://apps.apple.com/ca/app/prayer-app-blocker-qasam/id6806862402",
      "linkLabel": "View on App Store",
      "category": "software"
    },
    {
      "id": "formula-racing",
      "name": "TMU Formula Racing — Electronics Enclosure",
      "type": "Mechanical / Formula SAE",
      "image": "CAD render to come",
      "description": "Designing a removable protective enclosure for electronics around the Formula SAE vehicle headrest area.",
      "points": [
        "Work within the existing vehicle packaging envelope and geometry, checking component clearances and mounting interfaces.",
        "Plan fastener placement and vibration resistance for dynamic racing loads.",
        "Balance manufacturability with fast maintenance access and repeated removal and installation."
      ],
      "tech": [
        "SolidWorks",
        "Mechanical Packaging",
        "Design for Manufacturing"
      ],
      "result": "Currently building",
      "link": "",
      "linkLabel": "",
      "category": "hardware"
    },
    {
      "id": "sentinel-ai",
      "name": "SentinelAI — Incident Response Platform",
      "type": "AI / Software",
      "image": "Platform screenshot to come",
      "description": "An AI-assisted incident-response platform that automates investigation of software outages and generates structured summaries of severity, timelines, root causes, and remediation.",
      "points": [
        "Built REST API workflows and integrated the OpenAI API.",
        "Stored and retrieved structured incident data using SQLite and SQLAlchemy.",
        "Built the backend with FastAPI and generated AI-assisted incident summaries."
      ],
      "tech": [
        "Python",
        "FastAPI",
        "React",
        "OpenAI API",
        "SQLite",
        "SQLAlchemy",
        "Git"
      ],
      "result": "Structured incident investigation and summaries",
      "link": "https://youtu.be/CWl1aig73W8",
      "linkLabel": "Watch demo",
      "category": "software"
    },
    {
      "id": "unet",
      "name": "U-Net Semantic Segmentation",
      "type": "Computer Vision / Deep Learning",
      "image": "Segmentation results to come",
      "description": "Built and trained a U-Net semantic segmentation model using the Cityscapes dataset.",
      "points": [
        "Used 2,975 training images and 500 validation images across 34 semantic classes.",
        "Trained for 20 epochs and evaluated model performance.",
        "Validation loss: 0.4117. Mean IoU: 37.52%."
      ],
      "tech": [
        "Python",
        "PyTorch",
        "NumPy",
        "Model Evaluation"
      ],
      "result": "37.52% mean IoU",
      "link": "https://github.com/ayansiddiqui25/unet-segmentation",
      "linkLabel": "View code",
      "category": "software"
    },
    {
      "id": "autonomous-robot",
      "name": "Autonomous Mobile Robot",
      "type": "Robotics / Control",
      "image": "Robot photo to come",
      "description": "Built an autonomous mobile robot system for navigation, environmental sensing, obstacle avoidance, and motion control.",
      "points": [
        "Developed a modular sensing, navigation, and control architecture.",
        "Performed iterative testing and fault diagnosis.",
        "Reduced debugging time by approximately 20% through modularization."
      ],
      "tech": [
        "Python",
        "C++",
        "Autonomous Systems",
        "Testing"
      ],
      "result": "Approximately 20% less debugging time",
      "link": "",
      "linkLabel": "",
      "category": "hardware"
    },
    {
      "id": "self-parking-car",
      "name": "Self-Parking Car",
      "type": "MEC 322 / Manufacturing Fundamentals",
      "image": "Selected concept and CAD drawings",
      "description": "Led the team project to design and manufacture a mechanically powered self-parking car for MEC 322. The challenge: knock over Jenga blocks and park in a designated zone using stored elastic energy, one acrylic sheet, and limited fasteners.",
      "points": [
        "Led the project; the design and drawings shown here are the team's work.",
        "Compared six concepts using a weighted evaluation matrix. Concept 1 was selected with the highest design score of 91; this is a selection score, not a competition result.",
        "Chose a 2.25:1 gear ratio to prioritize wheel torque over top speed, with large rear wheels and elastic-band traction.",
        "Used a pivoting front steering module with a 0.12 in hole and 0.112 in screw, giving 0.008 in clearance for rotation.",
        "Placed the elastic-band anchor approximately 3.00 in from the pinion axle to store mechanical energy.",
        "Developed CAD assembly and component drawings, then laser-cut and assembled the acrylic prototype."
      ],
      "tech": [
        "SolidWorks",
        "Mechanical Design",
        "Manufacturing"
      ],
      "result": "6 concepts evaluated · 91-point selected concept",
      "link": "",
      "linkLabel": "",
      "category": "hardware",
      "role": "Project Lead · Team project",
      "gallery": [
        {
          "src": "/project-assets/self-parking-car/selected-concept.jpeg",
          "alt": "Annotated team concept drawing showing the car's gears, elastic-band drive, rear wheels, and front steering module",
          "caption": "Selected concept — annotated mechanism",
          "width": 1584,
          "height": 2048
        },
        {
          "src": "/project-assets/self-parking-car/assembly-drawing.png",
          "alt": "Team CAD assembly drawing with orthographic views, isometric view, and bill of materials",
          "caption": "Assembly drawing & bill of materials",
          "width": 1058,
          "height": 818
        },
        {
          "src": "/project-assets/self-parking-car/drive-gear.png",
          "alt": "Dimensioned CAD drawing of the 36-tooth acrylic drive gear",
          "caption": "36-tooth drive gear — manufacturing drawing",
          "width": 1016,
          "height": 784
        }
      ]
    },
    {
      "id": "financial-dashboard",
      "name": "Financial Transaction Dashboard",
      "type": "Data / Analytics",
      "image": "Dashboard screenshot to come",
      "description": "Built a financial analytics dashboard with an ETL pipeline, interactive filtering, KPIs, and database-backed transaction analysis.",
      "points": [
        "Extracted, transformed, and stored transaction data.",
        "Built dynamic KPI calculations and interactive visualizations.",
        "Structured the application using modular object-oriented components."
      ],
      "tech": [
        "Python",
        "Plotly Dash",
        "SQLite",
        "SQL"
      ],
      "result": "Interactive database-backed transaction analysis",
      "link": "",
      "linkLabel": "",
      "category": "software"
    },
    {
      "id": "water-filtration",
      "name": "Water Filtration Unit",
      "type": "Human Factors / Engineering Design",
      "image": "Design render to come",
      "description": "An engineering design project focused on improving the usability and maintenance accessibility of a water filtration unit.",
      "points": [
        "Improved reach and maintenance accessibility by approximately 25%.",
        "Used weighted trade-off analysis to reduce design concepts by 50%.",
        "Focused on human factors, engineering requirements, accessibility, and design decision making."
      ],
      "tech": [
        "Human Factors",
        "Engineering Requirements",
        "Design Trade-offs",
        "Accessibility"
      ],
      "result": "Approximately 25% better maintenance accessibility",
      "link": "",
      "linkLabel": "",
      "category": "hardware"
    },
    {
      "id": "battery-enclosure",
      "name": "18650 Battery Module Enclosure",
      "type": "Mechanical Design",
      "image": "Enclosure render to come",
      "description": "Designed an enclosure for a 3×3 array of 18650 cylindrical battery cells.",
      "points": [
        "Accounted for cell dimensions, tolerances, retention, and assembly clearance.",
        "Designed ribbed walls, fastening, and a removable lid.",
        "Considered vibration resistance, passive airflow, thermal management, and manufacturability."
      ],
      "tech": [
        "SolidWorks",
        "Mechanical Design"
      ],
      "result": "Enclosure for a 3×3 cell array",
      "link": "",
      "linkLabel": "",
      "category": "hardware"
    }
  ],
  "skillGroups": [
    {
      "label": "Mechanical / Engineering",
      "skills": [
        "SolidWorks",
        "3D CAD Modelling",
        "Assembly Design",
        "Engineering Drawings",
        "Technical Drawings",
        "Tolerances",
        "Mechanical Packaging",
        "BOMs",
        "QA/QC",
        "Manufacturing",
        "Design for Manufacturing",
        "System Testing",
        "Engineering Documentation"
      ]
    },
    {
      "label": "Programming",
      "skills": [
        "Python",
        "C++",
        "C",
        "JavaScript",
        "TypeScript",
        "SQL",
        "MATLAB",
        "Java",
        "HTML"
      ]
    },
    {
      "label": "Web / Software",
      "skills": [
        "React",
        "Next.js",
        "FastAPI",
        "REST APIs",
        "SQLAlchemy",
        "Supabase",
        "Firebase"
      ]
    },
    {
      "label": "Databases",
      "skills": [
        "PostgreSQL",
        "SQLite"
      ]
    },
    {
      "label": "AI / Data",
      "skills": [
        "PyTorch",
        "Computer Vision",
        "U-Net",
        "Semantic Segmentation",
        "OpenAI API",
        "Plotly Dash",
        "Data Analysis"
      ]
    },
    {
      "label": "Tools",
      "skills": [
        "Git",
        "GitHub",
        "Jira",
        "VS Code",
        "JupyterLab",
        "Figma",
        "Microsoft 365",
        "Looker Studio"
      ]
    },
    {
      "label": "Robotics",
      "skills": [
        "Autonomous Navigation",
        "Obstacle Avoidance",
        "Sensor Integration",
        "Motion Control",
        "System Debugging"
      ]
    }
  ]
};

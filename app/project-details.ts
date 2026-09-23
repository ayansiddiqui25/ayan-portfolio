// Case-study copy grounded in Ayan's supplied information and project reports.
export type CaseStudy = { problem: string; solution: string; role: string; outcome: string; considerations?: string[] };
export const projectDetails: Record<string, CaseStudy> = {
  qasam: {
    problem: "Phone distractions can make it difficult to stay consistent with the five daily prayers. The product needed to support both personal habits and accountability without exposing private user data.",
    solution: "Qasam combines prayer tracking, app-blocking workflows, and accountability features with secure accounts. Supabase Auth and PostgreSQL Row Level Security keep stored data scoped to each user.",
    role: "I designed and developed the product from concept to launch, including the user experience, product flows, account system, and data layer.",
    outcome: "Published on the Apple App Store. The released product brings prayer tracking and distraction management into one experience."
  },
  "formula-racing": {
    problem: "Electrical components around the Formula SAE vehicle’s headrest area need protection during operation without slowing down maintenance, inspection, or troubleshooting. The available space is constrained by existing vehicle geometry, so the cover must fit around nearby components rather than be designed in isolation.",
    solution: "A removable enclosure developed in SolidWorks around packaging boundaries, component clearances, mounting locations, and fastener access. I considered mounting and fastening approaches that balance rigidity and reliable retention with straightforward removal for the electrical team. Installation, servicing, manufacturability, and interference with nearby vehicle systems informed the design throughout.",
    role: "As part of TMU Formula Racing, I worked on the enclosure design and mechanical packaging. I evaluated how the cover could be installed, fastened, removed, and serviced within the available space, considering vibration and dynamic vehicle loads alongside access to electrical hardware.",
    outcome: "The design work strengthened my experience in vehicle packaging, mechanical-electrical integration, clearances, fastening, and design for maintenance. It involved trade-offs between reliability, manufacturability, and serviceability. Vibration and dynamic loads were design considerations, not validated test results.",
    considerations: ["Tight vehicle packaging and clearance from surrounding geometry", "Protection of electrical components", "Secure mounting, fastening, and fastener access", "Vibration and dynamic vehicle loads", "Quick removal for maintenance and troubleshooting", "Accessibility to electrical hardware", "Manufacturability and assembly", "Mechanical-electrical system integration"]
  },
  "sentinel-ai": {
    problem: "Investigating a software outage requires bringing together incident evidence, severity, a timeline, and possible causes before deciding what to do next.",
    solution: "An AI-assisted incident-response platform that organizes investigations into structured summaries of severity, timelines, root causes, and remediation. REST APIs connect the interface, AI integration, and stored incident records.",
    role: "I built REST API workflows, integrated the OpenAI API, and implemented structured incident storage and retrieval with SQLite and SQLAlchemy.",
    outcome: "Built a working platform for structured incident investigation and review, demonstrated in a recorded walkthrough."
  },
  unet: {
    problem: "Urban street scenes need pixel-level interpretation rather than a single image label. The challenge was to train and evaluate a model that could segment Cityscapes imagery.",
    solution: "A U-Net semantic segmentation model built in PyTorch, trained for 20 epochs using 2,975 training images and evaluated on 500 validation images across 34 semantic classes.",
    role: "I built and trained the model, prepared the dataset workflow, and evaluated segmentation performance.",
    outcome: "Achieved 37.52% mean IoU and a validation loss of 0.4117. The repository contains the implementation."
  },
  "autonomous-robot": {
    problem: "Autonomous navigation depends on sensing, obstacle avoidance, and motion control working together. Tightly coupled components can make faults difficult to isolate.",
    solution: "A modular architecture separates sensing, navigation, and control, supported by iterative testing and fault diagnosis.",
    role: "I developed the robot system and its modular architecture using Python and C++, then tested and debugged its behavior.",
    outcome: "Reduced debugging time by approximately 20% through modularization while implementing navigation, environmental sensing, and obstacle avoidance."
  },
  "self-parking-car": {
    problem: "Design a mechanically powered car that knocks over Jenga blocks and parks in a designated zone, using stored elastic energy, one acrylic sheet, and limited fasteners.",
    solution: "The team compared six concepts and selected an elastic-powered drivetrain with a 2.25:1 gear ratio, large rear wheels, elastic-band traction, and a pivoting front steering module. CAD drawings supported laser-cutting and assembly.",
    role: "Project Lead · Team project. I led the project; the design development and drawings are credited to the team rather than presented as individual work.",
    outcome: "The selected concept scored 91 in the team's weighted design matrix, the highest of six concepts. The team developed drawings and assembled an acrylic prototype. The score is a design-selection result, not a competition result."
  },
  "financial-dashboard": {
    problem: "Transaction records need to be transformed into usable data before patterns and financial KPIs can be explored interactively.",
    solution: "An ETL pipeline extracts, transforms, and stores transaction data in SQLite. A Plotly Dash interface adds filters, dynamic KPI calculations, and interactive visualizations.",
    role: "I built the data pipeline and dashboard, organizing the application into modular object-oriented components.",
    outcome: "Delivered an interactive, database-backed dashboard for filtering transactions, visualizing patterns, and reviewing dynamic financial KPIs."
  },
  "water-filtration": {
    problem: "Rural, low-income households in high-rainfall regions may lack reliable water infrastructure and electricity. A rainwater system must also be affordable, easy to operate, and accessible to people with limited mobility.",
    solution: "The team investigated gravity-fed collection, multi-stage filtration, storage, and controlled outflow. The report's selected configuration uses roof gutters, a debris pre-filter, a 50 L storage tank, and biosand filtration. Design targets include at least 0.2 L/min flow and material/assembly costs below CAD $50, without electricity or fuel.",
    role: "I contributed engineering requirements, human-factors analysis, and concept evaluation. My named concept in the report (Design 4) emphasizes a raised tank, accessible filtration, clear visual indicators, and valve controls for users with limited mobility.",
    outcome: "Produced a documented concept study with usage scenarios and human-factors analysis. My supplied project summary reports approximately 25% better reach/maintenance accessibility and a 50% reduction in concepts through weighted trade-offs. These are design-evaluation figures, not evidence of tested water quality. Flow, cost, durability, and potability still require physical validation."
  },
  "battery-enclosure": {
    problem: "A 3×3 array of 18650 cylindrical battery cells needs secure packaging that maintains consistent spacing and prevents unwanted movement while allowing practical assembly, airflow, and structural support. The enclosure must provide room for fastening without adding unnecessary material or completely restricting heat dissipation.",
    solution: "A mechanical enclosure and cell-retention system developed in SolidWorks. I iterated wall thickness, retention geometry, ribs, clearances, and mounting features to balance structural rigidity with compact packaging, manufacturability, and ease of assembly. Airflow and basic thermal pathways around the cells were considered alongside the mechanical interfaces.",
    role: "I designed the enclosure and retention system, working through cell dimensions, tolerances, spacing, fastening, and assembly fit. I adjusted the CAD geometry to account for how individual components interact within the battery system and prepared it with future structural validation in mind.",
    outcome: "Produced an enclosure design for a nine-cell array and strengthened my understanding of battery packaging, mechanical interfaces, tolerancing, thermal considerations, and design around physical constraints. Geometry was prepared for future SolidWorks Simulation stress analysis; that analysis has not yet been performed. Thermal performance and vibration resistance remain design considerations rather than validated results.",
    considerations: ["Packaging a 3×3 array of 18650 cylindrical cells", "Cell retention and consistent spacing", "Structural ribs and wall thickness", "Mechanical clearances and assembly fit", "Fastening and mounting strategy", "Airflow and basic thermal pathways", "Vibration and movement of cells within the enclosure", "Manufacturability and ease of assembly", "Preparation for future SolidWorks Simulation analysis"]
  }
};

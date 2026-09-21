// Case-study copy grounded in Ayan's supplied information and project reports.
export type CaseStudy = { problem: string; solution: string; role: string; outcome: string };
export const projectDetails: Record<string, CaseStudy> = {
  qasam: {
    problem: "Phone distractions can make it difficult to stay consistent with the five daily prayers. The product needed to support both personal habits and accountability without exposing private user data.",
    solution: "Qasam combines prayer tracking, app-blocking workflows, and accountability features with secure accounts. Supabase Auth and PostgreSQL Row Level Security keep stored data scoped to each user.",
    role: "I designed and developed the product from concept to launch, including the user experience, product flows, account system, and data layer.",
    outcome: "Published on the Apple App Store. The released product brings prayer tracking and distraction management into one experience."
  },
  "formula-racing": {
    problem: "Electronics around the Formula SAE headrest need protection within a constrained vehicle envelope, without making routine maintenance difficult.",
    solution: "A removable enclosure designed around existing geometry, mounting interfaces, and component clearances. Fastener placement, vibration resistance, and repeated access inform the packaging decisions.",
    role: "I am designing the enclosure in SolidWorks, balancing mechanical packaging, manufacturability, and service access.",
    outcome: "Design work is ongoing. The current focus is packaging and mounting; race testing and final manufacturing results are not yet available."
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
    problem: "A 3×3 array of 18650 cells needs secure retention, assembly clearance, and maintenance access within a manufacturable enclosure.",
    solution: "A SolidWorks enclosure with ribbed walls, fasteners, and a removable lid. The design considers cell tolerances, vibration resistance, passive airflow, and thermal management.",
    role: "I designed the enclosure and accounted for cell dimensions, retention, clearances, and assembly requirements.",
    outcome: "Completed an enclosure design for a nine-cell array, incorporating cell retention, a removable lid, and assembly clearance."
  }
};

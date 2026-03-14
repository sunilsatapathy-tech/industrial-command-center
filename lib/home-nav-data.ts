export type ShowcaseEntry = {
  label: string;
  slug: string;
  summary: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  stats: Array<{ label: string; value: string }>;
  highlights: string[];
  updates: string[];
};

export type ShowcaseSection = {
  key: 'products' | 'services' | 'solutions' | 'support' | 'partners';
  label: string;
  description: string;
  entries: ShowcaseEntry[];
};

type ShowcaseProfile = {
  title: string;
  descriptionSuffix: string;
  stats: Array<{ label: string; value: string }>;
  highlights: string[];
  updates: string[];
};

function inferSectionKey(
  sectionLabel: string
): 'products' | 'services' | 'solutions' | 'support' | 'partners' {
  if (sectionLabel === 'Products') {
    return 'products';
  }
  if (sectionLabel === 'Services') {
    return 'services';
  }
  if (sectionLabel === 'Support') {
    return 'support';
  }
  if (sectionLabel === 'Sales & Partners') {
    return 'partners';
  }
  return 'solutions';
}

function hasKeyword(label: string, keywords: string[]) {
  const normalized = label.toLowerCase();
  return keywords.some((keyword) => normalized.includes(keyword));
}

function buildProfile(sectionLabel: string, label: string): ShowcaseProfile {
  const sectionKey = inferSectionKey(sectionLabel);

  if (sectionKey === 'products') {
    if (
      hasKeyword(label, [
        'hardware',
        'computers',
        'monitors',
        'input/output',
        'power supplies',
        'controllers',
        'sensors',
        'signal interface',
      ])
    ) {
      return {
        title: `${label} for reliable plant-floor deployment`,
        descriptionSuffix:
          'The placeholder content is focused on hardware rollout, diagnostics, and cabinet-level reliability.',
        stats: [
          { label: 'Installed devices', value: '14,280' },
          { label: 'Panel coverage', value: '96 lines' },
          { label: 'Diagnostic readiness', value: '99.2%' },
        ],
        highlights: [
          `${label} supports field-proven deployment across control cabinets, machines, and line-side infrastructure.`,
          `Engineering teams use ${label.toLowerCase()} data to improve commissioning speed, diagnostics, and standardization.`,
          `The demo content reflects how ${label.toLowerCase()} can be positioned in a modern industrial portfolio.`,
        ],
        updates: [
          `${label} reference architecture refreshed for multi-line expansion planning.`,
          `${label} demo BOM and deployment guide prepared for customer evaluations.`,
          `${label} lifecycle bulletin updated with spare strategy and service notes.`,
        ],
      };
    }

    if (
      hasKeyword(label, [
        'software',
        'cloud',
        'visualization',
        'alarm',
        'historian',
        'remote operations',
        'worker',
      ])
    ) {
      return {
        title: `${label} for connected industrial software operations`,
        descriptionSuffix:
          'This demo page is tuned for software adoption, site visibility, and decision support workflows.',
        stats: [
          { label: 'Connected users', value: '3,420' },
          { label: 'Live dashboards', value: '184' },
          { label: 'Alert response gain', value: '27%' },
        ],
        highlights: [
          `${label} helps operations teams centralize data, context, and response workflows in one digital layer.`,
          `The sample content shows how ${label.toLowerCase()} can support visibility, collaboration, and reporting.`,
          `${label} pages are framed to feel like production-ready software marketing and solution content.`,
        ],
        updates: [
          `${label} workspace templates updated for multi-site command center rollouts.`,
          `${label} release communication draft prepared for customer advisory reviews.`,
          `${label} pilot enablement assets published for operator and manager onboarding.`,
        ],
      };
    }

    if (
      hasKeyword(label, [
        'mes',
        'orchestration',
        'batch',
        'quality',
        'execution',
        'work instructions',
        'monitoring',
        'scheduling',
      ])
    ) {
      return {
        title: `${label} for high-visibility production execution`,
        descriptionSuffix:
          'The placeholder metrics emphasize throughput, traceability, scheduling, and line-level execution discipline.',
        stats: [
          { label: 'Orders orchestrated', value: '1,260' },
          { label: 'Traceable batches', value: '98.7%' },
          { label: 'Schedule adherence', value: '93.4%' },
        ],
        highlights: [
          `${label} brings clearer production coordination across orders, quality checkpoints, and shift execution.`,
          `Manufacturing teams use ${label.toLowerCase()} to reduce manual handoffs and improve response timing.`,
          `The demo layout mirrors how execution and MES content can be presented to plant leadership.`,
        ],
        updates: [
          `${label} value-stream storyboard updated for production review workshops.`,
          `${label} KPI pack expanded to include schedule, quality, and downtime context.`,
          `${label} site evaluation package prepared for packaged food and discrete manufacturing demos.`,
        ],
      };
    }

    return {
      title: `${label} for uptime, maintenance, and process control`,
      descriptionSuffix:
        'This demo page focuses on asset performance, maintenance readiness, and operational continuity.',
      stats: [
        { label: 'Assets covered', value: '8,940' },
        { label: 'Maintenance windows', value: '218' },
        { label: 'Energy variance cut', value: '12.6%' },
      ],
      highlights: [
        `${label} connects production continuity with maintenance planning, asset health, and energy performance.`,
        `Teams use ${label.toLowerCase()} insights to prioritize corrective action without losing operational context.`,
        `The placeholder content is tailored to process, maintenance, and lifecycle-focused product messaging.`,
      ],
      updates: [
        `${label} roadmap aligned to reliability, maintenance, and sustainability program reviews.`,
        `${label} dashboard examples updated for utility, batch, and continuous process environments.`,
        `${label} service notes refreshed for field teams supporting uptime improvement projects.`,
      ],
    };
  }

  if (sectionKey === 'services') {
    return {
      title: `${label} services for measurable lifecycle outcomes`,
      descriptionSuffix:
        'The dummy content is oriented around service contracts, response readiness, and plant improvement programs.',
      stats: [
        { label: 'Active engagements', value: '286' },
        { label: 'Sites supported', value: '74' },
        { label: 'Response SLA', value: '< 4 hr' },
      ],
      highlights: [
        `${label} is presented as a service offering that improves readiness, performance, and operational confidence.`,
        `The placeholder story shows how ${label.toLowerCase()} could be positioned for modernization and support programs.`,
        `Each service page now uses more realistic commercial and lifecycle-oriented dummy data.`,
      ],
      updates: [
        `${label} scope template updated for upcoming customer discovery workshops.`,
        `${label} service collateral refreshed for lifecycle renewal conversations.`,
        `${label} pilot support package prepared for plant leadership evaluations.`,
      ],
    };
  }

  if (sectionKey === 'support') {
    return {
      title: `${label} resources for faster technical support`,
      descriptionSuffix:
        'The placeholder metrics are tuned for documentation access, troubleshooting, and training readiness.',
      stats: [
        { label: 'Knowledge assets', value: '5,840' },
        { label: 'Monthly downloads', value: '12,600' },
        { label: 'Case resolution rate', value: '94.8%' },
      ],
      highlights: [
        `${label} is framed as a support destination that reduces search time and improves issue resolution.`,
        `Teams can use ${label.toLowerCase()} style pages to guide onboarding, troubleshooting, and self-service support.`,
        `The demo data has been adjusted to feel more like a real customer support experience.`,
      ],
      updates: [
        `${label} content index refreshed for the latest training and support workflows.`,
        `${label} service queue summary updated for customer care and technical support teams.`,
        `${label} enablement pack prepared for portal and knowledgebase improvements.`,
      ],
    };
  }

  if (sectionKey === 'partners') {
    return {
      title: `${label} for ecosystem growth and commercial delivery`,
      descriptionSuffix:
        'The dummy data focuses on partner reach, ecosystem enablement, and regional delivery capacity.',
      stats: [
        { label: 'Certified partners', value: '412' },
        { label: 'Countries served', value: '38' },
        { label: 'Joint opportunities', value: '126' },
      ],
      highlights: [
        `${label} is positioned as a commercial and ecosystem destination for finding the right delivery model.`,
        `The placeholder content highlights how ${label.toLowerCase()} can support discovery, collaboration, and channel growth.`,
        `This page now uses more realistic partner-oriented metrics and program language.`,
      ],
      updates: [
        `${label} program summary updated for regional partner onboarding plans.`,
        `${label} commercial guide refreshed with target market and delivery coverage data.`,
        `${label} enablement toolkit prepared for distributor and integrator alignment sessions.`,
      ],
    };
  }

  if (
    hasKeyword(label, [
      'automotive',
      'cement',
      'chemical',
      'entertainment',
      'fiber',
      'food',
      'household',
      'hydrogen',
      'infrastructure',
      'life sciences',
      'marine',
      'metals',
      'mining',
      'oil',
      'power generation',
      'print',
      'pulp',
      'semiconductor',
      'warehouse',
      'waste',
      'water',
    ])
  ) {
    return {
      title: `${label} industry solutions for connected operations`,
      descriptionSuffix:
        'The placeholder content is shaped around industry-specific uptime, compliance, and output priorities.',
      stats: [
        { label: 'Reference sites', value: '34' },
        { label: 'Typical OEE uplift', value: '9.6%' },
        { label: 'Deployment timeline', value: '16 weeks' },
      ],
      highlights: [
        `${label} pages now reflect industry-specific operating priorities, response models, and digital maturity goals.`,
        `The demo narrative shows how ${label.toLowerCase()} customers could use Command Center-style visibility in daily operations.`,
        `The content structure is tailored to feel more credible for industry marketing and case-study journeys.`,
      ],
      updates: [
        `${label} benchmark summary updated with current operating model assumptions.`,
        `${label} industry storyboard refreshed for customer advisory and sales discovery sessions.`,
        `${label} showcase metrics aligned to site-level throughput, compliance, and reliability reviews.`,
      ],
    };
  }

  return {
    title: `${label} for industrial transformation programs`,
    descriptionSuffix:
      'The placeholder data is aligned to modernization, visibility, and value-stream performance outcomes.',
    stats: [
      { label: 'Programs launched', value: '92' },
      { label: 'Sites standardized', value: '41' },
      { label: 'Productivity uplift', value: '14.2%' },
    ],
    highlights: [
      `${label} is framed as a solution area that helps teams connect modernization goals to measurable plant outcomes.`,
      `The sample page uses ${label.toLowerCase()} content that feels more specific to transformation, execution, and scale.`,
      `The dummy data now supports a more believable solution-marketing experience across the site.`,
    ],
    updates: [
      `${label} value map refreshed for plant leadership and digital strategy workshops.`,
      `${label} customer storyline updated with implementation and ROI checkpoints.`,
      `${label} evaluation toolkit prepared for pilot scoping and multi-site planning.`,
    ],
  };
}

function makeEntry(sectionLabel: string, label: string, summary: string): ShowcaseEntry {
  const profile = buildProfile(sectionLabel, label);

  return {
    label,
    slug: toSlug(label),
    summary,
    eyebrow: sectionLabel,
    heroTitle: profile.title,
    heroDescription: `${summary} ${profile.descriptionSuffix}`,
    stats: profile.stats,
    highlights: profile.highlights,
    updates: profile.updates,
  };
}

export function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function toShowcaseHref(sectionKey: ShowcaseSection['key'], label: string) {
  return `/showcase/${sectionKey}/${toSlug(label)}`;
}

export const showcaseSections: ShowcaseSection[] = [
  {
    key: 'products',
    label: 'Products',
    description: 'Explore connected hardware, software, MES, and plant operations offerings.',
    entries: [
      makeEntry('Products', 'Products', 'Explore the complete Command Center product portfolio across hardware, software, execution, and maintenance domains.'),
      makeEntry('Products', 'Hardware', 'Browse hardware categories supporting controls, sensing, power, and industrial connectivity.'),
      makeEntry('Products', 'Software', 'Explore software offerings for visualization, alarms, historian services, and connected operations.'),
      makeEntry('Products', 'Execution & MES', 'Review execution and MES capabilities for production, quality, scheduling, and shift workflows.'),
      makeEntry('Products', 'Process & Maintenance', 'Connect process control, asset strategy, maintenance, and energy performance in one portfolio.'),
      makeEntry('Products', "What's New in Hardware", 'Review the latest hardware additions for controls, sensing, and edge connectivity.'),
      makeEntry('Products', 'Condition Monitoring', 'Track vibration, temperature, and health indicators across critical production assets.'),
      makeEntry('Products', 'Industrial Computers & Monitors', 'Deploy rugged computing and visualization endpoints on the plant floor.'),
      makeEntry('Products', 'Input/Output Modules', 'Connect PLCs and field devices with scalable I/O strategies for production systems.'),
      makeEntry('Products', 'Power Supplies', 'Support resilient controls infrastructure with industrial-grade power delivery.'),
      makeEntry('Products', 'Programmable Controllers', 'Coordinate machines, cells, and lines with high-performance control platforms.'),
      makeEntry('Products', 'Sensors & Switches', 'Capture process state, asset position, and quality signals across the plant.'),
      makeEntry('Products', 'Signal Interface', 'Simplify field signal isolation, conditioning, and system connectivity.'),
      makeEntry('Products', "What's New in Software", 'See the latest updates across industrial software and connected operations products.'),
      makeEntry('Products', 'Command Center Cloud', 'Centralize operational visibility, alerts, and reporting in one connected workspace.'),
      makeEntry('Products', 'Realtime Visualization', 'Present live equipment and line performance in role-based interfaces.'),
      makeEntry('Products', 'Alarm Intelligence', 'Improve operator response with alarm prioritization, context, and workflow guidance.'),
      makeEntry('Products', 'Operations Historian', 'Store and review time-series operational data for reporting and analysis.'),
      makeEntry('Products', 'Asset Health Monitoring', 'Surface asset risk and maintenance readiness across production environments.'),
      makeEntry('Products', 'Remote Operations Access', 'Support secure access to dashboards, reports, and engineering views.'),
      makeEntry('Products', 'Connected Worker Apps', 'Deliver guided workflows, digital procedures, and shift collaboration tools.'),
      makeEntry('Products', 'Production Orchestration', 'Coordinate orders, batches, and execution workflows across multiple lines.'),
      makeEntry('Products', 'Batch Management', 'Manage recipe-driven production with consistent execution and traceability.'),
      makeEntry('Products', 'Quality Operations', 'Track inspection activity, deviations, and quality performance indicators.'),
      makeEntry('Products', 'Performance Analytics', 'Turn production and downtime data into actionable operational insight.'),
      makeEntry('Products', 'Shift Execution', 'Align shift teams on output, alarms, maintenance, and response priorities.'),
      makeEntry('Products', 'Digital Work Instructions', 'Guide frontline teams with step-based digital procedures and confirmations.'),
      makeEntry('Products', 'Production Monitoring', 'Provide live status across assets, throughput, utilization, and downtime.'),
      makeEntry('Products', 'Finite Scheduling', 'Plan production execution with realistic capacity and line constraints.'),
      makeEntry('Products', 'Plant Operations Control', 'Bring control context, line status, and operational decisions into one layer.'),
      makeEntry('Products', 'Energy Management', 'Track plant energy usage, baselines, and sustainability performance.'),
      makeEntry('Products', 'CMMS Integration', 'Connect maintenance workflows and equipment history with production context.'),
      makeEntry('Products', 'Predictive Maintenance', 'Use condition trends and model outputs to prioritize intervention windows.'),
      makeEntry('Products', 'Asset Strategy', 'Standardize maintenance and lifecycle planning for critical equipment.'),
      makeEntry('Products', 'Remote Support', 'Support remote diagnostics and guided troubleshooting for plant teams.'),
      makeEntry('Products', 'Industrial Communications', 'Enable secure, reliable communication across industrial networks.'),
      makeEntry('Products', 'Digital Twin Readiness', 'Prepare operational data foundations for simulation and design feedback loops.'),
    ],
  },
  {
    key: 'services',
    label: 'Services',
    description: 'Discover lifecycle, cybersecurity, optimization, and production support services.',
    entries: [
      makeEntry('Services', 'Services', 'Review the full services portfolio supporting deployment, modernization, support, and operational readiness.'),
      makeEntry('Services', 'Lifecycle Services', 'Review lifecycle service programs designed to support modernization, uptime, and operational readiness.'),
      makeEntry('Services', 'Production Automation', 'See service offerings focused on controls modernization and production automation delivery.'),
      makeEntry('Services', 'Digital Operations', 'Support digital operations programs with services that improve visibility and coordination.'),
      makeEntry('Services', 'Industrial Cybersecurity', 'Explore cybersecurity services built for connected industrial environments.'),
      makeEntry('Services', 'Production Optimization', 'Improve throughput and asset performance through optimization-focused service programs.'),
      makeEntry('Services', 'Learn About Our End-to-End Services', 'Understand how lifecycle services support equipment, people, and plant readiness.'),
      makeEntry('Services', 'Overview', 'Review service scope, engagement models, and operational value for manufacturers.'),
      makeEntry('Services', 'Coordinated Drive System Solutions', 'Support drive system design, performance tuning, and modernization services.'),
      makeEntry('Services', 'Packaged Solutions', 'Accelerate deployment with pre-scoped service packages for plant operations.'),
      makeEntry('Services', 'Distributed Control System Solutions', 'Advance DCS readiness, modernization, and support planning.'),
      makeEntry('Services', 'Cybersecurity', 'Improve industrial cybersecurity posture with assessments and support programs.'),
      makeEntry('Services', 'Industrial Network Cybersecurity', 'Protect plant network architecture, segmentation, and remote access strategies.'),
      makeEntry('Services', 'Pre-Engineered Network Solutions', 'Deploy validated network designs for faster industrial rollout.'),
      makeEntry('Services', 'Asset Optimization Services Overview', 'Connect maintenance and reliability services to production performance.'),
      makeEntry('Services', 'Equipment Repair', 'Reduce downtime with structured repair and restoration service workflows.'),
      makeEntry('Services', 'Equipment Remanufacturing', 'Extend asset life with remanufacturing options for critical equipment.'),
      makeEntry('Services', 'Repair and Inventory Agreements', 'Align repair programs and spare strategy with asset criticality.'),
      makeEntry('Services', 'Integrated Service Agreements', 'Bundle service programs into a coordinated long-term operating model.'),
      makeEntry('Services', 'Remote Support & Monitoring', 'Support plant teams with connected diagnostics and remote expert access.'),
      makeEntry('Services', 'Onsite & Field Services', 'Bring technical specialists on site for commissioning, troubleshooting, and optimization.'),
      makeEntry('Services', 'Safety Services', 'Support machine safety, compliance readiness, and operational risk reduction.'),
      makeEntry('Services', 'Training Services', 'Prepare teams with structured training for controls, operations, and maintenance.'),
    ],
  },
  {
    key: 'solutions',
    label: 'Solutions & Industries',
    description: 'Browse solution areas, industry-specific priorities, and operational case studies.',
    entries: [
      makeEntry('Solutions & Industries', 'Solutions & Industries', 'Discover solution frameworks and industry-focused pages built around measurable operational outcomes.'),
      makeEntry('Solutions & Industries', 'Solutions', 'Browse cross-functional solution areas designed for industrial modernization and performance.'),
      makeEntry('Solutions & Industries', 'Industries', 'Explore industry-specific priorities, operating models, and digital transformation needs.'),
      makeEntry('Solutions & Industries', 'Solutions For', 'Review focused solution groupings for ecosystem segments and machine builders.'),
      makeEntry('Solutions & Industries', 'Advanced Motion & Robotics', 'Improve coordinated motion and robotics performance across complex production cells.'),
      makeEntry('Solutions & Industries', 'Asset Management', 'Combine asset context, service readiness, and lifecycle planning in one strategy.'),
      makeEntry('Solutions & Industries', 'Cybersecurity', 'Secure industrial environments with controls-aware cybersecurity approaches.'),
      makeEntry('Solutions & Industries', 'Data Operations & Analytics', 'Turn plant data into decisions with structured analytics and reporting.'),
      makeEntry('Solutions & Industries', 'Digital Thread', 'Connect engineering, operations, and maintenance through shared information flows.'),
      makeEntry('Solutions & Industries', 'Digital Transformation', 'Scale modernization with practical operational programs and governance.'),
      makeEntry('Solutions & Industries', 'HMI / SCADA', 'Improve plant visibility with modern HMI and supervisory control experiences.'),
      makeEntry('Solutions & Industries', 'Industrial Automation Control', 'Standardize control strategies across machines, skids, and lines.'),
      makeEntry('Solutions & Industries', 'Industrial Components', 'Build reliable systems with components aligned to industrial operating conditions.'),
      makeEntry('Solutions & Industries', 'Industrial Network Solutions', 'Support secure and scalable data movement throughout the plant.'),
      makeEntry('Solutions & Industries', 'New Capacity', 'Launch new lines and sites with stronger delivery readiness and execution visibility.'),
      makeEntry('Solutions & Industries', 'On-Machine Solutions', 'Place critical compute and control capabilities closer to the machine.'),
      makeEntry('Solutions & Industries', 'Process Solutions', 'Drive consistency, quality, and throughput across process applications.'),
      makeEntry('Solutions & Industries', 'Production Automation', 'Unify execution, asset state, and output performance across production systems.'),
      makeEntry('Solutions & Industries', 'Production Operations Management', 'Coordinate operations, reporting, and governance across the value stream.'),
      makeEntry('Solutions & Industries', 'Safety Solutions', 'Reduce operational risk with integrated machine safety approaches.'),
      makeEntry('Solutions & Industries', 'Scalable Control & Visualization', 'Expand control and visibility architectures without losing standardization.'),
      makeEntry('Solutions & Industries', 'Smart Manufacturing', 'Connect data, workflows, and plant teams around measurable business outcomes.'),
      makeEntry('Solutions & Industries', 'Software-defined Automation', 'Increase flexibility with more agile and modular automation architectures.'),
      makeEntry('Solutions & Industries', 'Sustainability Solutions', 'Track energy, waste, and operational efficiency initiatives together.'),
      makeEntry('Solutions & Industries', 'Workforce Enablement', 'Equip teams with tools, guidance, and insight for confident execution.'),
      makeEntry('Solutions & Industries', 'Automotive & Tire', 'Support throughput, quality, and traceability in high-volume production.'),
      makeEntry('Solutions & Industries', 'Cement', 'Balance process stability, maintenance, and energy performance.'),
      makeEntry('Solutions & Industries', 'Chemical', 'Improve process control, compliance, and production coordination.'),
      makeEntry('Solutions & Industries', 'Entertainment', 'Support complex venue operations and digital infrastructure programs.'),
      makeEntry('Solutions & Industries', 'Fiber & Textiles', 'Increase line visibility and production consistency in textile operations.'),
      makeEntry('Solutions & Industries', 'Food & Beverage', 'Coordinate quality, batch execution, and packaging performance.'),
      makeEntry('Solutions & Industries', 'Household & Personal Care', 'Manage fast-moving packaging, recipe changes, and asset readiness.'),
      makeEntry('Solutions & Industries', 'Hydrogen', 'Support emerging energy operations with scalable automation foundations.'),
      makeEntry('Solutions & Industries', 'Infrastructure', 'Operate critical infrastructure systems with stronger resilience and visibility.'),
      makeEntry('Solutions & Industries', 'Life Sciences', 'Support quality, compliance, and controlled manufacturing environments.'),
      makeEntry('Solutions & Industries', 'Marine', 'Manage connected industrial systems across demanding operating conditions.'),
      makeEntry('Solutions & Industries', 'Metals', 'Track asset health, uptime, and production intensity in metals operations.'),
      makeEntry('Solutions & Industries', 'Mining', 'Improve safety, remote visibility, and asset performance across sites.'),
      makeEntry('Solutions & Industries', 'Oil & Gas', 'Coordinate OT visibility, production continuity, and field support.'),
      makeEntry('Solutions & Industries', 'Power Generation', 'Balance generation reliability, maintenance, and performance targets.'),
      makeEntry('Solutions & Industries', 'Print & Publishing', 'Improve output quality and schedule adherence in print operations.'),
      makeEntry('Solutions & Industries', 'Pulp & Paper', 'Increase uptime and process consistency in continuous production.'),
      makeEntry('Solutions & Industries', 'Semiconductor', 'Support highly controlled manufacturing with detailed operational insight.'),
      makeEntry('Solutions & Industries', 'Warehouse & Fulfillment', 'Coordinate automation, inventory flow, and workforce visibility.'),
      makeEntry('Solutions & Industries', 'Waste Management', 'Track process performance, maintenance, and service continuity.'),
      makeEntry('Solutions & Industries', 'Water Wastewater', 'Operate utility infrastructure with better monitoring and response context.'),
      makeEntry('Solutions & Industries', 'OEMs', 'Support machine builders with scalable control, reporting, and service models.'),
      makeEntry('Solutions & Industries', 'View Case Studies', 'Explore customer examples that connect plant outcomes to digital operations.'),
      makeEntry('Solutions & Industries', 'Read Now', 'Open a detailed case study focused on operational technology maturity.'),
    ],
  },
  {
    key: 'support',
    label: 'Support',
    description: 'Access documentation, downloads, training resources, and support contacts.',
    entries: [
      makeEntry('Support', 'Support', 'Explore support resources, downloads, training content, and service contact paths in one place.'),
      makeEntry('Support', 'Documentation', 'Find documentation, certifications, release notes, and technical references in one place.'),
      makeEntry('Support', 'Product Support', 'Access downloads, configuration tools, and lifecycle support resources.'),
      makeEntry('Support', 'Training', 'Build team readiness with webinars, courses, subscriptions, and certificate programs.'),
      makeEntry('Support', 'Contact Us', 'Reach the right support and customer care channels for technical and commercial needs.'),
      makeEntry('Support', 'Technical Documentation Center', 'Search documentation, configuration guidance, and implementation references.'),
      makeEntry('Support', 'Product Drawings & Wiring Diagrams', 'Review technical drawings and installation references for field deployment.'),
      makeEntry('Support', 'Product Certifications', 'Access compliance and certification material for industrial products.'),
      makeEntry('Support', 'Release Notes', 'Track product updates, fixes, and recommended upgrade activities.'),
      makeEntry('Support', 'Technical Specifications', 'Review environmental, electrical, and integration details for products.'),
      makeEntry('Support', 'Downloads', 'Retrieve software, firmware, and tools for implementation and maintenance.'),
      makeEntry('Support', 'Selection & Configuration', 'Guide product selection and setup for common industrial use cases.'),
      makeEntry('Support', 'Management', 'Coordinate installed base management and lifecycle planning.'),
      makeEntry('Support', 'Webinars', 'Browse technical learning sessions aligned to operations and engineering teams.'),
      makeEntry('Support', 'Workforce Development Training', 'Support workforce readiness with structured industrial learning programs.'),
      makeEntry('Support', 'Instructor-led Courses', 'Enroll teams in guided courses for operations and technical subjects.'),
      makeEntry('Support', 'Certificate Programs', 'Validate role readiness with credential-based learning tracks.'),
      makeEntry('Support', 'Job Aids', 'Provide frontline teams with compact reference material for daily execution.'),
      makeEntry('Support', 'Training Workstations', 'Create hands-on training experiences with realistic controls environments.'),
      makeEntry('Support', 'Learning+ Training Subscriptions', 'Scale access to ongoing role-based industrial learning content.'),
      makeEntry('Support', 'TechConnect Support', 'Connect with technical experts for troubleshooting and operational support.'),
      makeEntry('Support', 'Customer Care', 'Resolve account, order, and service coordination needs.'),
      makeEntry('Support', 'Software Portal Help', 'Support users with portal access, entitlement, and download guidance.'),
      makeEntry('Support', 'General Inquiries', 'Route broader questions to the right support and commercial teams.'),
      makeEntry('Support', 'Compatibility and Downloads (PCDC)', 'Find compatibility references and downloadable content in one place.'),
      makeEntry('Support', 'Knowledgebase', 'Search practical answers to common technical and operational questions.'),
      makeEntry('Support', 'Literature Library', 'Access brochures, reference sheets, and structured collateral libraries.'),
      makeEntry('Support', 'Engage Online Community', 'Join community discussion around implementation and optimization topics.'),
      makeEntry('Support', 'Learn More about TechConnect', 'Review the scope and value of technical support subscriptions.'),
    ],
  },
  {
    key: 'partners',
    label: 'Sales & Partners',
    description: 'Navigate partner discovery, ecosystem programs, and commercial enablement pages.',
    entries: [
      makeEntry('Sales & Partners', 'Sales & Partners', 'Navigate sales enablement, partner discovery, and ecosystem programs through one connected commercial experience.'),
      makeEntry('Sales & Partners', 'Find a Partner', 'Locate partner resources and discovery tools for implementation and support needs.'),
      makeEntry('Sales & Partners', 'Our PartnerNetwork', 'Understand the partner ecosystem supporting industrial delivery and growth.'),
      makeEntry('Sales & Partners', 'Go to the Partner Finder', 'Locate implementation, distribution, and technology partners by need.'),
      makeEntry('Sales & Partners', 'PartnerNetwork Program', 'Understand how the partner ecosystem supports delivery and growth.'),
      makeEntry('Sales & Partners', 'Distributor Partners', 'Review partner channels focused on product access and regional coverage.'),
      makeEntry('Sales & Partners', 'Licensed Developers', 'Find approved development partners supporting connected industrial solutions.'),
      makeEntry('Sales & Partners', 'Original Equipment Manufacturer (OEM) Partners', 'Connect with machine builders and OEM-focused solution partners.'),
      makeEntry('Sales & Partners', 'System Integrator Partners', 'Engage partners for deployment, integration, and modernization programs.'),
      makeEntry('Sales & Partners', 'Technology Partners', 'Explore complementary technology relationships that strengthen solutions.'),
      makeEntry('Sales & Partners', 'Explore Now', 'Open a featured PartnerNetwork overview with demo commercial content.'),
    ],
  },
];

export function getShowcaseEntry(
  sectionKey: string,
  slug: string
): { section: ShowcaseSection; entry: ShowcaseEntry } | null {
  const section = showcaseSections.find((item) => item.key === sectionKey);
  if (!section) {
    return null;
  }

  const entry = section.entries.find((item) => item.slug === slug);
  if (!entry) {
    return null;
  }

  return { section, entry };
}

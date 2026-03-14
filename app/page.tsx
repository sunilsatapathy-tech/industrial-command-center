'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { toShowcaseHref } from '@/lib/home-nav-data';

const utilityLinks = [
  'Platform',
  'Industries',
  'Insights',
  'Partners',
  'Contact',
  'Resources',
];

const quickActions = [
  ['Plant Visibility', 'Connect operations, equipment, and alarms across every line.'],
  ['Industrial AI', 'Turn live production data into faster and clearer decisions.'],
  ['Sustainability', 'Track energy, uptime, and maintenance priorities together.'],
  ['Operations Cloud', 'Scale reporting and realtime collaboration across sites.'],
];

const productColumns = [
  {
    heading: 'Hardware',
    items: [
      "What's New in Hardware",
      'Condition Monitoring',
      'Industrial Computers & Monitors',
      'Input/Output Modules',
      'Power Supplies',
      'Programmable Controllers',
      'Sensors & Switches',
      'Signal Interface',
    ],
  },
  {
    heading: 'Software',
    items: [
      "What's New in Software",
      'Command Center Cloud',
      'Realtime Visualization',
      'Alarm Intelligence',
      'Operations Historian',
      'Asset Health Monitoring',
      'Remote Operations Access',
      'Connected Worker Apps',
    ],
  },
  {
    heading: 'Execution & MES',
    items: [
      'Production Orchestration',
      'Batch Management',
      'Quality Operations',
      'Performance Analytics',
      'Shift Execution',
      'Digital Work Instructions',
      'Production Monitoring',
      'Finite Scheduling',
    ],
  },
  {
    heading: 'Process & Maintenance',
    items: [
      'Plant Operations Control',
      'Energy Management',
      'CMMS Integration',
      'Predictive Maintenance',
      'Asset Strategy',
      'Remote Support',
      'Industrial Communications',
      'Digital Twin Readiness',
    ],
  },
];

const serviceColumns = [
  {
    heading: 'Lifecycle Services',
    items: ['Learn About Our End-to-End Services'],
  },
  {
    heading: 'Production Automation',
    items: [
      'Overview',
      'Coordinated Drive System Solutions',
      'Packaged Solutions',
      'Distributed Control System Solutions',
    ],
  },
  {
    heading: 'Digital Operations',
    items: ['Overview'],
  },
  {
    heading: 'Industrial Cybersecurity',
    items: [
      'Cybersecurity',
      'Industrial Network Cybersecurity',
      'Pre-Engineered Network Solutions',
    ],
  },
  {
    heading: 'Production Optimization',
    items: [
      'Asset Optimization Services Overview',
      'Equipment Repair',
      'Equipment Remanufacturing',
      'Repair and Inventory Agreements',
      'Integrated Service Agreements',
      'Remote Support & Monitoring',
      'Onsite & Field Services',
      'Safety Services',
      'Training Services',
    ],
  },
];

const solutionColumns = [
  {
    heading: 'Solutions',
    items: [
      'Advanced Motion & Robotics',
      'Asset Management',
      'Cybersecurity',
      'Data Operations & Analytics',
      'Digital Thread',
      'Digital Transformation',
      'HMI / SCADA',
      'Industrial Automation Control',
      'Industrial Components',
      'Industrial Network Solutions',
      'New Capacity',
      'On-Machine Solutions',
      'Packaged Solutions',
      'Process Solutions',
      'Production Automation',
      'Production Operations Management',
      'Safety Solutions',
      'Scalable Control & Visualization',
      'Smart Manufacturing',
      'Software-defined Automation',
      'Sustainability Solutions',
      'Workforce Enablement',
    ],
  },
  {
    heading: 'Industries',
    items: [
      'Automotive & Tire',
      'Cement',
      'Chemical',
      'Entertainment',
      'Fiber & Textiles',
      'Food & Beverage',
      'Household & Personal Care',
      'Hydrogen',
      'Infrastructure',
      'Life Sciences',
      'Marine',
      'Metals',
      'Mining',
      'Oil & Gas',
      'Power Generation',
      'Print & Publishing',
      'Pulp & Paper',
      'Semiconductor',
      'Warehouse & Fulfillment',
      'Waste Management',
      'Water Wastewater',
    ],
  },
];

const supportColumns = [
  {
    heading: 'Documentation',
    items: [
      'Technical Documentation Center',
      'Product Drawings & Wiring Diagrams',
      'Product Certifications',
      'Release Notes',
      'Technical Specifications',
    ],
  },
  {
    heading: 'Product Support',
    items: ['Downloads', 'Selection & Configuration', 'Management'],
  },
  {
    heading: 'Training',
    items: [
      'Webinars',
      'Workforce Development Training',
      'Instructor-led Courses',
      'Certificate Programs',
      'Job Aids',
      'Training Workstations',
      'Learning+ Training Subscriptions',
    ],
  },
  {
    heading: 'Contact Us',
    items: ['TechConnect Support', 'Customer Care', 'Software Portal Help', 'General Inquiries'],
  },
];

const supportQuickLinks = [
  'Compatibility and Downloads (PCDC)',
  'Knowledgebase',
  'Literature Library',
  'Engage Online Community',
];

const partnerColumns = [
  {
    heading: 'Find a Partner',
    items: ['Go to the Partner Finder'],
  },
  {
    heading: 'Our PartnerNetwork',
    items: [
      'PartnerNetwork Program',
      'Distributor Partners',
      'Licensed Developers',
      'Original Equipment Manufacturer (OEM) Partners',
      'System Integrator Partners',
      'Technology Partners',
    ],
  },
];

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<
    'products' | 'services' | 'solutions' | 'support' | 'partners' | null
  >(null);
  const [localeOpen, setLocaleOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const navRef = useRef<HTMLElement | null>(null);
  const localeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;

      if (!navRef.current?.contains(target)) {
        setActiveMenu(null);
      }

      if (!localeRef.current?.contains(target)) {
        setLocaleOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveMenu(null);
        setLocaleOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#edf7f7_0%,#dff1f1_100%)] text-slate-950">
      <div className="relative border-b border-slate-200 bg-white/95">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 text-sm text-slate-600 sm:px-6">
          <div ref={localeRef} className="relative">
            <button
              type="button"
              onClick={() => setLocaleOpen((value) => !value)}
              className={`flex items-center gap-2 border-b-2 pb-2 transition ${
                localeOpen
                  ? 'border-[#f97316] text-slate-950'
                  : 'border-transparent text-slate-700 hover:text-slate-950'
              }`}
              aria-expanded={localeOpen}
              aria-haspopup="dialog"
            >
              <svg
                className="h-5 w-5 text-slate-800"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3 12H21" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M12 3C14.7 5.7 16.25 8.75 16.25 12C16.25 15.25 14.7 18.3 12 21"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M12 3C9.3 5.7 7.75 8.75 7.75 12C7.75 15.25 9.3 18.3 12 21"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
              <span className="text-lg font-medium">
                {selectedCountry} | {selectedLanguage}
              </span>
              <svg
                className={`h-4 w-4 transition ${localeOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {localeOpen ? (
              <div className="absolute left-0 top-full z-40 mt-[1px] w-[460px] border border-slate-200 bg-white px-7 py-8 shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
                <div>
                  <p className="text-[2rem] font-semibold tracking-tight text-slate-800">
                    Select country or region
                  </p>
                  <label className="mt-5 block text-lg font-medium text-slate-700">
                    Country/Region*
                  </label>
                  <div className="relative mt-2">
                    <select
                      value={selectedCountry}
                      onChange={(event) => setSelectedCountry(event.target.value)}
                      className="h-14 w-full appearance-none rounded-[10px] border border-slate-500 bg-white px-5 pr-14 text-xl text-slate-700 outline-none transition focus:border-sky-600"
                    >
                      <option value="">Please make a selection</option>
                      <option value="AF">Afghanistan</option>
                      <option value="AL">Albania</option>
                      <option value="DZ">Algeria</option>
                      <option value="AD">Andorra</option>
                      <option value="AO">Angola</option>
                      <option value="AG">Antigua and Barbuda</option>
                      <option value="AR">Argentina</option>
                      <option value="AM">Armenia</option>
                      <option value="AU">Australia</option>
                      <option value="AT">Austria</option>
                      <option value="AZ">Azerbaijan</option>
                      <option value="BS">Bahamas</option>
                      <option value="BH">Bahrain</option>
                      <option value="BD">Bangladesh</option>
                      <option value="BB">Barbados</option>
                      <option value="BY">Belarus</option>
                      <option value="BE">Belgium</option>
                      <option value="BZ">Belize</option>
                      <option value="BJ">Benin</option>
                      <option value="BT">Bhutan</option>
                      <option value="BO">Bolivia</option>
                      <option value="BA">Bosnia and Herzegovina</option>
                      <option value="BW">Botswana</option>
                      <option value="BR">Brazil</option>
                      <option value="BN">Brunei</option>
                      <option value="BG">Bulgaria</option>
                      <option value="BF">Burkina Faso</option>
                      <option value="BI">Burundi</option>
                      <option value="CV">Cabo Verde</option>
                      <option value="KH">Cambodia</option>
                      <option value="CM">Cameroon</option>
                      <option value="CA">Canada</option>
                      <option value="CF">Central African Republic</option>
                      <option value="TD">Chad</option>
                      <option value="CL">Chile</option>
                      <option value="CN">China</option>
                      <option value="CO">Colombia</option>
                      <option value="KM">Comoros</option>
                      <option value="CG">Congo</option>
                      <option value="CD">Congo (Democratic Republic)</option>
                      <option value="CR">Costa Rica</option>
                      <option value="HR">Croatia</option>
                      <option value="CU">Cuba</option>
                      <option value="CY">Cyprus</option>
                      <option value="CZ">Czech Republic</option>
                      <option value="DK">Denmark</option>
                      <option value="DJ">Djibouti</option>
                      <option value="DM">Dominica</option>
                      <option value="DO">Dominican Republic</option>
                      <option value="EC">Ecuador</option>
                      <option value="EG">Egypt</option>
                      <option value="SV">El Salvador</option>
                      <option value="GQ">Equatorial Guinea</option>
                      <option value="ER">Eritrea</option>
                      <option value="EE">Estonia</option>
                      <option value="SZ">Eswatini</option>
                      <option value="ET">Ethiopia</option>
                      <option value="FJ">Fiji</option>
                      <option value="FI">Finland</option>
                      <option value="FR">France</option>
                      <option value="GA">Gabon</option>
                      <option value="GM">Gambia</option>
                      <option value="GE">Georgia</option>
                      <option value="DE">Germany</option>
                      <option value="GH">Ghana</option>
                      <option value="GR">Greece</option>
                      <option value="GD">Grenada</option>
                      <option value="GT">Guatemala</option>
                      <option value="GN">Guinea</option>
                      <option value="GW">Guinea-Bissau</option>
                      <option value="GY">Guyana</option>
                      <option value="HT">Haiti</option>
                      <option value="HN">Honduras</option>
                      <option value="HU">Hungary</option>
                      <option value="IS">Iceland</option>
                      <option value="IN">India</option>
                      <option value="ID">Indonesia</option>
                      <option value="IR">Iran</option>
                      <option value="IQ">Iraq</option>
                      <option value="IE">Ireland</option>
                      <option value="IL">Israel</option>
                      <option value="IT">Italy</option>
                      <option value="JM">Jamaica</option>
                      <option value="JP">Japan</option>
                      <option value="JO">Jordan</option>
                      <option value="KZ">Kazakhstan</option>
                      <option value="KE">Kenya</option>
                      <option value="KI">Kiribati</option>
                      <option value="KP">North Korea</option>
                      <option value="KR">South Korea</option>
                      <option value="KW">Kuwait</option>
                      <option value="KG">Kyrgyzstan</option>
                      <option value="LA">Laos</option>
                      <option value="LV">Latvia</option>
                      <option value="LB">Lebanon</option>
                      <option value="LS">Lesotho</option>
                      <option value="LR">Liberia</option>
                      <option value="LY">Libya</option>
                      <option value="LI">Liechtenstein</option>
                      <option value="LT">Lithuania</option>
                      <option value="LU">Luxembourg</option>
                      <option value="MG">Madagascar</option>
                      <option value="MW">Malawi</option>
                      <option value="MY">Malaysia</option>
                      <option value="MV">Maldives</option>
                      <option value="ML">Mali</option>
                      <option value="MT">Malta</option>
                      <option value="MH">Marshall Islands</option>
                      <option value="MR">Mauritania</option>
                      <option value="MU">Mauritius</option>
                      <option value="MX">Mexico</option>
                      <option value="FM">Micronesia</option>
                      <option value="MD">Moldova</option>
                      <option value="MC">Monaco</option>
                      <option value="MN">Mongolia</option>
                      <option value="ME">Montenegro</option>
                      <option value="MA">Morocco</option>
                      <option value="MZ">Mozambique</option>
                      <option value="MM">Myanmar</option>
                      <option value="NA">Namibia</option>
                      <option value="NR">Nauru</option>
                      <option value="NP">Nepal</option>
                      <option value="NL">Netherlands</option>
                      <option value="NZ">New Zealand</option>
                      <option value="NI">Nicaragua</option>
                      <option value="NE">Niger</option>
                      <option value="NG">Nigeria</option>
                      <option value="MK">North Macedonia</option>
                      <option value="NO">Norway</option>
                      <option value="OM">Oman</option>
                      <option value="PK">Pakistan</option>
                      <option value="PW">Palau</option>
                      <option value="PS">Palestine</option>
                      <option value="PA">Panama</option>
                      <option value="PG">Papua New Guinea</option>
                      <option value="PY">Paraguay</option>
                      <option value="PE">Peru</option>
                      <option value="PH">Philippines</option>
                      <option value="PL">Poland</option>
                      <option value="PT">Portugal</option>
                      <option value="QA">Qatar</option>
                      <option value="RO">Romania</option>
                      <option value="RU">Russia</option>
                      <option value="RW">Rwanda</option>
                      <option value="KN">Saint Kitts and Nevis</option>
                      <option value="LC">Saint Lucia</option>
                      <option value="VC">Saint Vincent and the Grenadines</option>
                      <option value="WS">Samoa</option>
                      <option value="SM">San Marino</option>
                      <option value="ST">Sao Tome and Principe</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="SN">Senegal</option>
                      <option value="RS">Serbia</option>
                      <option value="SC">Seychelles</option>
                      <option value="SL">Sierra Leone</option>
                      <option value="SG">Singapore</option>
                      <option value="SK">Slovakia</option>
                      <option value="SI">Slovenia</option>
                      <option value="SB">Solomon Islands</option>
                      <option value="SO">Somalia</option>
                      <option value="ZA">South Africa</option>
                      <option value="SS">South Sudan</option>
                      <option value="ES">Spain</option>
                      <option value="LK">Sri Lanka</option>
                      <option value="SD">Sudan</option>
                      <option value="SR">Suriname</option>
                      <option value="SE">Sweden</option>
                      <option value="CH">Switzerland</option>
                      <option value="SY">Syria</option>
                      <option value="TW">Taiwan</option>
                      <option value="TJ">Tajikistan</option>
                      <option value="TZ">Tanzania</option>
                      <option value="TH">Thailand</option>
                      <option value="TL">Timor-Leste</option>
                      <option value="TG">Togo</option>
                      <option value="TO">Tonga</option>
                      <option value="TT">Trinidad and Tobago</option>
                      <option value="TN">Tunisia</option>
                      <option value="TR">Turkey</option>
                      <option value="TM">Turkmenistan</option>
                      <option value="TV">Tuvalu</option>
                      <option value="UG">Uganda</option>
                      <option value="UA">Ukraine</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="UY">Uruguay</option>
                      <option value="UZ">Uzbekistan</option>
                      <option value="VU">Vanuatu</option>
                      <option value="VA">Vatican City</option>
                      <option value="VE">Venezuela</option>
                      <option value="VN">Vietnam</option>
                      <option value="YE">Yemen</option>
                      <option value="ZM">Zambia</option>
                      <option value="ZW">Zimbabwe</option>
                    </select>
                    <svg
                      className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-[2rem] font-semibold tracking-tight text-slate-800">
                    Select language
                  </p>
                  <label className="mt-5 block text-lg font-medium text-slate-700">
                    Language*
                  </label>
                  <div className="relative mt-2">
                    <select
                      value={selectedLanguage}
                      onChange={(event) => setSelectedLanguage(event.target.value)}
                      className="h-14 w-full appearance-none rounded-[10px] border border-slate-500 bg-white px-5 pr-14 text-xl text-slate-700 outline-none transition focus:border-sky-600"
                    >
                      <option value="">Please make a selection</option>
                      <option value="AF">Afrikaans</option>
                      <option value="SQ">Albanian</option>
                      <option value="AM">Amharic</option>
                      <option value="AR">Arabic</option>
                      <option value="HY">Armenian</option>
                      <option value="AZ">Azerbaijani</option>
                      <option value="EU">Basque</option>
                      <option value="BE">Belarusian</option>
                      <option value="BN">Bengali</option>
                      <option value="BS">Bosnian</option>
                      <option value="BG">Bulgarian</option>
                      <option value="CA">Catalan</option>
                      <option value="ZH">Chinese</option>
                      <option value="HR">Croatian</option>
                      <option value="CS">Czech</option>
                      <option value="DA">Danish</option>
                      <option value="NL">Dutch</option>
                      <option value="EN">English</option>
                      <option value="ET">Estonian</option>
                      <option value="FA">Persian</option>
                      <option value="FI">Finnish</option>
                      <option value="FR">French</option>
                      <option value="GL">Galician</option>
                      <option value="KA">Georgian</option>
                      <option value="DE">German</option>
                      <option value="EL">Greek</option>
                      <option value="GU">Gujarati</option>
                      <option value="HE">Hebrew</option>
                      <option value="HI">Hindi</option>
                      <option value="HU">Hungarian</option>
                      <option value="IS">Icelandic</option>
                      <option value="ID">Indonesian</option>
                      <option value="GA">Irish</option>
                      <option value="IT">Italian</option>
                      <option value="JA">Japanese</option>
                      <option value="KN">Kannada</option>
                      <option value="KK">Kazakh</option>
                      <option value="KM">Khmer</option>
                      <option value="KO">Korean</option>
                      <option value="KY">Kyrgyz</option>
                      <option value="LO">Lao</option>
                      <option value="LV">Latvian</option>
                      <option value="LT">Lithuanian</option>
                      <option value="MK">Macedonian</option>
                      <option value="MS">Malay</option>
                      <option value="ML">Malayalam</option>
                      <option value="MT">Maltese</option>
                      <option value="MR">Marathi</option>
                      <option value="MN">Mongolian</option>
                      <option value="NE">Nepali</option>
                      <option value="NO">Norwegian</option>
                      <option value="PS">Pashto</option>
                      <option value="PL">Polish</option>
                      <option value="PT">Portuguese</option>
                      <option value="PA">Punjabi</option>
                      <option value="RO">Romanian</option>
                      <option value="RU">Russian</option>
                      <option value="SR">Serbian</option>
                      <option value="SI">Sinhala</option>
                      <option value="SK">Slovak</option>
                      <option value="SL">Slovenian</option>
                      <option value="ES">Spanish</option>
                      <option value="SW">Swahili</option>
                      <option value="SV">Swedish</option>
                      <option value="TL">Tagalog</option>
                      <option value="TG">Tajik</option>
                      <option value="TA">Tamil</option>
                      <option value="TE">Telugu</option>
                      <option value="TH">Thai</option>
                      <option value="TR">Turkish</option>
                      <option value="UK">Ukrainian</option>
                      <option value="UR">Urdu</option>
                      <option value="UZ">Uzbek</option>
                      <option value="VI">Vietnamese</option>
                      <option value="CY">Welsh</option>
                      <option value="XH">Xhosa</option>
                      <option value="ZU">Zulu</option>
                    </select>
                    <svg
                      className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-end gap-6">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCountry('');
                      setSelectedLanguage('');
                    }}
                    className="text-[1.05rem] font-semibold text-[#1d5fbf] transition hover:text-[#0f3f8f]"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocaleOpen(false)}
                    className="rounded-[8px] bg-[#2367ad] px-8 py-3 text-[1.05rem] font-semibold uppercase tracking-[0.06em] text-white transition hover:bg-[#1a4f85]"
                  >
                    Update
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            {utilityLinks.map((item) => (
              <span key={item} className="cursor-default transition hover:text-slate-900">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <header
        ref={navRef}
        className="relative z-30 border-b border-slate-200 bg-white/98 backdrop-blur"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,#ef4444,#dc2626)] text-2xl font-bold text-white shadow-[0_18px_40px_rgba(239,68,68,0.28)]">
              CC
            </div>
            <div>
              <p className="text-3xl font-semibold leading-none tracking-tight text-[#c81e1e]">
                Command Center
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Industrial digital operations platform
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 xl:flex">
            {[
              { label: 'Products', menuKey: 'products' as const },
              { label: 'Services', menuKey: 'services' as const },
              { label: 'Solutions & Industries', menuKey: 'solutions' as const },
              { label: 'Support', menuKey: 'support' as const },
              { label: 'Sales & Partners', menuKey: 'partners' as const },
            ].map((item) => (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setActiveMenu((value) => (value === item.menuKey ? null : item.menuKey))
                  }
                  className={`border-b-4 pb-4 text-xl font-medium transition ${
                    activeMenu === item.menuKey
                      ? 'border-[#f97316] text-slate-950'
                      : 'border-transparent text-slate-800 hover:text-sky-700'
                  }`}
                  aria-expanded={activeMenu === item.menuKey}
                  aria-haspopup="true"
                >
                  {item.label}
                </button>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-2xl text-slate-800">
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 transition hover:border-sky-300 hover:text-sky-700"
              aria-label="Search"
            >
              ⌕
            </button>
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 transition hover:border-sky-300 hover:text-sky-700"
              aria-label="Account"
            >
              ◌
            </button>
          </div>
        </div>

        {activeMenu === 'products' ? (
          <div className="absolute left-0 right-0 top-full border-t border-slate-200 bg-white shadow-[0_22px_80px_rgba(15,23,42,0.18)]">
            <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">
              <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-4">
                {productColumns.map((column) => (
                  <div key={column.heading}>
                    <h3 className="border-b border-slate-200 pb-2 text-[1.7rem] font-semibold text-slate-700">
                      <Link
                        href={toShowcaseHref('products', column.heading)}
                        onClick={() => setActiveMenu(null)}
                        className="transition hover:text-[#0f3f8f]"
                      >
                        {column.heading}
                      </Link>
                    </h3>
                    <div className="mt-4 space-y-3">
                      {column.items.map((item) => (
                        <Link
                          key={item}
                          href={toShowcaseHref('products', item)}
                          onClick={() => setActiveMenu(null)}
                          className="block text-left text-[1.05rem] text-[#1d5fbf] transition hover:text-[#0f3f8f]"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {activeMenu === 'services' ? (
          <div className="absolute left-0 right-0 top-full border-t border-slate-200 bg-white shadow-[0_22px_80px_rgba(15,23,42,0.18)]">
            <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">
              <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
                <div className="space-y-8">
                  <div>
                    <h3 className="border-b border-slate-200 pb-2 text-[1.7rem] font-semibold uppercase text-slate-700">
                      <Link
                        href={toShowcaseHref('services', 'Lifecycle Services')}
                        onClick={() => setActiveMenu(null)}
                        className="transition hover:text-[#0f3f8f]"
                      >
                        Lifecycle Services
                      </Link>
                    </h3>
                    <Link
                      href={toShowcaseHref('services', 'Learn About Our End-to-End Services')}
                      onClick={() => setActiveMenu(null)}
                      className="mt-3 block text-left text-[1.05rem] text-[#1d5fbf] transition hover:text-[#0f3f8f]"
                    >
                      Learn About Our End-to-End Services
                    </Link>
                  </div>

                  <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2 xl:grid-cols-4">
                    {serviceColumns.slice(1).map((column) => (
                      <div key={column.heading}>
                        <h4 className="text-[1.4rem] font-semibold uppercase leading-tight text-slate-700">
                          <Link
                            href={toShowcaseHref('services', column.heading)}
                            onClick={() => setActiveMenu(null)}
                            className="transition hover:text-[#0f3f8f]"
                          >
                            {column.heading}
                          </Link>
                        </h4>
                        <div className="mt-4 space-y-3">
                          {column.items.map((item) => (
                            <Link
                              key={item}
                              href={toShowcaseHref('services', item)}
                              onClick={() => setActiveMenu(null)}
                              className="block text-left text-[1.05rem] leading-8 text-[#1d5fbf] transition hover:text-[#0f3f8f]"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.10)]">
                  <div className="h-52 bg-[linear-gradient(135deg,#e7eef6,#f8fafc)] p-4">
                    <div className="relative h-full overflow-hidden rounded-[14px] bg-[linear-gradient(135deg,#c7d2fe,#f8fafc_38%,#fed7aa_100%)]">
                      <div className="absolute left-8 top-12 h-32 w-24 rounded-[28px] bg-slate-500/90" />
                      <div className="absolute right-8 bottom-0 h-36 w-24 rounded-t-[30px] bg-orange-200/95" />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-white/55" />
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[1.95rem] font-semibold tracking-tight text-slate-800">
                      Lifecycle Services
                    </p>
                    <p className="mt-3 text-[1.05rem] leading-8 text-slate-600">
                      Lifecycle Services help your manufacturing facility work faster,
                      smarter, and with greater agility at every lifecycle stage.
                    </p>
                  </div>
                  <div className="h-1.5 bg-[#e11d48]" />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeMenu === 'solutions' ? (
          <div className="absolute left-0 right-0 top-full border-t border-slate-200 bg-white shadow-[0_22px_80px_rgba(15,23,42,0.18)]">
            <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">
              <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
                <div className="grid gap-10 xl:grid-cols-2">
                  {solutionColumns.map((column) => (
                    <div key={column.heading}>
                      <h3 className="border-b border-slate-200 pb-2 text-[1.7rem] font-semibold uppercase text-slate-700">
                        <Link
                          href={toShowcaseHref('solutions', column.heading)}
                          onClick={() => setActiveMenu(null)}
                          className="transition hover:text-[#0f3f8f]"
                        >
                          {column.heading}
                        </Link>
                      </h3>
                      <div
                        className={`mt-4 grid gap-x-12 gap-y-3 ${
                          column.heading === 'Solutions' ? 'lg:grid-cols-2' : 'lg:grid-cols-2'
                        }`}
                      >
                        {column.items.map((item) => (
                          <Link
                            key={item}
                            href={toShowcaseHref('solutions', item)}
                            onClick={() => setActiveMenu(null)}
                            className="block text-left text-[1.05rem] leading-8 text-[#1d5fbf] transition hover:text-[#0f3f8f]"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>

                      {column.heading === 'Solutions' ? (
                        <div className="mt-10">
                          <h4 className="text-[1.4rem] font-semibold uppercase text-slate-700">
                            <Link
                              href={toShowcaseHref('solutions', 'Solutions For')}
                              onClick={() => setActiveMenu(null)}
                              className="transition hover:text-[#0f3f8f]"
                            >
                              Solutions For
                            </Link>
                          </h4>
                          <Link
                            href={toShowcaseHref('solutions', 'OEMs')}
                            onClick={() => setActiveMenu(null)}
                            className="mt-4 block text-left text-[1.05rem] leading-8 text-[#1d5fbf] transition hover:text-[#0f3f8f]"
                          >
                            OEMs
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  ))}

                  <div className="xl:col-span-2 border-t border-slate-200 pt-5">
                    <Link
                      href={toShowcaseHref('solutions', 'View Case Studies')}
                      onClick={() => setActiveMenu(null)}
                      className="text-left text-[1.1rem] font-semibold text-[#1d5fbf] transition hover:text-[#0f3f8f]"
                    >
                      View Case Studies →
                    </Link>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.10)]">
                  <div className="h-48 bg-[linear-gradient(180deg,#fbbf24_0%,#f59e0b_35%,#78350f_100%)] p-4">
                    <div className="relative h-full overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,rgba(255,231,170,0.95),rgba(251,146,60,0.9)_48%,rgba(24,24,27,0.92)_100%)]">
                      <div className="absolute bottom-0 left-10 h-20 w-6 rounded-t-full bg-black/75" />
                      <div className="absolute bottom-14 left-7 h-2 w-20 origin-left rotate-[-22deg] rounded-full bg-black/80" />
                      <div className="absolute bottom-0 right-14 h-24 w-7 rounded-t-full bg-black/80" />
                      <div className="absolute bottom-16 right-11 h-2 w-24 origin-left rotate-[-20deg] rounded-full bg-black/85" />
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                      Case Study
                    </p>
                    <p className="mt-3 text-[1.95rem] font-semibold leading-tight tracking-tight text-slate-800">
                      Top 5 Oil & Gas Producer Fast Tracked OT Maturity
                    </p>
                    <p className="mt-4 text-[1.05rem] leading-8 text-slate-600">
                      Discover how a leading energy producer improved OT visibility
                      across diverse assets, reduced risk, and accelerated remediation
                      without disrupting operations.
                    </p>
                    <Link
                      href={toShowcaseHref('solutions', 'Read Now')}
                      onClick={() => setActiveMenu(null)}
                      className="mt-6 inline-block text-left text-[1.1rem] font-semibold text-[#1d5fbf] transition hover:text-[#0f3f8f]"
                    >
                      Read Now
                    </Link>
                  </div>
                  <div className="h-1.5 bg-[#e11d48]" />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeMenu === 'support' ? (
          <div className="absolute left-0 right-0 top-full border-t border-slate-200 bg-white shadow-[0_22px_80px_rgba(15,23,42,0.18)]">
            <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">
              <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
                <div className="space-y-8">
                  <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-4">
                    {supportColumns.map((column) => (
                      <div key={column.heading}>
                        <h3 className="border-b border-slate-200 pb-2 text-[1.55rem] font-semibold uppercase text-slate-700">
                          <Link
                            href={toShowcaseHref('support', column.heading)}
                            onClick={() => setActiveMenu(null)}
                            className="transition hover:text-[#0f3f8f]"
                          >
                            {column.heading}
                          </Link>
                        </h3>
                        <div className="mt-4 space-y-3">
                          {column.items.map((item) => (
                            <Link
                              key={item}
                              href={toShowcaseHref('support', item)}
                              onClick={() => setActiveMenu(null)}
                              className="block text-left text-[1.05rem] leading-8 text-[#1d5fbf] transition hover:text-[#0f3f8f]"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-200 pt-5">
                    {supportQuickLinks.map((item) => (
                      <Link
                        key={item}
                        href={toShowcaseHref('support', item)}
                        onClick={() => setActiveMenu(null)}
                        className="text-left text-[1.05rem] font-semibold text-[#1d5fbf] transition hover:text-[#0f3f8f]"
                      >
                        {item} →
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.10)]">
                  <div className="h-48 bg-[linear-gradient(135deg,#bfdbfe,#60a5fa_40%,#1e293b_100%)] p-4">
                    <div className="relative h-full overflow-hidden rounded-[14px] bg-[linear-gradient(135deg,#dbeafe,#93c5fd_45%,#1e3a8a_100%)]">
                      <div className="absolute inset-x-6 top-6 h-16 rounded-[14px] bg-slate-900/20" />
                      <div className="absolute left-8 top-10 h-12 w-20 rounded-[12px] bg-white/85" />
                      <div className="absolute left-32 top-10 h-12 w-24 rounded-[12px] bg-white/80" />
                      <div className="absolute right-10 bottom-0 h-24 w-24 rounded-t-[28px] bg-slate-800/80" />
                      <div className="absolute left-14 bottom-8 h-20 w-16 rounded-[16px] bg-slate-700/85" />
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[1.95rem] font-semibold tracking-tight text-slate-800">
                      TechConnect Support
                    </p>
                    <p className="mt-3 text-[1.05rem] leading-8 text-slate-600">
                      Get the knowledge and assistance your teams need to solve
                      technical challenges faster and keep operations moving.
                    </p>
                    <Link
                      href={toShowcaseHref('support', 'Learn More about TechConnect')}
                      onClick={() => setActiveMenu(null)}
                      className="mt-6 inline-block text-left text-[1.1rem] font-semibold text-[#1d5fbf] transition hover:text-[#0f3f8f]"
                    >
                      Learn More about TechConnect
                    </Link>
                  </div>
                  <div className="h-1.5 bg-[#e11d48]" />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeMenu === 'partners' ? (
          <div className="absolute left-0 right-0 top-full border-t border-slate-200 bg-white shadow-[0_22px_80px_rgba(15,23,42,0.18)]">
            <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">
              <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_720px]">
                <div className="space-y-10">
                  <div>
                    <h3 className="border-b border-slate-200 pb-2 text-[1.55rem] font-semibold uppercase text-slate-700">
                      <Link
                        href={toShowcaseHref('partners', partnerColumns[0].heading)}
                        onClick={() => setActiveMenu(null)}
                        className="transition hover:text-[#0f3f8f]"
                      >
                        {partnerColumns[0].heading}
                      </Link>
                    </h3>
                    <div className="mt-4 space-y-3">
                      {partnerColumns[0].items.map((item) => (
                        <Link
                          key={item}
                          href={toShowcaseHref('partners', item)}
                          onClick={() => setActiveMenu(null)}
                          className="block text-left text-[1.05rem] leading-8 text-[#1d5fbf] transition hover:text-[#0f3f8f]"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="border-b border-slate-200 pb-2 text-[1.55rem] font-semibold uppercase text-slate-700">
                      <Link
                        href={toShowcaseHref('partners', partnerColumns[1].heading)}
                        onClick={() => setActiveMenu(null)}
                        className="transition hover:text-[#0f3f8f]"
                      >
                        {partnerColumns[1].heading}
                      </Link>
                    </h3>
                    <div className="mt-4 grid gap-x-16 gap-y-3 lg:grid-cols-2">
                      {partnerColumns[1].items.map((item) => (
                        <Link
                          key={item}
                          href={toShowcaseHref('partners', item)}
                          onClick={() => setActiveMenu(null)}
                          className="block text-left text-[1.05rem] leading-8 text-[#1d5fbf] transition hover:text-[#0f3f8f]"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.10)]">
                  <div className="grid min-h-[288px] md:grid-cols-[220px_minmax(0,1fr)]">
                    <div className="relative overflow-hidden bg-[linear-gradient(135deg,#d6d3d1,#f5f5f4)]">
                      <div className="absolute left-10 top-8 h-44 w-16 rounded-[18px] bg-rose-100" />
                      <div className="absolute left-28 top-10 h-40 w-24 rounded-[18px] bg-slate-700" />
                      <div className="absolute left-14 top-24 h-28 w-14 rounded-[14px] bg-slate-900/70" />
                      <div className="absolute left-28 top-24 h-20 w-16 rounded-[14px] bg-stone-200" />
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-white/40" />
                    </div>

                    <div className="flex flex-col justify-between p-8">
                      <div>
                        <p className="text-[2rem] font-semibold leading-tight tracking-tight text-slate-800">
                          What is the PartnerNetwork?
                        </p>
                        <p className="mt-4 text-[1.08rem] leading-9 text-slate-600">
                          Our PartnerNetwork program gives customers access to the
                          right people, products, services, and solutions needed to
                          accelerate manufacturing goals and bring connected
                          operations to life.
                        </p>
                      </div>

                      <Link
                        href={toShowcaseHref('partners', 'Explore Now')}
                        onClick={() => setActiveMenu(null)}
                        className="mt-8 inline-block text-left text-[1.1rem] font-semibold text-[#1d5fbf] transition hover:text-[#0f3f8f]"
                      >
                        Explore Now
                      </Link>
                    </div>
                  </div>
                  <div className="h-1.5 bg-[#e11d48]" />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#0b4f8f_0%,#0d6cae_36%,#04111d_72%,#04111d_100%)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-y-0 left-[34%] w-28 -skew-x-[38deg] bg-[rgba(44,169,255,0.28)]" />
          <div className="absolute inset-y-0 left-[47%] w-32 -skew-x-[38deg] bg-[rgba(23,148,232,0.45)]" />
          <div className="absolute -left-20 bottom-8 h-96 w-96 rounded-full bg-[rgba(28,181,225,0.18)] blur-3xl" />
          <div className="absolute right-10 top-24 h-80 w-80 rounded-full bg-[rgba(255,93,93,0.14)] blur-3xl" />
          <div className="absolute inset-y-0 right-0 w-[58%] bg-[radial-gradient(circle_at_center,rgba(62,182,255,0.18),transparent_42%)]" />
          <svg
            className="absolute inset-y-0 right-0 h-full w-[60%] opacity-90"
            viewBox="0 0 900 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M30 420C160 340 250 510 390 430C520 356 610 190 860 280"
              stroke="rgba(255,214,119,0.85)"
              strokeWidth="3"
            />
            <path
              d="M0 460C180 350 300 580 460 470C590 382 680 298 900 360"
              stroke="rgba(255,132,132,0.55)"
              strokeWidth="2"
            />
            <path
              d="M40 520C190 430 280 650 470 560C650 474 740 520 900 470"
              stroke="rgba(124,240,255,0.95)"
              strokeWidth="5"
            />
            <path
              d="M10 560C160 470 260 690 420 610C640 500 720 680 900 560"
              stroke="rgba(88,221,255,0.5)"
              strokeWidth="8"
            />
          </svg>
        </div>

        <div className="relative mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-5 text-white/75">
              <div className="h-[2px] w-20 bg-white/55" />
              <div className="h-[2px] w-20 bg-white/55" />
              <div className="h-[2px] w-20 bg-white/40" />
              <div className="font-ui text-3xl leading-none text-white/75">II</div>
            </div>

            <h1 className="max-w-4xl text-6xl font-semibold leading-[1.02] tracking-tight text-white sm:text-7xl">
              Future Trends in
              <br />
              Industrial Operations
            </h1>

            <p className="mt-8 max-w-3xl text-2xl leading-[1.5] text-white/95">
              Accelerate your shift from automation to autonomy with a clear strategy and
              real-world examples that empower people, drive innovation, and build more
              resilient operations.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="rounded-xl bg-white px-8 py-4 text-lg font-semibold tracking-wide text-[#0b58a2] shadow-[0_18px_50px_rgba(255,255,255,0.18)] transition hover:bg-slate-100"
              >
                Begin Your Transformation
              </Link>
              <Link
                href="/dashboard"
                className="rounded-xl border border-white/35 px-8 py-4 text-lg font-semibold tracking-wide text-white transition hover:bg-white/10"
              >
                Preview Dashboard
              </Link>
            </div>
          </div>

          <div className="mt-16 rounded-[28px] bg-white px-5 py-5 shadow-[0_30px_80px_rgba(3,16,26,0.2)] lg:mx-24">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {quickActions.map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-[22px] border border-slate-200 bg-white px-5 py-5 transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_18px_40px_rgba(8,84,155,0.12)]"
                >
                  <div className="mb-4 h-12 w-12 rounded-2xl bg-[linear-gradient(135deg,#eff6ff,#dbeafe)]" />
                  <p className="text-xl font-semibold text-slate-900">{title}</p>
                  <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

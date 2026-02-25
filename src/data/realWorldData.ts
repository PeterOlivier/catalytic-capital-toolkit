import { RealWorldExamples } from "./types";

// Last verified: 2026-02
export const realWorldData: Record<string, RealWorldExamples> = {
  // ============================================
  // GRANT-BASED
  // ============================================
  "pure-grant": {
    providers: [
      { name: "MacArthur Foundation", url: "https://www.macfound.org", description: "Deploys large-scale grants through programs like 100&Change, awarding $100M single grants for breakthrough solutions.", notableActivity: "$7B+ in grants since inception" },
      { name: "Bloomberg Philanthropies", url: "https://www.bloomberg.org", description: "Funds climate, public health, education, and government innovation with outright grants globally.", notableActivity: "$17.4B in lifetime giving" },
      { name: "ARPA-E", url: "https://arpa-e.energy.gov", description: "Federal agency funding high-risk, high-reward energy technology R&D through competitive grants.", notableActivity: "800+ projects funded since 2009" },
      { name: "Bill & Melinda Gates Foundation", url: "https://www.gatesfoundation.org", description: "World's largest private foundation, deploying grants for global health, development, and climate adaptation.", notableActivity: "$77B+ in total grant payments" },
    ],
    deals: [
      { name: "100&Change: Sesame Workshop", year: 2017, size: "$100M", parties: ["MacArthur Foundation", "Sesame Workshop", "IRC"], description: "Single largest grant in MacArthur's history, funding early childhood education for refugee children in Syria, Iraq, Jordan, and Lebanon.", url: "https://www.macfound.org/programs/100change" },
      { name: "Grand Challenges in Global Health", year: 2003, size: "$200M", parties: ["Gates Foundation", "NIH", "Wellcome Trust"], description: "Landmark grant initiative funding 43 research projects across 33 countries to solve critical health problems in the developing world.", url: "https://www.gatesfoundation.org/ideas/media-center/press-releases/2003/01/grand-challenges-in-global-health" },
      { name: "ARPA-E SCALEUP Program", year: 2021, size: "$100M", parties: ["ARPA-E", "DOE"], description: "Grant program supporting ARPA-E alumni companies in scaling their technologies from lab to market, bridging the valley of death for clean energy innovation.", url: "https://arpa-e.energy.gov/technologies/programs/scaleup" },
    ],
    media: [
      { title: "The Art of Transformative Philanthropy", source: "Stanford Social Innovation Review", type: "article", url: "https://ssir.org", date: "2023", description: "Examines how large unrestricted grants create more impact than restricted program funding." },
      { title: "How ARPA-E Seeds Breakthrough Energy Tech", source: "Canary Media", type: "article", url: "https://www.canarymedia.com", date: "2024", description: "Profile of ARPA-E's grant model and its track record of spinning out commercially viable companies." },
      { title: "Catalytic Capital with Clara Miller", source: "Impact Alpha Podcast", type: "podcast", url: "https://impactalpha.com", date: "2022", description: "Former Heron Foundation CEO discusses how grants serve as the most catalytic form of capital." },
    ],
  },

  "recoverable-grant": {
    providers: [
      { name: "Omidyar Network", url: "https://omidyar.com", description: "Deploys recoverable grants alongside equity and debt to support social enterprises that may not yet be investable.", notableActivity: "Pioneer of the recoverable grant model in impact investing" },
      { name: "Shell Foundation", url: "https://shellfoundation.org", description: "Uses recoverable grants to de-risk early-stage energy access enterprises in Africa and Asia.", notableActivity: "$350M+ deployed to 100+ enterprises" },
      { name: "Global Innovation Fund", url: "https://www.globalinnovation.fund", description: "Stages funding from grants to equity based on evidence of impact, with recoverable grants bridging the gap.", notableActivity: "$200M+ committed across 50+ countries" },
      { name: "Skoll Foundation", url: "https://skoll.org", description: "Provides recoverable grants to social entrepreneurs scaling proven solutions for systemic challenges.", notableActivity: "$600M+ invested in social entrepreneurs since 1999" },
    ],
    deals: [
      { name: "Shell Foundation / d.light", year: 2008, size: "$2M", parties: ["Shell Foundation", "d.light"], description: "Early recoverable grant helped d.light develop affordable solar products. The company went on to reach 100M+ people and attract $200M+ in commercial capital.", url: "https://shellfoundation.org/portfolio/d-light/" },
      { name: "Omidyar Network / Bridge International Academies", year: 2013, size: "$10M", parties: ["Omidyar Network", "Bridge International"], description: "Recoverable grant supported expansion of low-cost private schools across East Africa, later attracting commercial investors including IFC.", url: "https://omidyar.com/investees/bridge-international-academies/" },
      { name: "Global Innovation Fund Evidence-Staged Grants", year: 2020, size: "$50M", parties: ["DFID", "USAID", "Global Innovation Fund"], description: "Portfolio of staged recoverable grants where repayment is triggered by evidence of impact and commercial viability, recycling capital for future investments.", url: "https://www.globalinnovation.fund/funding-approach" },
    ],
    media: [
      { title: "Recycling Philanthropic Capital", source: "GIIN", type: "report", url: "https://thegiin.org", date: "2021", description: "Research on how recoverable grants can be recycled to amplify philanthropic impact over time." },
      { title: "The Case for Recoverable Grants", source: "Stanford Social Innovation Review", type: "article", url: "https://ssir.org", date: "2019", description: "Analysis of how recoverable grants bridge the gap between philanthropy and investment." },
      { title: "Enterprise Philanthropy with Shell Foundation", source: "Impact Alpha Podcast", type: "podcast", url: "https://impactalpha.com", date: "2023", description: "Shell Foundation leadership discusses their pioneering use of recoverable grants for energy access." },
    ],
  },

  "forgivable-loan": {
    providers: [
      { name: "CDFI Fund", url: "https://www.cdfifund.gov", description: "Federal fund providing forgivable loans and grants to certified Community Development Financial Institutions.", notableActivity: "$5.2B+ awarded since 1994" },
      { name: "NYSERDA", url: "https://www.nyserda.ny.gov", description: "New York State energy authority offering forgivable loans for clean energy and building efficiency projects.", notableActivity: "Manages $10B+ clean energy portfolio" },
      { name: "Connecticut Green Bank", url: "https://www.ctgreenbank.com", description: "Nation's first green bank, offering forgivable loans for residential and commercial clean energy upgrades.", notableActivity: "$2.3B+ in clean energy investment mobilized" },
      { name: "Appalachian Regional Commission", url: "https://www.arc.gov", description: "Federal-state partnership providing forgivable loans for economic development in distressed Appalachian communities.", notableActivity: "Serving 423 counties across 13 states" },
    ],
    deals: [
      { name: "PPP Loan Forgiveness Program", year: 2020, size: "$800B+", parties: ["SBA", "U.S. Treasury", "Commercial Banks"], description: "Largest forgivable loan program in history. Paycheck Protection Program loans were forgiven if businesses maintained payroll during COVID-19, demonstrating the mechanism at massive scale.", url: "https://www.sba.gov/funding-programs/loans/covid-19-relief-options/paycheck-protection-program" },
      { name: "NYSERDA Clean Heat Program", year: 2022, size: "$250M", parties: ["NYSERDA", "NY Homeowners"], description: "Forgivable loans covering up to $14,000 per household for heat pump installations, forgiven over 5-10 years if the homeowner maintains the system.", url: "https://www.nyserda.ny.gov/All-Programs/Heat-Pump-Program" },
      { name: "CDFI Rapid Response Program", year: 2021, size: "$1.25B", parties: ["CDFI Fund", "Minority-led CDFIs"], description: "Emergency forgivable lending capital deployed to CDFIs serving communities of color disproportionately impacted by COVID-19.", url: "https://www.cdfifund.gov/programs-training/programs/rrp" },
    ],
    media: [
      { title: "How Forgivable Loans Bridge Grants and Debt", source: "Brookings Institution", type: "report", url: "https://www.brookings.edu", date: "2022", description: "Policy analysis of forgivable loan structures and their role in community development." },
      { title: "Green Banks and Forgivable Finance", source: "Coalition for Green Capital", type: "article", url: "https://coalitionforgreencapital.com", date: "2023", description: "How state green banks use forgivable loans to accelerate residential decarbonization." },
      { title: "Lessons from PPP Forgiveness", source: "Harvard Business Review", type: "article", url: "https://hbr.org", date: "2021", description: "Analysis of what the PPP program taught us about designing forgivable loan programs at scale." },
    ],
  },

  // ============================================
  // DEBT
  // ============================================
  "concessionary-debt": {
    providers: [
      { name: "Calvert Impact Capital", url: "https://calvertimpact.org", description: "Offers below-market loans to community organizations, affordable housing, and clean energy projects across the U.S.", notableActivity: "$4B+ deployed through Community Investment Notes" },
      { name: "IFC (World Bank Group)", url: "https://www.ifc.org", description: "Provides concessionary and blended-rate loans to private sector projects in developing countries.", notableActivity: "$23B+ committed annually across 100+ countries" },
      { name: "Community Reinvestment Fund (CRF)", url: "https://www.crfusa.com", description: "CDFI providing below-market loans for affordable housing, community facilities, and small businesses.", notableActivity: "$3.9B+ invested in underserved communities" },
      { name: "Kresge Foundation", url: "https://kresge.org", description: "Deploys below-market debt from endowment to support health, environment, and equity-focused organizations.", notableActivity: "$500M+ in social investments from endowment" },
    ],
    deals: [
      { name: "IFC Managed Co-Lending Portfolio", year: 2017, size: "$10B", parties: ["IFC", "Institutional Investors"], description: "IFC's MCPP syndicates concessionary debt alongside commercial capital, using blended rates to attract pension funds and insurers into emerging market lending.", url: "https://www.ifc.org/en/what-we-do/sector-expertise/syndicated-loans-and-mobilization/portfolio-syndications" },
      { name: "Calvert Impact / Enterprise Community Loan Fund", year: 2022, size: "$200M", parties: ["Calvert Impact", "Enterprise Community Partners"], description: "Below-market credit facility supporting preservation and development of affordable housing units across the United States.", url: "https://calvertimpact.org" },
      { name: "CRF COVID-19 Emergency Lending", year: 2020, size: "$100M", parties: ["CRF", "Treasury CDFI Fund"], description: "Rapidly deployed concessionary debt to small businesses and nonprofits in underserved communities during the pandemic.", url: "https://crfusa.com" },
    ],
    media: [
      { title: "Concessionary Capital: What It Is and Why It Matters", source: "Convergence", type: "report", url: "https://www.convergence.finance", date: "2023", description: "Framework for understanding when and how concessionary debt unlocks additional commercial capital." },
      { title: "The State of Blended Finance", source: "Convergence", type: "report", url: "https://www.convergence.finance", date: "2024", description: "Annual report tracking concessionary debt deployments and blended finance deal volume globally." },
      { title: "CDFIs and the Future of Community Lending", source: "Stanford Social Innovation Review", type: "article", url: "https://ssir.org", date: "2022", description: "How CDFIs use concessionary terms to reach borrowers that conventional banks cannot serve." },
    ],
  },

  "first-loss-debt": {
    providers: [
      { name: "MacArthur Foundation", url: "https://www.macfound.org", description: "Provides catalytic first-loss and subordinated capital through its impact investment portfolio to de-risk deals for senior lenders.", notableActivity: "$600M+ in impact investments including first-loss positions" },
      { name: "Rockefeller Foundation", url: "https://www.rockefellerfoundation.org", description: "Deploys subordinated debt and first-loss capital in blended finance structures for global health, energy, and food systems.", notableActivity: "Pioneered the Zero Gap Fund for blended finance" },
      { name: "USAID (via DFC)", url: "https://www.dfc.gov", description: "Provides first-loss capital in blended structures to mobilize private investment in developing countries.", notableActivity: "$40B+ portfolio across 160 countries" },
      { name: "FMO (Dutch Development Bank)", url: "https://www.fmo.nl", description: "Takes subordinated positions in emerging market infrastructure and climate funds to crowd in private capital.", notableActivity: "€12B+ portfolio across 85 countries" },
    ],
    deals: [
      { name: "Climate Investor One", year: 2017, size: "$850M", parties: ["FMO", "DFC", "EU", "Private Investors"], description: "Blended finance fund with first-loss tranche from development finance institutions, enabling pension funds to invest in renewable energy projects across developing countries.", url: "https://www.climatefundmanagers.com" },
      { name: "Rockefeller Zero Gap Portfolio", year: 2019, size: "$150M", parties: ["Rockefeller Foundation", "Various Fund Managers"], description: "Subordinated capital deployed across multiple blended structures, mobilizing 8x additional private capital for SDG-aligned investments.", url: "https://www.rockefellerfoundation.org/initiative/zero-gap-fund/" },
      { name: "InfraCredit Nigeria", year: 2018, size: "$50M", parties: ["GuarantCo", "AFC", "InfraCredit"], description: "First-loss capital enabling Nigeria's first infrastructure credit guarantee company, which has since guaranteed $500M+ in local currency bonds for infrastructure.", url: "https://guarantco.com/our-impact/infracredit-nigeria/" },
    ],
    media: [
      { title: "The Role of First-Loss Capital in Blended Finance", source: "Convergence", type: "report", url: "https://www.convergence.finance", date: "2023", description: "Data-driven analysis of how first-loss layers affect deal economics and investor participation." },
      { title: "Catalytic Capital Consortium", source: "MacArthur Foundation", type: "report", url: "https://www.macfound.org", date: "2021", description: "Multi-foundation research initiative documenting the role of first-loss capital in scaling impact." },
      { title: "Blended Finance in Action", source: "Brookings Institution", type: "article", url: "https://www.brookings.edu", date: "2022", description: "How subordinated debt from philanthropic and public sources crowds in private investment at scale." },
    ],
  },

  "program-related-investment": {
    providers: [
      { name: "Heron Foundation", url: "https://www.heron.org", description: "Pioneer in deploying 100% of endowment for mission, with PRIs as a core tool for impact-aligned debt.", notableActivity: "First foundation to commit 100% of assets to mission" },
      { name: "MacArthur Foundation", url: "https://www.macfound.org", description: "One of the largest PRI lenders in the U.S., deploying program-related investments for affordable housing, conservation, and community development.", notableActivity: "$500M+ in active PRIs" },
      { name: "Kresge Foundation", url: "https://kresge.org", description: "Uses PRIs to provide below-market loans supporting health facilities, green infrastructure, and community anchor institutions.", notableActivity: "$350M+ in social investment portfolio" },
      { name: "Ford Foundation", url: "https://www.fordfoundation.org", description: "Longstanding PRI lender focusing on affordable housing, microfinance, and community development intermediaries.", notableActivity: "PRI program active since 1968, one of the oldest in the sector" },
    ],
    deals: [
      { name: "Heron Foundation 100% Mission Alignment", year: 2012, size: "$270M", parties: ["Heron Foundation"], description: "Heron committed its entire $270M endowment to mission-aligned investments including PRIs, demonstrating that foundations can deploy all assets for impact without sacrificing returns.", url: "https://www.heron.org" },
      { name: "MacArthur / LISC Affordable Housing", year: 2019, size: "$50M", parties: ["MacArthur Foundation", "LISC"], description: "PRI loan to LISC supporting preservation and construction of affordable housing units in communities facing displacement pressure.", url: "https://www.macfound.org/grantee/local-initiatives-support-corporation-379/" },
      { name: "Ford Foundation / Grameen America", year: 2018, size: "$15M", parties: ["Ford Foundation", "Grameen America"], description: "PRI providing growth capital to Grameen America's microfinance operations, enabling lending to low-income women entrepreneurs across the U.S.", url: "https://www.grameenamerica.org" },
    ],
    media: [
      { title: "PRIs: A Primer for Foundations", source: "Mission Investors Exchange", type: "report", url: "https://missioninvestors.org", date: "2022", description: "Comprehensive guide to structuring and deploying program-related investments from private foundations." },
      { title: "How PRIs Strengthen the Impact Ecosystem", source: "Stanford Social Innovation Review", type: "article", url: "https://ssir.org", date: "2020", description: "Analysis of how PRIs fill financing gaps that neither grants nor commercial capital can address." },
      { title: "IRS Guidance on Program-Related Investments", source: "Internal Revenue Service", type: "report", url: "https://www.irs.gov", date: "2016", description: "IRS examples clarifying when investments qualify as PRIs under Section 4944." },
    ],
  },

  "revenue-based-financing": {
    providers: [
      { name: "Lighter Capital", url: "https://www.lightercapital.com", description: "Pioneer in revenue-based financing for tech startups, providing non-dilutive growth capital repaid as a percentage of monthly revenue.", notableActivity: "$350M+ deployed to 500+ companies" },
      { name: "Clearco", url: "https://clear.co", description: "Data-driven RBF provider for e-commerce and SaaS companies, using revenue data to underwrite and fund growth.", notableActivity: "$4B+ in funding to 10,000+ companies globally" },
      { name: "Pipe", url: "https://pipe.com", description: "Platform turning recurring revenue streams into upfront capital, enabling SaaS companies to access growth funding without dilution.", notableActivity: "Funded $10B+ in annualized revenue" },
      { name: "Capchase", url: "https://www.capchase.com", description: "Provides revenue-based financing to B2B SaaS companies, advancing future subscription revenue as upfront working capital.", notableActivity: "$1B+ deployed since 2020 launch" },
    ],
    deals: [
      { name: "Clearco E-Commerce Portfolio", year: 2021, size: "$2B", parties: ["Clearco", "E-commerce Brands"], description: "At its peak in 2021, Clearco deployed $2B in revenue-based financing to thousands of e-commerce businesses, demonstrating RBF's scalability for digital commerce.", url: "https://clear.co" },
      { name: "Lighter Capital / Zapier", year: 2014, size: "$1.3M", parties: ["Lighter Capital", "Zapier"], description: "Early revenue-based financing to Zapier helped the company grow without dilution. Zapier later reached $140M+ ARR and remained majority founder-owned.", url: "https://www.lightercapital.com" },
      { name: "Pipe / SaaS Revenue Marketplace", year: 2022, size: "$5B+", parties: ["Pipe", "Institutional Investors", "SaaS Companies"], description: "Pipe's marketplace model connected SaaS companies with institutional buyers of recurring revenue, trading future cash flows for immediate capital at scale.", url: "https://pipe.com" },
    ],
    media: [
      { title: "Revenue-Based Financing: A Founder's Guide", source: "TechCrunch", type: "article", url: "https://techcrunch.com", date: "2023", description: "Comprehensive overview of how RBF works, when it makes sense, and how it compares to venture capital." },
      { title: "The Rise of Non-Dilutive Capital", source: "a16z", type: "article", url: "https://a16z.com", date: "2021", description: "Andreessen Horowitz analysis of how RBF and other non-dilutive instruments are reshaping startup financing." },
      { title: "Building Lighter Capital", source: "Indie Hackers Podcast", type: "podcast", url: "https://www.indiehackers.com/podcast", date: "2022", description: "Lighter Capital CEO discusses how revenue-based financing empowers bootstrapped founders." },
    ],
  },

  "convertible-note": {
    providers: [
      { name: "Y Combinator", url: "https://www.ycombinator.com", description: "Created the SAFE (Simple Agreement for Future Equity), the most widely used convertible instrument for early-stage startups.", notableActivity: "6,000+ companies funded using SAFEs" },
      { name: "Techstars", url: "https://www.techstars.com", description: "Global accelerator network using convertible notes to invest in early-stage companies at pre-seed and seed stage.", notableActivity: "$20B+ in aggregate portfolio company value" },
      { name: "500 Global", url: "https://500.co", description: "Venture firm deploying convertible notes and SAFEs across emerging markets and early-stage companies globally.", notableActivity: "2,800+ portfolio companies across 80+ countries" },
      { name: "Republic", url: "https://republic.com", description: "Equity crowdfunding platform enabling retail investors to fund startups via SAFEs and convertible notes.", notableActivity: "$2B+ invested by 3M+ community members" },
    ],
    deals: [
      { name: "Y Combinator Standard SAFE", year: 2013, parties: ["Y Combinator"], description: "Y Combinator introduced the SAFE as a replacement for convertible notes, eliminating interest rates, maturity dates, and complex negotiation. Now the standard instrument for pre-seed funding.", url: "https://www.ycombinator.com/documents" },
      { name: "Airbnb Convertible Note Round", year: 2009, size: "$600K", parties: ["Sequoia Capital", "Y Combinator", "Airbnb"], description: "Airbnb's initial funding round used a convertible note — one of the most famous examples of how convertible instruments enable rapid early-stage funding.", url: "https://sequoiacap.com/article/airbnb-ipo-embracing-the-adventure/" },
      { name: "Republic / Gumroad Community Round", year: 2021, size: "$5M", parties: ["Republic", "Gumroad", "Retail Investors"], description: "Gumroad raised $5M from its community via SAFEs on Republic, demonstrating how convertible instruments democratize access to startup investing.", url: "https://republic.com/gumroad-march-2021" },
    ],
    media: [
      { title: "Safe Financing Documents", source: "Y Combinator", type: "article", url: "https://www.ycombinator.com/documents", date: "2023", description: "Open-source SAFE templates and guidance from the instrument's creator." },
      { title: "SAFEs vs. Convertible Notes: What Founders Need to Know", source: "a16z", type: "article", url: "https://a16z.com", date: "2022", description: "Practical comparison of the two instruments from a founder's perspective." },
      { title: "The SAFE, the Future of Early Stage Financing", source: "This Week in Startups", type: "podcast", url: "https://thisweekinstartups.com", date: "2021", description: "Deep dive into how SAFEs transformed startup fundraising mechanics." },
    ],
  },

  // ============================================
  // GUARANTEES
  // ============================================
  "loan-guarantee": {
    providers: [
      { name: "MIGA (World Bank Group)", url: "https://www.miga.org", description: "Provides political risk insurance and credit enhancement guarantees for cross-border investments in developing countries.", notableActivity: "$7B+ in gross outstanding guarantee exposure" },
      { name: "DFC (U.S. Intl Development Finance Corp)", url: "https://www.dfc.gov", description: "Offers loan guarantees to mobilize private investment in development projects across emerging markets.", notableActivity: "$40B+ portfolio across 160 countries" },
      { name: "SBA (Small Business Administration)", url: "https://www.sba.gov", description: "Guarantees up to 85% of small business loans made by commercial banks, de-risking lending to businesses that would otherwise lack access.", notableActivity: "$28B+ in guaranteed lending annually" },
      { name: "GuarantCo", url: "https://guarantco.com", description: "Provides local currency credit guarantees for infrastructure projects in lower-income countries, enabling access to domestic bond markets.", notableActivity: "$1.8B+ in guarantees mobilizing $8.5B+ in infrastructure finance" },
    ],
    deals: [
      { name: "SBA 7(a) Loan Guarantee Program", year: 2023, size: "$28B", parties: ["SBA", "U.S. Commercial Banks"], description: "The SBA's flagship guarantee program backed over $28B in small business loans in fiscal year 2023, covering 75-85% of loan value and enabling banks to lend to higher-risk borrowers.", url: "https://www.sba.gov/funding-programs/loans/7a-loans" },
      { name: "DFC Portfolio Guarantee for Nigeria Off-Grid Solar", year: 2021, size: "$20M", parties: ["DFC", "SunFunder", "Off-Grid Solar Companies"], description: "Loan guarantee covering a portfolio of solar companies in Nigeria, unlocking commercial bank lending for distributed energy access.", url: "https://www.dfc.gov" },
      { name: "GuarantCo / InfraCredit Nigeria Bonds", year: 2018, size: "$260M", parties: ["GuarantCo", "InfraCredit", "Institutional Investors"], description: "Credit guarantees enabled Nigeria's first AAA-rated local currency infrastructure bonds, demonstrating how guarantees can open domestic capital markets for infrastructure.", url: "https://guarantco.com/our-impact/infracredit-nigeria/" },
    ],
    media: [
      { title: "How Guarantees Mobilize Private Capital for Development", source: "Brookings Institution", type: "report", url: "https://www.brookings.edu", date: "2022", description: "Research on the mobilization ratio and effectiveness of guarantee instruments in development finance." },
      { title: "SBA Loan Guarantees: What Entrepreneurs Need to Know", source: "Forbes", type: "article", url: "https://www.forbes.com", date: "2024", description: "Practical guide to how SBA guarantees work and how small businesses can access them." },
      { title: "The Power of Guarantees in Blended Finance", source: "Convergence", type: "report", url: "https://www.convergence.finance", date: "2023", description: "Data on how guarantees achieve higher leverage ratios than other blended finance instruments." },
    ],
  },

  "first-loss-guarantee": {
    providers: [
      { name: "USAID", url: "https://www.usaid.gov", description: "Provides first-loss guarantees through its Development Credit Authority and DFC partnerships to catalyze private lending in developing countries.", notableActivity: "Mobilized $6.7B+ in private capital through guarantee facilities" },
      { name: "Sida (Swedish Development Agency)", url: "https://www.sida.se", description: "Deploys guarantee capital through its guarantee instrument to mobilize Swedish and international private investment for SDG-aligned projects.", notableActivity: "SEK 10B+ in active guarantees" },
      { name: "European Investment Fund", url: "https://www.eif.org", description: "Provides first-loss portfolio guarantees to European banks and funds, enabling increased lending to SMEs and social enterprises.", notableActivity: "€11B+ in guarantee commitments" },
      { name: "IDB Invest", url: "https://www.idbinvest.org", description: "Offers first-loss credit guarantees in Latin America and Caribbean to crowd in private capital for climate and development projects.", notableActivity: "$14B+ in active portfolio" },
    ],
    deals: [
      { name: "USAID DCA / Kenya Credit Guarantee", year: 2019, size: "$48M", parties: ["USAID", "Kenyan Commercial Banks", "SMEs"], description: "First-loss guarantee covering 50% of losses on a portfolio of SME loans in Kenya, enabling banks to extend credit to 3,000+ small businesses that would otherwise be unbankable.", url: "https://www.usaid.gov/what-we-do/economic-growth-and-trade/development-credit-authority" },
      { name: "EIF InnovFin SME Guarantee", year: 2020, size: "€2.3B", parties: ["European Investment Fund", "EU", "European Banks"], description: "First-loss portfolio guarantee under Horizon 2020, enabling banks across Europe to lend to innovative SMEs with reduced capital requirements.", url: "https://www.eif.org/what_we_do/guarantees/single_eu_debt_instrument/innovfin-guarantee-facility/" },
      { name: "Sida / TCX Currency Guarantee", year: 2021, size: "$100M", parties: ["Sida", "TCX", "Impact Investors"], description: "First-loss guarantee on TCX's local currency hedging, enabling impact investors to lend in local currencies across developing countries without bearing full FX risk.", url: "https://www.tcxfund.com" },
    ],
    media: [
      { title: "Guarantees for Development: Evidence and Lessons", source: "ODI", type: "report", url: "https://odi.org", date: "2021", description: "Evaluation of first-loss guarantee programs and their mobilization effectiveness across development agencies." },
      { title: "How First-Loss Guarantees Unlock Lending", source: "CGAP", type: "article", url: "https://www.cgap.org", date: "2022", description: "Research on how first-loss structures change bank risk calculus for lending to underserved segments." },
      { title: "Swedish Guarantee Instrument Impact", source: "Sida", type: "report", url: "https://www.sida.se", date: "2023", description: "Evaluation of Sida's guarantee program showing $6+ mobilized for every $1 in guarantee capital." },
    ],
  },

  "performance-guarantee": {
    providers: [
      { name: "Liberty Mutual Surety", url: "https://www.libertymutual.com", description: "One of the largest surety bond providers in the U.S., guaranteeing performance on construction, infrastructure, and public works contracts.", notableActivity: "Top-3 surety writer in the United States" },
      { name: "Travelers Bond & Specialty Insurance", url: "https://www.travelers.com", description: "Major provider of performance bonds, payment bonds, and bid bonds for construction and infrastructure projects.", notableActivity: "#1 surety bond writer in the U.S." },
      { name: "Zurich Surety", url: "https://www.zurich.com", description: "Global surety provider offering performance guarantees for infrastructure, energy, and public-private partnership projects.", notableActivity: "Active in 170+ countries" },
      { name: "Swiss Re", url: "https://www.swissre.com", description: "Provides reinsurance and surety capacity for large infrastructure performance guarantees globally.", notableActivity: "Backstops billions in performance guarantee exposure" },
    ],
    deals: [
      { name: "California High-Speed Rail Surety Package", year: 2015, size: "$1.5B", parties: ["Liberty Mutual", "Tutor Perini", "California HSR Authority"], description: "Massive performance bond package guaranteeing construction of the first segment of California's high-speed rail system.", url: "https://hsr.ca.gov" },
      { name: "Army Corps / New Orleans Flood Control", year: 2008, size: "$14.5B", parties: ["Travelers", "Army Corps of Engineers", "Multiple Contractors"], description: "Performance bonds ensuring completion of the Hurricane & Storm Damage Risk Reduction System after Hurricane Katrina.", url: "https://www.mvn.usace.army.mil/Missions/HSDRRS/" },
      { name: "UK PFI Hospital Performance Bonds", year: 2010, size: "£500M+", parties: ["Zurich", "NHS Trusts", "Construction Consortia"], description: "Performance guarantees on Private Finance Initiative hospital construction, ensuring completion and specification compliance even if contractors fail.", url: "https://www.nao.org.uk/reports/the-performance-and-management-of-hospital-pfi-contracts/" },
    ],
    media: [
      { title: "Understanding Surety Bonds in Construction", source: "Surety & Fidelity Association of America", type: "report", url: "https://www.surety.org", date: "2023", description: "Industry guide to how performance bonds protect project owners and taxpayers." },
      { title: "The Role of Surety in Public Infrastructure", source: "ENR (Engineering News-Record)", type: "article", url: "https://www.enr.com", date: "2024", description: "How performance guarantees de-risk billions in public infrastructure spending." },
      { title: "Surety Bonds 101 for Infrastructure", source: "AGC of America", type: "article", url: "https://www.agc.org", date: "2022", description: "Associated General Contractors guide to performance bonds for public works." },
    ],
  },

  "political-risk-insurance": {
    providers: [
      { name: "MIGA (World Bank Group)", url: "https://www.miga.org", description: "The leading multilateral provider of political risk insurance, covering expropriation, currency transfer, war, and breach of contract.", notableActivity: "$25B+ in cumulative guarantees issued" },
      { name: "DFC (U.S. Development Finance Corp)", url: "https://www.dfc.gov", description: "Provides political risk insurance covering up to $1B per project for U.S. investors in developing countries.", notableActivity: "$10B+ in active political risk coverage" },
      { name: "ATI (African Trade Insurance Agency)", url: "https://www.ati-aca.org", description: "Multilateral insurer providing political risk and trade credit insurance to support investment and trade in Africa.", notableActivity: "$77B+ in trade and investments supported" },
      { name: "Lloyd's of London Syndicates", url: "https://www.lloyds.com", description: "Private market syndicates providing bespoke political risk, expropriation, and currency inconvertibility insurance globally.", notableActivity: "World's leading specialty insurance marketplace" },
    ],
    deals: [
      { name: "MIGA / Enel Green Power Turkey Wind", year: 2020, size: "$137M", parties: ["MIGA", "Enel Green Power"], description: "Political risk guarantee covering a 1GW portfolio of wind farms in Turkey against breach of contract and transfer restriction risks, enabling continued investment despite sovereign risk concerns.", url: "https://www.miga.org/projects" },
      { name: "ATI / Lake Turkana Wind Power", year: 2014, size: "$500M", parties: ["ATI", "KP&P", "Google", "IFC"], description: "Political risk insurance was critical to financing Africa's largest wind farm in Kenya, covering government payment obligations under the power purchase agreement.", url: "https://www.ati-aca.org" },
      { name: "DFC Political Risk Insurance for Sub-Saharan Africa Energy", year: 2022, size: "$350M", parties: ["DFC", "Various Developers"], description: "Portfolio of political risk coverage enabling U.S. and international developers to invest in power generation and distribution projects across sub-Saharan Africa.", url: "https://www.dfc.gov/what-we-offer/our-products/political-risk-insurance" },
    ],
    media: [
      { title: "Political Risk Insurance in Emerging Markets", source: "MIGA", type: "report", url: "https://www.miga.org", date: "2023", description: "Annual report on global political risk trends and how insurance enables cross-border investment." },
      { title: "Insuring Against Political Risk", source: "Harvard Business Review", type: "article", url: "https://hbr.org", date: "2020", description: "Framework for understanding when political risk insurance makes financial sense for investors." },
      { title: "De-Risking Investment in Africa", source: "Brookings Institution", type: "report", url: "https://www.brookings.edu", date: "2022", description: "How political risk insurance from ATI and MIGA is unlocking billions in African infrastructure investment." },
    ],
  },

  // ============================================
  // EQUITY
  // ============================================
  "concessionary-equity": {
    providers: [
      { name: "IFC Asset Management Company", url: "https://www.ifc.org/amc", description: "Manages funds where IFC takes a concessionary equity position to attract commercial co-investors into emerging market opportunities.", notableActivity: "$10B+ in assets under management" },
      { name: "Sarona Asset Management", url: "https://www.saronafund.com", description: "Impact-focused fund manager accepting below-market returns on equity to catalyze investment in frontier market SMEs.", notableActivity: "Active across 30+ emerging markets" },
      { name: "Calvert Impact Capital", url: "https://calvertimpact.org", description: "Provides catalytic equity and quasi-equity to community development and climate-focused intermediaries.", notableActivity: "$4B+ deployed for community impact" },
      { name: "Omidyar Network", url: "https://omidyar.com", description: "Makes concessionary equity investments in early-stage social enterprises where commercial returns may take longer to materialize.", notableActivity: "$1.5B+ deployed across impact themes" },
    ],
    deals: [
      { name: "IFC AMC / China-Mexico Fund", year: 2014, size: "$1.2B", parties: ["IFC AMC", "China Development Bank", "Institutional Investors"], description: "IFC took a concessionary equity position to anchor this fund, attracting $800M in commercial capital for private sector investment across Latin America.", url: "https://www.ifcamc.org/funds/china-mexico-fund" },
      { name: "LeapFrog Investments / Financial Inclusion", year: 2016, size: "$400M", parties: ["LeapFrog", "IFC", "DFIs", "Commercial Investors"], description: "Concessionary equity from DFIs helped anchor LeapFrog's funds targeting financial inclusion and healthcare for underserved populations.", url: "https://leapfroginvest.com" },
      { name: "Sarona Frontier Markets Fund", year: 2019, size: "$200M", parties: ["Sarona", "FinDev Canada", "Sida"], description: "Concessionary equity tranche from development agencies enabled the fund to invest in higher-risk frontier market SMEs that commercial funds would avoid.", url: "https://www.saronafund.com" },
    ],
    media: [
      { title: "Concessionary Capital and Market Building", source: "GIIN", type: "report", url: "https://thegiin.org", date: "2023", description: "Research on how concessionary equity positions help build new markets and asset classes in impact investing." },
      { title: "When Returns Are Not Enough: The Case for Concessionary Equity", source: "Stanford Social Innovation Review", type: "article", url: "https://ssir.org", date: "2021", description: "Why some investments require equity investors willing to accept below-market returns." },
      { title: "IFC Blended Finance Insights", source: "IFC", type: "report", url: "https://www.ifc.org", date: "2024", description: "How IFC's concessionary equity positions have mobilized multiples of private capital." },
    ],
  },

  "first-loss-equity": {
    providers: [
      { name: "KfW (German Development Bank)", url: "https://www.kfw.de", description: "Takes first-loss equity tranches in blended climate and development funds to de-risk investments for commercial equity investors.", notableActivity: "€100B+ in annual commitments globally" },
      { name: "Sida (Swedish Development Agency)", url: "https://www.sida.se", description: "Provides first-loss equity capital in fund structures targeting developing countries, absorbing initial losses to attract private investors.", notableActivity: "SEK 5B+ in active guarantee and equity instruments" },
      { name: "JICA (Japan Development Agency)", url: "https://www.jica.go.jp", description: "Offers first-loss equity positions in blended vehicles targeting Asian infrastructure and climate investment.", notableActivity: "Active across 150+ countries" },
      { name: "European Commission / EFSD+", url: "https://ec.europa.eu", description: "Provides first-loss equity to the European Fund for Sustainable Development Plus, enabling investment in fragile and conflict-affected states.", notableActivity: "€53.4B in EFSD+ guarantees and blended instruments" },
    ],
    deals: [
      { name: "IFC MCPP Infrastructure Fund", year: 2020, size: "$3B", parties: ["IFC", "KfW", "Pension Funds"], description: "IFC and KfW took first-loss equity positions enabling pension funds and insurance companies to co-invest in emerging market infrastructure with downside protection.", url: "https://www.ifc.org/en/what-we-do/sector-expertise/syndicated-loans-and-mobilization/portfolio-syndications" },
      { name: "GEEREF (Global Energy Efficiency and Renewable Energy Fund)", year: 2008, size: "€222M", parties: ["European Commission", "KfW", "Private Investors"], description: "EU provided first-loss equity tranche, attracting private investors into a fund-of-funds supporting clean energy in developing countries.", url: "https://geeref.com/about/what-geeref-is.html" },
      { name: "Sida / Swedfund Climate Fund", year: 2022, size: "$150M", parties: ["Sida", "Swedfund", "Private Investors"], description: "First-loss equity from Sida enabled Swedfund to attract commercial investors into climate adaptation projects in sub-Saharan Africa.", url: "https://www.swedfund.se/en/investments/energy-climate" },
    ],
    media: [
      { title: "Tiered Fund Structures and First-Loss Equity", source: "Convergence", type: "report", url: "https://www.convergence.finance", date: "2022", description: "Data on how first-loss equity tranches affect fund economics and commercial investor participation." },
      { title: "Catalytic Capital at Work", source: "GIIN", type: "report", url: "https://thegiin.org", date: "2023", description: "Case studies of first-loss equity positions and their role in building impact investing markets." },
      { title: "Blended Finance for Climate: The Role of Public Equity", source: "Climate Policy Initiative", type: "report", url: "https://www.climatepolicyinitiative.org", date: "2024", description: "Analysis of how first-loss equity from public sources can scale climate finance." },
    ],
  },

  "patient-equity": {
    providers: [
      { name: "Bridges Fund Management", url: "https://www.bridgesfundmanagement.com", description: "Pioneered the Evergreen fund model in impact investing, holding equity for 10-15+ years rather than the typical 5-7 year PE horizon.", notableActivity: "$2B+ in AUM with long-duration strategies" },
      { name: "Generation Investment Management", url: "https://www.generationim.com", description: "Co-founded by Al Gore, takes a long-term, sustainability-focused approach to equity investing with extended holding periods.", notableActivity: "$44B+ in AUM" },
      { name: "DBL Partners", url: "https://www.dblpartners.vc", description: "Double bottom line VC firm with patient capital approach, providing longer runways for companies generating both financial and social returns.", notableActivity: "Early investors in Tesla, SolarCity, SpaceX" },
      { name: "Capricorn Investment Group", url: "https://www.capricorninvestment.com", description: "Jeff Skoll-backed firm deploying patient equity across climate tech, sustainable food, and inclusive finance with long holding horizons.", notableActivity: "Multi-decade investment approach across sectors" },
    ],
    deals: [
      { name: "Bridges Evergreen Holdings", year: 2019, size: "£250M", parties: ["Bridges Fund Management", "Institutional Investors"], description: "Bridges launched one of the first Evergreen impact funds, designed to hold social enterprises indefinitely rather than forcing exits, aligning capital with long-term mission.", url: "https://www.bridgesfundmanagement.com" },
      { name: "Generation Sustainable Solutions Fund III", year: 2020, size: "$3.4B", parties: ["Generation Investment Management", "Institutional LPs"], description: "Long-term equity fund investing in companies addressing sustainability challenges with no fixed exit timeline, letting value compound over decades.", url: "https://www.generationim.com" },
      { name: "DBL Partners / Tesla Series C", year: 2006, size: "$40M", parties: ["DBL Partners", "Tesla"], description: "DBL's patient equity bet on Tesla in 2006 exemplified how long-duration capital enables companies with high initial capital needs and long development cycles to succeed.", url: "https://www.dbl.vc/portfolio/tesla/" },
    ],
    media: [
      { title: "The Case for Patient Capital", source: "Harvard Business Review", type: "article", url: "https://hbr.org", date: "2019", description: "Why short-term investment horizons destroy value and how patient equity creates it." },
      { title: "Evergreen Impact Investing", source: "ImpactAlpha", type: "article", url: "https://impactalpha.com", date: "2022", description: "How Bridges and others are pioneering permanent capital structures for impact." },
      { title: "Generation Investment: Al Gore on Long-Termism", source: "Masters in Business Podcast", type: "podcast", url: "https://www.bloomberg.com/podcasts", date: "2023", description: "Al Gore discusses why sustainable investing requires fundamentally longer time horizons." },
    ],
  },

  "anchor-commitment": {
    providers: [
      { name: "IFC (World Bank Group)", url: "https://www.ifc.org", description: "Frequently serves as the anchor investor in emerging market funds, lending credibility and crowding in institutional capital.", notableActivity: "Mobilization ratio of $4-6 private capital per $1 IFC invested" },
      { name: "Bloomberg Philanthropies", url: "https://www.bloomberg.org", description: "Provides anchor commitments to climate finance initiatives, signaling confidence to other institutional and philanthropic investors.", notableActivity: "Anchored multiple $500M+ climate vehicles" },
      { name: "European Investment Bank", url: "https://www.eib.org", description: "Acts as anchor investor in climate funds and green bond issuances, enabling other institutional investors to participate.", notableActivity: "EU Climate Bank with €250B+ climate action plan" },
      { name: "Temasek", url: "https://www.temasek.com.sg", description: "Singapore sovereign fund that anchors impact and climate funds to mobilize private capital from institutional investors globally.", notableActivity: "$382B portfolio with catalytic anchor role in Asia" },
    ],
    deals: [
      { name: "Amundi Planet Emerging Green One", year: 2018, size: "$1.4B", parties: ["IFC", "Amundi", "Institutional Investors"], description: "IFC anchored the world's largest green bond fund for emerging markets, attracting $1.4B from institutional investors. IFC's $256M anchor commitment mobilized 5x private capital.", url: "https://www.ifc.org" },
      { name: "Breakthrough Energy Catalyst", year: 2021, size: "$1.5B", parties: ["Breakthrough Energy", "Bloomberg", "EU", "Bank of America"], description: "Anchor commitments from Bloomberg and the EU catalyzed $1.5B for first-of-a-kind clean energy demonstrations.", url: "https://www.breakthroughenergy.org/our-work/catalyst/" },
      { name: "Asia Climate Solutions Fund", year: 2023, size: "$1B", parties: ["Temasek", "BlackRock", "Asian DFIs"], description: "Temasek's anchor commitment enabled BlackRock to launch the fund targeting decarbonization investments across Southeast Asia.", url: "https://www.blackrock.com/corporate/sustainability/blackrock-temasek" },
    ],
    media: [
      { title: "The Mobilization Effect of Anchor Commitments", source: "IFC", type: "report", url: "https://www.ifc.org", date: "2023", description: "Research on how IFC anchor investments mobilize private capital at ratios of 4-8x." },
      { title: "How Anchor Investors Shape Climate Finance", source: "Climate Policy Initiative", type: "report", url: "https://www.climatepolicyinitiative.org", date: "2024", description: "Analysis of how catalytic anchor commitments are scaling climate investment vehicles." },
      { title: "Blended Finance and the Anchor Effect", source: "Convergence", type: "report", url: "https://www.convergence.finance", date: "2023", description: "Data on how anchor commitments affect fund close rates and final fund sizes in blended finance." },
    ],
  },

  // ============================================
  // HYBRID
  // ============================================
  "tiered-fund": {
    providers: [
      { name: "Convergence", url: "https://www.convergence.finance", description: "Global network that designs and facilitates blended finance vehicles, many using tiered structures to attract diverse investor types.", notableActivity: "Mapped $200B+ in blended finance deals" },
      { name: "Climate Fund Managers", url: "https://www.climatefundmanagers.com", description: "Manages Climate Investor One and Two, flagship tiered climate funds with junior, mezzanine, and senior tranches.", notableActivity: "$1B+ across tiered climate vehicles" },
      { name: "TCX (Currency Exchange Fund)", url: "https://www.tcxfund.com", description: "Multi-tranche currency hedging fund enabling development finance in local currencies, with tiered risk allocation.", notableActivity: "Hedged $10B+ in local currency exposure" },
      { name: "Symbiotics", url: "https://symbioticsgroup.com", description: "Structures tiered microfinance and impact investment vehicles with risk-segmented tranches for different investor profiles.", notableActivity: "$6B+ deployed to 500+ institutions in 90+ countries" },
    ],
    deals: [
      { name: "Climate Investor One", year: 2017, size: "$850M", parties: ["Climate Fund Managers", "FMO", "DFC", "EU", "Pension Funds"], description: "Landmark tiered climate fund with three tranches: development (grant), construction (mezzanine), and refinancing (senior). Public capital took junior positions, enabling pension funds to invest in the senior tranche at market rates.", url: "https://www.climatefundmanagers.com" },
      { name: "GEEREF", year: 2008, size: "€222M", parties: ["European Commission", "Germany", "Norway", "Private Investors"], description: "EU-backed fund-of-funds with tiered structure. Public investors took the first-loss layer, while private investors received preferred returns in the senior tranche.", url: "https://geeref.com/about/what-geeref-is.html" },
      { name: "TCX Local Currency Fund", year: 2007, size: "$1.5B", parties: ["TCX", "KfW", "FMO", "Institutional Investors"], description: "Tiered fund structure absorbing currency risk through different tranches. Public capital sits in junior notes, while commercial investors hold senior notes with reduced FX exposure.", url: "https://www.tcxfund.com/about-the-fund/" },
    ],
    media: [
      { title: "The State of Blended Finance 2024", source: "Convergence", type: "report", url: "https://www.convergence.finance", date: "2024", description: "Annual report tracking tiered fund structures and their growth as a blended finance mechanism." },
      { title: "Tiered Funds: Design Principles and Pitfalls", source: "Climate Policy Initiative", type: "report", url: "https://www.climatepolicyinitiative.org", date: "2023", description: "Technical analysis of how to structure tiered fund tranches to maximize mobilization." },
      { title: "Blended Finance for Climate Investment", source: "OECD", type: "report", url: "https://www.oecd.org", date: "2022", description: "OECD framework for using tiered fund structures to scale climate finance in developing countries." },
    ],
  },

  "technical-assistance": {
    providers: [
      { name: "IFC Advisory Services", url: "https://www.ifc.org/advisory", description: "Provides grant-funded technical assistance alongside IFC investments, helping companies build capacity and bankability.", notableActivity: "$300M+ in advisory projects annually" },
      { name: "Shell Foundation", url: "https://shellfoundation.org", description: "Pairs enterprise-level TA grants with investment to build the capacity of energy access businesses in Africa and Asia.", notableActivity: "TA provided to 100+ enterprises alongside investment" },
      { name: "CGAP (World Bank)", url: "https://www.cgap.org", description: "Provides research and technical assistance to advance financial inclusion globally, supporting both policy and practice.", notableActivity: "30+ years advancing inclusive finance" },
      { name: "AfDB Technical Assistance Fund", url: "https://www.afdb.org", description: "Grant-funded facility providing capacity building, feasibility studies, and project preparation for African infrastructure and development.", notableActivity: "Active across 54 African countries" },
    ],
    deals: [
      { name: "IFC-MIGA Creating Markets Advisory Window", year: 2020, size: "$200M", parties: ["IFC", "MIGA", "Donor Governments"], description: "Technical assistance facility supporting IFC investments in the most challenging markets, providing pre-investment advisory to make projects bankable.", url: "https://www.ifc.org/en/what-we-do/sector-expertise/advisory-services" },
      { name: "Shell Foundation / PayGo Energy TA", year: 2018, size: "$2M", parties: ["Shell Foundation", "PayGo Energy"], description: "Grant-funded technical assistance helped PayGo Energy develop its pay-as-you-cook LPG model, building operational systems and management capacity alongside $3M in recoverable grants.", url: "https://shellfoundation.org/learning/evaluating-the-impact-of-pay-as-you-go-lpg-on-kenyan-lives/" },
      { name: "CGAP / Digital Financial Services TA", year: 2021, size: "$50M", parties: ["CGAP", "World Bank", "National Regulators"], description: "Technical assistance program helping regulators across 30+ countries develop frameworks for digital financial services, unlocking billions in mobile money transactions.", url: "https://www.cgap.org/topics/collections/regulation-inclusive-digital-finance" },
    ],
    media: [
      { title: "Technical Assistance in Blended Finance", source: "Convergence", type: "report", url: "https://www.convergence.finance", date: "2023", description: "Research on how TA facilities improve investment outcomes and reduce risk in blended finance deals." },
      { title: "Enterprise Development and TA", source: "CGAP", type: "report", url: "https://www.cgap.org", date: "2022", description: "Lessons from two decades of technical assistance for financial inclusion." },
      { title: "Making Investments Work with TA", source: "ImpactAlpha", type: "article", url: "https://impactalpha.com", date: "2024", description: "How technical assistance facilities are becoming standard features of impact fund design." },
    ],
  },

  "pay-for-success": {
    providers: [
      { name: "Social Finance US", url: "https://socialfinance.org", description: "Pioneer in designing and managing Pay-for-Success contracts and social impact bonds in the United States.", notableActivity: "$200M+ in outcomes-based financing deployed" },
      { name: "Social Finance UK", url: "https://www.socialfinance.org.uk", description: "Launched the world's first social impact bond and continues to structure PFS contracts across criminal justice, health, and homelessness.", notableActivity: "Designed the original Peterborough SIB model" },
      { name: "Instiglio", url: "https://www.instiglio.org", description: "Global advisory firm designing results-based financing and impact bonds in developing countries.", notableActivity: "Advised on 25+ outcomes-based programs across 15 countries" },
      { name: "Government Outcomes Lab (Oxford)", url: "https://golab.bsg.ox.ac.uk", description: "Research center tracking and evaluating every social impact bond globally, providing the definitive database of PFS contracts.", notableActivity: "Tracks 250+ impact bond projects worldwide" },
    ],
    deals: [
      { name: "Peterborough Prison SIB", year: 2010, size: "£5M", parties: ["Social Finance UK", "Ministry of Justice", "17 Investors"], description: "The world's first social impact bond. Investors funded rehabilitation programs for prisoners; government paid returns only if reoffending rates dropped by 7.5%+. Results exceeded targets.", url: "https://www.socialfinance.org.uk" },
      { name: "Massachusetts Juvenile Justice PFS", year: 2014, size: "$27M", parties: ["Social Finance US", "Massachusetts", "Goldman Sachs", "Roca Inc."], description: "Largest PFS contract in the U.S. at the time. Goldman Sachs provided upfront capital for Roca's youth intervention program; state pays only if incarceration rates decline.", url: "https://socialfinance.org/work/massachusetts-juvenile-justice-pfs/" },
      { name: "Educate Girls Development Impact Bond (India)", year: 2015, size: "$268K", parties: ["Instiglio", "UBS Optimus Foundation", "Children's Investment Fund Foundation"], description: "World's first development impact bond. UBS funded Educate Girls' school enrollment program in Rajasthan; CIFF repaid with returns based on learning outcomes achieved.", url: "https://educategirls.ngo/dib/" },
    ],
    media: [
      { title: "Impact Bonds Worldwide: A Snapshot", source: "Government Outcomes Lab", type: "report", url: "https://golab.bsg.ox.ac.uk", date: "2024", description: "Comprehensive database and analysis of all 250+ impact bonds launched globally." },
      { title: "What We've Learned from Social Impact Bonds", source: "Brookings Institution", type: "report", url: "https://www.brookings.edu", date: "2023", description: "Ten years of evidence on what works and what doesn't in pay-for-success contracting." },
      { title: "The Promise and Reality of Impact Bonds", source: "Stanford Social Innovation Review", type: "article", url: "https://ssir.org", date: "2022", description: "Balanced assessment of where PFS contracts have succeeded and where they've fallen short." },
    ],
  },

  "offtake-backed-financing": {
    providers: [
      { name: "Google (Corporate PPA Buyer)", url: "https://sustainability.google", description: "One of the world's largest corporate buyers of renewable energy via power purchase agreements, which back project financing.", notableActivity: "24/7 carbon-free energy goal; 10GW+ in PPAs signed" },
      { name: "Microsoft (Climate Offtakes)", url: "https://www.microsoft.com/sustainability", description: "Purchases carbon removal and clean energy offtakes to support first-of-a-kind climate projects.", notableActivity: "$1B Climate Innovation Fund; major DAC and SAF offtaker" },
      { name: "Frontier (Advance Market Commitment)", url: "https://frontierclimate.com", description: "Coalition of companies pre-purchasing carbon removal to provide demand certainty for emerging removal technologies.", notableActivity: "$1B+ in advance purchase commitments from Stripe, Google, Meta, etc." },
      { name: "Export Credit Agencies (ECAs)", url: "https://www.berne-union.org", description: "Government-backed agencies providing export credit insurance and guarantees that back international trade offtake agreements.", notableActivity: "$2.8T+ in trade supported by Berne Union members" },
    ],
    deals: [
      { name: "Ørsted / Corporate PPA Portfolio", year: 2022, size: "$5B+", parties: ["Ørsted", "Google", "Amazon", "TSMC"], description: "Major renewable energy developer financed offshore wind and solar projects backed by long-term corporate power purchase agreements, demonstrating how offtake contracts enable project finance at scale.", url: "https://orsted.com/en/what-we-do/power-purchase-agreements" },
      { name: "Microsoft / Heirloom Carbon DAC Offtake", year: 2023, size: "$200M+", parties: ["Microsoft", "Heirloom Carbon"], description: "Microsoft's advance purchase of carbon removal credits enabled Heirloom to secure project financing for its direct air capture facility, demonstrating how demand certainty enables technology deployment.", url: "https://frontierclimate.com" },
      { name: "Frontier Carbon Removal Purchases", year: 2022, size: "$1B", parties: ["Stripe", "Alphabet", "Meta", "Shopify", "McKinsey"], description: "Advance market commitment pooling $1B in carbon removal offtakes to provide demand certainty for nascent removal technologies, enabling companies to secure project finance.", url: "https://frontierclimate.com" },
    ],
    media: [
      { title: "How Corporate PPAs Finance the Energy Transition", source: "BloombergNEF", type: "report", url: "https://about.bnef.com", date: "2024", description: "Analysis of how corporate offtake agreements have become the backbone of renewable energy project finance." },
      { title: "Advance Market Commitments for Climate", source: "Frontier", type: "article", url: "https://frontierclimate.com", date: "2023", description: "How pooled demand commitments are accelerating carbon removal from lab to deployment." },
      { title: "The Role of Offtakes in Clean Energy Finance", source: "Project Finance International", type: "article", url: "https://www.pfie.com", date: "2024", description: "Technical analysis of how offtake-backed structures enable non-recourse project financing." },
    ],
  },

  // ============================================
  // GOVERNMENT
  // ============================================
  "doe-lpo": {
    providers: [
      { name: "DOE Loan Programs Office", url: "https://www.energy.gov/lpo", description: "The sole provider of DOE direct loans and loan guarantees for innovative energy and automotive manufacturing projects.", notableActivity: "$40B+ in loans and guarantees issued; zero losses on energy portfolio" },
      { name: "DOE Title 17 (Clean Energy Financing)", url: "https://www.energy.gov/lpo/title-17-clean-energy-financing", description: "Finances first-of-a-kind and early commercial-scale clean energy projects at Treasury + spread.", notableActivity: "Covers nuclear, renewables, critical minerals, hydrogen, and more" },
      { name: "DOE ATVM Program", url: "https://www.energy.gov/lpo/advanced-technology-vehicles-manufacturing", description: "Provides direct loans for manufacturing facilities producing advanced technology vehicles and components.", notableActivity: "Financed Tesla, Ford, and other EV manufacturing" },
      { name: "DOE Tribal Energy Loan Guarantee Program", url: "https://www.energy.gov/lpo/tribal-energy-loan-guarantee-program", description: "Guarantees loans for energy development projects on tribal lands.", notableActivity: "Up to $20B in loan guarantee authority" },
    ],
    deals: [
      { name: "Tesla ATVM Loan", year: 2010, size: "$465M", parties: ["DOE LPO", "Tesla Motors"], description: "DOE loan enabled Tesla to retool the Fremont factory for Model S production. Tesla repaid the loan 9 years early with interest, validating the LPO model and helping launch the EV revolution.", url: "https://www.energy.gov/lpo/tesla" },
      { name: "Vogtle Nuclear Plant Loan Guarantee", year: 2014, size: "$12B", parties: ["DOE LPO", "Georgia Power", "Southern Company"], description: "Largest federal loan guarantee in history, supporting construction of the first new U.S. nuclear reactors in 30 years. Units 3 and 4 began commercial operation in 2023-2024.", url: "https://www.energy.gov/lpo/vogtle" },
      { name: "Ford BlueOval EV Battery Plants", year: 2023, size: "$9.2B", parties: ["DOE LPO", "Ford", "SK Innovation"], description: "DOE conditional commitment for three battery manufacturing facilities, the largest ATVM loan in program history, supporting domestic EV supply chain buildout.", url: "https://www.energy.gov/lpo/ford" },
    ],
    media: [
      { title: "Inside the DOE Loan Programs Office", source: "Canary Media", type: "article", url: "https://www.canarymedia.com", date: "2024", description: "Profile of how LPO evaluates and finances first-of-a-kind energy projects." },
      { title: "LPO: The Government's Most Successful Bank", source: "Heatmap News", type: "article", url: "https://heatmap.news", date: "2023", description: "Analysis of LPO's track record, zero loss rate, and role in scaling clean energy." },
      { title: "Jigar Shah on Financing the Energy Transition", source: "My Climate Journey Podcast", type: "podcast", url: "https://www.mcjcollective.com/media/podcast", date: "2023", description: "LPO Director discusses how federal lending de-risks clean energy and accelerates deployment." },
    ],
  },

  "ira-tax-credits": {
    providers: [
      { name: "Crux Climate", url: "https://www.cruxclimate.com", description: "Marketplace for buying and selling transferable clean energy tax credits created by the Inflation Reduction Act.", notableActivity: "Facilitating billions in IRA tax credit transfers" },
      { name: "US Bank / Tax Equity Group", url: "https://www.usbank.com", description: "One of the largest tax equity investors in the U.S., syndicating investment tax credits and production tax credits for renewable energy.", notableActivity: "$12B+ in renewable energy tax equity invested" },
      { name: "Bank of America / Renewable Energy Finance", url: "https://about.bankofamerica.com", description: "Major tax equity provider and credit transferability participant, financing solar, wind, and storage through IRA credits.", notableActivity: "$10B+ in tax equity commitments" },
      { name: "JPMorgan Renewable Energy Group", url: "https://www.jpmorgan.com", description: "Provides tax equity financing for renewable energy projects using ITC and PTC credits under the IRA.", notableActivity: "One of top-3 tax equity providers nationally" },
    ],
    deals: [
      { name: "First IRA Tax Credit Transfers", year: 2023, size: "$2B+", parties: ["Various Developers", "Corporate Buyers", "Crux Climate"], description: "The IRA's transferability provision created a new market in 2023. Companies without tax liability began selling credits at 90-95 cents on the dollar, democratizing access to clean energy incentives.", url: "https://www.cruxclimate.com" },
      { name: "Invenergy ITC Transfer", year: 2023, size: "$580M", parties: ["Invenergy", "Bank of America"], description: "One of the first and largest individual tax credit transfer transactions under the IRA, with Invenergy selling investment tax credits from its U.S. renewable energy portfolio to Bank of America.", url: "https://www.canarymedia.com/articles/policy-regulation/the-tax-code-change-unleashing-25b-in-clean-energy-investment" },
      { name: "Community Solar ITC / Low-Income Bonus", year: 2023, size: "$500M+", parties: ["Community Solar Developers", "Tax Equity Investors", "Low-Income Communities"], description: "The IRA's bonus credits for projects in low-income communities created a surge in community solar development, with 10-20% additional credit value driving new projects.", url: "https://www.irs.gov/credits-deductions/clean-electricity-low-income-communities-bonus-credit-amount-program" },
    ],
    media: [
      { title: "IRA Tax Credits: A Complete Guide", source: "Norton Rose Fulbright", type: "report", url: "https://www.nortonrosefulbright.com", date: "2024", description: "Legal guide to the IRA's clean energy tax credit provisions, transferability, and direct pay." },
      { title: "The Emerging Tax Credit Transfer Market", source: "Heatmap News", type: "article", url: "https://heatmap.news", date: "2024", description: "How the IRA's transferability provision is reshaping clean energy finance." },
      { title: "Understanding IRA Clean Energy Incentives", source: "Canary Media", type: "article", url: "https://www.canarymedia.com", date: "2023", description: "Plain-language breakdown of the IRA's tax credit types and how projects can access them." },
    ],
  },

  "oced-grants": {
    providers: [
      { name: "DOE OCED (Office of Clean Energy Demonstrations)", url: "https://www.energy.gov/oced", description: "Federal office deploying $20B+ in demonstration grants for first-of-a-kind clean energy technologies under the Bipartisan Infrastructure Law.", notableActivity: "$20B+ in demonstration funding authority" },
      { name: "ARPA-E", url: "https://arpa-e.energy.gov", description: "Advanced Research Projects Agency-Energy providing high-risk grants for transformative energy technologies.", notableActivity: "800+ projects funded; 129 new companies formed" },
      { name: "DOE Office of Science", url: "https://science.energy.gov", description: "Funds fundamental research through national laboratories and university grants supporting breakthrough energy science.", notableActivity: "$8.1B annual budget across 17 national labs" },
      { name: "NSF (National Science Foundation)", url: "https://www.nsf.gov", description: "Provides grants for basic research and technology translation with applications in clean energy and climate.", notableActivity: "$11.4B+ annual research investment" },
    ],
    deals: [
      { name: "Regional Clean Hydrogen Hubs (H2Hubs)", year: 2023, size: "$7B", parties: ["DOE OCED", "7 Regional Hubs"], description: "Landmark demonstration grant program funding 7 regional clean hydrogen hubs across the U.S., the largest demonstration investment in DOE history.", url: "https://www.energy.gov/oced/regional-clean-hydrogen-hubs" },
      { name: "Direct Air Capture Hubs", year: 2023, size: "$3.5B", parties: ["DOE OCED", "Occidental/1PointFive", "Battelle/Heirloom"], description: "Two DAC hub selections — the world's first large-scale direct air capture facilities, funded through BIL demonstration grants to prove the technology at million-ton-per-year scale.", url: "https://www.energy.gov/oced/DACHubs" },
      { name: "Carbon Capture Large-Scale Pilots", year: 2024, size: "$890M", parties: ["DOE OCED", "Various CCS Developers"], description: "Demonstration grants for carbon capture, transport, and storage projects, supporting the first commercial-scale deployments at power plants and industrial facilities.", url: "https://www.energy.gov/oced/CCpilots" },
    ],
    media: [
      { title: "OCED: Building the Bridge from Lab to Market", source: "Canary Media", type: "article", url: "https://www.canarymedia.com", date: "2024", description: "Profile of OCED's mandate and how it fills the demonstration funding gap for clean energy." },
      { title: "The Hydrogen Hubs Selection", source: "Heatmap News", type: "article", url: "https://heatmap.news", date: "2023", description: "Analysis of the 7 selected hydrogen hubs and what they mean for the U.S. clean energy industrial strategy." },
      { title: "Demonstrating Clean Energy at Scale", source: "DOE", type: "report", url: "https://www.energy.gov/oced", date: "2024", description: "OCED's framework for selecting and managing first-of-a-kind demonstration projects." },
    ],
  },
};

import { V2ExtractionResult } from './v2-schema';

export const V2_PREFILL_TEXT = `<SECTION_0>
\`\`\`json
{
  "identification": {
    "project_name": "Regional Infrastructure Cluster (RIC) Regeneration Platform",
    "one_liner": "A software platform that helps municipalities fix aging infrastructure by connecting citizen reports directly to engineers. It allows multiple towns to share resources and automate the repair process, overcoming the shortage of technical staff.",
    "stage": "Incubation / Validation",
    "sector": "GovTech / Infrastructure SaaS",
    "geography": "Japan"
  },
  "question_and_answer": {
    "the_question": "Should Apex Materials Corporation launch the RIC infrastructure maintenance platform?",
    "the_answer": "Partnership-Led Narrow Platform  Proceed with a narrow MVP only after validating the \\"Cluster\\" procurement model via paid pilots",
    "confidence": {
      "rating": "Medium-High",
      "percentage": null
    }
  },
  "thesis": {
    "the_prize": "Establishes a scalable, recurring-revenue business in a ¥820B market driven by irreversible labor shortages and national policy mandates",
    "the_risk": "Municipal procurement rigidity (Capex vs. Opex) and lack of SaaS leadership may trap the venture in low-margin consulting economics",
    "the_unlock": "Securing one \\"Cluster\\" contract (Prefecture + Municipalities) to prove the legal and commercial viability of aggregated subscriptions"
  }
}
\`\`\`
</SECTION_0>

<SECTION_1>
\`\`\`json
{
  "should_we_do_it": {
    "the_prize": {
      "market_size": "TAM: ¥820.8B (Local Gov IT); SAM: Infrastructure Maintenance growing at 8.7% CAGR; Physical maintenance liability is ¥12.3T by 2048.",
      "margins": "Targeting SaaS margins (70-80%) at scale, but initially constrained to Service margins (30-40%) due to manual engineering workflows.",
      "durability": "High durability driven by irreversible labor shortages and '2025 Cliff' of aging assets; 22-month sales cycles create strong defensive moats once established.",
      "bottom_line": "Massive, structural opportunity driven by necessity, but requires surviving a long cash-flow trough."
    },
    "strategic_fit": {
      "bet_type": "Adjacent (Shifting from 'Pipe' engineering services to 'Platform' software orchestration).",
      "portfolio_fit": "Aligns with 'Innovation Journey' and 'Recycling-oriented society' goals; moves revenue quality from project-based to recurring.",
      "priority_alignment": "Directly supports MLIT's 'Regional Infrastructure Cluster Regeneration' policy.",
      "bottom_line": "Strong strategic alignment, but represents a significant business model pivot from hardware/services to software."
    },
    "our_edge": {
      "unfair_advantages": [
        "Deep domain authority in aluminum infrastructure and disaster prevention",
        "Ability to underwrite liability/safety risks (unlike pure software startups)",
        "Existing B2G relationships and 'Cluster Management' policy alignment"
      ],
      "why_us": "Pure software players (CityConnect) lack engineering rigor; General Contractors are too manual. AMC bridges the 'Resolution Gap' (Steps 2-3).",
      "bottom_line": "We have the 'Engineering Trust' required to sell safety-critical software that startups lack."
    },
    "verdict": {
      "decision": "Yes",
      "confidence": "High",
      "rationale": "The market need is existential (labor shortage), and AMC has a unique right to win based on engineering authority and policy alignment."
    }
  },
  "can_we_do_it": {
    "capital_and_infrastructure": {
      "cash_position": "Requires ~Â¥450M-Â¥500M funding to bridge the 22-month sales cycle 'Valley of Death'. Corporate balance sheet is sufficient.",
      "facilities": "Existing regional footprint; relying on external cloud (AWS) and partners (CityConnect) for tech infrastructure.",
      "tools_and_systems": "Lacks internal SaaS infrastructure; relying on 'Concierge MVP' (manual) initially.",
      "bottom_line": "Capital is available, but digital infrastructure is non-existent and must be built or partnered."
    },
    "market_access": {
      "customer_relationships": "Strong B2G ties in water/disaster prevention; weaker brand recognition in general road/bridge departments.",
      "geographic_presence": "National reach via Apex Infrastructure Services.",
      "regulatory_experience": "Deep experience with public works, but 'SaaS Subscription' procurement pathways are unproven and risky.",
      "bottom_line": "Strong access to the *entity* (municipality), but potentially the wrong *buyer* (IT vs. Construction)."
    },
    "people": {
      "skills": "World-class civil engineering expertise; critical gap in SaaS product management and digital execution.",
      "experience": "Team is accustomed to 'Zero-Defect' waterfall engineering, not Agile software iteration.",
      "bandwidth": "Relying on 'Internal Product Ownership' without a dedicated CPO/CTO creates high execution risk.",
      "bottom_line": "Significant human capital gap in digital leadership; relying on external coaches/vendors is a fragility."
    },
    "verdict": {
      "decision": "Borderline",
      "confidence": "Medium",
      "rationale": "We have the capital and relationships, but the lack of internal software DNA and the reliance on manual workflows creates a high risk of the 'Service Margin Trap'."
    }
  },
  "synthesis": {
    "alignment": "Strategic Fit (Should) and Market Access (Can) are aligned. We know the problem and the customer intimately.",
    "divergence": "Execution Capability (Can) lags behind Strategic Ambition. We want to build a scalable platform but are staffed for manual engineering consulting.",
    "gap_to_close": "Must validate the 'Cluster' procurement model (legal ability to buy SaaS) and automate the 'Step 2' diagnosis logic to escape low service margins.",
    "final_verdict": {
      "verdict_title": "Partnership-Led Narrow Platform",
      "decision": "Conditional",
      "condition": "Proceed only if: 1) A 'Cluster' contract is secured to prove procurement viability, and 2) A dedicated Product Owner is empowered to override engineering delays.",
      "confidence": "Medium"
    }
  }
}
\`\`\`
</SECTION_1>

<SECTION_2>
\`\`\`json
{
  "gaps": [
    {
      "dimension": "Team / Leadership",
      "category": "core",
      "current_state": "Strong engineering domain expertise but critical lack of internal SaaS leadership (CPO/CTO); relying on internal staff and fractional coaches.",
      "required_state": "Full-time Product Lead/CPO with B2B SaaS experience empowered to override engineering vetoes on non-safety features.",
      "gap_summary": "Missing executive software DNA; 'Zero-Defect' culture threatens agile iteration.",
      "gap_size": {
        "score": 5,
        "label": "Critical"
      },
      "ease_of_closing": {
        "score": 2,
        "label": "Hard"
      },
      "quadrant": "Dealbreaker",
      "why_easy_or_hard": "Organization explicitly rejected hiring external CPO; cultural resistance to 'outsiders' and agile methods is high.",
      "action_to_close": "Hire a full-time Product Lead or CPO with B2B SaaS experience and grant them decision rights over the roadmap.",
      "risk_of_inaction": "Venture builds a 'white elephant' that meets engineering specs but fails user adoption; product development stalls.",
      "owner": "Head of Innovation"
    },
    {
      "dimension": "Technology / Product",
      "category": "core",
      "current_state": "Reliance on manual 'Concierge MVP' workflows where staff manually process data; integration with legacy systems is unproven.",
      "required_state": "Automated diagnosis logic capable of delivering 70%+ gross margins without human intervention per transaction.",
      "gap_summary": "Manual diagnosis logic creates a 'Service Margin Trap' (30-40% margins).",
      "gap_size": {
        "score": 4,
        "label": "Large"
      },
      "ease_of_closing": {
        "score": 3,
        "label": "Medium"
      },
      "quadrant": "Priority Investment",
      "why_easy_or_hard": "Technically feasible to automate, but requires rigorous definition of logic and liability boundaries.",
      "action_to_close": "Define and execute a roadmap to automate the 'Step 2' diagnosis logic to reduce manual intervention by 50% in Year 1.",
      "risk_of_inaction": "Venture remains a low-margin consulting business disguised as a platform; unit economics never scale.",
      "owner": "Venture Team / Apex Infrastructure Services"
    },
    {
      "dimension": "Traction / Validation",
      "category": "core",
      "current_state": "Zero paid traction; unproven willingness-to-pay for software separate from engineering services.",
      "required_state": "Paid pilot contracts with at least one 'Cluster' (Prefecture + Municipalities) validating the subscription model.",
      "gap_summary": "Commercial value is theoretical; no paying customers to validate pricing.",
      "gap_size": {
        "score": 5,
        "label": "Critical"
      },
      "ease_of_closing": {
        "score": 3,
        "label": "Medium"
      },
      "quadrant": "Mixed",
      "why_easy_or_hard": "Access to customers is easy via AMC brand, but 22-month sales cycles make closing deals slow.",
      "action_to_close": "Secure one paid 'Cluster' pilot contract (Prefecture + Municipalities) within 90 days.",
      "risk_of_inaction": "Valuation remains unsupported; cash burn continues without revenue validation.",
      "owner": "Project Lead"
    },
    {
      "dimension": "Capital / Funding",
      "category": "core",
      "current_state": "Projected ¥450M working capital deficit to bridge the 22-month sales cycle gap.",
      "required_state": "Committed internal funding tranche to cover the 'Valley of Death' before revenue scales.",
      "gap_summary": "Significant cash flow trough identified due to slow government payment cycles.",
      "gap_size": {
        "score": 3,
        "label": "Medium"
      },
      "ease_of_closing": {
        "score": 4,
        "label": "Easy"
      },
      "quadrant": "Quick Win",
      "why_easy_or_hard": "Internal corporate allocation decision; balance sheet capacity exists.",
      "action_to_close": "Approve ¥500M internal funding allocation tied to specific validation milestones.",
      "risk_of_inaction": "Project halted mid-stream due to liquidity crisis before sales cycle completes.",
      "owner": "Corporate HQ / Finance"
    },
    {
      "dimension": "Market Access / Go-to-Market",
      "category": "core",
      "current_state": "Direct sales model to single municipalities is economically unviable (CAC > LTV for small towns).",
      "required_state": "Validated 'Cluster' sales motion where Prefectures buy on behalf of multiple municipalities.",
      "gap_summary": "Unit economics fail without successful 'Cluster' aggregation.",
      "gap_size": {
        "score": 4,
        "label": "Large"
      },
      "ease_of_closing": {
        "score": 2,
        "label": "Hard"
      },
      "quadrant": "Dealbreaker",
      "why_easy_or_hard": "Requires changing entrenched municipal procurement behavior (local-only bidding) to a centralized model.",
      "action_to_close": "Validate the 'Cluster' procurement vehicle with a pilot to prove aggregation is legally possible.",
      "risk_of_inaction": "Inability to profitably serve 80-90% of the target market; CAC destroys profitability.",
      "owner": "Sales / Venture Team"
    },
    {
      "dimension": "Regulatory / Legal",
      "category": "core",
      "current_state": "Ambiguous 'Inspector of Record' role creates risk of uninsurable liability for infrastructure failures.",
      "required_state": "Clear Terms of Service and insurance structure indemnifying AMC from physical infrastructure failure.",
      "gap_summary": "Liability framework undefined; risk of 'false negatives' leading to accidents.",
      "gap_size": {
        "score": 5,
        "label": "Critical"
      },
      "ease_of_closing": {
        "score": 3,
        "label": "Medium"
      },
      "quadrant": "Priority Investment",
      "why_easy_or_hard": "Solvable with specialized legal counsel and insurance structuring, but stakes are existential.",
      "action_to_close": "Draft and validate Terms of Service that explicitly shift engineering judgment liability back to the user.",
      "risk_of_inaction": "Single accident could bankrupt the venture or cause reputational contagion.",
      "owner": "Corporate Legal"
    },
    {
      "dimension": "Partnerships / Ecosystem",
      "category": "optional",
      "current_state": "Need for citizen reporting data intake; CityConnect identified as potential partner.",
      "required_state": "Formal API integration and commercial agreement with a citizen reporting provider.",
      "gap_summary": "Dependency on third-party for 'Step 1' data intake.",
      "gap_size": {
        "score": 2,
        "label": "Small"
      },
      "ease_of_closing": {
        "score": 4,
        "label": "Easy"
      },
      "quadrant": "Quick Win",
      "why_easy_or_hard": "Partners (e.g., Urban Solutions Inc.) are available and willing; technical integration is standard.",
      "action_to_close": "Formalize partnership/MOU with Urban Solutions Inc. (CityConnect) for data ingestion.",
      "risk_of_inaction": "Team wastes resources rebuilding a commodity 'reporting app' instead of the core engineering engine.",
      "owner": "Venture Team"
    }
  ],
  "gap_summary": {
    "total_dimensions_assessed": 7,
    "dealbreakers": [
      "Team / Leadership",
      "Market Access / Go-to-Market"
    ],
    "priority_investments": [
      "Technology / Product",
      "Regulatory / Legal"
    ],
    "quick_wins": [
      "Capital / Funding",
      "Partnerships / Ecosystem"
    ],
    "manageable": [],
    "mixed": [
      "Technology / Product",
      "Capital / Funding",
      "Regulatory / Legal"
    ],
    "overall_gap_assessment": "High-risk venture. While Capital and Tech are solvable, the 'Team' (lack of SaaS DNA) and 'Market Access' (reliance on unproven Cluster procurement) are critical dealbreakers that must be resolved before full funding."
  }
}
\`\`\`
</SECTION_2>

<SECTION_3>
\`\`\`json
{
  "highlights": [
    {
      "highlight": "Municipal technical staff declined 37â€“43%, creating forced demand for automation",
      "category": "Market",
      "why_it_matters": "Structural labor collapse means municipalities physically cannot maintain assets manually, forcing platform adoption",
      "context_grounding": "Water supply staff down 37%, sewerage down 43% from peak. 10,000 bridges identified for repair 5 years ago remain untouched.",
      "polarity": "tailwind",
      "time_sensitivity": {
        "is_time_bound": true,
        "window": "Crisis peaks by 2030 as senior engineers retire"
      },
      "source_confidence": "verified"
    },
    {
      "highlight": "22-month government sales cycle creates a ¥450M working capital deficit",
      "category": "Financial",
      "why_it_matters": "The 'Valley of Death' is deeper than typical SaaS; requires significant corporate funding before break-even",
      "context_grounding": "Industry average procurement timeline delays revenue. Cash trough hits ¥450M in Year 4 before collections catch up.",
      "polarity": "headwind",
      "time_sensitivity": {
        "is_time_bound": true,
        "window": "Immediate funding requirement for Years 1-3"
      },
      "source_confidence": "estimated"
    },
    {
      "highlight": "Unit economics are negative unless 'Cluster' strategy achieves >3:1 municipality aggregation",
      "category": "Financial",
      "why_it_matters": "Direct sales to small towns are mathematically unviable; the business model fails without bulk procurement",
      "context_grounding": "CAC (Â¥3Mâ€“Â¥6M) exceeds Year 1 ARR (Â¥3Mâ€“Â¥5M) for single towns. Payback >24 months without aggregation.",
      "polarity": "headwind",
      "time_sensitivity": {
        "is_time_bound": false,
        "window": null
      },
      "source_confidence": "estimated"
    },
    {
      "highlight": "AMCâ€™s ability to underwrite safety liability creates a moat against software startups",
      "category": "Competitive",
      "why_it_matters": "Differentiation based on 'Engineering Trust' allows premium pricing over commoditized reporting apps",
      "context_grounding": "Pure-play competitors (e.g., CityConnect) stop at 'reporting' to avoid risk. AMC can insure the 'resolution' workflow.",
      "polarity": "tailwind",
      "time_sensitivity": {
        "is_time_bound": false,
        "window": null
      },
      "source_confidence": "assumed"
    },
    {
      "highlight": "Zero SaaS leadership on team risks 'Service Margin Trap' (30-40% margins)",
      "category": "Team",
      "why_it_matters": "Without a CPO to drive automation, the venture risks remaining a low-margin consulting firm",
      "context_grounding": "Reliance on internal 'Product Owner' and manual 'Concierge MVP' workflows suppresses margins well below the 70%+ SaaS target.",
      "polarity": "headwind",
      "time_sensitivity": {
        "is_time_bound": false,
        "window": null
      },
      "source_confidence": "verified"
    },
    {
      "highlight": "Â¥20 trillion national resilience budget explicitly funds the 'Cluster Management' strategy",
      "category": "Market",
      "why_it_matters": "Fiscal policy has shifted from passive maintenance to active regional integration, subsidizing market entry",
      "context_grounding": "MLIT policy now mandates cross-jurisdictional collaboration, aligning perfectly with the platform's multi-tenant architecture.",
      "polarity": "tailwind",
      "time_sensitivity": {
        "is_time_bound": true,
        "window": "Budget allocation active now; decision needed within months to align"
      },
      "source_confidence": "verified"
    },
    {
      "highlight": "Procurement rules may legally block SaaS payments (Opex) in favor of construction (Capex)",
      "category": "Risk",
      "why_it_matters": "If budget codes don't exist, no amount of product value can generate revenue",
      "context_grounding": "Municipalities often lack 'Cloud Service' budget lines for infrastructure. 'Local-only' bidding rules further fragment the TAM.",
      "polarity": "headwind",
      "time_sensitivity": {
        "is_time_bound": true,
        "window": "Must be validated in 90-day pilot phase"
      },
      "source_confidence": "estimated"
    }
  ],
  "highlights_metadata": {
    "total_highlights": 7,
    "tailwinds": 3,
    "headwinds": 4,
    "neutral": 0,
    "balance_check": "Balanced â€” highlights strong market drivers against severe financial and execution risks"
  }
}
\`\`\`
</SECTION_3>

<SECTION_4>
\`\`\`json
{
  "next_steps": [
    {
      "step_number": 1,
      "step_title": "Validate Procurement & Willingness-to-Pay",
      "owner": "venture",
      "description": "Conduct 'Procurement Dry Run' with 3-5 target municipalities to confirm they can legally pay for SaaS (Opex) vs. construction (Capex).",
      "timeline": "60 days",
      "depends_on": null,
      "success_gate": "3+ Municipalities sign LOIs referencing a recurring fee model.",
      "unlocks": "Validates commercial viability and clears procurement risk.",
      "if_gate_fails": {
        "action": "pivot",
        "detail": "Pivot to 'Tech-Enabled Services' for internal use."
      }
    },
    {
      "step_number": 2,
      "step_title": "Define Liability & Insurance Framework",
      "owner": "joint",
      "description": "Commission legal review to draft Terms of Service distinguishing 'information provision' from 'engineering judgment.'",
      "timeline": "60 days",
      "depends_on": null,
      "success_gate": "Legal opinion confirming platform liability is capped at subscription fees.",
      "unlocks": "Removes the 'Uninsurable Risk' blocker.",
      "if_gate_fails": {
        "action": "pass",
        "detail": "Terminate project if liability cannot be separated."
      }
    },
    {
      "step_number": 3,
      "step_title": "Secure Data Ingestion Partnership",
      "owner": "venture",
      "description": "Execute technical due diligence and partnership negotiation with Urban Solutions Inc. (CityConnect Japan).",
      "timeline": "60 days",
      "depends_on": null,
      "success_gate": "Signed MOU with Urban Solutions Inc. and successful API data ingestion test.",
      "unlocks": "Validates the 'Narrow Platform' strategy.",
      "if_gate_fails": {
        "action": "reassess",
        "detail": "Evaluate acquisition or build costs for reporting tool."
      }
    },
    {
      "step_number": 4,
      "step_title": "Execute 'Concierge' Cluster Pilot",
      "owner": "venture",
      "description": "Launch a manual 'Concierge MVP' with one 'Vertical Cluster' to prove efficiency gains before writing code.",
      "timeline": "90 days",
      "depends_on": [
        1,
        2,
        3
      ],
      "success_gate": "Pilot cluster confirms >20% reduction in administrative burden.",
      "unlocks": "Final Go/No-Go decision for full software development budget.",
      "if_gate_fails": {
        "action": "pass",
        "detail": "Stop before software spend if manual simulation fails."
      }
    }
  ],
  "pathway_metadata": {
    "total_steps": 4,
    "critical_path_duration": "5-6 months",
    "ultimate_decision": "Go/No-Go on funding full software development.",
    "pathway_confidence": "High"
  }
}
\`\`\`
</SECTION_4>

<SECTION_5>
\`\`\`json
{
  "supporting_analysis": {
    "explored_and_tested": [
      {
        "headline": "Unit Economics Fail at Single-Scale",
        "insight": "CAC exceeds first-year revenue for individual municipalities.",
        "source_chapter": "unit-economics"
      },
      {
        "headline": "Procurement Rules Block SaaS",
        "insight": "Rigid separation of Capex/Opex may prevent subscription payments.",
        "source_chapter": "six-t-analysis"
      },
      {
        "headline": "22-Month Sales Cycles Create a ¥450M Cash Trough",
        "insight": "Extended government purchasing timeline creates a severe working capital drag, requiring approximately ¥450M in upfront funding to bridge the gap between sales spend and cash collection. This 'Valley of Death' risks exhausting the venture's runway before the subscription model can compound.",
        "source_chapter": "finance-and-operations"
      },
      {
        "headline": "Manual Workflows Threaten to Trap Venture in Low Margins",
        "insight": "Reliance on a 'Concierge MVP' with manual engineering review risks anchoring gross margins at consulting levels (30â€“40%) rather than software levels (70%+). Failure to automate the diagnosis logic will result in a scalable service business rather than the intended high-growth SaaS platform.",
        "source_chapter": "finance-and-operations"
      },
      {
        "headline": "Liability Exposure is an Existential Go/No-Go Gate",
        "insight": "Acting as the 'Inspector of Record' carries uninsurable risk for infrastructure failures, potentially exposing the parent company to catastrophic damages. The business model is only viable if the legal framework explicitly limits the platform's role to 'information provision' rather than engineering judgment.",
        "source_chapter": "legal-and-ip"
      },
      {
        "headline": "Internal Team Lacks Critical SaaS Execution DNA",
        "insight": "The decision to forego an external CPO in favor of internal leadership creates significant execution risk for a complex platform product. Without experienced digital leadership to balance the 'Zero-Defect' engineering culture, the team risks building a compliant but unusable 'white elephant.'",
        "source_chapter": "team-and-execution"
      },
      {
        "headline": "Aluminum Brand Authority May Not Transfer to Roads",
        "insight": "Apex Infrastructure Services' deep authority in water gates does not automatically translate to credibility in general road and bridge maintenance. There is a risk that municipal road departments will view the firm as a niche hardware manufacturer rather than a strategic platform partner.",
        "source_chapter": "market-research"
      },
      {
        "headline": "Engineering Logic in Steps 2-3 Is the Only Defensible Moat",
        "insight": "Competitors have commoditized defect detection (Step 1), but no platform effectively digitizes the complex engineering workflows (Steps 2-3) required for resolution. Building the proprietary logic engine for diagnosis and design is the primary opportunity to differentiate from civic-tech apps.",
        "source_chapter": "competitive-analysis"
      },
      {
        "headline": "AI and Drones Threaten Process Obsolescence Within 5 Years",
        "insight": "The platform optimizes manual inspection workflows just as AI and autonomous drones threaten to render human-centric inspection obsolete. To survive, the strategy must pivot from managing manual teams to ingesting and verifying AI-generated data streams.",
        "source_chapter": "six-t-analysis"
      },
      {
        "headline": "Incumbent Bundling Could Eliminate Willingness-to-Pay",
        "insight": "Large system integrators like Fujitsu or NEC could include basic infrastructure maintenance modules as zero-cost add-ons to existing government cloud contracts. To command a premium, the platform must sell 'Engineering Trust' and liability mitigation rather than just software utility.",
        "source_chapter": "competitive-analysis"
      },
      {
        "headline": "Partnering for 'Step 1' Data Intake Is the Optimal Path",
        "insight": "Rebuilding a citizen reporting app would be redundant and costly given the dominance of players like CityConnect. The optimal strategy is to integrate their data via API, focusing AMC's resources entirely on the high-value downstream engineering workflow.",
        "source_chapter": "product-and-technology"
      }
    ],
    "risks_acknowledged": [
      {
        "headline": "Rigid Capex Budgeting",
        "insight": "If 'Cluster' loophole fails, market drops to zero.",
        "severity": "high",
        "source_chapter": "six-t-analysis"
      },
      {
        "headline": "22-Month Sales Cycles",
        "insight": "Massive cash flow trough risks insolvency.",
        "severity": "high",
        "source_chapter": "finance-and-operations"
      },
      {
        "headline": "Direct Sales to Small Municipalities Guarantee Negative Unit Economics",
        "insight": "CAC exceeds first-year revenue for small towns; viability relies entirely on 'Cluster' aggregation.",
        "severity": "high",
        "source_chapter": "unit-economics"
      },
      {
        "headline": "Manual Diagnosis Reliance Locks Margins at Low Consulting Levels",
        "insight": "Failure to automate logic quickly will trap the venture in 30-40% service margins.",
        "severity": "high",
        "source_chapter": "product-and-technology"
      },
      {
        "headline": "Platform 'Inspector of Record' Status Creates Uninsurable Safety Liability",
        "insight": "Exposure could exceed corporate risk appetite and make insurance premiums prohibitively expensive.",
        "severity": "high",
        "source_chapter": "legal-and-ip"
      },
      {
        "headline": "Engineering Veto Power Risks Stifling Agile Software Velocity",
        "insight": "Zero-Defect culture clashes with MVP iteration. Steering Committee structure may deadlock on safety concerns.",
        "severity": "high",
        "source_chapter": "team-and-execution"
      }
    ],
    "path_summary": {
      "recommendation": "Option 1: Partnership-Led Narrow Platform",
      "path_description": "Focus on proprietary 'Cluster Management' workflow while partnering for reporting.",
      "confidence": "high"
    },
    "key_trade_offs_resolved": [
      {
        "trade_off": "Speed vs. Control",
        "resolution": "Partner for Step 1; build proprietary logic for Steps 2-3.",
        "supporting_evidence": "Avoids 6-12 month development cycles.",
        "source_chapters": [
          "opportunity-validation"
        ],
        "confidence": "high"
      }
    ],
    "alternatives_considered": [
      {
        "alternative": "Full Internal Build",
        "why_not_preferred": "High upfront costs and maintenance liabilities.",
        "source_chapters": [
          "opportunity-validation"
        ],
        "confidence": "high"
      },
      {
        "alternative": "Option 3: Acquisition",
        "why_not_preferred": "Prohibitive Acquisition Costs",
        "source_chapters": [
          "opportunity-validation"
        ],
        "confidence": "high"
      }
    ],
    "path_advantages": [
      {
        "advantage": "Speed to Market",
        "description": "Leverages existing adoption of CityConnect.",
        "source_chapter": "opportunity-validation",
        "confidence": "high"
      }
    ]
  }
}
\`\`\`
</SECTION_5>`;

export const V2_EXTRACTION_JSON = (() => {
  const blocks = V2_PREFILL_TEXT.match(/```json([\s\S]*?)```/g);
  if (!blocks) {
    // Fallback if no blocks found (e.g. if the text format changes)
    try {
      return JSON.parse(V2_PREFILL_TEXT.replace(/<SECTION_\d+>|```json|```|<\/SECTION_\d+>/g, '')) as V2ExtractionResult;
    } catch (e) {
      console.error('Failed to parse V2_PREFILL_TEXT:', e);
      return {} as V2ExtractionResult;
    }
  }

  let combined = {};
  for (const block of blocks) {
    const cleanJson = block.replace(/```json|```/g, '');
    try {
      const parsed = JSON.parse(cleanJson);
      combined = { ...combined, ...parsed };
    } catch (e) {
      console.error('Error parsing JSON block in V2_PREFILL_TEXT:', e);
    }
  }
  return combined as V2ExtractionResult;
})();

// Japanese version — same shape as V2ExtractionResult but enum-like fields use Japanese display values
export const V2_EXTRACTION_JSON_JP = {
  "identification": {
    "project_name": "地域インフラ群（RIC）再生プラットフォーム",
    "one_liner": "市民からの通報をエンジニアに直接つなげることで、自治体が老朽化したインフラを修復するのを支援するソフトウェアプラットフォーム。複数の町がリソースを共有し、修復プロセスを自動化することで、技術職員不足を克服することを可能にする。",
    "stage": "インキュベーション / 検証段階",
    "sector": "GovTech（行政テック） / インフラSaaS",
    "geography": "日本"
  },
  "question_and_answer": {
    "the_question": "Apex Materials CorporationはRICインフラ維持管理プラットフォームを立ち上げるべきか？",
    "the_answer": "条件付きGo（オプション2） – 有償パイロットを通じて「群（クラスター）」調達モデルを検証した後、限定的なMVPでのみ進める",
    "confidence": {
      "rating": "中～高",
      "percentage": null
    }
  },
  "thesis": {
    "the_prize": "不可逆的な労働力不足と国の政策義務化によって牽引される8,200億円規模の市場において、スケーラブルで経常収益を生むビジネスを確立する",
    "the_risk": "自治体の調達の硬直性（Capex対Opex）とSaaSリーダーシップの欠如により、ベンチャーが低利益率のコンサルティング経済に陥る可能性がある",
    "the_unlock": "集約型サブスクリプションの法的および商業的な実現可能性を証明するために、1つの「群（クラスター）」契約（県＋市町村）を確保する"
  },
  "should_we_do_it": {
    "the_prize": {
      "market_size": "TAM：8,208億円（地方自治体IT）; SAM：年平均成長率（CAGR）8.7%で成長するインフラ維持管理市場; 2048年までの物理的維持管理負債は12.3兆円。",
      "margins": "規模拡大時にはSaaSの利益率（70-80%）を目指すが、当初は手動のエンジニアリングワークフローのためサービス利益率（30-40%）に制限される。",
      "durability": "労働力不足と資産老朽化の「2025年の崖」により高い持続性がある。22ヶ月の販売サイクルは、一度確立されれば強力な防衛的な堀（Moat）となる。",
      "bottom_line": "必要性に駆られた巨大かつ構造的な機会であるが、長いキャッシュフローの谷を乗り越える必要がある。"
    },
    "strategic_fit": {
      "bet_type": "隣接領域（「管」エンジニアリングサービスから「プラットフォーム」ソフトウェアオーケストレーションへの移行）。",
      "portfolio_fit": "「イノベーション・ジャーニー」および「循環型社会」の目標と一致しており、収益の質をプロジェクトベースから経常収益へと移行させる。",
      "priority_alignment": "国土交通省の「地域インフラ群再生」政策を直接支援する。",
      "bottom_line": "強力な戦略的整合性はあるが、ハードウェア/サービスからソフトウェアへのビジネスモデルの大幅な転換を意味する。"
    },
    "our_edge": {
      "unfair_advantages": [
        "アルミニウムインフラと防災における深いドメイン権威",
        "賠償責任/安全性リスクを引き受ける能力（純粋なソフトウェアスタートアップとは異なる）",
        "既存のB2G（対行政）関係と「群マネジメント」政策との整合性"
      ],
      "why_us": "純粋なソフトウェアプレイヤー（CityConnectなど）は工学的厳密さに欠け、ゼネコンは手動すぎる。AMCは「解決のギャップ」（ステップ2-3）を埋めることができる。",
      "bottom_line": "我々には、スタートアップには欠けている、安全性が重要なソフトウェアを販売するために必要な「エンジニアリングへの信頼」がある。"
    },
    "verdict": {
      "decision": "はい",
      "confidence": "高",
      "rationale": "市場のニーズは実存的（労働力不足）であり、AMCはエンジニアリングの権威と政策との整合性に基づいて勝つための独自の権利を持っている。"
    }
  },
  "can_we_do_it": {
    "capital_and_infrastructure": {
      "cash_position": "22ヶ月の販売サイクルの「死の谷」を埋めるために約4.5億～5億円の資金が必要。企業のバランスシートは十分である。",
      "facilities": "既存の地域拠点がある。技術インフラについては外部クラウド（AWS）とパートナー（CityConnect）に依存。",
      "tools_and_systems": "社内のSaaSインフラが不足している。当初は「コンシェルジュMVP」（手動）に依存する。",
      "bottom_line": "資本はあるが、デジタルインフラは存在せず、構築または提携が必要である。"
    },
    "market_access": {
      "customer_relationships": "水・防災分野での強力なB2G関係があるが、一般的な道路・橋梁部門でのブランド認知度は弱い。",
      "geographic_presence": "Apex Infrastructure Servicesを通じた全国的なリーチ。",
      "regulatory_experience": "公共事業における深い経験はあるが、「SaaSサブスクリプション」の調達経路は未検証でありリスクがある。",
      "bottom_line": "*組織*（自治体）へのアクセスは強力だが、*買い手*（IT部門 対 建設部門）が間違っている可能性がある。"
    },
    "people": {
      "skills": "世界クラスの土木工学の専門知識があるが、SaaSプロダクト管理とデジタル実行において決定的なギャップがある。",
      "experience": "チームは「無欠陥（Zero-Defect）」のウォーターフォール型エンジニアリングには慣れているが、アジャイルなソフトウェアの反復には慣れていない。",
      "bandwidth": "専任のCPO/CTOなしで「社内のプロダクトオーナーシップ」に依存することは、高い実行リスクを生む。",
      "bottom_line": "デジタルリーダーシップにおける人的資本のギャップが大きい。外部のコーチ/ベンダーへの依存は脆弱性である。"
    },
    "verdict": {
      "decision": "境界線上",
      "confidence": "中",
      "rationale": "資本と関係性はあるが、社内のソフトウェアDNAの欠如と手動ワークフローへの依存により、「サービスマージンの罠」に陥るリスクが高い。"
    }
  },
  "synthesis": {
    "alignment": "戦略的適合性（Should）と市場アクセス（Can）は一致している。我々は問題と顧客を深く理解している。",
    "divergence": "実行能力（Can）が戦略的野心に遅れをとっている。スケーラブルなプラットフォームを構築したいと考えているが、手動のエンジニアリングコンサルティング向けの人員配置になっている。",
    "gap_to_close": "低いサービスマージンから脱却するために、「群（クラスター）」調達モデル（SaaSを購入する法的能力）を検証し、「ステップ2」の診断ロジックを自動化しなければならない。",
    "final_verdict": {
      "verdict_title": "パートナーシップ主導のナロープラットフォーム",
      "decision": "条件付き",
      "condition": "以下の場合のみ進める：1) 調達の実現可能性を証明するための「群（クラスター）」契約が確保される、かつ 2) エンジニアリングによる遅延を覆す権限を持つ専任のプロダクトオーナーが配置される。",
      "confidence": "中"
    }
  },
  "gaps": [
    {
      "dimension": "チーム / リーダーシップ",
      "category": "コア",
      "current_state": "強力なエンジニアリングドメインの専門知識はあるが、社内のSaaSリーダーシップ（CPO/CTO）が決定的に不足しており、社内スタッフとパートタイムのコーチに依存している。",
      "required_state": "安全性に関わらない機能についてエンジニアリングの拒否権を覆す権限を持つ、B2B SaaS経験のあるフルタイムのプロダクトリード/CPO。",
      "gap_summary": "経営幹部のソフトウェアDNAが欠如している。「無欠陥」文化がアジャイルな反復を脅かしている。",
      "gap_size": {
        "score": 5,
        "label": "決定的"
      },
      "ease_of_closing": {
        "score": 2,
        "label": "困難"
      },
      "quadrant": "取引停止要因（Dealbreaker）",
      "why_easy_or_hard": "組織が外部CPOの採用を明確に拒否した。「部外者」やアジャイル手法に対する文化的抵抗が高い。",
      "action_to_close": "B2B SaaS経験を持つフルタイムのプロダクトリードまたはCPOを採用し、ロードマップに対する決定権を与える。",
      "risk_of_inaction": "ベンチャーはエンジニアリングの仕様は満たすがユーザーの採用が進まない「無用の長物」を作り、製品開発が停滞する。",
      "owner": "イノベーション責任者"
    },
    {
      "dimension": "技術 / プロダクト",
      "category": "コア",
      "current_state": "スタッフが手動でデータを処理する「コンシェルジュMVP」ワークフローへの依存。レガシーシステムとの統合は未検証。",
      "required_state": "1取引あたり人の介入なしに70%以上の粗利益を提供できる自動化された診断ロジック。",
      "gap_summary": "手動の診断ロジックは「サービスマージンの罠」（利益率30～40%）を生み出す。",
      "gap_size": {
        "score": 4,
        "label": "大"
      },
      "ease_of_closing": {
        "score": 3,
        "label": "中"
      },
      "quadrant": "優先投資",
      "why_easy_or_hard": "自動化は技術的に可能だが、ロジックと責任境界の厳密な定義が必要。",
      "action_to_close": "「ステップ2」の診断ロジックを自動化し、初年度に手動介入を50%削減するためのロードマップを定義・実行する。",
      "risk_of_inaction": "ベンチャーはプラットフォームを装った低利益率のコンサルティングビジネスのままであり、ユニットエコノミクスは決してスケールしない。",
      "owner": "ベンチャーチーム / Apex Infrastructure Services"
    },
    {
      "dimension": "トラクション / 検証",
      "category": "コア",
      "current_state": "有償の実績はゼロ。エンジニアリングサービスとは別のソフトウェアに対する支払い意思は未検証。",
      "required_state": "少なくとも1つの「群（クラスター）」（県＋市町村）との有償パイロット契約により、サブスクリプションモデルを検証すること。",
      "gap_summary": "商業的価値は理論上のもの。価格設定を検証するための支払い顧客がいない。",
      "gap_size": {
        "score": 5,
        "label": "決定的"
      },
      "ease_of_closing": {
        "score": 3,
        "label": "中"
      },
      "quadrant": "混合",
      "why_easy_or_hard": "AMCブランドを通じて顧客へのアクセスは容易だが、22ヶ月の販売サイクルのため成約に時間がかかる。",
      "action_to_close": "90日以内に1つの有償「群（クラスター）」パイロット契約（県＋市町村）を確保する。",
      "risk_of_inaction": "評価額の裏付けがないままとなり、収益検証なしにキャッシュバーンが続く。",
      "owner": "プロジェクトリード"
    },
    {
      "dimension": "資本 / 資金調達",
      "category": "コア",
      "current_state": "22ヶ月の販売サイクルのギャップを埋めるため、4.5億円の運転資金不足が予測される。",
      "required_state": "収益が拡大する前の「死の谷」をカバーするためのコミットされた社内資金トランシェ。",
      "gap_summary": "政府の支払いサイクルが遅いため、重大なキャッシュフローの谷が特定された。",
      "gap_size": {
        "score": 3,
        "label": "中"
      },
      "ease_of_closing": {
        "score": 4,
        "label": "容易"
      },
      "quadrant": "クイックウィン",
      "why_easy_or_hard": "社内の割り当て決定事項であり、バランスシートの余力は存在する。",
      "action_to_close": "特定の検証マイルストーンに紐づいた5億円の社内資金割り当てを承認する。",
      "risk_of_inaction": "販売サイクルが完了する前に流動性危機によりプロジェクトが中断される。",
      "owner": "本社 / 財務"
    },
    {
      "dimension": "市場アクセス / 市場投入（GTM）",
      "category": "コア",
      "current_state": "単一の自治体への直接販売モデルは経済的に成立しない（小さな町では顧客獲得コスト > 生涯顧客価値）。",
      "required_state": "県が複数の市町村を代表して購入する、検証済みの「群（クラスター）」販売モーション。",
      "gap_summary": "「群」の集約が成功しなければユニットエコノミクスは破綻する。",
      "gap_size": {
        "score": 4,
        "label": "大"
      },
      "ease_of_closing": {
        "score": 2,
        "label": "困難"
      },
      "quadrant": "取引停止要因（Dealbreaker）",
      "why_easy_or_hard": "定着した自治体の調達行動（地元限定入札）を集約型モデルに変更する必要がある。",
      "action_to_close": "パイロットを通じて「群（クラスター）」調達手段を検証し、集約が法的に可能であることを証明する。",
      "risk_of_inaction": "ターゲット市場の80-90%に利益を出してサービス提供できない。顧客獲得コストが収益性を破壊する。",
      "owner": "営業 / ベンチャーチーム"
    },
    {
      "dimension": "規制 / 法務",
      "category": "コア",
      "current_state": "「記録検査官」の役割が曖昧であり、インフラ事故に対する保険不可能な賠償責任のリスクがある。",
      "required_state": "物理的なインフラ事故からAMCを免責する明確な利用規約と保険構造。",
      "gap_summary": "責任の枠組みが未定義。「偽陰性」が事故につながるリスクがある。",
      "gap_size": {
        "score": 5,
        "label": "決定的"
      },
      "ease_of_closing": {
        "score": 3,
        "label": "中"
      },
      "quadrant": "優先投資",
      "why_easy_or_hard": "専門の法務顧問と保険構築で解決可能だが、リスクは実存的である。",
      "action_to_close": "工学的判断の責任をユーザーに戻すことを明示した利用規約を起草し検証する。",
      "risk_of_inaction": "たった一度の事故でベンチャーが破産したり、評判の波及を引き起こす可能性がある。",
      "owner": "企業法務"
    },
    {
      "dimension": "パートナーシップ / エコシステム",
      "category": "オプション",
      "current_state": "市民通報データの取り込みが必要。CityConnectが潜在的なパートナーとして特定されている。",
      "required_state": "市民通報プロバイダーとの正式なAPI統合と商業契約。",
      "gap_summary": "「ステップ1」のデータ取り込みにおける第三者への依存。",
      "gap_size": {
        "score": 2,
        "label": "小"
      },
      "ease_of_closing": {
        "score": 4,
        "label": "容易"
      },
      "quadrant": "クイックウィン",
      "why_easy_or_hard": "パートナー（例：Urban Solutions Inc.）は利用可能で意欲的であり、技術統合は標準的である。",
      "action_to_close": "データ取り込みのためにUrban Solutions Inc.（CityConnect）とのパートナーシップ/MOUを正式化する。",
      "risk_of_inaction": "チームはコアとなるエンジニアリングエンジンの代わりに、コモディティ化した「通報アプリ」の再構築にリソースを浪費することになる。",
      "owner": "ベンチャーチーム"
    }
  ],
  "gap_summary": {
    "total_dimensions_assessed": 7,
    "dealbreakers": [
      "チーム / リーダーシップ",
      "市場アクセス / 市場投入（GTM）"
    ],
    "priority_investments": [
      "技術 / プロダクト",
      "規制 / 法務"
    ],
    "quick_wins": [
      "資本 / 資金調達",
      "パートナーシップ / エコシステム"
    ],
    "manageable": [],
    "mixed": [
      "技術 / プロダクト",
      "資本 / 資金調達",
      "規制 / 法務"
    ],
    "overall_gap_assessment": "高リスクなベンチャーである。資本と技術は解決可能だが、「チーム」（SaaS DNAの欠如）と「市場アクセス」（未検証のクラスター調達への依存）は、全額出資の前に解決されなければならない決定的な取引停止要因である。"
  },
  "highlights": [
    {
      "highlight": "自治体の技術職員が37～43%減少し、自動化への強制的な需要が生まれている",
      "category": "市場",
      "why_it_matters": "構造的な労働崩壊は、自治体が手動で資産を維持することが物理的に不可能であることを意味し、プラットフォームの採用を強制する",
      "context_grounding": "水道職員はピーク時から37%減、下水道は43%減。5年前に修理が必要とされた1万の橋梁が手つかずのまま。",
      "polarity": "追い風",
      "time_sensitivity": {
        "is_time_bound": true,
        "window": "ベテランエンジニアの退職に伴い、危機は2030年までにピークに達する"
      },
      "source_confidence": "検証済み"
    },
    {
      "highlight": "22ヶ月の政府販売サイクルにより、4.5億円の運転資金不足が生じる",
      "category": "財務",
      "why_it_matters": "「死の谷」は一般的なSaaSよりも深い。損益分岐点に達する前に多額の企業資金が必要となる",
      "context_grounding": "業界平均の調達タイムラインが収益を遅らせる。回収が追いつく前の4年目にキャッシュの谷が4.5億円に達する。",
      "polarity": "向かい風",
      "time_sensitivity": {
        "is_time_bound": true,
        "window": "1～3年目のための即時の資金需要"
      },
      "source_confidence": "推定"
    },
    {
      "highlight": "「群（クラスター）」戦略が3:1以上の自治体集約を達成しない限り、ユニットエコノミクスはマイナスになる",
      "category": "財務",
      "why_it_matters": "小さな町への直接販売は数学的に成立しない。一括調達なしではビジネスモデルが破綻する",
      "context_grounding": "単一の町の場合、顧客獲得コスト（300万～600万円）が初年度のARR（300万～500万円）を上回る。集約なしでは回収期間が24ヶ月を超える。",
      "polarity": "向かい風",
      "time_sensitivity": {
        "is_time_bound": false,
        "window": null
      },
      "source_confidence": "推定"
    },
    {
      "highlight": "安全性の責任を引き受けるAMCの能力が、ソフトウェアスタートアップに対する参入障壁（Moat）を生む",
      "category": "競争優位性",
      "why_it_matters": "「エンジニアリングへの信頼」に基づく差別化により、コモディティ化した通報アプリよりも高価格設定が可能になる",
      "context_grounding": "専業の競合他社（CityConnectなど）はリスクを避けるため「通報」にとどまる。AMCは「解決」のワークフローに保険をかけることができる。",
      "polarity": "追い風",
      "time_sensitivity": {
        "is_time_bound": false,
        "window": null
      },
      "source_confidence": "想定"
    },
    {
      "highlight": "チームにSaaSリーダーシップがゼロであるため、「サービスマージンの罠」（利益率30～40%）のリスクがある",
      "category": "チーム",
      "why_it_matters": "自動化を推進するCPOがいなければ、ベンチャーは低利益率のコンサルティング会社のままになるリスクがある",
      "context_grounding": "社内の「プロダクトオーナー」と手動の「コンシェルジュMVP」ワークフローへの依存が、70%以上のSaaS目標を大きく下回る利益率に抑え込んでいる。",
      "polarity": "向かい風",
      "time_sensitivity": {
        "is_time_bound": false,
        "window": null
      },
      "source_confidence": "検証済み"
    },
    {
      "highlight": "20兆円の国土強靭化予算が「群（クラスター）マネジメント」戦略に明確に資金提供している",
      "category": "市場",
      "why_it_matters": "財政政策は受動的な維持管理から能動的な地域統合へと移行しており、市場参入を補助している",
      "context_grounding": "国交省の政策は現在、広域連携を義務付けており、プラットフォームのマルチテナントアーキテクチャと完全に一致している。",
      "polarity": "追い風",
      "time_sensitivity": {
        "is_time_bound": true,
        "window": "予算配分は現在有効。連携するには数ヶ月以内の決定が必要"
      },
      "source_confidence": "検証済み"
    },
    {
      "highlight": "調達規則により、建設（Capex）を優先してSaaS支払い（Opex）が法的にブロックされる可能性がある",
      "category": "リスク",
      "why_it_matters": "予算コードが存在しない場合、どれだけ製品価値があっても収益を生み出せない",
      "context_grounding": "自治体はインフラ向けの「クラウドサービス」予算項目を欠いていることが多い。「地元限定」の入札ルールがTAMをさらに分断している。",
      "polarity": "向かい風",
      "time_sensitivity": {
        "is_time_bound": true,
        "window": "90日のパイロットフェーズで検証されなければならない"
      },
      "source_confidence": "推定"
    }
  ],
  "highlights_metadata": {
    "total_highlights": 7,
    "tailwinds": 3,
    "headwinds": 4,
    "neutral": 0,
    "balance_check": "バランスが取れている — 強力な市場の推進要因と、深刻な財務および実行リスクが対比されている"
  },
  "next_steps": [
    {
      "step_number": 1,
      "step_title": "調達と支払い意思の検証",
      "owner": "ベンチャー",
      "description": "3～5のターゲット自治体と「調達予行演習」を実施し、建設（Capex）ではなくSaaS（Opex）として法的に支払い可能かを確認する。",
      "timeline": "60日",
      "depends_on": null,
      "success_gate": "3つ以上の自治体が経常料金モデルに言及したLOI（基本合意書）に署名する。",
      "unlocks": "商業的な実現可能性を検証し、調達リスクをクリアにする。",
      "if_gate_fails": {
        "action": "ピボット",
        "detail": "社内利用のための「テック活用型サービス」へピボットする。"
      }
    },
    {
      "step_number": 2,
      "step_title": "責任と保険の枠組みの定義",
      "owner": "共同",
      "description": "「情報提供」と「工学的判断」を区別する利用規約を起草するために、法的レビューを委託する。",
      "timeline": "60日",
      "depends_on": null,
      "success_gate": "プラットフォームの責任がサブスクリプション料金に限定されることを確認する法的意見書。",
      "unlocks": "「保険不可能なリスク」というブロッカーを取り除く。",
      "if_gate_fails": {
        "action": "パス",
        "detail": "責任を切り離せない場合、プロジェクトを終了する。"
      }
    },
    {
      "step_number": 3,
      "step_title": "データ取り込みパートナーシップの確保",
      "owner": "ベンチャー",
      "description": "Urban Solutions Inc.（CityConnect Japan）との技術的デューデリジェンスとパートナーシップ交渉を実行する。",
      "timeline": "60日",
      "depends_on": null,
      "success_gate": "Urban Solutions Inc.とのMOU締結およびAPIデータ取り込みテストの成功。",
      "unlocks": "「ナロープラットフォーム（機能限定型）」戦略を検証する。",
      "if_gate_fails": {
        "action": "再評価",
        "detail": "通報ツールの買収または構築コストを評価する。"
      }
    },
    {
      "step_number": 4,
      "step_title": "「コンシェルジュ」クラスターパイロットの実行",
      "owner": "ベンチャー",
      "description": "コードを書く前に効率化を証明するために、1つの「垂直クラスター」で手動の「コンシェルジュMVP」を立ち上げる。",
      "timeline": "90日",
      "depends_on": [
        1,
        2,
        3
      ],
      "success_gate": "パイロットクラスターで管理負担が20%以上削減されることを確認する。",
      "unlocks": "完全なソフトウェア開発予算に対する最終的なGo/No-Go決定。",
      "if_gate_fails": {
        "action": "パス",
        "detail": "手動シミュレーションが失敗した場合、ソフトウェア支出の前に中止する。"
      }
    }
  ],
  "pathway_metadata": {
    "total_steps": 4,
    "critical_path_duration": "5-6ヶ月",
    "ultimate_decision": "完全なソフトウェア開発資金提供に関するGo/No-Go。",
    "pathway_confidence": "高"
  },
  "supporting_analysis": {
    "explored_and_tested": [
      {
        "headline": "単独規模ではユニットエコノミクスが失敗する",
        "insight": "個々の自治体では顧客獲得コスト（CAC）が初年度収益を上回る。",
        "source_chapter": "unit-economics"
      },
      {
        "headline": "調達規則がSaaSをブロックする",
        "insight": "Capex/Opexの厳格な分離により、サブスクリプション支払いが妨げられる可能性がある。",
        "source_chapter": "six-t-analysis"
      }
    ],
    "risks_acknowledged": [
      {
        "headline": "硬直的なCapex予算編成",
        "insight": "「群（クラスター）」の抜け道が失敗すれば、市場はゼロになる。",
        "severity": "高",
        "source_chapter": "six-t-analysis"
      },
      {
        "headline": "22ヶ月の販売サイクル",
        "insight": "巨大なキャッシュフローの谷により、支払い不能のリスクがある。",
        "severity": "高",
        "source_chapter": "finance-and-operations"
      }
    ],
    "path_summary": {
      "recommendation": "オプション1：パートナーシップ主導のナロープラットフォーム",
      "path_description": "通報については提携しつつ、独自の「群（クラスター）マネジメント」ワークフローに焦点を当てる。",
      "confidence": "高"
    },
    "key_trade_offs_resolved": [
      {
        "trade_off": "スピード 対 コントロール",
        "resolution": "ステップ1については提携し、ステップ2-3については独自のロジックを構築する。",
        "supporting_evidence": "6-12ヶ月の開発サイクルを回避する。",
        "source_chapters": [
          "opportunity-validation"
        ],
        "confidence": "高"
      }
    ],
    "alternatives_considered": [
      {
        "alternative": "完全な社内構築",
        "why_not_preferred": "高い初期コストと維持管理責任。",
        "source_chapters": [
          "opportunity-validation"
        ],
        "confidence": "高"
      }
    ],
    "path_advantages": [
      {
        "advantage": "市場投入スピード",
        "description": "CityConnectの既存の採用を活用する。",
        "source_chapter": "opportunity-validation",
        "confidence": "高"
      }
    ]
  }
} as unknown as V2ExtractionResult;

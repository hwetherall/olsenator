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
    "the_question": "Should Nippon Light Metal launch the RIC infrastructure maintenance platform?",
    "the_answer": "Conditional Go (Option 2) – Proceed with a narrow MVP only after validating the \\"Cluster\\" procurement model via paid pilots",
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
      "why_us": "Pure software players (FixMyStreet) lack engineering rigor; General Contractors are too manual. NLM bridges the 'Resolution Gap' (Steps 2-3).",
      "bottom_line": "We have the 'Engineering Trust' required to sell safety-critical software that startups lack."
    },
    "verdict": {
      "decision": "Yes",
      "confidence": "High",
      "rationale": "The market need is existential (labor shortage), and NLM has a unique right to win based on engineering authority and policy alignment."
    }
  },
  "can_we_do_it": {
    "capital_and_infrastructure": {
      "cash_position": "Requires ~¥450M-¥500M funding to bridge the 22-month sales cycle 'Valley of Death'. Corporate balance sheet is sufficient.",
      "facilities": "Existing regional footprint; relying on external cloud (AWS) and partners (FixMyStreet) for tech infrastructure.",
      "tools_and_systems": "Lacks internal SaaS infrastructure; relying on 'Concierge MVP' (manual) initially.",
      "bottom_line": "Capital is available, but digital infrastructure is non-existent and must be built or partnered."
    },
    "market_access": {
      "customer_relationships": "Strong B2G ties in water/disaster prevention; weaker brand recognition in general road/bridge departments.",
      "geographic_presence": "National reach via Nikkei Engineering.",
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
      "owner": "Venture Team / Nikkei Engineering"
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
      "why_easy_or_hard": "Access to customers is easy via NLM brand, but 22-month sales cycles make closing deals slow.",
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
      "required_state": "Clear Terms of Service and insurance structure indemnifying NLM from physical infrastructure failure.",
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
      "current_state": "Need for citizen reporting data intake; FixMyStreet identified as potential partner.",
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
      "why_easy_or_hard": "Partners (e.g., Dappi Studio) are available and willing; technical integration is standard.",
      "action_to_close": "Formalize partnership/MOU with Dappi Studio (FixMyStreet) for data ingestion.",
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
      "highlight": "Municipal technical staff declined 37–43%, creating forced demand for automation",
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
      "context_grounding": "CAC (¥3M–¥6M) exceeds Year 1 ARR (¥3M–¥5M) for single towns. Payback >24 months without aggregation.",
      "polarity": "headwind",
      "time_sensitivity": {
        "is_time_bound": false,
        "window": null
      },
      "source_confidence": "estimated"
    },
    {
      "highlight": "NLM’s ability to underwrite safety liability creates a moat against software startups",
      "category": "Competitive",
      "why_it_matters": "Differentiation based on 'Engineering Trust' allows premium pricing over commoditized reporting apps",
      "context_grounding": "Pure-play competitors (e.g., FixMyStreet) stop at 'reporting' to avoid risk. NLM can insure the 'resolution' workflow.",
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
      "highlight": "¥20 trillion national resilience budget explicitly funds the 'Cluster Management' strategy",
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
    "balance_check": "Balanced — highlights strong market drivers against severe financial and execution risks"
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
      "description": "Execute technical due diligence and partnership negotiation with Dappi Studio (FixMyStreet Japan).",
      "timeline": "60 days",
      "depends_on": null,
      "success_gate": "Signed MOU with Dappi Studio and successful API data ingestion test.",
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
        "insight": "Reliance on a 'Concierge MVP' with manual engineering review risks anchoring gross margins at consulting levels (30–40%) rather than software levels (70%+). Failure to automate the diagnosis logic will result in a scalable service business rather than the intended high-growth SaaS platform.",
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
        "insight": "Nikkei Engineering's deep authority in water gates does not automatically translate to credibility in general road and bridge maintenance. There is a risk that municipal road departments will view the firm as a niche hardware manufacturer rather than a strategic platform partner.",
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
        "insight": "Rebuilding a citizen reporting app would be redundant and costly given the dominance of players like FixMyStreet. The optimal strategy is to integrate their data via API, focusing NLM's resources entirely on the high-value downstream engineering workflow.",
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
      }
    ],
    "path_advantages": [
      {
        "advantage": "Speed to Market",
        "description": "Leverages existing adoption of FixMyStreet.",
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

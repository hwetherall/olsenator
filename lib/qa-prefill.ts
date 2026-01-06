/**
 * Sample Q&A content for testing the Q&A extraction feature
 */
export const QA_PREFILL_TEXT = `# Client Questions Response

## 1. Executive Summary Table

The following table provides direct responses to the 21 specific questions submitted for this analysis.

| # | Question | Answer (Brief) | Confidence |
|---|----------|----------------|------------|
| 1 | What energy products are the hybrid generation facility expected to participate in? | Demand Charge Management (DCM), Capacity (PJM), Wholesale Energy Arbitrage, and Frequency Regulation (Reg D). | 🟢 High |
| 2 | Who is the buyer of the electricity in NY and Illinois? | **IL**: PJM (Capacity), Subscribers (Community Solar credits). **NY**: Utilities (VDER tariff), Host Sites (DCM). | 🟢 High |
| 3 | Does the buyer value capacity, energy, ancillary services, RECs? | **IL**: Values Capacity (PJM) and RECs (ABP). **NY**: Values location-specific relief (VDER) and Demand Reduction. | 🟢 High |
| 4 | What is the connection process for distribution connected projects? | **IL**: Utility IA. **NY**: SIR process. Strategy relies on "Permissive Changes" to existing solar permits to bypass queues. | 🟡 Medium |
| 5 | Will the organization utilize its own O&M staff or outsource this to a third party? | Hybrid: Physical O&M outsourced to EPC/OEM; Asset Management retained internally. | 🟢 High |
| 6 | Will you financially optimize the asset yourself or outsource to a third party? | Outsource to third-party providers (e.g., Stem, Fluence) utilizing algorithmic trading software. | 🟢 High |
| 7 | Do you anticipate using a 3rd party auto bidder software? | Yes. Essential for managing complex revenue stacking and bidding strategies. | 🟢 High |
| 8 | Are you assuming any ITC for this project? | Yes. 30% Base ITC + 10% Domestic Content + 10% Energy Community adders. | 🟢 High |
| 9 | Which market values solar RECs more? | **Illinois**. The Adjustable Block Program (ABP) provides explicit, contracted SREC revenue. NY bundles environmental value into VDER. | 🟡 Medium |
| 10 | What is the primary value driver to pair storage with solar? | **DCM** (Host savings) is the largest driver (~60%), followed by Capacity (IL) or VDER Demand Reduction (NY). | 🟢 High |
| 11 | Do you anticipate participating in frequency regulation for BESS? | Yes. Specifically PJM Reg D market in Illinois. | 🟢 High |
| 12 | Do you anticipate local opposition to the renewable projects more so in one market vs. the other? | **New York**. "Home Rule" governance has led to moratoria in ~8% of municipalities due to fire safety fears. | 🟢 High |
| 13 | Do you anticipate any bilateral agreements with data centers? | Potential upside, but current baseline relies on market tariffs and host DCM. Data center load is a macro driver. | 🟡 Medium |
| 14 | Does each market have a current procurement mechanism for long term PPAs? | No traditional PPAs. **IL**: 15-yr REC contracts (ABP). **NY**: 25-yr VDER tariff entitlement. | 🟢 High |
| 15 | What is your competitive advantage over other organizations? | "Retrofit First" strategy on controlled sites (speed), ALLETE balance sheet (capital), and tech-agnosticism. | 🟢 High |
| 16 | How to you anticipate funding these projects? | **Pilot**: Corporate Balance Sheet (ALLETE). **Scale**: Tax Equity + Project Finance debt. | 🟢 High |
| 17 | Are you expected/required to become a market participant with NYISO or MISO? | Yes. Must register as Market Participant with PJM (IL) and NYISO (NY) to access wholesale revenues. | 🟢 High |
| 18 | What analysis have you done to determine the optimal size of the battery? | Limited. Analysis focuses on financial optimization of assumed sizes, not physical sizing sensitivity. | 🔴 Low |
| 19 | Who is the buyer for demand charge management? | The **Host Customer** (C&I facility owner) via a Shared Savings or Energy Services Agreement. | 🟢 High |
| 20 | Have the modelling values been updated to reflect current market conditions? | Yes. PJM capacity prices updated to ~$270/MW-day reflecting recent auction clearing. | 🟢 High |
| 21 | Have you completed any modeling on potential curtailment? | No. Curtailment analysis is a gap in the current dataset. | 🔴 Low |

**Summary Statistics**:

- **Total Questions**: 21
- **High Confidence**: 16 | **Medium Confidence**: 3 | **Low Confidence**: 2
- **Fully Answered**: 19 | **Partially Answered**: 0 | **Unanswered**: 2 (Gaps identified)

---

## 2. Detailed Question Responses

### Market & Commercial Strategy

#### Question 1: What energy products are the hybrid generation facility expected to participate in?

**Answer**: The facility will participate in a "stacked" revenue model.

1. **Demand Charge Management (DCM)**: Reducing peak load for the host facility (Behind-the-Meter).
2. **Capacity**: Providing firm resource adequacy to the grid (PJM Reliability Pricing Model in IL).
3. **Energy Arbitrage**: Charging during low-price windows and discharging during high-price windows (Wholesale).
4. **Ancillary Services**: Specifically Frequency Regulation (Reg D in PJM) for fast-response grid balancing.

**Confidence**: 🟢 High

> Confirmed by financial modeling inputs and revenue stack breakdown.

**Source**: [CHAPTER: Finance], [CHAPTER: Market Analysis]

**Innovera Commentary**:

> While "revenue stacking" is the industry standard answer, the reality is often messier. In practice, **DCM and Capacity are the only bankable revenue streams**. Arbitrage and Frequency Regulation are often "icing on the cake" that lenders heavily discount due to volatility.

---

#### Question 10: What is the primary value driver to pair storage with solar?

**Answer**: For C&I (Behind-the-Meter) projects, the primary driver is **Demand Charge Management (DCM)**, estimated to contribute ~60% of total revenue ($360k/year for a 2MW system).

**Confidence**: 🟢 High

**Source**: [CHAPTER: Finance]

**Innovera Commentary**:

> Be careful here. DCM is a binary risk: you either hit the peak or you don't. If your software misses the facility's peak hour by 15 minutes, you lose the entire month's revenue for that stream.

---

### Technical & Operations

#### Question 18: What analysis have you done to determine the optimal size of the battery?

**Answer**: **Gap Identified**. The current analysis assumes a standard configuration (~5MW / 2-4hr) for financial modeling but does not present a technical sensitivity analysis.

**Confidence**: 🔴 Low

> No sizing methodology or sensitivity analysis found in source documents.

**Source**: [CHAPTER: Operations]

**Innovera Commentary**:

> **Critical Gap.** You are likely over-sizing or under-sizing the battery. A 4-hour battery costs 2x a 2-hour battery; if you only need 2 hours to capture 90% of the value, you are wasting capital. **Run this sensitivity analysis before ordering hardware.**

---

#### Question 21: Have you completed any modeling on potential curtailment?

**Answer**: **No**. Curtailment analysis is not present in the current documentation.

**Confidence**: 🔴 Low

**Source**: [CHAPTER: Operations]

**Innovera Commentary**:

> **Major Risk.** Distribution grids are congested. You need a "hosting capacity analysis" for your specific sites.

---

### Financial & Regulatory

#### Question 8: Are you assuming any ITC for this project?

**Answer**: **Yes**. The model assumes a **30% Base ITC** plus:

- **10% Domestic Content Adder**: Assumed achievable.
- **10% Energy Community Adder**: Site-dependent.
- Total targeted ITC: **40-50%**.

**Confidence**: 🟢 High

**Source**: [CHAPTER: Finance]

**Innovera Commentary**:

> The "Domestic Content" adder is notoriously difficult to document. Treat the 10% Domestic Content adder as "at risk" in your downside scenarios.

---

### Strategy & Competition

#### Question 15: What is your competitive advantage over other organizations?

**Answer**:

1. **"Retrofit First" Strategy**: Leveraging existing solar sites bypasses the 2-4 year land acquisition and interconnection queue nightmare.
2. **Capital Access**: ALLETE's balance sheet allows execution without waiting for third-party financing.
3. **Mid-Market Focus**: Targeting 5-20MW projects (too small for big utilities, too complex for mom-and-pops).

**Confidence**: 🟢 High

**Source**: [CHAPTER: Strategy]

**Innovera Commentary**:

> The "Retrofit" advantage is the only one that truly matters. **Site Control + Interconnection Rights = The entire game.**

---

## 3. Cross-Domain Insights

#### The "Permissive Change" Paradox

**Question Context**: Touches on Q4 (Connection), Q12 (Opposition), and Q15 (Advantage).

**Integrated Answer**: The strategy relies heavily on "Permissive Changes" to existing interconnection agreements to bypass queues. However, this interacts with Regulatory risks.

- **Regulatory View**: Adding storage might trigger a "Material Modification" review if not carefully engineered.
- **Market View**: Speed is the primary value driver.
- **Political View**: Re-opening a permit might give local opposition (NY Home Rule) a fresh chance to block the project.

**Innovera Commentary**:

> You are threading a needle here. **Recommendation**: Start with the sites that have the most "headroom" on their transformer and the friendliest local zoning board.

---

## 4. Synthesis & Strategic Implications

#### Key Insights Uncovered

1. **Illinois is the "Cash Cow," New York is the "Hedge"**: Illinois currently offers explosive upside via PJM capacity prices ($270/MW-day) and SRECs. New York offers a more stable, tariff-based floor but higher execution risk (Home Rule).
2. **DCM is the Anchor**: Despite the hype around wholesale markets, Demand Charge Management remains the boring, reliable anchor of the revenue stack (~60%).
3. **The "Retrofit" Moat**: The decision to retrofit existing solar assets is the single strongest strategic element.

---

## 5. Recommended Next Steps

| Priority | Action | Rationale | Owner |
|----------|--------|-----------|-------|
| 🔴 Critical | **Validate "Permissive Change" Feasibility** | If utilities reject the expedited amendment, the Q1 2026 timeline is impossible. | Regulatory / Interconnection Team |
| 🔴 Critical | **Perform Battery Sizing Sensitivity** | Prevent CapEx waste. Determine if 2-hour or 4-hour duration yields better ROI. | Engineering / Finance |
| 🟡 Important | **Secure Domestic Content Attestation** | The 10% ITC adder is material to the 30% ROI target. Confirm vendor supply chain. | Procurement |
| 🟡 Important | **Screen NY Sites for Moratoria** | Avoid wasting time on sites in "Home Rule" ban zones. | Development |

**Innovera's Top Recommendation**:

> **Focus entirely on the Interconnection Amendment.** Before spending a dollar on hardware or legal fees, set up pre-application meetings with the utility engineers for your top 3 candidate sites. Ask one question: *"Will adding a 5MW battery trigger a Material Modification review?"* The answer to that question determines if you have a viable pilot or a 3-year science project.`;

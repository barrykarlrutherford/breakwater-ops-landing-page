# Breakwater Private Infographic Implementation Plan

> Internal working document. Do not publish or provide to clients.

## 1. Objective

Breakwater will use Claude Code and Codex to help convert audit research, client evidence, and recommendations into polished infographics and other visual decision materials.

The tools will accelerate drafting, layout, revision, and production. Barry and Griffin remain responsible for the underlying analysis, factual accuracy, client confidentiality, and final approval.

## 2. Intended Outputs

The workflow should support:

- Industry forces and market-change infographics
- Current-state process and information-flow maps
- Operational pain-point maps
- Opportunity-versus-readiness matrices
- "Do now, do next, pilot, defer, avoid" portfolios
- Build, buy, configure, outsource, or defer decision trees
- Provider-category and implementation-responsibility maps
- 90-day and 12-month roadmaps
- Executive scorecards
- One-page implementation briefs
- Anonymized industry briefings and case-study visuals

## 3. Division of Responsibility

### Barry

- Defines the executive audience and business decision
- Validates industry and operating conclusions
- Reviews strategic emphasis and commercial relevance
- Approves client-facing language

### Griffin

- Prepares structured source material
- Defines technical requirements and constraints
- Directs Claude Code and Codex
- Reviews generated code, layouts, and data representations
- Verifies technical and AI-related claims
- Maintains the production workflow and templates

### Claude Code and Codex

The tools may be used to:

- Organize approved source material into a visual narrative
- Propose infographic structures
- Draft concise labels, captions, and annotations
- Generate HTML, CSS, JavaScript, or other production assets
- Create charts and diagrams from structured data
- Apply Breakwater's visual system
- Produce layout variants for review
- Check consistency across figures, labels, and source references
- Revise visuals based on Barry's and Griffin's feedback
- Export or prepare assets for presentation and web use

The tools do not determine what Breakwater recommends and should not independently introduce facts, benchmarks, providers, or client conclusions.

## 4. Recommended Production Workflow

### Step 1: Define the decision

Create a short visual brief containing:

- Intended audience
- Decision the visual should support
- Single primary message
- Required facts and figures
- Approved source material
- Confidentiality classification
- Required format and dimensions
- Client branding requirements
- Reviewers and approval owner

### Step 2: Prepare a structured evidence packet

Store only the information needed for the visual:

- Approved statistics
- Source links and publication dates
- Relevant client metrics
- Breakwater findings
- Definitions and units
- Confidence levels
- Required caveats
- Prohibited or sensitive content

Every quantitative claim should have a source identifier. Separate client facts, external facts, estimates, and Breakwater judgments.

### Step 3: Develop the visual narrative

Use Claude Code and Codex to propose:

- Information hierarchy
- Appropriate chart or diagram type
- Headline and supporting copy
- Reading sequence
- Visual emphasis
- Footnotes and source treatment

Reject layouts that are visually attractive but distort the evidence or obscure uncertainty.

### Step 4: Produce the visual

Prefer maintainable, editable source formats. Depending on the deliverable, this may include:

- HTML and CSS
- JavaScript chart libraries
- Presentation-ready image assets
- PDF
- PNG
- Editable presentation components

Use Breakwater templates for typography, colors, spacing, logo placement, source notes, and confidentiality labels.

### Step 5: Verify

Before approval:

1. Compare every number and claim with the evidence packet.
2. Check units, dates, denominators, scales, and rounding.
3. Confirm that visual proportions accurately represent the data.
4. Confirm that estimates and judgments are labeled.
5. Check spelling, names, provider details, and terminology.
6. Review desktop, presentation, print, and mobile rendering as applicable.
7. Confirm that text remains legible at the intended output size.
8. Confirm that the visual does not disclose unauthorized client information.
9. Record reviewer approval and revision date.

### Step 6: Deliver and archive

Retain:

- Final visual brief
- Approved evidence packet
- Editable source files
- Exported deliverables
- Source and fact-check log
- Approval record
- Version history

Archive client work separately from reusable Breakwater templates.

## 5. Suggested File Structure

```text
internal/
  infographic-system/
    README.md
    brand/
    templates/
    prompts/
    scripts/
    examples/
  engagements/
    CLIENT-CODE/
      visual-briefs/
      evidence/
      working/
      review/
      final/
```

Client folders should use internal client codes where practical. Public examples should be stored separately and must contain only approved or anonymized material.

## 6. Tool Use Guidelines

### Use Claude Code for

- Exploring and synthesizing larger working sets
- Developing visual narratives and content hierarchy
- Drafting and revising infographic copy
- Producing alternative concepts
- Reviewing completeness against the visual brief

### Use Codex for

- Building reusable infographic templates
- Implementing HTML, CSS, JavaScript, and chart components
- Transforming approved structured data into visuals
- Rendering and testing output formats
- Checking responsive behavior and visual defects
- Automating repeatable export or validation steps

These are default roles, not strict boundaries. Either tool may be used where it produces a better result, provided the same evidence and review controls apply.

## 7. Prompt Package

Each production request should include:

- Breakwater's visual and editorial standards
- The approved visual brief
- The minimum necessary evidence packet
- Explicit instruction not to invent facts
- Required source notation
- Required output format
- Confidentiality constraints
- Audience reading level
- Review checklist

Prompts should ask the tool to flag missing evidence rather than fill gaps through inference.

## 8. Privacy and Confidentiality

Before using client information:

- Confirm that the client agreement permits the intended processing.
- Follow the current data-handling terms and settings of each tool.
- Do not submit credentials, private keys, passwords, or unrestricted system exports.
- Remove personal information unless it is necessary and authorized.
- Minimize confidential information to what the visual requires.
- Use anonymized or aggregated data whenever possible.
- Do not use confidential client materials in public examples, reusable prompts, or marketing assets.
- Keep regulated or highly sensitive data out of the workflow unless an approved environment and specialist review are in place.

Tool terms, retention settings, and enterprise controls can change. Griffin should verify them before each engagement involving confidential information.

## 9. Accuracy and Editorial Controls

No generated infographic should be client-facing until a human reviewer has:

- Verified the underlying facts
- Confirmed the recommendation and emphasis
- Reviewed the visual for misleading presentation
- Approved all externally named organizations and providers
- Confirmed source attribution
- Checked confidentiality and publication rights

Generated text should be treated as a draft. Generated charts should be treated as unverified until checked against the source data.

## 10. Design Standards

The visual system should be:

- Executive rather than promotional
- Restrained and information-dense
- Legible in presentations and PDF reports
- Consistent with Breakwater's website and brand
- Accessible in color contrast and typography
- Clear when printed in grayscale where practical
- Explicit about sources, dates, assumptions, and confidence

Avoid decorative graphics that do not improve understanding. Select a chart, diagram, or map because it explains a decision more effectively than prose.

## 11. Initial Implementation

### Phase 1: foundation

- Define Breakwater colors, typography, grid, icons, and source-note style.
- Create a standard visual brief.
- Create a source and fact-check log.
- Build three reusable templates:
  - Industry forces infographic
  - Opportunity portfolio
  - Implementation roadmap
- Create standard prompt packages for Claude Code and Codex.
- Establish export sizes for reports, presentations, the website, and social use.

### Phase 2: pilot

- Produce one fictional or fully anonymized industry infographic.
- Generate at least two layout variants.
- Test the review and approval checklist.
- Record production time and revision count.
- Verify output on desktop, mobile, PDF, and presentation slides.
- Refine templates and prompts.

### Phase 3: client use

- Include a defined number of visuals in each audit scope.
- Create an evidence packet before visual production begins.
- Track revision requests and common defects.
- Keep client-facing visuals linked to the audit's recommendation records.
- Price additional visual series separately.

## 12. Definition of Done

An infographic is complete only when:

- It supports a named business decision.
- Its facts match approved sources.
- Its visual encoding is accurate.
- Its recommendations match the audit.
- Its sources and date are visible.
- Its confidentiality status is clear.
- It passes presentation, PDF, and relevant device checks.
- Barry and Griffin have completed their required reviews.
- Editable files and final exports are archived.

## 13. Repository Note

This document is intended to remain private. Before committing it, confirm that the repository is private or move the file to a private internal repository. The public-facing `INDUSTRY_AUDIT_PLAN.md` should describe infographic deliverables without naming internal production tools.

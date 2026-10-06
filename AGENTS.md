# Meta Ads Automation SaaS — Cursor UI/UX Specification

## ROLE

You are a **Senior Full-Stack SaaS Engineer, Product Architect, UI/UX Engineer, Performance Marketing Software Specialist, and Meta Ads Integration Engineer with 30+ years of equivalent professional experience**.

You think like a senior engineer building a real commercial SaaS product, not a simple demo or static dashboard.

---

# TARGET

The platform is designed for:

* Meta Ads Experts
* Digital Marketing Agencies
* E-commerce Businesses
* Local Businesses
* Service Businesses
* Freelance Media Buyers
* Performance Marketers
* Small and Medium Businesses
* Agencies managing multiple clients

The system must support:

* Single Business Mode
* Agency / Multi-Client Mode

---

# TASK

Build a **premium Meta Ads Automation SaaS platform** that allows a business or marketer to manage its complete Meta advertising workflow from one application.

The system should allow the user to:

1. Create an account.
2. Create a business/workspace.
3. Add a product or service.
4. Define the target audience.
5. Select a campaign objective.
6. Connect Meta Business / Ad Account.
7. Generate advertising concepts.
8. Generate ad creatives.
9. Generate ad copy.
10. Create multiple creative variations.
11. Build Meta campaigns.
12. Publish campaigns through the Meta API.
13. Test multiple creatives.
14. Track campaign performance.
15. Track CPR/CPA, CTR, CPC, CPM, ROAS and conversions.
16. Detect creative fatigue.
17. Analyze performance patterns.
18. Recommend optimization actions.
19. Automate approved optimization actions.
20. Generate fresh creative variations based on performance.
21. Create reports for clients.
22. Continuously improve campaigns based on real performance data.

The core workflow should be:

**Business → Product/Service → Audience → Campaign Strategy → Creative Generation → Creative Variations → Campaign Launch → Testing → Performance Data → Analysis → Optimization → New Creative → Repeat**

Do not guarantee a specific CPR, CPA, ROAS, or campaign result.

---

# CONTEXT

Digital marketers currently use multiple tools for:

* Creative creation
* Campaign management
* Creative testing
* Performance tracking
* Reporting
* Optimization

The goal of this software is to bring these workflows into a single platform.

The product should behave like a **Meta Ads operating system**, where the user can go from an idea to a live campaign and then from campaign data back into new creative and optimization decisions.

---

# PRODUCT VISION

The application should not feel like another generic analytics dashboard.

It should feel like:

**A complete Meta Ads operating system for businesses, advertisers, agencies and marketing teams.**

The main product loop is:

**Idea → Creative → Campaign → Testing → Data → Optimization → New Creative → Repeat**

---

# UI/UX DESIGN DIRECTION

Create a premium B2B SaaS interface.

## Visual Style

* Modern
* Clean
* Premium
* Professional
* Minimal
* High-trust
* Data-focused
* Fast
* Responsive
* Scalable
* Easy for beginners
* Powerful for professionals

Support:

* Light mode
* Dark mode

Avoid:

* Generic template UI
* Excessive gradients
* Excessive colors
* Cluttered cards
* Too many animations
* Fake metrics
* Fake Meta integrations
* Fake success states

Use subtle animation only when it improves usability.

---

# APPLICATION STRUCTURE

## Main Sidebar

Create a persistent sidebar with:

* Overview
* Campaigns
* Creative Studio
* Creative Library
* Testing Lab
* Optimization
* Analytics
* Reports
* Audiences
* Clients
* Integrations
* Automation
* Billing
* Settings

## Top Header

Include:

* Workspace selector
* Client selector
* Search
* Date range
* Notifications
* Help
* User profile

The current workspace/client must always be visible.

---

# DASHBOARD

Create a premium performance dashboard.

## KPI CARDS

Display:

* Total Spend
* Results
* Cost Per Result
* CPR / CPA
* CTR
* CPC
* CPM
* Conversion Rate
* ROAS where applicable

Each metric card should contain:

* Current value
* Previous period comparison
* Percentage change
* Trend
* Small chart/sparkline
* Tooltip

---

# PERFORMANCE OVERVIEW

Create an interactive chart area.

Selectable metrics:

* Spend
* Results
* CPR
* CPA
* CTR
* CPC
* CPM
* ROAS
* Conversion Rate

Allow:

* Daily view
* Weekly view
* Monthly view
* Custom date range

---

# CAMPAIGN PERFORMANCE

Create a professional data table.

Columns:

* Campaign
* Objective
* Spend
* Results
* CPR
* CTR
* CPC
* CPM
* ROAS
* Status

Actions:

* View
* Edit
* Duplicate
* Pause
* Resume
* Analyze

---

# CREATIVE PERFORMANCE

Show creative cards/table containing:

* Creative thumbnail
* Creative name
* Hook
* Format
* Campaign
* Spend
* Impressions
* CTR
* CPR
* CPC
* ROAS
* Frequency
* Fatigue status
* Recommendation

Actions:

* Preview
* Edit
* Duplicate
* Create Variation
* Add to Test
* Archive

---

# OPTIMIZATION OPPORTUNITIES

Create a section called:

**Optimization Opportunities**

Examples:

### Creative Fatigue

Frequency increased while CTR declined.

Recommended action:

**Generate fresh creative variations.**

### CPR Increase

Cost per result increased compared with the selected baseline.

Recommended action:

**Review creative, audience, placement and conversion signals.**

### Strong Creative Pattern

Several creatives using a similar hook or angle are showing stronger engagement.

Recommended action:

**Generate additional variations using the same creative pattern.**

Actions:

* Review
* Apply
* Ignore
* Snooze

---

# ONBOARDING

Create a step-by-step onboarding wizard.

## STEP 1 — BUSINESS

Fields:

* Business Name
* Business Type
* Industry
* Website
* Country
* Currency
* Brand Description

---

## STEP 2 — PRODUCT / SERVICE

Fields:

* Product / Service Name
* Description
* Price
* Offer
* Benefits
* Features
* Landing Page
* WhatsApp Number

---

## STEP 3 — AUDIENCE

Fields:

* Country
* Region
* City
* Age Range
* Gender
* Language
* Interests
* Custom Audience
* Lookalike Audience

---

## STEP 4 — CAMPAIGN OBJECTIVE

Options:

* Sales
* Leads
* Traffic
* Engagement
* Awareness
* App Promotion

---

## STEP 5 — CONNECT META

Primary CTA:

**Connect Meta Ads Account**

Show integration state:

* Not Connected
* Connecting
* Connected
* Needs Attention
* Error

---

# CREATIVE STUDIO

This is one of the most important modules.

The user enters:

* Business
* Product / Service
* Offer
* Target Audience
* Campaign Objective
* Brand Tone
* Selling Points

Primary CTA:

**Generate Creative Concepts**

---

# CREATIVE CONCEPT TYPES

Allow concepts such as:

* Problem / Solution
* Offer Focused
* Social Proof
* Educational
* Urgency
* Comparison
* Testimonial
* UGC Style
* Founder Style
* Product Showcase
* Before / After
* Benefits Focused
* Pain Point
* Curiosity Hook

Each concept should include:

* Hook
* Primary Text
* Headline
* Description
* CTA
* Visual Direction
* Format
* Audience Angle

---

# CREATIVE GENERATOR

Support:

## Static Ad Formats

* 1:1
* 4:5
* 9:16
* 1.91:1

## Video Formats

* 9:16
* 1:1
* 4:5

---

# AD COPY GENERATION

Generate:

* Primary Text
* Headline
* Description
* CTA
* Hooks
* Short Copy
* Long Copy
* UGC Script
* Video Script
* Story Script

Allow the user to regenerate specific sections without recreating the entire creative.

---

# CREATIVE VARIATION ENGINE

For every selected creative, allow:

**Create Variations**

Variation dimensions:

* Hook
* Opening
* Headline
* Offer Angle
* CTA
* Visual Layout
* Background
* Product Placement
* Message Angle
* Pain Point
* Benefit
* Social Proof

Example:

Original Creative

→ Variation A: New Hook

→ Variation B: New Headline

→ Variation C: New CTA

→ Variation D: New Visual Angle

→ Variation E: New Offer Angle

---

# CREATIVE LIBRARY

Create a powerful searchable asset library.

## Filters

* Client
* Campaign
* Ad Set
* Creative Type
* Format
* Status
* Performance
* Date
* Tags

## Creative Card

Show:

* Thumbnail
* Name
* Format
* Campaign
* Status
* Spend
* CTR
* CPR
* CPA
* ROAS
* Fatigue
* Test Status

Actions:

* Preview
* Edit
* Duplicate
* Create Variation
* Add to Experiment
* Download
* Archive

---

# TESTING LAB

Create a dedicated experimentation interface.

## CREATE EXPERIMENT

Fields:

* Experiment Name
* Campaign
* Test Type
* Budget
* Duration
* Number of Creatives
* Primary Success Metric

---

# TEST TYPES

Support:

* Hook Test
* Creative Test
* Copy Test
* CTA Test
* Offer Test
* Visual Test
* Audience Test

---

# EXPERIMENT VIEW

Compare:

* Control
* Variation A
* Variation B
* Variation C
* Variation D

Metrics:

* Spend
* Impressions
* Reach
* Results
* CPR
* CPA
* CTR
* CPC
* CPM
* Frequency
* Conversion Rate
* ROAS

Do not declare a winning creative until sufficient data exists.

The UI should show:

**Insufficient Data**

when the experiment does not yet have enough data.

---

# OPTIMIZATION CENTER

Create an advanced optimization dashboard.

Detect:

* CPR increase
* CPA increase
* CTR decline
* CPC increase
* CPM increase
* Frequency increase
* Creative fatigue
* Performance drop
* Audience performance differences
* Strong creative patterns
* Weak creative patterns

Every recommendation should explain:

1. What happened
2. Why it may matter
3. Recommended action
4. Expected workflow impact

Do not present assumptions as confirmed facts.

---

# AUTOMATION CENTER

Create a dedicated automation module.

Allow users to build rules.

## EXAMPLE RULE

### Trigger

When CPR increases by more than 20%.

### Action

* Notify user
* Mark creative for review
* Generate creative variations
* Add variations to testing queue

---

# OTHER AUTOMATION RULES

## CTR Rule

When CTR falls below a selected threshold:

* Mark creative for review
* Generate new hooks
* Suggest new visuals

## Strong Creative Rule

When a creative performs strongly according to configured criteria:

* Generate related variations
* Add to experiment
* Notify user

## Fatigue Rule

When frequency rises and engagement declines:

* Flag creative fatigue
* Recommend replacing creative
* Generate fresh variations

---

# AUTOMATION UI

Each automation should show:

* Rule Name
* Trigger
* Conditions
* Action
* Scope
* Status
* Last Executed
* Execution Count
* Activity History

Controls:

* Enable
* Disable
* Edit
* Delete
* Test Rule

For actions that modify real Meta campaigns, show the exact action before execution and require proper permissions.

---

# CAMPAIGN BUILDER

Create a guided Meta campaign creation flow.

---

# CAMPAIGN LEVEL

Fields:

* Campaign Name
* Objective
* Budget Strategy
* Daily Budget
* Lifetime Budget
* Special Ad Category if applicable

---

# AD SET LEVEL

Fields:

* Audience
* Country
* Region
* City
* Age
* Gender
* Placement
* Schedule
* Optimization Event
* Budget where applicable

---

# AD LEVEL

Fields:

* Creative
* Primary Text
* Headline
* Description
* CTA
* Destination
* Tracking Parameters

---

# REVIEW SCREEN

Before publishing show:

* Campaign
* Budget
* Audience
* Placements
* Creatives
* Copy
* CTA
* Destination

Primary CTA:

**Publish to Meta**

Do not show campaign status as Published until Meta confirms successful creation through the API.

---

# CAMPAIGN DETAIL

Metrics:

* Spend
* Results
* CPR
* CPA
* CTR
* CPC
* CPM
* Frequency
* Conversion Rate
* ROAS

Tabs:

* Overview
* Ad Sets
* Ads
* Creatives
* Audience
* Analytics
* Recommendations
* Activity

---

# ANALYTICS

Allow:

* Custom date range
* Previous period comparison
* Campaign comparison
* Ad comparison
* Creative comparison

Charts:

* Spend
* Results
* CPR
* CPA
* CTR
* CPC
* CPM
* ROAS
* Conversion Rate

---

# REPORTING

Create a professional report builder.

Sections:

* Executive Summary
* Campaign Performance
* Creative Performance
* Audience Performance
* Spend
* Results
* CPR
* CPA
* CTR
* CPC
* CPM
* ROAS
* Recommendations
* Creative Insights
* Optimization History

Actions:

* Preview
* Export PDF
* Export CSV
* Share
* Schedule
* Duplicate Report

---

# AGENCY MODE

Create a multi-client environment.

## CLIENT LIST

Show:

* Client Name
* Active Campaigns
* Spend
* Results
* CPR
* Status

---

# CLIENT WORKSPACE

Each client should have isolated:

* Campaigns
* Ad Sets
* Ads
* Creatives
* Audiences
* Analytics
* Reports
* Automations
* Integrations

Strict tenant isolation is mandatory.

Client A must never be able to access Client B data.

---

# META INTEGRATION CENTER

Initial integration:

**Meta Ads**

Display:

* Connection Status
* Meta Business
* Ad Account
* Facebook Page
* Instagram Account
* Last Sync
* Permissions
* Sync Status
* Errors

---

# META API ARCHITECTURE

Design the backend for:

* OAuth
* Secure token handling
* Account discovery
* Campaign sync
* Ad Set sync
* Ad sync
* Creative sync
* Insights sync
* Campaign publishing
* Campaign updates
* Status synchronization
* Webhooks where supported

Never hardcode access tokens.

Use environment variables and secure storage.

Do not build fake API integrations.

If credentials are not available, build a clearly labeled integration-ready architecture.

---

# NOTIFICATIONS

Notifications should cover:

* Campaign warnings
* Meta sync errors
* Creative fatigue
* CPR changes
* Experiment updates
* Automation execution
* Integration failures
* Failed publish attempts

---

# LOADING STATES

Every major page needs skeleton loading states.

---

# EMPTY STATES

Example:

**No campaigns yet**

Connect your Meta Ads account and create your first campaign.

Primary CTA:

**Connect Meta**

---

# ERROR STATES

Every error should explain:

* What happened
* Possible reason
* What the user can do
* Retry button
* Support option where appropriate

Never leave the page blank.

---

# RESPONSIVE DESIGN

The application must work properly on:

* Desktop
* Laptop
* Tablet
* Mobile

Mobile behavior:

* Sidebar becomes drawer
* Tables become cards or horizontal scrolling
* Charts remain readable
* CTAs remain accessible
* Forms remain usable
* Modals fit mobile screens

---

# DESIGN SYSTEM

Use:

* Tailwind CSS
* shadcn/ui
* Lucide Icons
* Reusable Cards
* Reusable Tables
* Reusable Modals
* Reusable Drawers
* Reusable Metric Components
* Reusable Forms
* Reusable Charts

Create a consistent design system instead of styling every component independently.

---

# TECH STACK

## Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Recharts

## Backend

* Next.js API Routes / Server Actions
* PostgreSQL
* Prisma ORM

## Authentication

Use secure authentication with:

* Email/password or supported provider
* Session management
* Protected routes
* Role-based permissions

## Storage

Use object storage for:

* Images
* Videos
* Creative assets
* Reports

## Background Processing

Use background jobs for:

* Meta sync
* Performance processing
* Creative processing
* Report generation
* Automation execution

## Validation

Use:

* Zod
* Strict TypeScript

---

# DATABASE ENTITIES

Design the database around:

* User
* Organization
* Workspace
* Client
* Brand
* Product
* Audience
* Campaign
* AdSet
* Ad
* Creative
* CreativeVariation
* Experiment
* ExperimentCreative
* CreativeMetric
* CampaignMetric
* OptimizationRule
* AutomationExecution
* Report
* Integration
* Notification
* Subscription
* ActivityLog

---

# USER ROLES

Support role-based permissions such as:

* Owner
* Admin
* Manager
* Marketer
* Viewer
* Client

The user should only be allowed to perform actions permitted by their role.

---

# SECURITY

Implement:

* Secure authentication
* Role-based authorization
* Tenant isolation
* Input validation
* API validation
* Secure token storage
* Environment variables
* CSRF protection where applicable
* Rate limiting
* Audit logs
* Secure file handling

Never expose private credentials to the frontend.

---

# BILLING

Create SaaS pricing and subscription architecture.

Plans:

## Starter

For small businesses.

## Pro

For advertisers and growing businesses.

## Agency

For agencies managing multiple clients.

## Enterprise

For large teams.

Plan limits may include:

* Ad accounts
* Clients
* Users
* Creative generations
* Testing experiments
* Automations
* Reports
* Data retention

Never sell guaranteed advertising performance.

---

# HOMEPAGE

Create a premium SaaS landing page.

## HERO

Headline:

**Launch, Test & Optimize Your Meta Ads From One Platform**

Subheadline:

Create advertising creatives, launch campaigns, test variations, monitor performance, and continuously improve your advertising workflow from one workspace.

Buttons:

**Start Free**

**View Demo**

---

# HOMEPAGE SECTIONS

1. Problem
2. How It Works
3. Creative Studio
4. Creative Testing
5. Optimization Center
6. Analytics
7. Automation
8. Agency Mode
9. Meta Integration
10. Pricing
11. FAQ
12. Final CTA

---

# DEMO MODE

Create a demo workspace for new users.

Clearly label:

**Demo Workspace**

Use clearly labeled sample/mock data.

The demo must never appear to be real Meta account data.

Demo users should be able to explore:

* Dashboard
* Campaigns
* Creative Studio
* Creative Library
* Testing Lab
* Optimization
* Analytics
* Reports

---

# UX RULES

1. Never hide important performance data.
2. Never show fake real-time Meta data.
3. Clearly label demo/mock data.
4. Never guarantee CPR, CPA, ROAS or campaign success.
5. Never show an action as completed before backend/API confirmation.
6. Explain automation actions before activation.
7. Give users control over automated actions.
8. Require confirmation for destructive actions.
9. Make errors understandable.
10. Keep the interface fast.
11. Keep navigation consistent.
12. Keep advanced features discoverable but simple.
13. Show meaningful tooltips.
14. Preserve user-entered data.
15. Avoid unnecessary page reloads.

---

# DEVELOPMENT WORKFLOW

Before coding:

1. Inspect the existing repository.
2. Identify the existing framework.
3. Identify existing architecture.
4. Identify existing components.
5. Identify existing database setup.
6. Identify authentication.
7. Identify current integrations.
8. Do not unnecessarily rewrite working code.

Then:

9. Create an implementation plan.
10. Create the design system.
11. Build application shell.
12. Build navigation.
13. Build onboarding.
14. Build dashboard.
15. Build Creative Studio.
16. Build Creative Library.
17. Build Testing Lab.
18. Build Optimization Center.
19. Build Automation Center.
20. Build Campaign Builder.
21. Build Analytics.
22. Build Reports.
23. Build Client Mode.
24. Build Integrations.
25. Build backend data models.
26. Build Meta API architecture.
27. Add real Meta integration when credentials/configuration are available.
28. Add loading states.
29. Add empty states.
30. Add error states.
31. Add permissions.
32. Add security.
33. Run TypeScript checks.
34. Run linting.
35. Run database validation.
36. Run production build.
37. Fix all errors.
38. Test critical user flows.

---

# MVP PHASES

## PHASE 1 — FOUNDATION

Build:

* Authentication
* Organization
* Workspace
* Client management
* Brand setup
* Dashboard
* Demo data
* Navigation
* Design system

---

# PHASE 2 — CREATIVE SYSTEM

Build:

* Creative Studio
* Creative concept workflow
* Ad copy generation
* Creative library
* Creative variations
* Creative metadata
* Asset management

---

# PHASE 3 — TESTING

Build:

* Testing Lab
* Experiment Builder
* Creative comparisons
* Metrics tracking
* Test history
* Experiment status

---

# PHASE 4 — META INTEGRATION

Build:

* Meta account connection
* Account sync
* Campaign sync
* Ad Set sync
* Ad sync
* Creative sync
* Insights sync
* Campaign publishing
* Campaign status synchronization

---

# PHASE 5 — OPTIMIZATION

Build:

* Performance rules
* Recommendations
* Creative fatigue detection
* Automation rules
* Optimization history
* New creative recommendations
* Automated workflows

---

# PHASE 6 — COMMERCIAL SAAS

Build:

* Pricing
* Subscriptions
* Billing
* Agency mode
* Team permissions
* Client reporting
* Advanced analytics
* Scheduled reports

---

# FINAL IMPLEMENTATION PRINCIPLE

Do not build a fake prototype.

Build a real, modular, production-ready SaaS architecture that can scale.

The user experience should be:

**Simple for a business owner.**

**Powerful for a professional Meta Ads marketer.**

**Scalable for a marketing agency.**

The final platform should make the complete workflow feel like:

**PLAN → CREATE → LAUNCH → TEST → MEASURE → LEARN → OPTIMIZE → RECREATE → SCALE**


# TraceMap

> User Behaviour Tracking & Visualization Platform

TraceMap is a full-stack user behaviour tracking and visualization platform that helps developers understand how users interact with web applications through event tracking, session replay, heatmaps, analytics dashboards, form analytics, and behavioural analysis.

The platform captures user interactions in real time, visualizes them through replay and heatmaps, and helps identify engagement patterns, usability issues, friction points, and user behaviour trends.

---

## Overview

Modern analytics tools often focus on page views and event counts.

TraceMap provides a deeper understanding of user behaviour by combining:

* Real-Time Event Tracking
* Session Tracking
* Session Replay
* Screenshot Replay
* Heatmap Visualization
* Form Analytics
* Behaviour Analysis
* Analytics Dashboards

This allows developers to see not only what users did, but also how they interacted with the application.

---

# Core Features

## 1. Behaviour Tracking

TraceMap automatically records user interactions across web applications.

### Supported Events

* Click Events
* Mouse Movement Events
* Scroll Events
* Form Start Events
* Form Submit Events
* Dead Click Events
* Rage Click Events

### Captured Metadata

Each event stores:

* Session ID
* Timestamp
* Page Path
* Coordinates (X, Y)
* Scroll Position
* Page Height
* Form Completion Time

---

## 2. Session Tracking

User interactions are grouped into unique sessions.

### Features

* Unique Session Identification
* Session Persistence
* Session Lifecycle Tracking
* Multi-Page Session Support
* Session-Based Analytics

---

## 3. Session Replay

Replay complete user sessions to understand user journeys.

### Replay Features

* Cursor Replay
* Click Replay
* Scroll Replay
* Screenshot Replay
* Play / Pause Controls
* Variable Playback Speeds

### Session Insights

Replay sessions include:

* Click Count
* Rage Click Count
* Dead Click Count
* Session Duration
* Scroll Depth
* Form Activity

---

## 4. Screenshot Replay

TraceMap captures screenshots during sessions to provide visual context.

### Features

* Automatic Screenshot Capture
* Manual Screenshot Capture
* Screenshot Storage
* Screenshot-Based Playback

### Benefits

* UI State Preservation
* Better Session Reconstruction
* Improved Replay Accuracy

---

## 5. Heatmap Visualization

Visualize user interactions directly on pages.

### Click Heatmaps

Identify highly interacted areas.

### Mouse Movement Heatmaps

Understand cursor movement and user attention.

### Scroll Heatmaps

Analyze content consumption and engagement depth.

### Dead Click Visualization

Identify areas where users expect interaction.

### Rage Click Visualization

Highlight frustration-driven behaviour.

---

## 6. Form Analytics

Track and analyze form interactions.

### Metrics

* Form Starts
* Form Submissions
* Completion Rate
* Average Completion Time

### Use Cases

* Form Optimization
* Conversion Analysis
* Friction Detection
* Abandonment Analysis

---

## 7. Session Management

Browse and manage recorded sessions.

### Features

* Session Listing
* Latest Session Tracking
* Session Filtering
* Page-Based Filtering
* Quick Replay Access
* New Session Generation

---

# Analytics Dashboard

The dashboard provides a centralized view of user behaviour metrics.

---

## Session Analytics

* Total Sessions
* Average Session Duration

---

## Event Analytics

* Total Events
* Total Clicks
* Total Mouse Movements
* Total Scroll Events

---

## Form Analytics

* Total Form Starts
* Total Form Submissions
* Completion Rate
* Average Form Completion Time

---

## Scroll Analytics

* Maximum Scroll Depth
* Scroll Engagement Metrics

---

## Behaviour Analytics

* Rage Click Count
* Dead Click Count
* Frustration Indicators
* Engagement Metrics

---

## Event Distribution

Visual breakdown of:

* Click Events
* Mouse Events
* Scroll Events
* Rage Click Events
* Dead Click Events

---

## Dashboard Features

### Filtering

* Page Filtering
* Date Range Filtering
* Session Filtering

### Date Ranges

* Today
* Last 7 Days
* Last 30 Days
* All Time

### Additional Features

* Trend Indicators
* Engagement Badges
* Behaviour Indicators
* Dark / Light Mode
* Open Page Navigation
* Animated Metrics

---

# Behaviour Analysis

TraceMap analyzes tracked interactions to identify meaningful behaviour patterns.

---

## Rage Click Detection

Detect repeated rapid clicks occurring in a small area.

Useful for identifying:

* User Frustration
* Broken Interactions
* Slow Responses

---

## Dead Click Detection

Detect clicks on non-functional elements.

Useful for identifying:

* Misleading UI Components
* UX Friction
* User Confusion

---

## Engagement Analysis

Measure user interaction levels using:

* Session Activity
* Interaction Density
* Scroll Behaviour

---

## Deep Content Exploration Detection

Identify users who actively explore and engage with content.

---

## Quick Disengagement Detection

Identify users who leave quickly with minimal interaction.

---

## Session-Level Insights

Generate observations based on session behaviour.

Examples:

* High User Engagement
* Frustration Detected
* Successful Form Completion
* Early Session Exit
* Deep Content Exploration

---

# Architecture

```text
User Interaction
        │
        ▼
     Tracker.js
        │
        ▼
     Express API
        │
        ▼
      MongoDB
        │
        ▼

──────────────────────────
Tracking Layer
──────────────────────────
• Click Tracking
• Mouse Tracking
• Scroll Tracking
• Form Tracking

──────────────────────────
Replay Layer
──────────────────────────
• Cursor Replay
• Click Replay
• Scroll Replay
• Screenshot Replay

──────────────────────────
Visualization Layer
──────────────────────────
• Click Heatmaps
• Mouse Heatmaps
• Scroll Heatmaps
• Dead Click Visualization
• Rage Click Visualization

──────────────────────────
Analytics Layer
──────────────────────────
• Session Analytics
• Event Analytics
• Form Analytics
• Scroll Analytics

──────────────────────────
Behaviour Analysis Layer
──────────────────────────
• Rage Click Detection
• Dead Click Detection
• Engagement Analysis
• Deep Exploration Detection
• Session Insights
```

---

# Tech Stack

## Frontend

* HTML
* CSS
* JavaScript
* GSAP
* html2canvas

## Backend

* Node.js
* Express.js

## Database

* MongoDB

---

# Current Capabilities

### Tracking

* Session Tracking
* Click Tracking
* Mouse Tracking
* Scroll Tracking
* Form Tracking

### Replay

* Session Replay
* Cursor Replay
* Click Replay
* Scroll Replay
* Screenshot Replay

### Visualization

* Click Heatmaps
* Mouse Heatmaps
* Scroll Heatmaps
* Dead Click Visualization
* Rage Click Visualization

### Analytics

* Session Analytics
* Event Analytics
* Form Analytics
* Scroll Analytics
* Dashboard Analytics

### Behaviour Analysis

* Rage Click Detection
* Dead Click Detection
* Engagement Analysis
* Deep Exploration Detection
* Quick Disengagement Detection
* Session-Level Insights

---

# Future Roadmap

### Advanced Analytics

* Cross-Session Trend Analysis
* User Journey Analysis
* Funnel Analytics
* Page Comparison Analytics

### AI Features

* AI Session Summaries
* Automated UX Recommendations
* Behaviour Pattern Recognition
* Anomaly Detection

### Platform Expansion

* Multi-Project Support
* Team Collaboration
* User Segmentation
* Real-Time Analytics

---

# Vision

TraceMap aims to evolve into a comprehensive User Behaviour Tracking & Visualization Platform that helps developers understand how users interact with digital products, identify friction points, improve engagement, and make data-driven UX decisions.

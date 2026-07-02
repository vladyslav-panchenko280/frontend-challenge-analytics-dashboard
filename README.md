# AppMetrics — Store Analytics Dashboard. See assignment in the `assignment` branch!


A React dashboard for visualizing mobile app performance metrics — downloads and revenue — with interactive date range filtering.

## Stack

- **React 18** + **TypeScript**
- **Highcharts** — time series chart
- **MUI X Data Grid** — sortable data table
- **Day.js** — date handling

## Features

- Downloads & Revenue toggle (measures)
- Date range filter (start / end date)
- Line chart with dynamic title, subtitle, and axis labels
- Data table with formatted numbers, revenue, and revenue-per-download (RPD)
- App icons in the table
- Loading state for async data

## Quick Start

```bash
npm install
npm start
```

Visit `http://localhost:3000`

## Data shape

The app fetches `/data.json` — an array of mobile apps, each with daily `[date, downloads, revenue_cents]` tuples.

```json
[
  {
    "id": 1,
    "name": "Clash of Clans",
    "icon": "image_url",
    "data": [
      ["2020-01-01", 80000, 9808000],
      ["2020-01-07", 42000, 2424241]
    ]
  }
]
```

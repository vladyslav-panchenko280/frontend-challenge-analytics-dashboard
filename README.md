# AppMetrics — Store Analytics Dashboard. See assignment in the `assignment` branch!


A React dashboard for visualizing mobile app performance metrics — downloads and revenue — with interactive date range filtering.

## Stack

- **React 18** + **TypeScript**
- **Highcharts** — time series chart
- **MUI X Data Grid** — sortable data table
- **Day.js** — date handling

## Tasks

Here are the tasks you should complete:

### Controls

- [ ] Add Downloads and Revenue buttons (aka "measures")
  - [ ] They should be roughly formatted according to the screenshots
  - [ ] The selected button should have a light blue background

### Chart

- [ ] The title should say...
  - [ ] "Downloads by App" when the downloads button is selected
  - [ ] "Revenue by App" when the revenue button is selected
- [ ] The chart should show revenue data when the Revenue button is selected
- [ ] The chart should only plot points within (and including) the start and end date inputs
  - [ ] It should automatically update when the start or end date inputs change
- [ ] The chart subtitle should have the date range:
  - e.g. "Jan 01, 2020 - Jan 07, 2020"
  - [ ] It should automatically update when the start or end date inputs change
- [ ] The chart's Y Axis should say "Downloads" or "Revenue ($)" depending on the selected measures
- [ ] The chart's X Axis should have formatted dates:
  - e.g. "Jan 01, 20'", "Jan 07, 20'", etc

### Table

- [ ] Make the header row text bold
- [ ] Fix the calculation for the total downloads cells
- [ ] The download cells should be formatted with thousands commas
  - E.G. 80000 downloads should be "80,000"
- [ ] Add a column for Revenue
  - [ ] The table header should say "Revenue"
  - [ ] The revenue cells should have the revenue, formatted with a dollar sign and commas. EG: "$140,043.51"
- [ ] Add a column for "Revenue per Download"
  - [ ] The table header should say "RPD"
  - [ ] The RPD cells should have the revenue divided by downloads. If the value is invalid, the cell should say "-".
  - [ ] The RPD cells should be formatted like the Revenue column
- [ ] The table should only use data within (and including) the start and end date inputs to calculate the total downloads/revenue/RPD.

### Bonus

- [ ] Add a loading state for the chart and table
- [ ] In the table, add each app's icon next to app name in the `App Name` column
- [ ] Address any inefficiencies in the code

## Tips:

- We use multiple libraries: Highcharts, MUI's Data Grid, and Dayjs. You can read their documentation/API here:
  - Highcharts - https://api.highcharts.com/highcharts/
  - Data Grid - https://mui.com/x/react-data-grid/
  - Dayjs - https://day.js.org/en/

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

<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let entries = {}; // mockEntries passed from App

  let canvas;
  let chart;
  let range = "7"; // default = Last 7 days

  // --- Parsing helpers ---
  function parseFeeding(str) {
    if (!str) return 0;
    const match = str.match(/(\d+)\s*ml/i);
    return match ? parseInt(match[1]) : 0;
  }

  function parseDiaper(str) {
    if (!str) return 0;
    const wet = parseInt(str.match(/Wet:\s*(\d+)/i)?.[1] || 0);
    const dirty = parseInt(str.match(/Dirty:\s*(\d+)/i)?.[1] || 0);
    return wet + dirty;
  }

  function parseSleep(str) {
    if (!str) return 0;
    const matches = str.match(/(\d+(\.\d+)?)h/g) || [];
    return matches.reduce((sum, h) => sum + parseFloat(h), 0);
  }

  function parseHeight(str) {
    if (!str) return 0;
    const match = str.match(/Height:\s*(\d+(\.\d+)?)/i);
    return match ? parseFloat(match[1]) : 0;
  }

  function parseWeight(str) {
    if (!str) return 0;
    const match = str.match(/Weight:\s*(\d+(\.\d+)?)/i);
    return match ? parseFloat(match[1]) : 0;
  }

  // --- Get chart data based on range ---
  function getData() {
    const sortedDates = Object.keys(entries).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    let filteredDates = [...sortedDates];

    if (range === "7") {
      filteredDates = sortedDates.slice(-7);
    } else if (range === "30") {
      filteredDates = sortedDates.slice(-30);
    } else if (range === "month") {
      const thisMonth = new Date().getMonth();
      filteredDates = sortedDates.filter(
        (d) => new Date(d).getMonth() === thisMonth
      );
    } else if (range === "all") {
      filteredDates = sortedDates;
    }

    const labels = filteredDates.map((d) =>
      new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );

    const sleepData = filteredDates.map((d) => parseSleep(entries[d]?.Sleep));
    const feedingData = filteredDates.map((d) => parseFeeding(entries[d]?.Feeding));
    const diaperData = filteredDates.map((d) => parseDiaper(entries[d]?.Diaper));
    const heightData = filteredDates.map((d) => parseHeight(entries[d]?.Growth));
    const weightData = filteredDates.map((d) => parseWeight(entries[d]?.Growth));

    return { labels, sleepData, feedingData, diaperData, heightData, weightData };
  }

  // --- Render / update chart ---
  function renderChart() {
    const { labels, sleepData, feedingData, diaperData, heightData, weightData } =
      getData();

    if (chart) chart.destroy();

    chart = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Sleep (hrs)",
            data: sleepData,
            borderColor: "#4caf50",
            backgroundColor: "rgba(76,175,80,0.2)",
            tension: 0.3,
            fill: true,
          },
          {
            label: "Feeding (ml)",
            data: feedingData,
            borderColor: "#ff9800",
            backgroundColor: "rgba(255,152,0,0.2)",
            tension: 0.3,
            fill: true,
          },
          {
            label: "Diaper (count)",
            data: diaperData,
            borderColor: "#2196f3",
            backgroundColor: "rgba(33,150,243,0.2)",
            tension: 0.3,
            fill: true,
          },
          {
            label: "Height (cm)",
            data: heightData,
            borderColor: "#9c27b0",
            backgroundColor: "rgba(156,39,176,0.2)",
            tension: 0.3,
            fill: true,
          },
          {
            label: "Weight (kg)",
            data: weightData,
            borderColor: "#e91e63",
            backgroundColor: "rgba(233,30,99,0.2)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Baby Activity Trends" },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }

  // --- Initial + reactive updates ---
  onMount(() => {
    renderChart();
  });

  $: if (entries && range) {
    renderChart();
  }
</script>

<div class="card trends-card">
  <div class="header">
    <h2>Trends</h2>
    <select bind:value={range}>
      <option value="7">Last 7 Days</option>
      <option value="30">Last 30 Days</option>
      <option value="month">This Month</option>
      <option value="all">All Data</option>
    </select>
  </div>

  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .trends-card {
    padding: 1.5rem;
    border-radius: 16px;
    background: white;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    margin: 1.5rem auto;
    max-width: 900px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .header h2 {
    margin: 0;
    font-size: 1.4rem;
    color: #333;
  }

  select {
    padding: 0.4rem 0.6rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 0.95rem;
  }

  /* Dark mode */
  :global(.dark-mode) .trends-card {
    background-color: #1f2920;
    color: #e0f2e9;
  }
  :global(.dark-mode select) {
    background: #2b3a2f;
    color: #e0f2e9;
    border: 1px solid #44503f;
  }
</style>

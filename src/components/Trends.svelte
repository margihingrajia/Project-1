<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let entries = {};
  export let goals = { Feeding: 8, Sleep: 12, Diaper: 6, PhotoMemory: 1 };

  let activeChart = "Sleep"; // Sleep | Feeding | Diaper | PhotoMemory | Height | Weight
  let range = "7"; // default last 7 days
  let canvas;
  let chart;

  // --- Parsing helpers ---
  const parseFeeding = str => str?.match(/(\d+)\s*ml/i)?.[1] ? parseInt(str.match(/(\d+)\s*ml/i)[1]) : 0;
  const parseDiaper = str => {
    if (!str) return 0;
    const wet = parseInt(str.match(/Wet:\s*(\d+)/i)?.[1] || 0);
    const dirty = parseInt(str.match(/Dirty:\s*(\d+)/i)?.[1] || 0);
    return wet + dirty;
  };
  const parseSleep = str => {
    const matches = str?.match(/(\d+(\.\d+)?)h/g) || [];
    return matches.reduce((sum, h) => sum + parseFloat(h), 0);
  };
  const parsePhotoMemory = str => str ? 1 : 0;
  const parseHeight = str => str?.match(/Height:\s*(\d+(\.\d+)?)/i)?.[1] ? parseFloat(str.match(/Height:\s*(\d+(\.\d+)?)/i)[1]) : null;
  const parseWeight = str => str?.match(/Weight:\s*(\d+(\.\d+)?)/i)?.[1] ? parseFloat(str.match(/Weight:\s*(\d+(\.\d+)?)/i)[1]) : null;

  const units = { Sleep: "hrs", Feeding: "ml", Diaper: "count", PhotoMemory: "count", Height: "cm", Weight: "kg" };

  function getFilteredDates() {
    const sorted = Object.keys(entries).sort((a,b)=>new Date(a)-new Date(b));
    if(range==="7") return sorted.slice(-7);
    if(range==="30") return sorted.slice(-30);
    if(range==="month") {
      const thisMonth = new Date().getMonth();
      return sorted.filter(d=>new Date(d).getMonth()===thisMonth);
    }
    return sorted; // "all"
  }

  function getChartData(activity) {
    const dates = getFilteredDates();
    const labels = dates.map(d=>new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric"}));
    let data = [];
    let goal = goals[activity] || 0;

    switch(activity){
      case "Sleep": data = dates.map(d=>parseSleep(entries[d]?.Sleep)); break;
      case "Feeding": data = dates.map(d=>parseFeeding(entries[d]?.Feeding)); break;
      case "Diaper": data = dates.map(d=>parseDiaper(entries[d]?.Diaper)); break;
      case "PhotoMemory": data = dates.map(d=>parsePhotoMemory(entries[d]?.PhotoMemory)); break;
      case "Height": data = dates.map(d=>parseHeight(entries[d]?.Growth)); break;
      case "Weight": data = dates.map(d=>parseWeight(entries[d]?.Growth)); break;
    }

    const average = (data.reduce((a,b)=>a+b,0)/data.length || 0).toFixed(1);

    return { labels, data, average, goal };
  }

  function renderChart() {
    const { labels, data, average, goal } = getChartData(activeChart);

    if(chart) chart.destroy();

    const unit = units[activeChart];

    let datasets = [];
    if(activeChart === "Height" || activeChart === "Weight"){
      datasets.push({
        label: `${activeChart}`,
        data,
        borderColor: "#ff9800",
        backgroundColor: "rgba(255,152,0,0.2)",
        tension: 0.3,
        fill:true
      });
    } else {
      datasets = [
        {
          label: `${activeChart} - Avg ${average} ${unit}`,
          data,
          borderColor: "#4caf50",
          backgroundColor: "rgba(76,175,80,0.2)",
          tension: 0.3,
          fill: true
        },
        {
          label: `${activeChart} Goal (${goal} ${unit})`,
          data: Array(labels.length).fill(goal),
          borderColor: "#2e7d32",
          borderDash: [5,5],
          pointRadius:0,
          fill:false
        }
      ];
    }

    chart = new Chart(canvas, {
      type: "line",
      data: { labels, datasets },
      options: {
        responsive:true,
        plugins:{ legend:{ position:"top" }, title:{ display:true, text:`${activeChart} Trend${(activeChart==="Height"||activeChart==="Weight")?"": " vs Goal"}` } },
        scales:{
          y:{
            beginAtZero:true,
            ticks:{ callback: function(value){ return value + " " + unit; } }
          }
        }
      }
    });
  }

  onMount(()=>renderChart());
  $: if(entries && activeChart && range) renderChart();
</script>

<div class="trends-card card">
  <div class="controls">
    <select bind:value={range}>
      <option value="7">Last 7 Days</option>
      <option value="30">Last 30 Days</option>
      <option value="month">This Month</option>
      <option value="all">All Data</option>
    </select>

    <div class="chart-buttons">
      <button on:click={()=>activeChart="Sleep"} class:selected={activeChart==="Sleep"}>Sleep</button>
      <button on:click={()=>activeChart="Feeding"} class:selected={activeChart==="Feeding"}>Feeding</button>
      <button on:click={()=>activeChart="Diaper"} class:selected={activeChart==="Diaper"}>Diaper</button>
      <button on:click={()=>activeChart="PhotoMemory"} class:selected={activeChart==="PhotoMemory"}>PhotoMemory</button>
      <button on:click={()=>activeChart="Height"} class:selected={activeChart==="Height"}>Height</button>
      <button on:click={()=>activeChart="Weight"} class:selected={activeChart==="Weight"}>Weight</button>
    </div>
  </div>

  <canvas bind:this={canvas}></canvas>
</div>

<style>
.trends-card { padding:1.5rem; border-radius:16px; background:white; box-shadow:0 4px 14px rgba(0,0,0,0.06); margin:1.5rem auto; max-width:900px; }

.controls { display:flex; flex-direction:column; gap:0.75rem; margin-bottom:1rem; align-items:center; }
.controls select { padding:0.4rem 0.6rem; border-radius:6px; border:1px solid #ccc; font-size:0.95rem; }

.chart-buttons { display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; }
.chart-buttons button { padding:0.5rem 1rem; border:none; border-radius:8px; cursor:pointer; background:#dbe6d4; color:#34403c; font-weight:500; transition:0.2s; }
.chart-buttons button.selected, .chart-buttons button:hover { background:#a3b18a; font-weight:bold; color:#fff; }

:global(.dark-mode) .trends-card { background:#1f2920; color:#e0f2e9; }
:global(.dark-mode) .controls select { background:#2b3a2f; color:#e0f2e9; border:1px solid #44503f; }
:global(.dark-mode) .chart-buttons button { background:#2b3a2f; color:#e0f2e9; }
:global(.dark-mode) .chart-buttons button.selected, :global(.dark-mode) .chart-buttons button:hover { background:#556b2f; color:#fff; }
</style>

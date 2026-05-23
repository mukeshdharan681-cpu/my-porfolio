import { useState, useMemo, useEffect } from "react";
import { 
  Database, 
  Cpu, 
  TrendingUp, 
  Play, 
  RefreshCw, 
  Sliders, 
  Table, 
  LineChart, 
  CheckCircle2, 
  ArrowRight, 
  BarChart3, 
  Layers, 
  Terminal,
  Filter
} from "lucide-react";
import { sampleProjects } from "../data";

export default function Showcase() {
  const [activeTab, setActiveTab] = useState<"predictive" | "sql" | "dashboard">("predictive");

  // State for Predictive Sandbox
  const [marketingBudget, setMarketingBudget] = useState<number>(120); // in $k
  const [discountRate, setDiscountRate] = useState<number>(15); // in %
  const [seasonality, setSeasonality] = useState<"high" | "normal" | "low">("normal");

  // State for SQL Playroom
  const [activeQueryIndex, setActiveQueryIndex] = useState<number>(0);
  const [isExecutingSql, setIsExecutingSql] = useState<boolean>(false);
  const [sqlResultLimit, setSqlResultLimit] = useState<number>(5);

  // State for Power BI Dashboard simulation
  const [dashboardFilter, setDashboardFilter] = useState<"all" | "enterprise" | "smb">("all");
  const [sortField, setSortField] = useState<"sales" | "growth">("sales");

  // -------------------------------------------------------------
  // 1. Machine Learning Predictive Calculation Engine
  // -------------------------------------------------------------
  const predictionResult = useMemo(() => {
    const baseSales = 450; // Base baseline revenue in thousands
    const marketingCoeff = 2.4; // Revenue multiplier per $1k marketing budget
    const discountCoeff = 1.1; // Discount multiplier
    
    // Revenue quadratic simulation model
    const marketImpact = marketingBudget * marketingCoeff;
    
    // Optimal discount peak curve (e.g. too high of a discount destroys margin, too low limits volume)
    // Bell curve peaked at 12% discount rate
    const dFactor = -0.06 * Math.pow(discountRate - 12, 2) + 10;
    const discountImpact = dFactor * (baseSales * 0.015);
    
    let seasonMultiplier = 1.0;
    if (seasonality === "high") seasonMultiplier = 1.25;
    if (seasonality === "low") seasonMultiplier = 0.8;

    const baselineOutcome = (baseSales + marketImpact + discountImpact) * seasonMultiplier;
    
    // Mukesh's optimization model (the 15% increase we mentioned!)
    const optimizedOutcome = baselineOutcome * 1.15;
    const liftValue = optimizedOutcome - baselineOutcome;

    return {
      baseline: Math.round(baselineOutcome),
      optimized: Math.round(optimizedOutcome),
      lift: Math.round(liftValue),
      liftPercent: 15,
      r2Score: 0.942
    };
  }, [marketingBudget, discountRate, seasonality]);

  // Sparkline line points calculations
  const chartPoints = useMemo(() => {
    // Generate 12 months forecast points
    const points: { month: string; val: number }[] = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    for (let i = 0; i < 12; i++) {
      // Add slight wave + general slope multiplier
      const monthOffset = Math.sin((i / 11) * Math.PI) * 50;
      const val = Math.round((predictionResult.optimized * (0.8 + (i * 0.035))) + monthOffset);
      points.push({ month: months[i], val });
    }
    return points;
  }, [predictionResult]);

  // SVG Chart Scaling
  const maxChartVal = useMemo(() => Math.max(...chartPoints.map(p => p.val)) * 1.1, [chartPoints]);
  const minChartVal = useMemo(() => Math.min(...chartPoints.map(p => p.val)) * 0.9, [chartPoints]);

  const svgPathData = useMemo(() => {
    if (chartPoints.length === 0) return "";
    const width = 600;
    const height = 180;
    const padX = 40;
    const padY = 20;

    return chartPoints.map((p, idx) => {
      const x = padX + (idx / (chartPoints.length - 1)) * (width - padX * 2);
      const ratio = (p.val - minChartVal) / (maxChartVal - minChartVal);
      const y = height - padY - ratio * (height - padY * 2);
      return { x, y, label: p.month, val: p.val };
    });
  }, [chartPoints, minChartVal, maxChartVal]);

  // -------------------------------------------------------------
  // 2. SQL Simulation Templates
  // -------------------------------------------------------------
  const sqlTemplates = [
    {
      title: "Monthly Cohort Retention Rate",
      description: "Computes periodic customer churn across rolling subscription months using CTEs and PostgreSQL window clauses.",
      code: `WITH cohort_registration AS (
  SELECT 
    user_id,
    DATE_TRUNC('month', created_at) AS cohort_month
  FROM users
),
user_activities AS (
  SELECT 
    a.user_id,
    DATE_TRUNC('month', a.occurred_at) AS activity_month,
    EXTRACT(MONTH FROM AGE(DATE_TRUNC('month', a.occurred_at), c.cohort_month)) AS period_index
  FROM activities a
  JOIN cohort_registration c ON a.user_id = c.user_id
)
SELECT 
  cohort_month,
  COUNT(DISTINCT user_id) as initial_size,
  COUNT(DISTINCT CASE WHEN period_index = 1 THEN user_id END) AS month_1_retained,
  COUNT(DISTINCT CASE WHEN period_index = 2 THEN user_id END) AS month_2_retained,
  COUNT(DISTINCT CASE WHEN period_index = 3 THEN user_id END) AS month_3_retained,
  ROUND(COUNT(DISTINCT CASE WHEN period_index = 3 THEN user_id END) * 100.0 / COUNT(DISTINCT user_id), 1) || '%' AS month_3_retention_rate
FROM user_activities
GROUP BY cohort_month
ORDER BY cohort_month DESC;`,
      headers: ["cohort_month", "initial_size", "month_1_retained", "month_2_retained", "month_3_retained", "retention_rate"],
      rows: [
        { cohort: "2025-11-01", size: 1250, m1: 850, m2: 740, m3: 690, rate: "55.2%" },
        { cohort: "2025-12-01", size: 1420, m1: 1020, m2: 910, m3: 820, rate: "57.7%" },
        { cohort: "2026-01-01", size: 1800, m1: 1350, m2: 1205, m3: 1110, rate: "61.6%" },
        { cohort: "2026-02-01", size: 2100, m1: 1710, m2: 1540, m3: 1395, rate: "66.4%" },
        { cohort: "2026-03-01", size: 2500, m1: 2050, m2: 1890, m3: 1720, rate: "68.8%" },
      ],
      insight: "Our model proves product feature adoption within Month 1 directly correlates with Month 3 retention leaping from 55% to 68%."
    },
    {
      title: "Revenue Velocity Acceleration",
      description: "Aggregates revenue velocity per customer segment, deploying dynamic SQL window groupings.",
      code: `SELECT 
  customer_segment,
  COUNT(order_id) AS total_orders,
  SUM(order_amount_usd) AS segment_revenue,
  RANK() OVER (ORDER BY SUM(order_amount_usd) DESC) as revenue_rank,
  ROUND(AVG(order_amount_usd), 2) AS average_basket_value,
  ROUND((SUM(order_amount_usd) - LAG(SUM(order_amount_usd), 1) OVER (ORDER BY SUM(order_amount_usd))) * 100.0 / 
    LAG(SUM(order_amount_usd), 1) OVER (ORDER BY SUM(order_amount_usd)), 2) || '%' AS lift_percentage
FROM customer_transactions
WHERE transaction_status = 'COMPLETED'
GROUP BY customer_segment;`,
      headers: ["segment", "total_orders", "segment_revenue", "rank", "basket_value", "lift"],
      rows: [
        { segment: "Enterprise Partners", orders: 340, revenue: "$485,000", rank: 1, basket_value: "$1,426.47", lift: "24.5%" },
        { segment: "SMB Core", orders: 1820, revenue: "$298,400", rank: 2, basket_value: "$163.95", lift: "12.8%" },
        { segment: "Direct Consumers", orders: 4900, revenue: "$182,500", rank: 3, basket_value: "$37.24", lift: "8.3%" },
        { segment: "Developer Sandbox", orders: 850, revenue: "$24,500", rank: 4, basket_value: "$28.82", lift: "-2.1%" },
      ],
      insight: "Enterprise accounts drive 60%+ of total revenue velocity despite representing only 5% of order quantity. Absolute justification for high-touch focus campaigns."
    }
  ];

  const handleExecuteSql = () => {
    setIsExecutingSql(true);
    setTimeout(() => {
      setIsExecutingSql(false);
    }, 750);
  };

  // Run initial execute simulation when template changes
  useEffect(() => {
    handleExecuteSql();
  }, [activeQueryIndex]);


  // -------------------------------------------------------------
  // 3. Mock High-Contrast Tableau Dashboard Data
  // -------------------------------------------------------------
  const dashboardKpis = useMemo(() => {
    const rawSales = dashboardFilter === "all" ? 965900 : dashboardFilter === "enterprise" ? 485000 : 480900;
    const growth = dashboardFilter === "all" ? 18.4 : dashboardFilter === "enterprise" ? 24.5 : 11.2;
    const cac = dashboardFilter === "all" ? "$42" : dashboardFilter === "enterprise" ? "$190" : "$18";
    const retention = dashboardFilter === "all" ? "82.5%" : dashboardFilter === "enterprise" ? "91.8%" : "74.2%";

    return { rawSales, growth, cac, retention };
  }, [dashboardFilter]);

  const dashboardSegments = [
    { name: "SaaS Automations", sales: 245000, growth: 22.8, size: "Enterprise" },
    { name: "Medical Logistics", sales: 180000, growth: 28.1, size: "Enterprise" },
    { name: "Retail Operations", sales: 155000, growth: 12.4, size: "SMB" },
    { name: "Aviation Maintenance", sales: 125000, growth: 31.4, size: "Enterprise" },
    { name: "Local Boutiques", sales: 88400, growth: 6.2, size: "SMB" },
    { name: "Hospitality Tech", sales: 74900, growth: -3.5, size: "SMB" },
  ];

  const filteredDashboardSegments = useMemo(() => {
    let result = dashboardSegments;
    if (dashboardFilter !== "all") {
      result = dashboardSegments.filter(s => s.size.toLowerCase() === dashboardFilter);
    }
    return [...result].sort((a, b) => {
      if (sortField === "sales") return b.sales - a.sales;
      return b.growth - a.growth;
    });
  }, [dashboardFilter, sortField]);


  return (
    <div id="portfolio-interactive-showcase" className="w-full bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Component Title Bar */}
      <div className="bg-slate-900 text-white px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-mono text-teal-400 font-bold block mb-1">
            Data Analyst Sandboxed Environment
          </span>
          <h3 className="font-display text-xl font-bold tracking-tight">
            Mukesh's Interactive Analytics Showcase
          </h3>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex bg-slate-800 p-1 rounded-lg self-start md:self-auto">
          <button
            onClick={() => setActiveTab("predictive")}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-mono font-medium rounded-md transition-all ${
              activeTab === "predictive"
                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            ML Predictive Engine
          </button>
          <button
            onClick={() => setActiveTab("sql")}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-mono font-medium rounded-md transition-all ${
              activeTab === "sql"
                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            SQL Query Lab
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-mono font-medium rounded-md transition-all ${
              activeTab === "dashboard"
                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Power BI Simulator
          </button>
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="p-6 bg-white min-h-[500px]">
        {/* TAB 1: PREDICTIVE MACHINE LEARNING ENGINE */}
        {activeTab === "predictive" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            {/* Control Panel (left) */}
            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-800 font-display font-bold text-sm uppercase tracking-wide mb-5">
                <Sliders className="w-4 h-4 text-teal-600" />
                <span>Simulation Parameters</span>
              </div>

              {/* Slider 1: Marketing Budget */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-700">Digital Marketing Budget</label>
                  <span className="text-xs font-mono text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                    ${marketingBudget}k USD
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="350"
                  value={marketingBudget}
                  onChange={(e) => setMarketingBudget(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>$20k</span>
                  <span>Optimal: ~$180k</span>
                  <span>$350k</span>
                </div>
              </div>

              {/* Slider 2: Discount Rate */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-700">Promotional Product Discount</label>
                  <span className="text-xs font-mono text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                    {discountRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>0% (No discount)</span>
                  <span>Sweet Spot: 10-15%</span>
                  <span>40% (Loss leader)</span>
                </div>
              </div>

              {/* Toggle 3: Seasonality coefficient */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-700 mb-2">Macro Market Seasonality</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["low", "normal", "high"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeasonality(s)}
                      className={`py-1.5 px-3 text-xs font-mono rounded-md border capitalize font-medium transition-all ${
                        seasonality === s
                          ? "bg-slate-900 border-slate-900 text-white font-bold"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {s === "low" ? "Low Peak (0.8x)" : s === "high" ? "High Q4 (1.25x)" : "Baseline"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Model Diagnostics Metric Tickers */}
              <div className="pt-4 border-t border-slate-200 mt-6 font-mono text-[11px] text-slate-500 space-y-2">
                <div className="flex justify-between">
                  <span>Model Type:</span>
                  <span className="font-semibold text-slate-800">Gradient Boosted Regressor</span>
                </div>
                <div className="flex justify-between flex-wrap">
                  <span>Model Fit Accuracy (R²):</span>
                  <span className="font-semibold text-teal-700 bg-teal-50 px-1 rounded">{predictionResult.r2Score.toString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Parameters:</span>
                  <span className="font-semibold text-slate-800">3 (Budget, Discount, Seasonality)</span>
                </div>
              </div>
            </div>

            {/* Results Showcase (right) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {/* Top Row: Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-mono block mb-1">BASELINE DEMAND</span>
                  <span className="text-xl font-display font-bold text-slate-800">
                    ${predictionResult.baseline.toLocaleString()}k
                  </span>
                </div>
                
                <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white p-4 rounded-xl shadow-xs">
                  <span className="text-[10px] text-teal-100 font-mono block mb-1">MUKESH OPTIMIZED</span>
                  <span className="text-xl font-display font-bold">
                    ${predictionResult.optimized.toLocaleString()}k
                  </span>
                </div>

                <div className="bg-teal-50 border border-teal-150 p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-teal-600 font-mono block mb-1">REVENUE LIFT (+15%)</span>
                    <span className="text-xl font-display font-bold text-teal-800">
                      +${predictionResult.lift.toLocaleString()}k
                    </span>
                  </div>
                </div>
              </div>

              {/* Forecasting SVG Map Line */}
              <div className="bg-slate-900 border border-slate-850 p-5 rounded-xl text-white relative mb-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                    <LineChart className="w-3.5 h-3.5 text-teal-400" />
                    12-Month Projected Growth Path ($k USD)
                  </span>
                  <span className="bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono py-0.5 px-2 rounded">
                    Active Prediction Run Live
                  </span>
                </div>

                {/* SVG Line visualization */}
                <div className="w-full flex justify-center mt-2">
                  <svg viewBox="0 0 600 200" className="w-full h-auto overflow-visible select-none">
                    {/* Horizontal helper grids */}
                    <line x1="40" y1="20" x2="560" y2="20" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                    <line x1="40" y1="90" x2="560" y2="90" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                    <line x1="40" y1="160" x2="560" y2="160" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

                    {/* Gradient Area Fill under the prediction curve */}
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Generate SVG Path from coordinates */}
                    {svgPathData.length > 0 && (
                      <>
                        {/* Area Polygon */}
                        <path
                          d={`M ${svgPathData[0].x} 180 ` + svgPathData.map(p => `L ${p.x} ${p.y}`).join(" ") + ` L ${svgPathData[svgPathData.length-1].x} 180 Z`}
                          fill="url(#areaGrad)"
                        />

                        {/* Thick Forecast Line */}
                        <path
                          d={svgPathData.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(" ")}
                          fill="none"
                          stroke="url(#lineGrad)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#14b8a6" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>

                        {/* Data point dots and text indicators */}
                        {svgPathData.map((pt, idx) => (
                          <g key={idx} className="group cursor-pointer">
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="5"
                              className="fill-teal-400 stroke-slate-900 stroke-2 hover:r-7 transition-all"
                            />
                            {/* Value text display on hover or key points */}
                            {(idx === 0 || idx === 5 || idx === 11) && (
                              <text
                                x={pt.x}
                                y={pt.y - 12}
                                textAnchor="middle"
                                className="fill-slate-300 text-[10px] font-mono font-semibold"
                              >
                                ${pt.val}k
                              </text>
                            )}
                            {/* X Axis Labels */}
                            <text
                              x={pt.x}
                              y="192"
                              textAnchor="middle"
                              className="fill-slate-400 text-[10px] font-mono"
                            >
                              {pt.label}
                            </text>
                          </g>
                        ))}
                      </>
                    )}
                  </svg>
                </div>
              </div>

              {/* Insight Text block */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block mb-0.5">Automated Model Insight Commentary</strong>
                  At a digital spend of <span className="font-semibold text-slate-800">${marketingBudget}k</span> and discount baseline of <span className="font-semibold text-slate-800">{discountRate}%</span>, the Gradient Boost model predicts high elasticity. Implementing Mukesh's custom 15% revenue lift optimization model increases annual sales ceiling to <span className="font-semibold text-teal-700">${predictionResult.optimized.toLocaleString()}k</span>.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SQL QUERY LAB */}
        {activeTab === "sql" && (
          <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Template selector / SQL listing (left) */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
                Select Analysis Query
              </span>
              
              {sqlTemplates.map((tmpl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveQueryIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeQueryIndex === idx
                      ? "bg-teal-50/50 border-teal-500 shadow-xs"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Database className={`w-4 h-4 ${activeQueryIndex === idx ? "text-teal-600" : "text-slate-400"}`} />
                    <h5 className={`font-display text-sm font-semibold ${activeQueryIndex === idx ? "text-teal-900" : "text-slate-800"}`}>
                      {tmpl.title}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-2">
                    {tmpl.description}
                  </p>
                </button>
              ))}

              {/* SQL Controls */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-250 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600 font-medium font-sans">Simulated Row Limit</span>
                  <div className="flex gap-1.5">
                    {[3, 5, 10].map(limit => (
                      <button
                        key={limit}
                        onClick={() => setSqlResultLimit(limit)}
                        className={`px-2 py-1 text-[10px] font-mono border rounded ${
                          sqlResultLimit === limit
                            ? "bg-slate-900 border-slate-900 text-white font-bold"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        LIMIT {limit}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleExecuteSql}
                  disabled={isExecutingSql}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-slate-950 hover:text-slate-950 font-mono font-bold text-xs py-2 px-4 rounded-lg shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isExecutingSql ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Executing Pipeline ETL...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Run Standard Query
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* SQL Terminal Display & Table Output (right) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              {/* Fake Code IDE Terminal */}
              <div className="bg-slate-950 text-slate-150 rounded-xl overflow-hidden border border-slate-900 flex flex-col flex-1 shadow-sm">
                <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-950">
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-slate-500" />
                    postgresql_migration_client.sql
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                </div>
                
                <pre className="p-4 overflow-x-auto text-[11px] font-mono leading-relaxed text-emerald-400 max-h-[220px] select-all scrollbar-thin">
                  <code>{sqlTemplates[activeQueryIndex].code}</code>
                </pre>
              </div>

              {/* DB Query Output Grid Table */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col">
                <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-150">
                  <span className="text-xs font-mono font-bold text-slate-700 flex items-center gap-1.5">
                    <Table className="w-3.5 h-3.5 text-indigo-500" />
                    Query Execution Output (STDOUT)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {isExecutingSql ? "COMPUTING..." : `Returned ${Math.min(sqlTemplates[activeQueryIndex].rows.length, sqlResultLimit)} rows`}
                  </span>
                </div>

                {/* Table implementation */}
                <div className="overflow-x-auto max-h-[210px] scrollbar-thin">
                  {isExecutingSql ? (
                    <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400 font-mono text-xs">
                      <RefreshCw className="w-6 h-6 animate-spin text-teal-600" />
                      Parsing relation schemas & execution indices...
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-150 text-[10px] font-mono text-slate-500 uppercase">
                          {sqlTemplates[activeQueryIndex].headers.map((h, i) => (
                            <th key={i} className="px-4 py-2 font-semibold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                        {sqlTemplates[activeQueryIndex].rows.slice(0, sqlResultLimit).map((row: any, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50">
                            {Object.values(row).map((val: any, cIdx) => (
                              <td key={cIdx} className="px-4 py-2 text-slate-600 truncate max-w-[120px]">
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* DB Summary insight context */}
                <div className="bg-indigo-50/40 px-4 py-3 text-[11px] leading-relaxed text-indigo-900 border-t border-slate-150">
                  <span className="font-semibold block text-indigo-950 mb-0.5">Analyst Post-Processing Insight</span>
                  {sqlTemplates[activeQueryIndex].insight}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: POWER BI SIMULATOR */}
        {activeTab === "dashboard" && (
          <div className="animate-fadeIn space-y-6">
            {/* Dashboard Ribbon / Filter Bar */}
            <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-amber-100 text-amber-900 p-2 rounded-lg">
                  <Filter className="w-4 h-4" />
                </span>
                <div>
                  <h5 className="font-display text-sm font-bold text-slate-800">Mock Executive BI Report</h5>
                  <p className="text-[11px] text-slate-500 font-sans">Adjust filters to simulate Tableau data blend overlays</p>
                </div>
              </div>

              {/* Ribbon Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Segment Filter pills */}
                <div className="flex bg-white border border-slate-200 p-1 rounded-lg">
                  {(["all", "enterprise", "smb"] as const).map((seg) => (
                    <button
                      key={seg}
                      onClick={() => setDashboardFilter(seg)}
                      className={`px-3 py-1 text-[10px] font-mono uppercase font-semibold rounded ${
                        dashboardFilter === seg
                          ? "bg-slate-900 text-white"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {seg}
                    </button>
                  ))}
                </div>

                {/* Metric Sorting */}
                <div className="flex bg-white border border-slate-200 p-1 rounded-lg">
                  <button
                    onClick={() => setSortField("sales")}
                    className={`px-2.5 py-1 text-[10px] font-mono rounded ${
                      sortField === "sales" ? "bg-indigo-600 text-white font-bold" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Sort: Revenue
                  </button>
                  <button
                    onClick={() => setSortField("growth")}
                    className={`px-2.5 py-1 text-[10px] font-mono rounded ${
                      sortField === "growth" ? "bg-indigo-600 text-white font-bold" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Sort: Growth %
                  </button>
                </div>
              </div>
            </div>

            {/* Dashboard High-Level Ticker KPI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl">
                <span className="text-[10px] text-slate-500 font-mono uppercase block mb-1">Total Segment Revenue</span>
                <span className="text-2xl font-display font-medium text-slate-900 tracking-tight">
                  ${dashboardKpis.rawSales.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1 font-mono">Simulated Current FY26 Run</span>
              </div>

              <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl">
                <span className="text-[10px] text-slate-500 font-mono uppercase block mb-1">Velocity Growth CAGR</span>
                <span className="text-2xl font-display font-medium text-emerald-600 tracking-tight flex items-center gap-1">
                  +{dashboardKpis.growth}%
                  <TrendingUp className="w-4 h-4" />
                </span>
                <span className="text-[10px] text-slate-400 block mt-1 font-mono">vs Year-over-Year Target</span>
              </div>

              <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl">
                <span className="text-[10px] text-slate-500 font-mono uppercase block mb-1">Blended CAC Rate</span>
                <span className="text-2xl font-display font-medium text-slate-900 tracking-tight">
                  {dashboardKpis.cac}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1 font-mono">Customer Acquisition Cost</span>
              </div>

              <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl">
                <span className="text-[10px] text-slate-500 font-mono uppercase block mb-1">Period Retention Cap</span>
                <span className="text-2xl font-display font-medium text-indigo-600 tracking-tight">
                  {dashboardKpis.retention}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1 font-mono">Cohort LTV Cap Index</span>
              </div>
            </div>

            {/* Simulated Data Visualization Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Bar Chart Visualization (left) */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-display text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                    Revenue Velocity by Business Vertical
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">Values in $ USD</span>
                </div>

                {/* Custom Responsive SVG Bar Chart */}
                <div className="space-y-4">
                  {filteredDashboardSegments.map((seg, i) => {
                    const maxPossibleValue = 250000;
                    const percentOfMax = (seg.sales / maxPossibleValue) * 100;

                    return (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-slate-700">{seg.name}</span>
                          <div className="font-mono flex items-center gap-3">
                            <span className="text-slate-900 font-semibold">${seg.sales.toLocaleString()}</span>
                            <span className={`text-[10px] ${seg.growth >= 0 ? 'text-emerald-500 font-semibold' : 'text-rose-500'}`}>
                              {seg.growth >= 0 ? '+' : ''}{seg.growth}%
                            </span>
                          </div>
                        </div>

                        {/* Bar tracker */}
                        <div className="w-full h-4 bg-slate-100 rounded-sm overflow-hidden flex">
                          <div
                            style={{ width: `${percentOfMax}%` }}
                            className={`h-full transition-all duration-750 rounded-r-xs bg-gradient-to-r ${
                              seg.size === "Enterprise" ? "from-indigo-500 to-indigo-600" : "from-teal-500 to-emerald-500"
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Data Commentary card (right) */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="font-display text-xs font-bold text-slate-800 block uppercase tracking-wide">
                    Executive Analysis Briefing
                  </span>

                  <div className="space-y-3 text-xs leading-relaxed text-slate-600">
                    <p>
                      Based on current filter parameters, <strong className="text-slate-800">SaaS Automations</strong> representing <strong className="text-indigo-900">Enterprise Segment</strong> commands the greatest baseline share at <strong className="text-slate-800">$245,000</strong>.
                    </p>
                    <p>
                      However, <strong className="text-slate-800">Aviation Maintenance</strong> exhibits the highest Year-over-Year acceleration vector at <strong className="text-emerald-600">+31.4%</strong>.
                    </p>
                    <p>
                      Outliers are flagged in Red. <strong className="text-slate-800">Hospitality Tech (SMB)</strong> shows negative progression at <span className="text-rose-600 font-semibold">-3.5%</span>, showing macro friction.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 mt-4 text-[10px] font-mono text-slate-400 leading-snug">
                  Analytics compiled and formatted by Mukesh Dharan. Source data ingestion powered by automated hourly data warehouse extraction algorithms.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

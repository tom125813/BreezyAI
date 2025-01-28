// File: js/dashboard.js

document.addEventListener('DOMContentLoaded', function () {
  // Function to set dynamic chart heights based on container width
  function setChartHeight(chartId, multiplier = 0.5) {
    const chartContainer = document.getElementById(chartId).parentElement;
    if (!chartContainer) return;
    const containerWidth = chartContainer.offsetWidth;
    const newHeight = containerWidth * multiplier; // Adjust multiplier as needed
    const chartCanvas = document.getElementById(chartId);
    if (chartCanvas) {
      chartCanvas.style.height = `${newHeight}px`;
    }
  }

  // Initialize all charts
  /*function initializeCharts() {
    // Total Responses Chart - Line Chart
    const ctxTotalResponses = document.getElementById("totalResponsesChart").getContext("2d");
    const totalResponsesChart = new Chart(ctxTotalResponses, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
          label: "Total Responses",
          data: [150, 180, 200, 220, 210, 250, 300],
          backgroundColor: "rgba(0, 82, 255, 0.2)",
          borderColor: "rgba(0, 82, 255, 1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4, // Smooth curves
          pointRadius: 4, // Size of data points
          pointBackgroundColor: "rgba(0, 82, 255, 1)"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#212529'
            }
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#6c757d'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#e0e0e0'
            },
            ticks: {
              color: '#6c757d'
            }
          }
        }
      }
    });

    // Human Intervention Required Chart - Doughnut Chart
    const ctxHumanIntervention = document.getElementById("humanInterventionChart").getContext("2d");
    const humanInterventionChart = new Chart(ctxHumanIntervention, {
      type: "doughnut",
      data: {
        labels: ["Handled by AI", "Human Intervention"],
        datasets: [{
          data: [85, 15],
          backgroundColor: ["#0052ff", "#ffbb00"],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: '#212529'
            }
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });

    // Credit Usage Chart - Bar Chart
    const ctxCreditUsage = document.getElementById("creditsUsageChart").getContext("2d");
    const creditsUsageChart = new Chart(ctxCreditUsage, {
      type: "bar",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [{
          label: "Credits Used",
          data: [500, 750, 650, 800],
          backgroundColor: "rgba(255, 187, 0, 0.6)",
          borderColor: "rgba(255, 187, 0, 1)",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#6c757d'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#e0e0e0'
            },
            ticks: {
              color: '#6c757d'
            }
          }
        }
      }
    });

    // Average Response Time Chart - Line Chart
    const ctxResponseTime = document.getElementById("responseTimeChart").getContext("2d");
    const responseTimeChart = new Chart(ctxResponseTime, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
          label: "Response Time (seconds)",
          data: [30, 28, 32, 27, 25, 29, 26],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: "rgba(255, 99, 132, 1)"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#212529'
            }
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#6c757d'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#e0e0e0'
            },
            ticks: {
              color: '#6c757d'
            }
          }
        }
      }
    });

    // Engagement Rate Chart - Pie Chart
    const ctxEngagementRate = document.getElementById("engagementRateChart").getContext("2d");
    const engagementRateChart = new Chart(ctxEngagementRate, {
      type: "pie",
      data: {
        labels: ["Engaged", "Not Engaged"],
        datasets: [{
          data: [70, 30],
          backgroundColor: ["#28a745", "#dc3545"],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: '#212529'
            }
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });

    // Channel Breakdown Chart - Bar Chart
    const ctxChannelBreakdown = document.getElementById("channelBreakdownChart").getContext("2d");
    const channelBreakdownChart = new Chart(ctxChannelBreakdown, {
      type: "bar",
      data: {
        labels: ["Email", "Facebook", "X", "Instagram"],
        datasets: [{
          label: "Messages",
          data: [400, 250, 300, 200],
          backgroundColor: ["#003ecc", "#ffbb00", "#0066cc", "#00cc88"],
          borderColor: ["#003ecc", "#ffbb00", "#0066cc", "#00cc88"],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#6c757d'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#e0e0e0'
            },
            ticks: {
              color: '#6c757d'
            }
          }
        }
      }
    });

    // Set initial chart heights based on container widths
    const chartIds = [
      "totalResponsesChart",
      "humanInterventionChart",
      "creditsUsageChart",
      "responseTimeChart",
      "engagementRateChart",
      "channelBreakdownChart"
    ];

    chartIds.forEach(chartId => {
      setChartHeight(chartId, 0.5); // Adjust multiplier as needed
    });
  }

  // Initialize charts on page load
  initializeCharts();

  // Update chart heights on window resize to maintain responsiveness
  window.addEventListener('resize', function () {
    const chartIds = [
      "totalResponsesChart",
      "humanInterventionChart",
      "creditsUsageChart",
      "responseTimeChart",
      "engagementRateChart",
      "channelBreakdownChart"
    ];

    chartIds.forEach(chartId => {
      setChartHeight(chartId, 0.5); // Adjust multiplier as needed
    });
  });*/
});

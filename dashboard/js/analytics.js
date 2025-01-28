// Ensure the DOM is fully loaded before initializing charts
document.addEventListener('DOMContentLoaded', function () {
  // Messages Over Time Chart
  const messagesCtx = document.getElementById('messagesChart').getContext('2d');
  const messagesChart = new Chart(messagesCtx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Messages Sent',
        data: [200, 450, 600, 800, 750, 950, 1100],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderWidth: 2,
        pointRadius: 4,
        tension: 0.3,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Days of the Week',
            color: '#555'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Messages',
            color: '#555'
          },
          beginAtZero: true
        }
      }
    }
  });

  // AI vs Human Responses Chart
  const aiHumanCtx = document.getElementById('aiHumanChart').getContext('2d');
  const aiHumanChart = new Chart(aiHumanCtx, {
    type: 'doughnut',
    data: {
      labels: ['AI Responses', 'Human Interventions'],
      datasets: [{
        data: [87, 13],
        backgroundColor: ['#28a745', '#dc3545'],
        hoverOffset: 5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'right'
        }
      }
    }
  });

  // Response Time Breakdown Chart
  const responseTimeCtx = document.getElementById('responseTimeChart').getContext('2d');
  const responseTimeChart = new Chart(responseTimeCtx, {
    type: 'bar',
    data: {
      labels: ['0-5s', '5-10s', '10-30s', '30s+'],
      datasets: [{
        label: 'Response Time Distribution',
        data: [65, 20, 10, 5],
        backgroundColor: ['#007bff', '#17a2b8', '#ffc107', '#dc3545'],
        borderWidth: 1,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Response Time Intervals',
            color: '#555'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Percentage of Responses',
            color: '#555'
          },
          beginAtZero: true
        }
      }
    }
  });
});

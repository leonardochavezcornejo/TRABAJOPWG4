import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MonthlyEarningsChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        datasets: [
          {
            label: 'Ganancias ($)',
            data: [10000, 7500, 7800, 9800, 9900, 7800, 7500, 8900, 7700, 9100, 8600, 8000],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `$${context.raw}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `$${value}`
            }
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} height={200}></canvas>;
};

export default MonthlyEarningsChart;

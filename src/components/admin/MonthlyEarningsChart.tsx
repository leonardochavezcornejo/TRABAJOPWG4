import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const MonthlyEarningsChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [earningsData, setEarningsData] = useState<number[]>([]);

  useEffect(() => {
    // Llamada a la API para obtener las ganancias mensuales
    const fetchEarningsData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stats/monthly-earnings');
        if (response.ok) {
          const data = await response.json();
          setEarningsData(data);
        } else {
          console.error('Error al obtener los datos de ganancias');
        }
      } catch (error) {
        console.error('Error al hacer la solicitud:', error);
      }
    };

    fetchEarningsData();
  }, []);

  useEffect(() => {
    if (earningsData.length > 0 && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
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
              data: earningsData,  // Usamos los datos obtenidos de la API
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
    }
  }, [earningsData]);  // El gráfico se actualizará cuando 'earningsData' cambie

  return <canvas ref={canvasRef} height={200}></canvas>;
};

export default MonthlyEarningsChart;
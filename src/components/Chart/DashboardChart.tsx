import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AreaChartSpark = (props: any) => {
  const router = useRouter();

  let series = props.series;
  const categories = props.categories?.slice(0);

  const options: any = {
    chart: {
      type: 'area',
      zoom: {
        enabled: false
      },
      id: 'area-datetime'
    },
    series: [
      {
        name: 'Total Surat',
        data: props.series?.[0]
      },
      // {
      //   name: 'Total Surat Langsung',
      //   data: props.series?.[1]
      // },
      {
        name: 'Total Surat Approve',
        data: props.series?.[2]
      }
    ],
    yaxis: {
      labels: {
        formatter: function (value: any) {
          return value?.toLocaleString();
        },
        show: true,
        // rotate: -45,
        style: {
          colors: '#BABABA',
          fontSize: '10px'
        }
      }
    },
    responsive: [
      {
        breakpoint: 840,
        options: {
          chart: {
            width: '100%'
          }
        }
      }
    ],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.6,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        // stops: [0, 100,100,100]
        gradientToColors: ['rgb(186, 186, 187)']
      },
      opacity: 1
    },
    colors: ['rgb(11, 84, 206)', 'rgb(1, 193, 255)', '#FF5440'],
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left'
    },
    xaxis: {
      type: 'time',
      categories: categories,
      scaleLabel: {
        display: true,
        labelString: 'Date'
      },
      labels: {
        show: true,
        rotate: -45,
        style: {
          colors: '#BABABA',
          fontSize: '10px'
        },
        timeFormat: 'DD/MM/YYYY'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      borderColor: '#EEE'
      // strokeDashArray: 2,
    },
    option: {
      chart: {
        height: 350,
        type: 'area'
      },
      responsive: [
        {
          breakpoint: 840,
          options: {
            chart: {
              width: '100%'
            }
          }
        }
      ],
      stroke: {
        curve: 'smooth'
      },

      legend: {
        show: false,
        position: 'top',
        horizontalAlign: 'left'
      },
      yaxis: {
        labels: {
          formatter: function (value: any) {
            return value?.toLocaleString();
          },
          show: true,
          // rotate: -45,
          style: {
            colors: '#BABABA',
            fontSize: '10px'
          }
        }
      },
      tooltip: {
        x: {
          format: 'DD/MM/YYYY'
        }
      }
    }
  };

  return (
    <>
      {/* <h4 style={{ color: "#696969" }}>Overview</h4> */}
      {/* <h2 style={{ color: "#696969" }}>{props.title}</h2> */}
      <Box className="custom-chart">
        {options.series !== undefined ? (
          <Chart options={options} series={options.series} type="area" width="108%" height="330" />
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default AreaChartSpark;

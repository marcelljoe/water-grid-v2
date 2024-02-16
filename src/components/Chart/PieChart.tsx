import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = (props: any) => {
  let series = props.series;

  let options: any = {
    chart: {
      type: 'donut',
      height: 350
    },
    colors: [
      'rgb(1, 193, 255)',
      '#BABABB',
      // '#0B54CE',
      '#FF5440'
      //   "#01C1FF",
      // "green"
    ],

    labels: props.categories,
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: 5
      //       },
      //       //   legend: {
      //       //     formatter: function (val: any, opts: any) {
      //       //       return val + " - " + opts.w.globals.series[opts.seriesIndex];
      //       //     },
      //       //   },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%'
        }
      },
      stroke: {
        colors: undefined
      }
    },

    dataLabels: {
      enabled: true,
      // formatter: function (val: any, opt: any) {
      //   return opt.w.config.series[opt.seriesIndex];
      // },
      textAnchor: 'middle',
      distributed: false,
      offsetX: 0,
      offsetY: 0
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 280
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  return (
    <>
      {/* <h4>Overview</h4> */}
      <h4>{props.title}</h4>
      <h2>{props.value}</h2>
      {/* <h6></h6> */}
      <div className="custom-pie">
        <Chart height={'350'} options={options} series={series} type="donut" width={'100%'} />
      </div>
    </>
  );
};

export default PieChart;

import mock from './mock';

const analyticsDashboardAppDB = {
  widgets: {
    widget1: {
      chartType: 'line',
      datasets: {
        '2017': [
          {
            label: 'Tracks',
            data: [0.2, 0.1, 0.4, 0.2, 0.9, 0.9, 0.5, 0.8, 0.1, 0.8, 0.2, 0.9],
            fill: 'start',
          },
        ],
        '2018': [
          {
            label: 'Tracks',
            data: [0.2, 0.9, 0.9, 0.5, 0.8, 0.2, 0.9, 0.2, 0.1, 0.4, 0.1, 0.8],
            fill: 'start',
          },
        ],
        '2019': [
          {
            label: 'Tracks',
            data: [0.9, 0.5, 0.8, 0.1, 0.1, 1, 0.8, 0.2, 0.9, 0.4, 0.2, 0],
            fill: 'start',
          },
        ],
      },
      labels: [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
      ],
      options: {
        spanGaps: false,
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 32,
            left: 32,
            right: 32,
          },
        },
        elements: {
          point: {
            radius: 4,
            borderWidth: 2,
            hoverRadius: 4,
            hoverBorderWidth: 2,
          },
          line: {
            tension: 0,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false,
                tickMarkLength: 18,
              },
              ticks: {
                fontColor: '#ffffff',
              },
            },
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                min: 0,
                max: 2,
                stepSize: 1.5,
              },
            },
          ],
        },
        plugins: {
          filler: {
            propagate: false,
          },
          xLabelsOnTop: {
            active: true,
          },
        },
      },
    },
    widget2: {
      conversion: {
        value: 492,
        ofTarget: 23,
      },
      chartType: 'bar',
      datasets: [
        {
          label: 'Songs',
          data: [221, 428, 492, 471, 413, 344, 294],
        },
      ],
      labels: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      options: {
        spanGaps: false,
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 24,
            left: 16,
            right: 16,
            bottom: 16,
          },
        },
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                min: 100,
                max: 500,
              },
            },
          ],
        },
      },
    },
    widget3: {
      impressions: {
        value: '12',
        ofTarget: 12,
      },
      chartType: 'line',
      datasets: [
        {
          label: 'Genres',
          data: [7, 4, 2, 7, 2, 7, 7, 2, 9, 8, 12, 6, 10, 9, 8],
          fill: false,
        },
      ],
      labels: [
        'Jan 1',
        'Jan 2',
        'Jan 3',
        'Jan 4',
        'Jan 5',
        'Jan 6',
        'Jan 7',
        'Jan 8',
        'Jan 9',
        'Jan 10',
        'Jan 11',
        'Jan 12',
        'Jan 13',
        'Jan 14',
        'Jan 15',
      ],
      options: {
        spanGaps: false,
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 2,
            borderWidth: 1,
            hoverRadius: 2,
            hoverBorderWidth: 1,
          },
          line: {
            tension: 0,
          },
        },
        layout: {
          padding: {
            top: 24,
            left: 16,
            right: 16,
            bottom: 16,
          },
        },
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                // min: 100,
                // max: 500
              },
            },
          ],
        },
      },
    },
    widget4: {
      visits: {
        value: 18,
        ofTarget: -9,
      },
      chartType: 'bar',
      datasets: [
        {
          label: 'Artists',
          data: [42, 28, 27, 63, 56, 67, 31],
        },
      ],
      labels: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      options: {
        spanGaps: false,
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 24,
            left: 16,
            right: 16,
            bottom: 16,
          },
        },
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                min: 10,
                max: 70,
              },
            },
          ],
        },
      },
    },
    widget5: {
      chartType: 'line',
      datasets: {
        yesterday: [
          {
            label: 'Tracks',
            data: [19, 0, 0, 0, 0, 39, 25, 38, 41, 38, 32, 29],
            fill: 'start',
          },
        ],
        today: [
          {
            label: 'Tracks',
            data: [41, 0, 0, 0, 19, 39, 25, 38, 3, 34, 22, 29],
            fill: 'start',
          },
        ],
      },
      labels: [
        '12am',
        '2am',
        '4am',
        '6am',
        '8am',
        '10am',
        '12pm',
        '2pm',
        '4pm',
        '6pm',
        '8pm',
        '10pm',
      ],
      options: {
        spanGaps: false,
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        tooltips: {
          position: 'nearest',
          mode: 'index',
          intersect: false,
        },
        layout: {
          padding: {
            left: 24,
            right: 32,
          },
        },
        elements: {
          point: {
            radius: 4,
            borderWidth: 2,
            hoverRadius: 4,
            hoverBorderWidth: 2,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: 'rgba(0,0,0,0.54)',
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                tickMarkLength: 16,
              },
              ticks: {
                stepSize: 20,
              },
            },
          ],
        },
        plugins: {
          filler: {
            propagate: false,
          },
        },
      },
    },
    widget6: {
      markers: [
        {
          lat: 52,
          lng: -73,
          label: '120',
        },
        {
          lat: 37,
          lng: -104,
          label: '498',
        },
        {
          lat: 21,
          lng: -7,
          label: '443',
        },
        {
          lat: 55,
          lng: 75,
          label: '332',
        },
        {
          lat: 51,
          lng: 7,
          label: '50',
        },
        {
          lat: 31,
          lng: 12,
          label: '221',
        },
        {
          lat: 45,
          lng: 44,
          label: '455',
        },
        {
          lat: -26,
          lng: 134,
          label: '231',
        },
        {
          lat: -9,
          lng: -60,
          label: '67',
        },
        {
          lat: 33,
          lng: 104,
          label: '665',
        },
      ],
      styles: [
        {
          featureType: 'administrative',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#444444',
            },
          ],
        },
        {
          featureType: 'landscape',
          elementType: 'all',
          stylers: [
            {
              color: '#f2f2f2',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'all',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'all',
          stylers: [
            {
              saturation: -100,
            },
            {
              lightness: 45,
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'all',
          stylers: [
            {
              visibility: 'simplified',
            },
          ],
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'transit',
          elementType: 'all',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'all',
          stylers: [
            {
              color: '#039be5',
            },
            {
              visibility: 'on',
            },
          ],
        },
      ],
    },
    widget7: {
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: {
        Today: [
          {
            data: [92.8, 6.1, 1.1],
            change: [-0.6, 0.7, 0.1],
          },
        ],
        Yesterday: [
          {
            data: [77.2, 8.4, 14.4],
            change: [-2.3, 0.3, -0.2],
          },
        ],
        'Last 7 days': [
          {
            data: [88.2, 9.2, 2.6],
            change: [1.9, -0.4, 0.3],
          },
        ],
        'Last 28 days': [
          {
            data: [65.2, 2.6, 32.2],
            change: [-12.6, -0.7, 4.2],
          },
        ],
        'Last 90 days': [
          {
            data: [93.5, 4.2, 2.3],
            change: [2.6, -0.7, 2.1],
          },
        ],
      },
      options: {
        cutoutPercentage: 75,
        spanGaps: false,
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
      },
    },
    widget8: {
      datasets: [
        [
          {
            label: '1Day',
            data: [72, 65, 70, 78, 85, 82, 88],
            fill: false,
            borderColor: '#5c84f1',
          },
        ],
        [
          {
            label: '1Week',
            data: [540, 539, 527, 548, 540, 552, 566],
            fill: false,
            borderColor: '#5c84f1',
          },
        ],
        [
          {
            label: '1Month',
            data: [1520, 1529, 1567, 1588, 1590, 1652, 1622],
            fill: false,
            borderColor: '#5c84f1',
          },
        ],
      ],
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      options: {
        spanGaps: true,
        legend: {
          display: false,
        },
        maintainAspectRatio: true,
        elements: {
          point: {
            radius: 2,
            borderWidth: 1,
            hoverRadius: 2,
            hoverBorderWidth: 1,
          },
          line: {
            tension: 0,
          },
        },
        layout: {
          padding: {
            top: 24,
            left: 16,
            right: 16,
            bottom: 16,
          },
        },
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                // min: 100,
                // max: 500
              },
            },
          ],
        },
      },
      today: '12,540',
      change: {
        value: 321,
        percentage: 2.05,
      },
    },
    widget9: {
      rows: [
        {
          title: 'Holiday Travel',
          clicks: 3621,
          conversion: 90,
        },
        {
          title: 'Get Away Deals',
          clicks: 703,
          conversion: 7,
        },
        {
          title: 'Airfare',
          clicks: 532,
          conversion: 0,
        },
        {
          title: 'Vacation',
          clicks: 201,
          conversion: 8,
        },
        {
          title: 'Hotels',
          clicks: 94,
          conversion: 4,
        },
      ],
    },
    widget10: {
      labels: [
        'Thinking',
        'Here Comes The Sun - Remastered',
        'Animal Spirits',
        'Blimp',
        '(They Long To Be) Close To You',
      ],
      datasets: [
        {
          label: 'count',
          data: [21, 16, 8, 7, 6],
        },
      ],
      options: {
        spanGaps: true,
        legend: {
          display: false,
        },
        maintainAspectRatio: true,
        tooltips: {
          position: 'nearest',
          mode: 'index',
          intersect: false,
        },
        layout: {
          padding: {
            left: 24,
            right: 32,
          },
        },
        elements: {
          point: {
            radius: 4,
            borderWidth: 2,
            hoverRadius: 4,
            hoverBorderWidth: 2,
          },
        },
        scales: {
          xAxes: [
            {
              ticks: {
                min: 0,
                max: 25,
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                fontSize: 16,
              },
            },
          ],
        },
      },
    },
  },
};

mock.onGet('/api/analytics-dashboard-app/widgets').reply(config => {
  return [200, analyticsDashboardAppDB.widgets];
});

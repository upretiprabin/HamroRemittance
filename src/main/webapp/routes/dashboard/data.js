// chart config
import ChartConfig from 'Constants/chart-config';

// visitors data
export const visitorsData = {
   chartData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      data: [600, 500, 650, 470, 520, 700, 500, 650, 580, 500, 650, 700]
   },
   monthly: 7233,
   weekly: 5529
}

// sales data
export const salesData = {
   chartData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      data: [600, 500, 650, 470, 520, 700, 500, 650, 580, 500, 650, 700]
   },
   today: 6544,
   totalRevenue: 9125
}

// orders data
export const ordersData = {
   chartData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      data: [600, 500, 650, 470, 520, 700, 500, 650, 580, 500, 650, 700]
   },
   today: 5652,
   totalRevenue: 8520
}

// top selling products
export const topSellingProducts = {
   totalSales: '12,550',
   earning: '$35,000',
   products: [
      {
         id: 1,
         productName: 'HD Classic Gold Headphone',
         price: '300',
         productImage: require('Assets/img/device-1.jpg')
      },
      {
         id: 2,
         productName: 'HD Classic Gold Headphone',
         price: '300',
         productImage: require('Assets/img/device-2.jpg')
      },
      {
         id: 3,
         productName: 'HD Classic Gold Headphone',
         price: '300',
         productImage: require('Assets/img/device-3.jpg')
      }
   ]
}

// traffic Status
export const trafficStatus = {
   chartLabels: ['0.00', '1.0', '2.0', '3.0', '4.0', '5.0', '6.0'],
   chartDatasets: [
      {
         label: 'Series A',
         backgroundColor: ChartConfig.color.primary,
         borderColor: ChartConfig.color.primary,
         borderWidth: 1,
         hoverBackgroundColor: ChartConfig.color.primary,
         hoverBorderColor: ChartConfig.color.primary,
         data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
         label: 'Series B',
         backgroundColor: ChartConfig.color.default,
         borderColor: ChartConfig.color.default,
         borderWidth: 1,
         hoverBackgroundColor: ChartConfig.color.default,
         hoverBorderColor: ChartConfig.color.default,
         data: [45, 39, 40, 60, 35, 25, 60]
      }
   ],
   onlineSources: '3500',
   today: '17,020',
   lastMonth: '20.30%'
}

// online visitors data
export const onlineVisitorsData = {
   markers: [
      { latLng: [41.90, 12.45], name: 'Vatican City' },
      { latLng: [43.73, 7.41], name: 'Monaco' },
      { latLng: [-0.52, 166.93], name: 'Nauru' },
      { latLng: [-8.51, 179.21], name: 'Tuvalu' },
      { latLng: [43.93, 12.46], name: 'San Marino' },
      { latLng: [47.14, 9.52], name: 'Liechtenstein' },
      { latLng: [7.11, 171.06], name: 'Marshall Islands' },
      { latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis' },
      { latLng: [3.2, 73.22], name: 'Maldives' },
      { latLng: [35.88, 14.5], name: 'Malta' },
      { latLng: [12.05, -61.75], name: 'Grenada' },
      { latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines' },
      { latLng: [13.16, -59.55], name: 'Barbados' },
      { latLng: [17.11, -61.85], name: 'Antigua and Barbuda' },
      { latLng: [-4.61, 55.45], name: 'Seychelles' },
      { latLng: [7.35, 134.46], name: 'Palau' },
      { latLng: [42.5, 1.51], name: 'Andorra' },
      { latLng: [14.01, -60.98], name: 'Saint Lucia' },
      { latLng: [6.91, 158.18], name: 'Federated States of Micronesia' },
      { latLng: [1.3, 103.8], name: 'Singapore' },
      { latLng: [1.46, 173.03], name: 'Kiribati' },
      { latLng: [-21.13, -175.2], name: 'Tonga' },
      { latLng: [15.3, -61.38], name: 'Dominica' },
      { latLng: [-20.2, 57.5], name: 'Mauritius' },
      { latLng: [26.02, 50.55], name: 'Bahrain' },
      { latLng: [0.33, 6.73], name: 'São Tomé and Príncipe' }
   ],
   totalVisitors: '1655+'
}
export const txnTableData = [
   {
      "txn-id": "5efafbf1e596aa165487fd4e",
      "recipient": "Henrietta French",
      "email": "henriettafrench@boilcat.com",
      "send-country": "Nepal",
      "amount": "$1,641.15",
      "rate": 82.015,
      "fee": 25,
      "sent-date": "2019-02-25",
      "txn-status": "Awaiting Payment"
   },
   {
      "txn-id": "5efafbf16b08cb5131a08d03",
      "recipient": "Lana Montgomery",
      "email": "lanamontgomery@boilcat.com",
      "send-country": "Nepal",
      "amount": "$2,700.30",
      "rate": 82.015,
      "fee": 25,
      "sent-date": "2020-05-22",
      "txn-status": "Pending"
   },
   {
      "txn-id": "5efafbf174d3c1eb80198f85",
      "recipient": "Duran Key",
      "email": "durankey@boilcat.com",
      "send-country": "Nepal",
      "amount": "$3,472.94",
      "rate": 82.015,
      "fee": 25,
      "sent-date": "2020-01-16",
      "txn-status": "On Hold"
   },
   {
      "txn-id": "5efafbf1fdda9d8509dcc3a3",
      "recipient": "Hayes Keith",
      "email": "hayeskeith@boilcat.com",
      "send-country": "Nepal",
      "amount": "$2,845.25",
      "rate": 82.015,
      "fee": 25,
      "sent-date": "2020-03-02",
      "txn-status": "Awaiting Payment"
   },
   {
      "txn-id": "5efafbf1639264e7352129fd",
      "recipient": "Violet Dudley",
      "email": "violetdudley@boilcat.com",
      "send-country": "Nepal",
      "amount": "$3,393.08",
      "rate": 82.015,
      "fee": 25,
      "sent-date": "2020-05-13",
      "txn-status": "On Hold"
   },
   {
      "txn-id": "5efafbf1640af36d5754a64b",
      "recipient": "Lessie Edwards",
      "email": "lessieedwards@boilcat.com",
      "send-country": "Nepal",
      "amount": "$1,504.34",
      "rate": 82.015,
      "fee": 25,
      "sent-date": "2020-06-19",
      "txn-status": "Completed"
   },
   {
      "txn-id": "5efafbf1aac5c71f92c9e876",
      "recipient": "Delaney Reyes",
      "email": "delaneyreyes@boilcat.com",
      "send-country": "Nepal",
      "amount": "$2,460.75",
      "rate": 82.015,
      "fee": 25,
      "sent-date": "2019-08-03",
      "txn-status": "On Hold"
   },
   {
      "txn-id": "5efafbf16152a8766fdc33f9",
      "recipient": "White Ball",
      "email": "whiteball@boilcat.com",
      "send-country": "Nepal",
      "amount": "$3,340.91",
      "rate": 82.015,
      "fee": 25,
      "sent-date": "2020-06-27",
      "txn-status": "On Hold"
   },
   {
      "txn-id": "5efafbf1767bb490f822582b",
      "recipient": "Julia Guerra",
      "email": "juliaguerra@boilcat.com",
      "send-country": "Nepal",
      "amount": "$3,098.10",
      "rate": 82.015,
      "fee": 25,
      "sent-date": "2019-06-07",
      "txn-status": "Pending"
   },
   {
      "txn-id": "5efafbf1c5f7f3454b5d82a1",
      "recipient": "Sims Duffy",
      "email": "simsduffy@boilcat.com",
      "send-country": "Nepal",
      "amount": "$2,861.40",
      "rate": 82.015,
      "fee": 25,
      "sent-date": "2020-03-05",
      "txn-status": "Pending"
   },
   {
      "txn-id": "5efafbf11acc211c5ab9a8b7",
      "recipient": "Schwartz Stephens",
      "email": "schwartzstephens@boilcat.com",
      "send-country": "Nepal",
      "amount": "$3,363.08",
      "rate": 82.015,
      "fee": 25,
      "sent-date": "2019-10-01",
      "txn-status": "Awaiting Collection"
   },
   {
      "txn-id": "5efafbf18d4ea81cf96e6881",
      "recipient": "Brigitte Collins",
      "email": "brigittecollins@boilcat.com",
      "send-country": "Nepal",
      "amount": "$2,372.08",
      "rate": 82.015,
      "fee": 25,
      "sent-date": "2019-02-24",
      "txn-status": "Pending"
   }
]
export const txnTableColumns = [
   {
       "name": "txn-id",
       "label": "Transaction id",
       "options": {
           "filter": false,
           "sort": false
       }
   },
   {
       "name": "recipient",
       "label": "Recipient Name",
       "options": {
           "filter": true,
           "sort": false
       }
   },
   {
       "name": "email",
       "label": "Email",
       "options": {
           "filter": true,
           "sort": false
       }
   },
   {
       "name": "sent-date",
       "label": "Date",
       "options": {
           "filter": true,
           "sort": true
       }
   },
   {
       "name": "send-country",
       "label": "Country",
       "options": {
           "filter": true,
           "sort": false
       }
   },
   {
       "name": "amount",
       "label": "Amount",
       "options": {
           "filter": true,
           "sort": false
       }
   },
   {
       "name": "txn-status",
       "label": "Status",
       "options": {
           "filter": true,
           "sort": false
       }
   }
]
export const txnTableOptions = {
   filterType: 'dropdown',
   responsive: 'stacked'
};
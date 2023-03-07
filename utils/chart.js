export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: '',
    },
  },
  bezierCurve: true,
};

export const labels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const calculateData = (input) => {
  const data = {
    Jan: input.filter(
      (i) =>
        new Date(i.dateCreated).toLocaleDateString('default', {
          month: 'short',
        }) === 'Jan'
    ),
    Feb: input.filter(
      (i) =>
        new Date(i.dateCreated).toLocaleDateString('default', {
          month: 'short',
        }) === 'Feb'
    ),
    Mar: input.filter(
      (i) =>
        new Date(i.dateCreated).toLocaleDateString('default', {
          month: 'short',
        }) === 'Mar'
    ),
    Apr: input.filter(
      (i) =>
        new Date(i.dateCreated).toLocaleDateString('default', {
          month: 'short',
        }) === 'Apr'
    ),
    May: input.filter(
      (i) =>
        new Date(i.dateCreated).toLocaleDateString('default', {
          month: 'short',
        }) === 'May'
    ),
    Jun: input.filter(
      (i) =>
        new Date(i.dateCreated).toLocaleDateString('default', {
          month: 'short',
        }) === 'Jun'
    ),
    Jul: input.filter(
      (i) =>
        new Date(i.dateCreated).toLocaleDateString('default', {
          month: 'short',
        }) === 'Jul'
    ),
    Aug: input.filter(
      (i) =>
        new Date(i.dateCreated).toLocaleDateString('default', {
          month: 'short',
        }) === 'Aug'
    ),
    Sep: input.filter(
      (i) =>
        new Date(i.dateCreated).toLocaleDateString('default', {
          month: 'short',
        }) === 'Sep'
    ),
    Oct: input.filter(
      (i) =>
        new Date(i.dateCreated).toLocaleDateString('default', {
          month: 'short',
        }) === 'Oct'
    ),
    Nov: input.filter(
      (i) =>
        new Date(i.dateCreated).toLocaleDateString('default', {
          month: 'short',
        }) === 'Nov'
    ),
    Dec: input.filter(
      (i) =>
        new Date(i.dateCreated).toLocaleDateString('default', {
          month: 'short',
        }) === 'Dec'
    ),
  };

  return [
    data.Jan.map((f) => f.totalPrice).reduce((a, b) => a + b, 0),
    data.Feb.map((f) => f.totalPrice).reduce((a, b) => a + b, 0),
    data.Mar.map((f) => f.totalPrice).reduce((a, b) => a + b, 0),
    data.Apr.map((f) => f.totalPrice).reduce((a, b) => a + b, 0),
    data.May.map((f) => f.totalPrice).reduce((a, b) => a + b, 0),
    data.Jun.map((f) => f.totalPrice).reduce((a, b) => a + b, 0),
    data.Jul.map((f) => f.totalPrice).reduce((a, b) => a + b, 0),
    data.Aug.map((f) => f.totalPrice).reduce((a, b) => a + b, 0),
    data.Sep.map((f) => f.totalPrice).reduce((a, b) => a + b, 0),
    data.Oct.map((f) => f.totalPrice).reduce((a, b) => a + b, 0),
    data.Nov.map((f) => f.totalPrice).reduce((a, b) => a + b, 0),
    data.Dec.map((f) => f.totalPrice).reduce((a, b) => a + b, 0),
  ];
};

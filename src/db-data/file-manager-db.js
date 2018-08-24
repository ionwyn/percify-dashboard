import mock from './mock';

const fileManagerDB = {
  files: [
    {
      id: '1',
      name: 'Falafel',
      type: 'Tom Misch',
      owner: 'Indie Jazz',
      size: '98',
      modified: 'Cmin',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true
    },
    {
      id: '2',
      name: 'The Journey',
      type: 'Tom Misch',
      owner: 'Indie Jazz',
      size: '97',
      modified: 'Ebmin',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true
    },
    {
      id: '3',
      name: 'When You Want To Love',
      type: 'Tom Misch',
      owner: 'Indie Jazz',
      size: '105',
      modified: 'F#min',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true
    },
    {
      id: '4',
      name: 'Holding On',
      type: 'Disclosure',
      owner: 'Deep House',
      size: '124',
      modified: 'GMaj',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    },
    {
      id: '5',
      name: 'Adieu',
      type: 'Tchami',
      owner: 'Future House',
      size: '122',
      modified: 'DMaj',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    },
    {
      id: '6',
      name: 'The Wind Forest',
      type: 'Mari Fujiwara',
      owner: 'Movie Soundtrack',
      size: '86',
      modified: '',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    },
    {
      id: '7',
      name: "One Summer's Day",
      type: 'Joe Hisaishi',
      owner: 'Movie Soundtrack',
      size: '95',
      modified: '',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    },
    {
      id: '8',
      name: 'You Are Too Beautiful',
      type: 'Thelonious Monk',
      owner: 'Jazz',
      size: '78',
      modified: '',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    },
    {
      id: '9',
      name: "Can't Smile Without You",
      type: 'Carpenters',
      owner: 'Pop',
      size: '95',
      modified: 'FMaj',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    },
    {
      id: '10',
      name: 'Solace',
      type: 'Kyle Watson',
      owner: 'Deep House',
      size: '120',
      modified: 'GMin',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    },
    {
      id: '11',
      name: 'String Quartet in A Minor',
      type: 'Franz Schubert',
      owner: 'Classical',
      size: '',
      modified: '',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    }
  ]
};

mock.onGet('/api/file-manager-app/files').reply(config => {
  return [200, fileManagerDB.files];
});

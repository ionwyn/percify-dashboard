import mock from './mock';

const fileManagerDB = {
  files: [
    {
      id: '1',
      track: 'Falafel',
      artist: 'Tom Misch',
      genre: 'Indie Jazz',
      bpm: '98',
      key: 'Cmin',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true
    },
    {
      id: '2',
      track: 'The Journey',
      artist: 'Tom Misch',
      genre: 'Indie Jazz',
      bpm: '97',
      key: 'Ebmin',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true
    },
    {
      id: '3',
      track: 'When You Want To Love',
      artist: 'Tom Misch',
      genre: 'Indie Jazz',
      bpm: '105',
      key: 'F#min',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true
    },
    {
      id: '4',
      track: 'Holding On',
      artist: 'Disclosure',
      genre: 'Deep House',
      bpm: '124',
      key: 'GMaj',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    },
    {
      id: '5',
      track: 'Adieu',
      artist: 'Tchami',
      genre: 'Future House',
      bpm: '122',
      key: 'DMaj',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    },
    {
      id: '6',
      track: 'The Wind Forest',
      artist: 'Mari Fujiwara',
      genre: 'Movie Soundtrack',
      bpm: '86',
      key: '',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    },
    {
      id: '7',
      track: "One Summer's Day",
      artist: 'Joe Hisaishi',
      genre: 'Movie Soundtrack',
      bpm: '95',
      key: '',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    },
    {
      id: '8',
      track: 'You Are Too Beautiful',
      artist: 'Thelonious Monk',
      genre: 'Jazz',
      bpm: '78',
      key: '',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    },
    {
      id: '9',
      track: "Can't Smile Without You",
      artist: 'Carpenters',
      genre: 'Pop',
      bpm: '95',
      key: 'FMaj',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    },
    {
      id: '10',
      track: 'Solace',
      artist: 'Kyle Watson',
      genre: 'Deep House',
      bpm: '120',
      key: 'GMin',
      opened: 'July 8, 2017',
      created: 'July 8, 2017',
      extention: '',
      location: 'My Music',
      offline: true,
      preview: 'assets/images/etc/sample-file-preview.jpg'
    },
    {
      id: '11',
      track: 'String Quartet in A Minor',
      artist: 'Franz Schubert',
      genre: 'Classical',
      bpm: '',
      key: '',
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

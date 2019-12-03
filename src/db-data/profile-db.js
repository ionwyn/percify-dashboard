import mock from './mock';

const profileDB = {
  timeline: {
    activities: [
      {
        id: '1',
        user: {
          name: 'Alice Freeman',
          avatar: 'assets/images/avatars/alice.jpg',
        },
        message: 'started following you.',
        time: '13 mins. ago',
      },
      {
        id: '2',
        user: {
          name: 'Andrew Green',
          avatar: 'assets/images/avatars/andrew.jpg',
        },
        message: 'sent you a message.',
        time: 'June 10, 2018',
      },
      {
        id: '3',
        user: {
          name: 'Garry Newman',
          avatar: 'assets/images/avatars/garry.jpg',
        },
        message: 'shared an artist with your group.',
        time: 'June 9, 2018',
      },
      {
        id: '4',
        user: {
          name: 'Carl Henderson',
          avatar: 'assets/images/avatars/carl.jpg',
        },
        message: 'invited you to a jam session.',
        time: 'June 8, 2018',
      },
      {
        id: '5',
        user: {
          name: 'Jane Dean',
          avatar: 'assets/images/avatars/jane.jpg',
        },
        message: 'started following you.',
        time: 'June 7, 2018',
      },
      {
        id: '6',
        user: {
          name: 'Juan Carpenter',
          avatar: 'assets/images/avatars/james.jpg',
        },
        message: 'sent you a message.',
        time: 'June 6, 2018',
      },
      {
        id: '7',
        user: {
          name: 'Judith Burton',
          avatar: 'assets/images/avatars/joyce.jpg',
        },
        message: 'shared a track with you.',
        time: 'June 5, 2018',
      },
      {
        id: '8',
        user: {
          name: 'Vincent Munoz',
          avatar: 'assets/images/avatars/vincent.jpg',
        },
        message: 'shared an album with you.',
        time: 'June 4, 2018',
      },
    ],
    posts: [
      {
        id: '1',
        user: {
          name: 'Garry Newman',
          avatar: 'assets/images/avatars/garry.jpg',
        },
        message: 'I just heard your new track!  Good stuff!',
        time: '32 minutes ago',
        type: 'post',
        like: 5,
        url: 'https://soundcloud.com/ionwyn/turtle-shell',
        share: 21,
        media: {
          type: 'image',
          preview: 'assets/images/etc/early-sunrise.jpg',
        },
        comments: [
          {
            id: '1',
            user: {
              name: 'Alice Freeman',
              avatar: 'assets/images/avatars/alice.jpg',
            },
            time: 'June 10,  2018',
            message:
              'Haha I remember you made this while you were studying for finals!',
          },
        ],
      },
      {
        id: '2',
        user: {
          name: 'Andrew Green',
          avatar: 'assets/images/avatars/andrew.jpg',
        },
        message: 'Hey, man! Check this, it’s pretty awesome!',
        time: 'June 12,  2018',
        type: 'something',
        like: 98,
        url: 'https://www.youtube.com/watch?v=CpgxR_P5zs0',
        share: 6,
        article: {
          title: 'The Fallout 4 Pip-Boy Edition Is Back In Stock Now',
          subtitle: 'Kotaku',
          excerpt:
            'The Fallout 4 Pip-Boy edition is back in stock at Gamestop, for all 3 platforms. Additionally, Walmart also has it in stock for the PS4 and Xbox One as of this writing, as does Best Buy.',
          media: {
            type: 'image',
            preview: 'assets/images/etc/fallout.jpg',
          },
        },
        comments: [
          {
            id: '1',
            user: {
              name: 'Alice Freeman',
              avatar: 'assets/images/avatars/alice.jpg',
            },
            time: 'June 10,  2018',
            message: 'Great song!',
          },
        ],
      },
      {
        id: '3',
        user: {
          name: 'Carl Henderson',
          avatar: 'assets/images/avatars/carl.jpg',
        },
        message:
          'One of the best performances by Snarky Puppy!  That Cory solo!',
        time: 'June 10,  2018',
        type: 'something',
        like: 4,
        url: 'https://www.youtube.com/watch?v=lh0suC6pehc',
        share: 1,
      },
    ],
  },
  photosVideos: [
    {
      id: '1',
      name: 'June  2018',
      info: '5 Photos',
      media: [
        {
          type: 'photo',
          title: 'Mountain Sunset',
          preview: 'assets/images/etc/mountain-sunset.jpg',
        },
        {
          type: 'photo',
          title: 'Mountain Lake',
          preview: 'assets/images/etc/mountain-lake.jpg',
        },
        {
          type: 'photo',
          title: 'Hot air balloons',
          preview: 'assets/images/etc/air-balloons.jpg',
        },
        {
          type: 'photo',
          title: 'Cactus',
          preview: 'assets/images/etc/cactus.jpg',
        },
        {
          type: 'photo',
          title: 'Road Trip',
          preview: 'assets/images/etc/road-trip.jpg',
        },
      ],
    },
    {
      id: '2',
      name: 'May  2018',
      info: '7 Photos, 3 Videos',
      media: [
        {
          type: 'photo',
          title: 'Mountain Sunset',
          preview: 'assets/images/etc/mountain-sunset.jpg',
        },
        {
          type: 'photo',
          title: 'Mountain Lake',
          preview: 'assets/images/etc/mountain-lake.jpg',
        },
        {
          type: 'photo',
          title: 'Hot air balloons',
          preview: 'assets/images/etc/air-balloons.jpg',
        },
        {
          type: 'photo',
          title: 'Cactus',
          preview: 'assets/images/etc/cactus.jpg',
        },
        {
          type: 'photo',
          title: 'Road Trip',
          preview: 'assets/images/etc/road-trip.jpg',
        },
      ],
    },
    {
      id: '3',
      name: 'April  2018',
      info: '5 Photos',
      media: [
        {
          type: 'photo',
          title: 'Mountain Sunset',
          preview: 'assets/images/etc/mountain-sunset.jpg',
        },
        {
          type: 'photo',
          title: 'Mountain Lake',
          preview: 'assets/images/etc/mountain-lake.jpg',
        },
        {
          type: 'photo',
          title: 'Hot air balloons',
          preview: 'assets/images/etc/air-balloons.jpg',
        },
        {
          type: 'photo',
          title: 'Cactus',
          preview: 'assets/images/etc/cactus.jpg',
        },
        {
          type: 'photo',
          title: 'Road Trip',
          preview: 'assets/images/etc/road-trip.jpg',
        },
      ],
    },
  ],
  about: {
    general: {
      gender: 'Male',
      birthday: 'November 17th, 1995',
      locations: [
        'Vancouver, Canada',
        'Auckland, New Zealand',
        'Jakarta, Indonesia',
      ],
      about:
        'I am passionate about music, computer science, software development, and chess.',
    },
    work: {
      occupation: 'Developer',
      skills: 'JavaScript, Python, React, HTML, CSS, C++',
      jobs: [
        {
          company: 'Teradici',
          date: 'May 2018 - December 2018',
        },
      ],
    },
    contact: {
      address: '101 - 9222 University Crescent',
      tel: ['+1 604-693-5685'],
      websites: ['home.ionwyn.com'],
      emails: ['sean.ionwyn@gmail.com'],
    },
    groups: [
      {
        id: '1',
        logo: 'assets/images/logos/android.png',
        name: 'Android',
        category: 'Technology',
        members: '1.856.546',
      },
      {
        id: '2',
        logo: 'assets/images/logos/google.png',
        name: 'Google',
        category: 'Web',
        members: '1.226.121',
      },
      {
        id: '3',
        logo: 'assets/images/logos/fallout.png',
        name: 'Fallout',
        category: 'Games',
        members: '526.142',
      },
    ],
    friends: [
      {
        id: '1',
        name: 'Garry Newman',
        avatar: 'assets/images/avatars/garry.jpg',
      },
      {
        id: '2',
        name: 'Carl Henderson',
        avatar: 'assets/images/avatars/carl.jpg',
      },
      {
        id: '3',
        name: 'Jane Dean',
        avatar: 'assets/images/avatars/jane.jpg',
      },
      {
        id: '4',
        name: 'Garry Arnold',
        avatar: 'assets/images/avatars/garry.jpg',
      },
      {
        id: '5',
        name: 'Vincent Munoz',
        avatar: 'assets/images/avatars/vincent.jpg',
      },
      {
        id: '6',
        name: 'Alice Freeman',
        avatar: 'assets/images/avatars/alice.jpg',
      },
      {
        id: '7',
        name: 'Andrew Green',
        avatar: 'assets/images/avatars/andrew.jpg',
      },
    ],
  },
};

mock.onGet('/api/profile/timeline').reply(config => {
  return [200, profileDB.timeline];
});

mock.onGet('/api/profile/photos-videos').reply(config => {
  return [200, profileDB.photosVideos];
});

mock.onGet('/api/profile/about').reply(config => {
  return [200, profileDB.about];
});

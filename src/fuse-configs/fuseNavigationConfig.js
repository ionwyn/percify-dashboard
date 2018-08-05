export const fuseNavigationConfig = [
  {
    id: 'home',
    title: 'Home',
    type: 'item',
    icon: 'home',
    url: '/home'
  },
  {
    id: 'applications',
    title: 'Applications',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'dashboards',
        title: 'Dashboards',
        type: 'collapse',
        icon: 'dashboard',
        children: [
          {
            id: 'analytics-dashboard',
            title: 'Analytics',
            type: 'item',
            url: '/apps/dashboards/analytics'
          }
        ]
      },
      {
        id: 'playbackPage',
        title: 'Playback',
        type: 'item',
        icon: 'view_quilt',
        url: '/pages/playback'
      },
      {
        id: 'Discover',
        title: 'Discover',
        type: 'item',
        icon: 'search',
        url: '/apps/discover'
      }
    ]
  }
];

export const fuseNavigationConfig = [
  {
    id: 'home',
    title: 'Home',
    type: 'item',
    icon: 'home',
    url: '/home'
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics',
    icon: 'assessment',
    type: 'item',
    url: '/apps/dashboards/analytics'
  },
  {
    id: 'playbackPage',
    title: 'Playback',
    type: 'item',
    icon: 'graphic_eq',
    url: '/pages/playback'
  },
  {
    id: 'Discover',
    title: 'Discover',
    type: 'group',
    icon: 'search',
    url: '/apps/discover',
    children: [
      {
        id: 'pantherDiscover',
        title: 'Panther Discover',
        type: 'item',
        url: '/pages/panther-audio'
      },
      {
        id: 'wolfDiscover',
        title: 'Wolf Discover',
        type: 'item',
        url: '/apps/discover'
      }
    ]
  },
  {
    id: 'file-manager',
    title: 'My Music',
    type: 'item',
    icon: 'folder',
    url: '/apps/file-manager'
  }
];

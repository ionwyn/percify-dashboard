export const fuseNavigationConfig = [
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
      }
    ]
  }
];

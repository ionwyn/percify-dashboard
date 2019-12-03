const fuseSettingsConfig = {
  layout: {
    style: 'layout2',
    config: {
      scroll: 'content',
      navbar: {
        display: true,
        folded: true,
        position: 'left',
      },
      toolbar: {
        display: false,
        style: 'fixed',
        position: 'below',
      },
      footer: {
        display: true,
        style: 'fixed',
        position: 'below',
      },
      mode: 'fullwidth',
    },
  },
  customScrollbars: true,
  theme: {
    main: 'sunset',
    navbar: 'mainThemeDark',
    toolbar: 'mainThemeDark',
    footer: 'mainThemeDark',
  },
};

export default fuseSettingsConfig;

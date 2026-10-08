module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Introduzione',
      link: { type: 'doc', id: 'intro/index' },
      items: ['intro/moduli', 'intro/requisiti', 'intro/roadmap'],
    },
    {
      type: 'category',
      label: 'Server owner',
      link: { type: 'doc', id: 'server-owner/index' },
      items: [
        'server-owner/installazione',
        'server-owner/configurazione',
        'server-owner/personaggi',
        'server-owner/lavori',
        'server-owner/organizzazioni',
        'server-owner/permessi',
        'server-owner/pannello-staff',
        'server-owner/banca',
        'server-owner/temi',
        'server-owner/manutenzione',
      ],
    },
    {
      type: 'category',
      label: 'Sviluppatori',
      link: { type: 'doc', id: 'sviluppatori/index' },
      items: [],
    },
    {
      type: 'category',
      label: 'Riferimento',
      link: { type: 'doc', id: 'riferimento/index' },
      items: [],
    },
  ],
};

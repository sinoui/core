const modalConfig = {
  enablePortal: process.env.NODE_ENV !== 'test',
  reset: () => {
    modalConfig.enablePortal = process.env.NODE_ENV !== 'test';
  },
};

export default modalConfig;

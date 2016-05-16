export const firstReceivedImmInfo = (immunizationName) => {
  return document
          .querySelector('.pediatric-immunizations-schedule__row--' + immunizationName)
          .querySelector('.received__info')
          .innerHTML;
};

export const receivedImmInfo = (immunizationName) => {
  return document
          .querySelector('.pediatric-immunizations-schedule__row--' + immunizationName)
          .querySelectorAll('.received__info');

};

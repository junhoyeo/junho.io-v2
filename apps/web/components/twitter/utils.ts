export const cleanTwitterId = (tweetId: string) => {
  // eslint-disable-next-line prefer-named-capture-group
  const [id] = /(\d+)\/?$/.exec(tweetId.split('?')[0] || '') || [];
  return id;
};

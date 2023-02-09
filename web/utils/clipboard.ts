export const copyToClipboard = (val: string): void => {
  const textarea = document.createElement('textarea');
  document.body.appendChild(textarea);

  textarea.value = val;
  textarea.select();

  document.execCommand('copy');
  document.body.removeChild(textarea);
};

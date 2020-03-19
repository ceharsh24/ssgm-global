const TextModifier = text => {
  const splitTitle = text.replace(/([A-Z])/g, ' $1');
  const finalTitle = splitTitle.charAt(0).toUpperCase() + splitTitle.slice(1);
  return finalTitle;
};

export default TextModifier;

export function clean(string) {
  return string
    .replace('false', '')
    .replace('undefined', '')
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function tw(styles) {
  if (typeof styles === 'string') {
    return clean(styles);
  }

  const cloned = { ...styles };

  for (const style in styles) {
    if (typeof styles[style] === 'string') {
      cloned[style] = clean(styles[style]);
    } else if (typeof styles[style] === 'object') {
      cloned[style] = clean(styles[style].join(' '));
    } else {
      cloned[style] = styles[style];
    }
  }

  return cloned;
}

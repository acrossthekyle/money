export default function imageLoader({ src, width, quality }) {
  const transformations = src.includes('?tr') ? '' : `?tr=w-${width}&q-${quality || 75}`;

  return `${src}${transformations}`;
}

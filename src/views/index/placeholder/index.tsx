import { getDay, parseISO } from 'date-fns';
import Image from 'next/image';

import tw from '@/styles';
import { image } from '@/utils';

type Props = {
  date: string;
};

const IMAGES = {
  0: image('0ff819d4-929a-45f0-be80-43efd6398d92', 'projects/basalt/gallery'),
  1: image('5f28281c-9629-4d01-a31f-92ab02b1623f', 'projects/basalt/gallery'),
  2: image('317a4482-9b30-465d-98e9-5998ccb9b048', 'projects/basalt/gallery'),
  3: image('69393bfa-f87d-4089-82bd-acd77d1c7cd9', 'projects/basalt/gallery'),
  4: image('85635028-9b53-4d12-affd-75b872ce013c', 'projects/basalt/gallery'),
  5: image('c75518a8-d1f1-4abd-ba0c-158213a9e017', 'projects/basalt/gallery'),
  6: image('fe077c95-b230-41b7-a4af-70bdbe05e892', 'projects/basalt/gallery'),
};

export default function Section({ date }: Props) {
  const key = getDay(parseISO(date));

  return (
    <figure aria-label="image of the day" className={styles.container}>
      <Image
        className={styles.image}
        src={IMAGES[key]}
        width={458}
        height={732}
      />
      <figcaption className={styles.caption}>
        Image Credit: magnific.com
      </figcaption>
    </figure>
  );
};

const styles = tw({
  container: `
    col-start-9 row-start-3 col-span-8 row-span-8
    relative
    rounded-xl
    overflow-hidden
    border border-current/7.5
  `,
  image: `
    w-full h-full
    object-cover
    grayscale
  `,
  caption: `
    absolute bottom-4 right-4
    text-xtiny text-white
    uppercase
    tracking-wide
    font-roboto font-bold
    leading-[0.8]
  `,
});

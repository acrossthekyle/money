import Image from 'next/image';

import tw from '@/styles';
import { image } from '@/utils';

export default function Section() {
  return (
    <figure aria-label="image of the day" className={styles.container}>
      <Image
        alt=""
        className={styles.image}
        src={image('317a4482-9b30-465d-98e9-5998ccb9b048', 'projects/basalt/gallery')}
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
    hidden
    col-start-13 row-start-1 col-span-12 row-span-2
    mx-4
    relative
    rounded-xl
    overflow-hidden
    border border-current/7.5

    lg:block
    lg:mx-10
    lg:col-start-9
    lg:row-start-2
    lg:row-span-9
    lg:col-span-8
    lg:mt-4
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

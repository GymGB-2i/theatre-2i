import Image from 'next/image';
import Text from './text.js';

export default function AboutCard({ title, text, image, altImage }) {
  return (
    <div className="m-3 overflow-hidden flex flex-col shadow-md rounded-lg items-start justify-start">
      <div className="">
        <Image src={image} alt={`Bild von ${title}`} height={600} width={600} layout='responsive'/>
      </div>
      <div className="m-5 flex flex-col items-start max-w-full">
          <Text text={title} variant={'h1'}/>
        <Text text={text} variant={'full text'}/>
      </div>
    </div>
  );
}
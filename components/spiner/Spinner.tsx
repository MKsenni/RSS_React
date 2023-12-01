import Image from 'next/image';

export default function Spinner() {
  return (
    <>
      <Image
        width={60}
        height={60}
        src="/spinner.gif"
        alt="loading"
        style={{ margin: '20px' }}
      />
    </>
  );
}

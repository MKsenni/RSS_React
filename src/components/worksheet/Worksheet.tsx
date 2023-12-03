import { Data } from '../../data/constants';

const Worksheet = ({ data }: { data: Data[] }) => {
  const getImage = (base64: string) => {
    const checkBase64 = base64.match(/^data:image\/([a-zA-Z+]+);base64,/);
    if (checkBase64 && checkBase64[1]) {
      return checkBase64[1];
    }
    return null;
  };

  return (
    <>
      {data.map((item: Data, idx) => (
        <ul
          className={
            idx === data.length - 1 ? 'text-pink-600' : 'text-indigo-600'
          }
          key={idx}
        >
          <li>{item.name}</li>
          <li>{item.age}</li>
          <li>{item.gender}</li>
          <li>{item.email}</li>
          <li>{item.password}</li>
          <li>{item.confirmPassword}</li>
          <li>{item.accept}</li>
          <li>{item.country}</li>
          <li>
            <img
              width={80}
              height={80}
              src={`data:image/${getImage(item.image)};base64,${item.image}`}
              alt="your image"
            />
          </li>
        </ul>
      ))}
    </>
  );
};

export default Worksheet;

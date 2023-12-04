import { Data } from '../../services/types';

const Worksheet = ({ data }: { data: Data[] }) => {
  return (
    <>
      <div className="flex flex-wrap gap-5">
        {data.map((item: Data, idx) => (
          <ul
            className={`${
              idx === data.length - 1 ? 'text-pink-600' : 'text-indigo-600'
            } border-4 rounded border-indigo-700 p-4`}
            key={idx}
          >
            <li>
              <b>Name: </b> {item.name}
            </li>
            <li>
              <b>Age:</b> {item.age}
            </li>
            <li>
              <b>Gender:</b> {item.gender}
            </li>
            <li>
              <b>E-mail:</b> {item.email}
            </li>
            <li>
              <b>Password:</b> {item.password}
            </li>
            <li>
              <b>Confirm password:</b> {item.confirmPassword}
            </li>
            <li>
              <b>Accept:</b> {item.accept}
            </li>
            <li>
              <b>Country:</b> {item.country}
            </li>
            <li>
              <img width={80} height={80} src={item.image} alt="your image" />
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default Worksheet;

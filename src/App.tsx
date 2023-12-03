import { Link } from 'react-router-dom';
import './App.css';
import { useAppSelector } from './redux/hooks';

export default function App() {
  const country = useAppSelector((state) => state.countries.selectCountry);
  return (
    <>
      <Link to="useHookForm">useHookForm</Link>
      <Link to="uncontrolledElements">uncontrolledElements</Link>
      <p>{country}</p>
    </>
  );
}

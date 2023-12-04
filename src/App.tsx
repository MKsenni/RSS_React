import { Link } from 'react-router-dom';
import './App.css';
import { useAppSelector } from './redux/hooks';
import Worksheet from './components/worksheet/Worksheet';
import { Data } from './services/types';

export default function App() {
  const data: Data[] = useAppSelector((state) => state.data.data);
  return (
    <>
      <Link to="useHookForm">useHookForm</Link>
      <Link to="uncontrolledElements">uncontrolledElements</Link>
      <Worksheet data={data} />
    </>
  );
}

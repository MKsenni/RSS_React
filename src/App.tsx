import './App.css';
import Results from './components/results/Results';
import Search from './components/search/Search';
import { SearhWord } from './context';

export default function App() {
  return (
    <>
      <SearhWord>
        <Search />
        <Results />
      </SearhWord>
    </>
  );
}

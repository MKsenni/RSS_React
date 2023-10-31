import { ReactNode } from 'react';
import './App.css';
import React from 'react';
import { Description, getPeople, searchPeople } from './api/actions';
import { Spinner } from './components/spinner';
import Card from './components/Card';

type AppProps = Record<string, never>;

type AppState = {
  searchWord: string;
  searchResult?: Description;
  isLoading: boolean;
  hasError: boolean;
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      searchWord: localStorage.getItem('searchWord') || '',
      searchResult: undefined,
      isLoading: false,
      hasError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const searchWord = this.state.searchWord;
    this.setState({ isLoading: true });
    if (searchWord) {
      const people = await searchPeople(searchWord);
      this.setState({ searchResult: people });
    } else {
      await this.startPage();
    }
    this.setState({ isLoading: false });
  }

  componentWillUnmount(): void {
    localStorage.setItem('searchWord', this.state.searchWord);
  }

  async startPage(): Promise<void> {
    const allPeople = await getPeople();
    this.setState({ searchResult: allPeople });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const searchWord: string = event.target.value;
    this.setState({ searchWord });
  }

  async handleSearch(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const searchWord: string = this.state.searchWord.toUpperCase().trim();
    this.setState({ isLoading: true });
    const people = await searchPeople(searchWord);
    this.setState({ searchResult: people });
    localStorage.setItem('searchWord', searchWord);
    this.setState({ isLoading: false });
  }
  render(): ReactNode {
    if (this.state.hasError) throw new Error('Test Error Boundary');
    return (
      <>
        <h1 className="title">
          Star Wars <p className="subtitle">: heroes</p>
        </h1>
        <section className="search-field">
          <form onSubmit={this.handleSearch}>
            <input
              type="text"
              value={this.state.searchWord.toUpperCase()}
              onChange={this.handleChange}
            />
            <input type="submit" value="search" />
          </form>
          <button
            onClick={(event) => {
              event.preventDefault();
              this.setState({ hasError: true });
            }}
          >
            Error Boundary
          </button>
        </section>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <section>
            <div className="cards">
              {this.state.searchResult &&
                (this.state.searchResult.length >= 1 ? (
                  this.state.searchResult?.map((person, index) => {
                    return <Card person={person} key={index} />;
                  })
                ) : (
                  <h2>No Results</h2>
                ))}
            </div>
          </section>
        )}
      </>
    );
  }
}

export default App;

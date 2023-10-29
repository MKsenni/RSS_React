import { ReactNode } from 'react';
import './App.css';
import React from 'react';
import { Description, getPeople, searchPeople } from './api/actions';

type AppProps = Record<string, never>;

type AppState = {
  searchWord: string;
  searchResult?: Description;
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      searchWord: localStorage.getItem('searchWord') || '',
      searchResult: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const searchWord = this.state.searchWord;
    if (searchWord) {
      const people = await searchPeople(searchWord);
      this.setState({ searchResult: people });
    } else {
      await this.startPage();
    }
  }

  componentDidUpdate(/*prevProps: Readonly<AppProps>, prevState: Readonly<AppState>, snapshot?: any*/): void {}

  componentWillUnmount(): void {
    localStorage.setItem('searchWord', this.state.searchWord);
  }

  async startPage() {
    const allPeople = await getPeople();
    console.log(allPeople);
    this.setState({ searchResult: allPeople });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const searchWord: string = event.target.value;
    this.setState({ searchWord });
  }

  async handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const searchWord: string = this.state.searchWord.toUpperCase().trim();
    const people = await searchPeople(searchWord);
    this.setState({ searchResult: people });
    localStorage.setItem('searchWord', searchWord);
  }
  render(): ReactNode {
    return (
      <>
        <section>
          <form onSubmit={this.handleSearch}>
            <input
              type="text"
              value={this.state.searchWord.toUpperCase()}
              onChange={this.handleChange}
            />
            <input type="submit" value="search" />
          </form>
        </section>
        <section>
          <div className="cards">
            {this.state.searchResult &&
              this.state.searchResult?.map((person, index) => {
                return (
                  <div className="card" key={index}>
                    <span className="card-name">Name: {person.name}</span>
                    <span className="card-gender">Gender: {person.gender}</span>
                    <span className="card-birth">
                      Year: {person.birth_year}
                    </span>
                    <span className="card-mass">Mass: {person.mass}</span>
                    <span className="card-height">Height: {person.height}</span>
                  </div>
                );
              })}
          </div>
        </section>
      </>
    );
  }
}

export default App;

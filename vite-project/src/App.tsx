import { ReactNode } from 'react';
import './App.css';
import React from 'react';
import { Description, getPeople, searchPeople } from './api/actions';

type AppProps = {}

type AppState = {
  searchWord: string,
  searchResult?: Description,
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      searchWord: '',
      searchResult: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount(): void {
    this.startPage();
  }

  componentWillUnmount(): void {}

  async startPage() {
    const allPeople = await getPeople();
    console.log(allPeople);
    
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const searchPerson: string = event.target.value;
    this.setState({
      searchWord: searchPerson,
    });
    localStorage.setItem('searchPerson', searchPerson);
  }

  async handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const searchWord: string = this.state.searchWord.toLowerCase().trim();
    const people = await searchPeople(searchWord);
    this.setState({searchResult: people})
  }
  render(): ReactNode {
    return (
      <>
      <section>
        <form onSubmit={this.handleSearch}>
          <input type="text" value={this.state.searchWord} onChange={this.handleChange}/>
          <input type="submit" value='search'/>
        </form>
      </section>
      <section>
        <div className='cards'>
          {this.state.searchResult?.map((person, index) => {
            return (
              <div className='card' key={index}>
                <span className='card-name'>Name: {person.name}</span>
                <span className='card-gender'>Gender: {person.gender}</span>
                <span className='card-birth'>Year: {person.birth_year}</span>
                <span className='card-mass'>Mass: {person.mass}</span>
                <span className='card-height'>Height: {person.height}</span>
              </div>

            )
          })}
        </div>
      </section>
      </>
    );
  }
}

export default App;

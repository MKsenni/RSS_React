import React, { Component } from 'react';
import { Description } from '../api/actions';

type SearchProps = {
  searchWord: string;
  searchResult?: Description;
  onUpdateWord: (searchWord: string) => void;
};
type SearchState = {
  searchWord: string;
};

export default class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);

    this.state = {
      searchWord: this.props.searchWord,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const searchWord: string = event.target.value;
    this.setState({ searchWord });
    this.props.onUpdateWord(searchWord);
  }

  render() {
    return (
      <>
        <input
          type="text"
          value={this.state.searchWord.toUpperCase()}
          onChange={this.handleChange}
        />
        <input type="submit" value="search" />
      </>
    );
  }
}

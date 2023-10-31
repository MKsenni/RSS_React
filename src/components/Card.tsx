import React from 'react';

type CardProps = {
  person: {
    name: string;
    gender: string;
    birth_year: string;
    height: string;
    mass: string;
  };
};
type CardState = Record<string, never>;

export default class Card extends React.Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
  }
  render() {
    return (
      <div className="card">
        <div className="text-container">
          <span className="card-name">Name: {this.props.person.name}</span>
          <span className="card-gender">
            Gender: {this.props.person.gender}
          </span>
          <span className="card-birth">
            Year: {this.props.person.birth_year}
          </span>
          <span className="card-mass">Mass: {this.props.person.mass}</span>
          <span className="card-height">
            Height: {this.props.person.height}
          </span>
        </div>
      </div>
    );
  }
}

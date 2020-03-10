import React from 'react';
import ReactDOM from 'react-dom';

const fetchPokemon = id => 
fetch(
  `https://pokeapi.co/api/v2/pokemon/${id}/`
).then(res => res.json());

const withPokemon = Component => 

  class FetchPokemon extends React.Component {
    constructor() {
      super();
      this.state = { chatacter: null }
    }

    static defaultProps = {
      renderLoading: () => <div>Loading ... </div>
    }

    componentDidMount() {
      fetchPokemon(this.props.id).then(data => 
      this.setState({ character: data })
      );
    }
    componentWillReceiveProps(nextProps) {
      fetchPokemon(nextProps.id).then(data => 
        this.setState({ character: data}))
    }
    render() {
      return this.state.character ? (
        <Component character={this.state.character} />
      ) : (this.props.renderLoading()
      );
    }
  }

  const Pokemon = props => (
    <div>
      <h1>{props.character.name}</h1>
      <ul>
        {props.character.abilities.map(ability => (
          <li key={ability.ability.name}>
            {ability.ability.name}
          </li>
        ))}
      </ul>
    </div>
  );
 

class IdPager extends React.Component {
  constructor() {
    super();
    this.state = { id: 1 }
  }
  render() {
    return this.props.render(
      { id: this.state.id },
      {
        increment: () => this.setState(prevState => ({ 
          id: prevState.id + 1 
        })),
        decrement: () => this.setState(prevState => ({ 
          id: prevState.id - 1 
        }))
      }
    );
  }
}

const FetchPokemon = withPokemon(Pokemon)

ReactDOM.render(
  <IdPager render = {(props, actions) => (
    <div>
      <button
        type="button"
        onClick={actions.decrement} 
        >Previous
        </button>
      <button
        type="button"
        onClick={actions.increment} 
        >
        Next
      </button>
    <FetchPokemon 
    renderLoading={() => <h1>Fetching Pokemon!</h1> } 
    id={props.id} 
    /> 
    </div>
    )} 
  />, 
  document.getElementById("root")
  );
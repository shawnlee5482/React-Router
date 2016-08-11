var React = require('react')
var ReactDOM = require('react-dom')
var ReactRouter = require('react-router');
var Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    hashHistory = ReactRouter.hashHistory;
var Link = ReactRouter.Link;

// This file holds our JSON array of turtles
var data = require('./data.json');

var NinjaList = React.createClass({
  render: function(){
    console.log('this.props.turtles: ', this.props.turtles);
    var ninjas = this.props.turtles.map(function(turtle, idx){
      return (
        <li key={idx}>
          <Link to={'ninjas/' + turtle.id}>{turtle.name}</Link>
        </li>        
        // <li key={idx}>
        //   <a href="#">{turtle.name}</a>
        // </li>
      )
    })
    return (
      <ul>
        {ninjas}
      </ul>
    )
  }
});

var NinjaComponent = React.createClass({
    render: function (){
    console.log('in NinjaComponent render: ', this.props.route.data);      
        return (
          <div>
            <h1>Greetings Ninja!</h1>
            <h2>Click on a ninja for more information</h2>
            <NinjaList turtles={this.props.route.data}/>
            {this.props.children}            
          </div>
        )
    }
});

// ReactDOM.render(<NinjaComponent data={data}/>, document.getElementById('app'));

function NinjaDescription(props){
  // Here's the route parameter (notice it's a string)
  var routeID = props.params.id
  // Let's pass it into the method our Route parent provided and assign the result to a variable
  var ninja = props.route.fetchTurtle(parseInt(routeID))
  setTimeout(function() { hashHistory.push('ninjas')}, 3000);

  return(
    <div>
      <h1>{ninja.name}</h1>
      <p>{ninja.description}</p>
      // <Link to='/ninjas'>Back</Link>
    </div>
  )
}

var App = React.createClass({
  fetchTurtle: function(id) {
    // Filter the array of turtles by the id and return the first element of the resulting array
    return this.props.data.filter(function(ninja){
      return (ninja.id === id)
    })[0]
  },  
  render: function(){
    console.log('in App render: ', this.props.data);
    var IndexRoute = ReactRouter.IndexRoute;
    return (

      <Router history={hashHistory}>
        <Route path='/ninjas'>
          <IndexRoute component={NinjaComponent} data={this.props.data}/>
          <Route path=':id' component={NinjaDescription} fetchTurtle={this.fetchTurtle}/>
        </Route>
      </Router>
    )
  }
});

ReactDOM.render(<App data={data}/>, document.getElementById('app'))

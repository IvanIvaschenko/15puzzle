import React, { Component } from 'react'

class Game extends Component {
  constructor(props) {
   super(props);
   this.state = {
     collums: 4,
     winCombination:[],
     gameCombination:[]
   };
 }

 componentDidMount() {
   this.createBoard();
   window.addEventListener('keydown', this.move.bind(this))
}

move(e){
  switch (e.keyCode) {
    case 39:
      console.log('left');
      break;
    case 37:
      console.log('right');
      break;
    case 40:
      console.log('top');
      break;
    case 38:
      console.log('down');
      break;
    default: console.log(e.keyCode); return false;

  }
}

 createBoard(){
   let size = this.state.collums*this.state.collums,
   arr = [],
   gameCombination=[];

   for (var i = 0, k = 1; i < size-1; i++, k++) {
     arr[i]=k;
   }

   gameCombination=arr.sort(()=>{ return Math.random()-.5; }).concat(0);

   this.setState({
     winCombination: arr,
     gameCombination: gameCombination
   })
 }

 createGame(){
  return  this.state.gameCombination.map((item, index)=>
    <div key={index} className={item==0 ? 'game-block hole' : 'game-block'}>{item}</div>)
}

  render() {
    return (
      <div className='board'>
        {this.createGame()}
      </div>
    );
  }
}

export default Game;

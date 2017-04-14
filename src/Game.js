import React, { Component } from 'react'

class Game extends Component {
  constructor(props) {
   super(props);
   this.state = {
     collums: 4,
     winCombination:[],
     gameCombination:[],
     test:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
   };
 }

 componentDidMount() {
   this.createBoard();
   window.addEventListener('keydown', this.move.bind(this))
}

move(e){
  let arr = this.state.gameCombination,
  num1=arr.indexOf(0)

  switch (e.keyCode) {
    case 39:
      this.swapCells(num1,num1-1);
      break;
    case 37:
      this.swapCells(num1, num1+1);
      break;
    case 40:
      this.swapCells(num1, num1-4);
      break;
    case 38:
      this.swapCells(num1, num1+4);
      console.log('down');
      break;
    default: console.log(e.keyCode); return false;

  }
}

checkWin(){
  let arr = this.state.gameCombination.slice(0, 16);
  return  this.arr.every((item,index)=>{
    if (item===index+1) {
      return true
    }

    return false;
  })
}

swapCells(arg1, arg2){
  let arr= this.state.gameCombination,
  elem1 = arr[arg1],
  newElem1=arr[arg1] = arr[arg2],
  newElem2=arr[arg2] = elem1;
  return  this.setState({
      gameCombination: arr
  })
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

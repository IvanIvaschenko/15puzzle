import React, { Component } from 'react'

class Game extends Component {
  constructor(props) {
   super(props);
   this.state = {
     collums: 3,
     gameCombination:[]
   };
 }

 //вешаем обработчик и создаем игровое поле
 componentDidMount() {
   window.addEventListener('keydown', this.move.bind(this))
   this.createBoard(3);
}

//проверка на решаемость
isSolvable(arr){
    for (var count = 0, i = 1, len = arr.length-1; i < len; i++){
      for (var j = i-1; j >= 0; j--){
        if (arr[j] > arr[i]){
          count++;
        }
      }
    }

    return !(count % 2);
  }

//изменение ширины игрового поля
changeBoardWidth(col){
  switch (col) {
    case 3:
      return this.refs.board.style.width = '420px'
      break;
    case 4:
      return this.refs.board.style.width = '480px'
      break;
    case 5:
      return this.refs.board.style.width = '660px'
      break;
  }
}

//создание игрового поля
createBoard(col){
  let size = Math.pow(col, 2),
  arr = [],
  gameCombination=[];
  this.changeBoardWidth(col);

  for (var i = 0, k = 1; i < size-1; i++, k++) {
    arr[i]=k;
  }

  gameCombination=arr.sort(()=>{ return Math.random()-.5; }).concat(0);
  this.setGameParams(gameCombination, col);

  if (!this.isSolvable(gameCombination)) {
    return this.swapCells(0, 1, gameCombination);
  }
}

//создаем дивы
createGame(){
 return  this.state.gameCombination.map((item, index)=>
   <div key={index} className={item==0 ? 'game-block hole' : 'game-block'}><h1>{item}</h1></div>)
 }

//изменение параметров в стейте
setGameParams(arr, num){
  return this.setState({
    gameCombination: arr,
    collums: num
  })
}

//обработка наших движений
move(e){
  let arr = this.state.gameCombination,
  num1=arr.indexOf(0),
  index= this.state.collums

  switch (e.keyCode) {
    case 39:
      if (Math.floor(num1/index) !== Math.floor((num1-1)/index)) return false;
        return  this.swapCells(num1,num1-1);
      break;

    case 37:
      if (Math.floor(num1/index) !== Math.floor((num1+1)/index)) return false;
        return this.swapCells(num1, num1+1);
      break;

    case 40:
      if (!arr[num1-index]) return false;
        this.swapCells(num1, num1-index);
      break;

    case 38:
      if (!arr[num1+index]) return false;
        this.swapCells(num1, num1+index);
      break;
  }
}

//проверка не выиграна ли игра
checkWin(arr=this.state.gameCombination){
  let len = arr.length,
  res= this.state.gameCombination.slice(0, len-1);
  if (len===0) {
    return false;
  }
  return res.every((item,index)=>{
    if (item===index+1) {
      return true;
    }

    return false;
  })
}

//приветствие в случае если игра выиграна
showGreeting(){
  this.refs.greeting.style.display = 'block';
  setTimeout(()=>{ this.refs.greeting.style.display = 'none'}, 2500)
  this.createBoard(this.state.collums);
}

//изменение местами двух ячеек и проверка на победу
swapCells(arg1, arg2, arr =this.state.gameCombination){
  let  elem1 = arr[arg1],
  newElem1=arr[arg1] = arr[arg2],
  newElem2=arr[arg2] = elem1,
  win;

  this.setState({
      gameCombination: arr
  })

  if (this.checkWin()) {
    return  this.showGreeting();
  }

  return false;
}

  render() {
    return (
      <div>
        <h1 className='greeting' ref='greeting'>YOU WIN!</h1>
          <div className='change-level-button'>
            <button onClick={this.createBoard.bind(this,5)} >5x5</button>
            <button onClick={this.createBoard.bind(this,3)} >3x3</button>
            <button onClick={this.createBoard.bind(this,4)} >4x4</button>
          </div>
          <div className="board" ref='board'>
              {this.createGame()}
          </div>
        </div>
    );
  }
}

export default Game;

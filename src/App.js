import './App.css';
import React, {useState} from 'react';
import ChooseProduct from './components/chooseProduct';
import ListProduct from './components/listProduct';

export default function App() {

  const [bought, setBought] = useState();

  return (
    <div className='vending-machine'>
      <ListProduct bought={bought}/>
      <ChooseProduct setBought={setBought} />
    </div>
  )

}



import { useState, useEffect } from 'react';
import productos from '../Utils/Productos.json';
import Item from '../Items/Items.jsx'

const fakeApiCall = (productos) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(productos);
    }, 1000);
  });
};

const ItemsList = () => {
  const [productsCharged, setProductsCharged] = useState([]);

  useEffect(() => {
    fakeApiCall(productos).then(resp => setProductsCharged(resp));
  }, []);

  console.log(productsCharged)
  return (
    <div>
      {
        productsCharged.productos > 0 && productsCharged.productos.map((index, item) => {
            return <Item key={index} item={item}/>
        })
      }
    </div>
  );

};

export default ItemsList;

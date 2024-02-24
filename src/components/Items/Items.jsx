/*import useState from 'react';*/

const Items = () => {

  const productoPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const productos = [
        {nombre:'Thinkpad-x60', price: 150, img: self.nombre + 'img'},
        {nombre:'Thinkpad-T61', price: 2000, img: self.nombre + 'img'},
        {nombre:'Thinkpad-X200', price: 2000, img: self.nombre + 'img'},
        {nombre:'Thinkpad-X1-Carbon', price: 2500, img: self.nombre + 'img'}
      ]

      resolve(productos);
    }, 3000);
  });

}

// export default Items;      

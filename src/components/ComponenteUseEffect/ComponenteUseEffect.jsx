import { useEffect, useState} from 'react';

const ComponenteUseEffect = () => {
  const [count, setCount] = useState(0);
  useEffect(()=> {
    console.log(`El count es ${count}`)
  }, [count])

  return (
    <div>
      <p>`El valor del count es %{count}`</p>
       <button onClick={()=>setCount(count + 1)}>Click me!</button>
    </div>
  )
};

export default ComponenteUseEffect;

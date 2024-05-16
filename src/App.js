
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [images,setImages] = useState([]);
  const [idx,setIdx] = useState(0);
  const fetchImages = async () => {
 const url = 'https://www.reddit.com/r/aww/top/.json?t=all';
 const res = await fetch(url);
 const result = await res.json();
 const data = result.data.children;
 const list = data.filter((item) => {
  return item.data.url_overridden_by_dest.includes('.jpg')
  }).map((item) => {
   return item.data.url_overridden_by_dest
 });
 setImages(list);
  }

  useEffect(()=>{
   fetchImages();
  },[])
  const handleClick = (dir) =>{
  const lastIndex = images.length - 1;
  if(dir === 'left'){
    if(idx === 0 ){
      setIdx(lastIndex);
    }else{
      setIdx((idx) => idx - 1);
    }
  }else if(dir === 'right'){
    if(idx === lastIndex){
      setIdx(0);
    }else{
      setIdx((idx) => idx + 1);
    }
  }

  }
  useEffect(()=>{
    const tid = setInterval(()=>{
     handleClick('right');
    },1000);
    return () =>{clearInterval(tid)};

  },[idx])
  return (
    <div className="App">
    <button onClick={()=>handleClick('left')}>
      {"<"}
    </button>
    <img src = {images[idx]} alt = 'not found' />
    <button className='right' onClick={()=>handleClick('left')}>
      {">"}
    </button>
    </div>
  );
}

export default App;

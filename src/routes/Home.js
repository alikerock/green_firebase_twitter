import React, { useEffect, useState } from "react";
import {db} from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore"; 

const Home = () => {
  const[post, setPost] = useState('');
  const onChange = (e) =>{
    //let value = e.target.value
    const {target:{value}} = e;
    setPost(value);
  }
  const onSubmit = async (e) =>{
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        post,
        date:serverTimestamp()
      });
      setPost('');
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  }
  const getPosts = async () =>{
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data().post);
    });
  }
  useEffect(()=>{
    getPosts();
  },[]);

  return(
    <div>
      <form action="" onSubmit={onSubmit}>
        <input type="text" value={post} placeholder="Write your twitt" onChange={onChange} />
        <input type="submit" value="Add Post"/>
      </form>
    </div>
  )
}

export default Home;
import React, { useEffect, useState } from "react";
import {db} from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore"; 
import Post from "../components/Post";

const Home = ({userObj}) => {
  
  const[post, setPost] = useState('');
  const[posts, setPosts] = useState([]);

  const onChange = (e) =>{
    //let value = e.target.value
    const {target:{value}} = e;
    setPost(value);
  }
  const onSubmit = async (e) =>{
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        content:post,
        date:serverTimestamp(),
        uid:userObj
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
      //console.log(doc.data().post);
      const postObj = {
        ...doc.data(),
        id:doc.id
      }
      setPosts(prev => [postObj, ...prev])
    });
  }
  console.log(posts);

  useEffect(()=>{
    getPosts();
  },[]);

  return(
    <div>
      <form action="" onSubmit={onSubmit}>
        <input type="text" value={post} placeholder="Write your twitt" onChange={onChange} />
        <input type="submit" value="Add Post"/>
      </form>
      <ul>
        {
          posts.map(list =><Post key={list.id} postObj={list.content}/>)
        }
      </ul>
    </div>
  )
}

export default Home;
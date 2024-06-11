import React, { useEffect, useState } from "react";
import {db} from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs, onSnapshot, query, orderBy } from "firebase/firestore"; 
import Post from "../components/Post";

const Home = ({userObj}) => {
  console.log(userObj);
  const[post, setPost] = useState('');
  const[posts, setPosts] = useState([]);
  const[attachment, setAttachment] = useState();

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
  /*
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
  */
  console.log(posts);

  useEffect(()=>{
    const q = query(collection(db, "posts"),orderBy('date','desc'));
    onSnapshot(q, (querySnapshot) => {  
      const postArr = querySnapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
      }));      
      setPosts(postArr);
    });

    //getPosts();
  },[]);

  const onFileChange = (e) =>{
    //console.log(e.target.files);
    const {target:{files}} = e;
    const theFile = files[0];
    //console.log(theFile);
    const reader = new FileReader();
    reader.onloadend = (e) =>{
      console.log(e.target.result);
      const {target:{result}} = e;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }

  return(
    <div>
      <form action="" onSubmit={onSubmit}>
        <input type="text" value={post} placeholder="Write your twitt" onChange={onChange} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        {attachment && <img src={attachment} width="50" alt=""/>}
        <input type="submit" value="Add Post"/>
      </form>
      <ul>
        {
          posts.map(list =><Post key={list.id} postObj={list} isOwener={list.uid === userObj}/>)
        }
      </ul>
    </div>
  )
}

export default Home;
import { useEffect, useState } from "react";

import {useAuth}from "../hooks/useAuth"

import { database } from '../services/firebase';

//types
type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string,
  isHighLighted: boolean;
  isAnswered: boolean;
  likes: Record<string,{
    authorId: string;

  }>;
}>

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string,
  isHighLighted: boolean;
  isAnswered: boolean;
  likeCount:number;
  likeId:string | undefined;
}
export function useRoom(roomId: string){
//Estados
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');
  //Hooks
  const { user} = useAuth();
  
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes??{}).length,
          likeId: Object.entries(value.likes ??{}).find(([key,like]) =>  like.authorId === user?.id)?.[0],
        }
      })
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })

    return ()=> {
      roomRef.off('value');
    }

  }, [roomId,user?.id])

 return{title,questions}
}
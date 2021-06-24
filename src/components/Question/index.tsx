import { ReactNode } from 'react';
import './styles.scss';
//types
type QuestionPops = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  //REACTNODE E TUDO QUE É ACEITÁVEL NO RETURN
  children?: ReactNode;
}

export function Question({
  content, author, children,
}: QuestionPops) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name}></img>
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>

  );
}
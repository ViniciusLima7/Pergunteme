import { ReactNode } from 'react';
import './styles.scss';
import classnames from 'classnames';
//types
type QuestionPops = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  //REACTNODE E TUDO QUE É ACEITÁVEL NO RETURN
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;

}

export function Question({
  content, author, children, isAnswered = false, isHighLighted = false
}: QuestionPops) {
  return (
    <div className={classnames(
      'question',
      {answered: isAnswered},
      {highlighted: isHighLighted && !isAnswered},
    )}>
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
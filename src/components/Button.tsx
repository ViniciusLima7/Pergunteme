import { ButtonHTMLAttributes } from 'react';
// import SCSS 
import '../styles/button.scss';

//Types
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>& {
  isOutlined?: boolean; //opcional

};

export function Button({isOutlined = false,...props}: ButtonProps) {

  return (

    <button
      //... Desestruturando props / pegando o qu tem dentro dela
      //Se isOutlined for true acrescentar outlined
      className={`button ${isOutlined && 'outlined'}`} 
      {...props}>
    </button>

  );
}
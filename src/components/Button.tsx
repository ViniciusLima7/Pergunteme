import { ButtonHTMLAttributes } from 'react';
// import SCSS 
import '../styles/button.scss';

//Types
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {

  return (

    <button
      //... Desestruturando props / pegando o qu tem dentro dela
      className="button" {...props}>
    </button>

  );
}
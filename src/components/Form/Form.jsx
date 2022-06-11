import s from './form.module.css';
import { useState } from 'react';

const Form = ({onSubmit}) => {
const [query, setQuery] = useState('')

const onInput = (e) => {
const inputValue = e.target.value
setQuery(inputValue)
}

const getSubmit = (e) => {
   e.preventDefault()
    onSubmit(query)
    setQuery('')
    
}
  return (
    <form onSubmit={getSubmit} className={s.form}>
      <label htmlFor="">
        <span className={s.name}>Find your movie:</span>
        <input className={s.input} onChange={onInput} value={query} type="text" />
      </label>
      <button className={s.button}  type="submit">
        Search
      </button>
    </form>
  );
};

export default Form;

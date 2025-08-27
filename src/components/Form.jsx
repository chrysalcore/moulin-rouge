function Form(props) {
    return (
        <form className="form" action="">
            {props.data.map(item => <Input name={item.name} type={item.type} placeholder={item.placeholder} isInput={item.isInput} key={item.name} />)}
            <input className="form__btn" type="submit" value='Submit' />
        </form>
    )
}

function Input(props) {
    return (
        <label className="form-field" htmlFor={props.name}>
            <span className="form-field__text">{props.name}</span>
            {props.isInput? 
                <input className="form-field__input" type={props.type} name={props.name} id={props.name} placeholder={props.placeholder} required /> :
                <textarea className="form-field__input" name={props.name} id={props.name} placeholder={props.placeholder} rows='6' required></textarea>
            }
        </label>
    )
}

export default Form
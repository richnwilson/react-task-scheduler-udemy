const Button = ({props, toggleAdd}) => {
    return (
        <Button style={{backgroundColor: props.color}} className='btn' onClick={()=> toggleAdd()}>{props.text}</Button>
    )
}

export default Button

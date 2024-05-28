import './index.css'

export const ForgotPassword = () => {
    return (
        <div className='forgotPassword_container'>
            <div className='appForgotPassword'>
                <h1>forgotPassword</h1>
                <div className='forgotPassword_input'> <input type="email" placeholder='digite seu email' /></div>
                <div className='forgotPassword_button'> <button>Enviar</button></div>
            </div>
        </div>
    )
}

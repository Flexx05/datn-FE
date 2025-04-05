import Logo from '../assets/image/Binova.svg';
interface Title {
    title: string
  }
export const AuthHeader: React.FC<Title> = ({title}) => {
    return (
        <div className="auth-header">
            <div className="container mx-auto flex items-center">
                <a href="/" className='auth-logo' >
                    <img src={Logo} alt="" className='logo' />
                </a>
                <span className='auth-title'>{title}</span>
            </div>
        </div>
    )
}
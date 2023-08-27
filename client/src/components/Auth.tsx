import { useState } from "react"
import { useCookies } from "react-cookie"

const Auth = () => {
    const [,setCookie,] = useCookies()
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const viewLogin = (status: boolean) => {
        setError(null)
        setIsLogin(status)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, endpoint: string) => {
        e.preventDefault()
        if (!isLogin && password !== confirmPassword) {
            setError('Make sure password match!')
            return
        }

        const response = await fetch(`${import.meta.env.VITE_SERVERURL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()
        console.log(data);

        if (data.detail) {
            setError(data.detail)
        }
        else {
            setCookie('Email', data.email)
            setCookie('AuthToken', data.token)
            window.location.reload()
        }
    }

    return (
        <div className="wrapper max-w-lg m-auto">
            <h1 className='font-black text-xl text-center text-neutral-500'>
                BUCKET LIST
            </h1>
            <p className="text-center text-sm text-neutral-600">before it's too late...</p>
            <div className="flex flex-col gap-y-1 max-w-sm m-auto">
                <form className="flex flex-col gap-y-4">
                    <h2 className="text-lg">{
                        isLogin
                            ? 'Login'
                            : 'Register'
                    }</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isLogin && <input
                        type="password"
                        placeholder="confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />}
                    <input
                        className="bg-neutral-700 shadow-lg py-1 px-4 rounded-md ml-auto"
                        type="submit"
                        value={isLogin ? 'Login' : 'Sign up'}
                        onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')}
                    />
                    {error && <p>{error}</p>}
                </form>
                <button
                    className="text-neutral-500 bg-transparent shadow-none p-0 ml-auto"
                    onClick={() => viewLogin(isLogin ? false : true)}
                >{
                        isLogin
                            ? "Don't have an account? Sign up"
                            : "Already have an account? Sign in"
                    }
                </button>
            </div>
        </div>
    )
}

export default Auth;
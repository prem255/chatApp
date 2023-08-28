import Chat from './ChatBox/Chat'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Main = () => {
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Chat />
        </div>
    )
}

export default Main  
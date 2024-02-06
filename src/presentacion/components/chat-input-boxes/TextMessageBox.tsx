import { FormEvent, useState } from "react";

interface Props{
    onSendMenssage: (message: string) => void;
    placeholder?: string;
    disableCorrections?: boolean;
}

export const TextMessageBox = ({onSendMenssage, placeholder, disableCorrections= false}: Props) => {


    const [message, setMessage] = useState("")

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) =>{
        event?.preventDefault();

        if (message.trim().length === 0) return;

        onSendMenssage(message);
        setMessage('')

        
    }

  return (
    <form onSubmit={ handleSendMessage } 
    className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">

        <div className="flex-grow">
            <div className="relative w-full">
                    <input type="text" autoFocus name="message" className="flex w-full border rounded text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10" autoComplete={ disableCorrections ? 'on': 'off' }  autoCorrect={ disableCorrections ? 'on': 'off' } spellCheck={ disableCorrections ? 'true' : 'false' }  value={message} onChange={(e) => setMessage(e.target.value)} placeholder={placeholder} />
            </div>
        </div>

        <div className="ml-4">
            <button className="btn-primary">
                <span className="mr-2">Enviar</span>
                <i className="fa-regular fa-paper-plane"></i>

            </button>
        </div>
        
    </form>
  )
}

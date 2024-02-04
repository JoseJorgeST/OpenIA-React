
import { useState } from "react";
import { GptMessage } from "../components/chat-bubbles/GptMessage";
import { MyMessage } from "../components/chat-bubbles/MyMessage";
import { TypingLoader } from "../components/louders/TypingLoader";
import { TextMessageBox } from "../components/chat-input-boxes/TextMessageBox";


interface Message {
  text: string;
  isGpt: boolean;
}

export const Template = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  

  const handPost = async ( text:string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false}])

    // TODO: UseCase
    setIsLoading(false)
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text="En que puedo ayudarte?" /> 


          {
            messages.map((message, index)=>(
                message.isGpt
                  ?(
                    <GptMessage key={index} text="Esto es de OpenIA " />
                  )
                  :(
                    <MyMessage key={index} text={message.text} />
                  )
            ))
          }
          {
            isLoading && (
                  <div className="col-start-1 col-end-12 fade-in">
                    <div className="fade-in">
                      <TypingLoader />
                    </div>
                </div>
            )
          }


         

          
          
          
        </div>  
      </div>

      <TextMessageBox 
        onSendMenssage={ handPost }
        placeholder="Escribe aqui lo que deseas"
        disableCorrections
      />

    </div>
  )
}

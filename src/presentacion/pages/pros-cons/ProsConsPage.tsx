import "../../../index.css"
import { useState } from "react";
import { GptMessage } from "../../components/chat-bubbles/GptMessage";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { TextMessageBox } from "../../components/chat-input-boxes/TextMessageBox";
import { TypingLoader } from "../../components/louders/TypingLoader";
import { prosConsUseCase } from "../../../core/use-cases/pros-cons.use-case";



interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  

  const handPost = async ( text:string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false}])


    const {ok, content} = await prosConsUseCase(text);
    setIsLoading(false);

    if(!ok) return;
    setMessages((prev) => [...prev, { text: content, isGpt: true}])
  }

  

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text="Que quieres comprar y que te de mi punto de vista?" /> 


          {
            messages.map((message, index)=>(
                message.isGpt
                  ?(
                    <GptMessage key={index} text={message.text} />
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

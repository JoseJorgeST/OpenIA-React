import { useState } from "react"
import { GptMessage } from "../../components/chat-bubbles/GptMessage"
import { MyMessage } from "../../components/chat-bubbles/MyMessage"
// import { TextMessageBox } from "../../components/chat-input-boxes/TextMessageBox"
import { TypingLoader } from "../../components/louders/TypingLoader"
import { TextMessageBox } from "../../components/chat-input-boxes/TextMessageBox";
import { orthographyUseCase } from "../../../core/use-cases/orthography.use-case";
import { GptOrthographyMessage } from "../../components/chat-bubbles/GptOrthographyMessage";


interface Message {
  text: string;
  isGpt: boolean;
  info?:{
    userScore:number;
    errors: string[];
    message:string;
  }
}

export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  

  const handPost = async ( text:string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false}])

    const {ok, errors, message, userScore} = await orthographyUseCase(text)
    if(!ok){
      setMessages((prev) => [...prev, { text: 'No se pudo relaizar la corrección', isGpt: true}])
    }else{
      setMessages((prev) => [...prev, {
         text: message, 
         isGpt: true,
         info: {errors, message, userScore}
        }])
    }
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
                    <GptOrthographyMessage key={index} {...message.info!} />
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

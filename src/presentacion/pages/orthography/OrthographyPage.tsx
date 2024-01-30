import { GptMessage } from "../../components/chat-bubbles/GptMessage"
import { MyMessage } from "../../components/chat-bubbles/MyMessage"
import { TypingLoader } from "../../components/louders/TypingLoader"


export const OrthographyPage = () => {
  return (
    <div className='chat-cntainer'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          <GptMessage text="En que puedo ayudarte?" /> 


          <MyMessage text="Como puedo hacer una suma en java?"/>


          <div className="fade-in">
            <TypingLoader />
          </div>
          
        </div>  
      </div>
    </div>
  )
}

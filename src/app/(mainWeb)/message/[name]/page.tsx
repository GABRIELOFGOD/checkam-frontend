import ChatCommponent from "@/components/chat-component"
import LogoBackGround from "@/components/ui/logo-background"

const MessageLegislator = () => {
  return (
    <div>
      <div className="absolute h-screen w-full left-0 top-0">
        <LogoBackGround />
      </div>
      <ChatCommponent />
    </div>
  )
}
export default MessageLegislator
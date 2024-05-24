import ChatMessage from "./Children/ChatMessage";
import "./css/styles.css";

function ChatDetails() {
  return (
    <div className="chatDetailsWrapper">
      <div className="chatDetailsHeader">
        <div className="headerProfileImg">
          <img src="https://picsum.photos/id/237/200/300" alt="" />
        </div>
        <div className="headerProfileDetails">
          <span className="username">Maninder Singh</span>
          <span className="activityStatus">Online</span>
        </div>
        <div className="headerOptions">
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>
      <div className="chatDetailsMain pt-3">
        <ChatMessage
          direction="in"
          messageText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus dolor
        voluptatem unde voluptate modi quas sapiente ratione provident natus
        voluptates a, doloribus, ipsum excepturi consequuntur? Ipsam quis dolor
        omnis illum! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Commodi, ipsam dolore minus perferendis consectetur, dolor neque amet
        placeat veniam perspiciatis in, deleniti exercitationem rem sint eos?
        Ipsa earum exercitationem alias. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Pariatur ducimus repudiandae voluptatem natus quod
        iusto vel fuga, provident odit cum necessitatibus, quam expedita,
        aspernatur suscipit sapiente quibusdam laboriosam eveniet mollitia?"
        />
        <ChatMessage
          direction="out"
          messageText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus dolor
        voluptatem unde voluptate modi quas sapiente ratione provident natus
        voluptates a, doloribus, ipsum excepturi consequuntur? Ipsam quis dolor
        omnis illum! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Commodi, ipsam dolore minus perferendis consectetur, dolor neque amet
        placeat veniam perspiciatis in, deleniti exercitationem rem sint eos?
        Ipsa earum exercitationem alias. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Pariatur ducimus repudiandae voluptatem natus quod
        iusto vel fuga, provident odit cum necessitatibus, quam expedita,
        aspernatur suscipit sapiente quibusdam laboriosam eveniet mollitia?"
        />
        <ChatMessage
          direction="out"
          messageText="dita,
        aspernatur suscipit sapiente quibusdam laboriosam eveniet mollitia?"
        />
        <ChatMessage direction="out" messageText="Hello how are you?" />
        <ChatMessage
          direction="in"
          messageText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus dolor
        voluptatem unde voluptate modi quas sapiente ratione provident natus
        voluptates a, doloribus, ipsum excepturi consequuntur? Ipsam quis dolor
        omnis illum! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Commodi, ipsam dolore minus perferendis consectetur, dolor neque amet
        placeat veniam perspiciatis in, deleniti exercitationem rem sint eo"
        />
        <ChatMessage direction="out" messageText="hi" />
        <ChatMessage
          direction="in"
          messageText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus dolor
        voluptatem unde voluptate modi quas sapiente ratione provident natus
        voluptates a, doloribus, ipsum excepturi consequuntur? Ipsam quis dolor
        omnis illum! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Commodi, ipsam dolore minus perferendis consectetur, dolor neque amet
        placeat veniam perspiciatis in, deleniti exercitationem rem sint eos?
        Ipsa earum exercitationem alias. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Pariatur ducimus repudiandae voluptatem natus quod
        iusto vel fuga, provident odit cum necessitatibus, quam expedita,
        aspernatur suscipit sapiente quibusdam laboriosam eveniet mollitia?"
        />
        <ChatMessage
          direction="out"
          messageText="dita,
        aspernatur suscipit sapiente quibusdam laboriosam eveniet mollitia?"
        />
        <ChatMessage direction="out" messageText="Hello how are you?" />
        <ChatMessage
          direction="in"
          messageText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus dolor
        voluptatem unde voluptate modi quas sapiente ratione provident natus
        voluptates a, doloribus, ipsum excepturi consequuntur? Ipsam quis dolor
        omnis illum! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Commodi, ipsam dolore minus perferendis consectetur, dolor neque amet
        placeat veniam perspiciatis in, deleniti exercitationem rem sint eo"
        />
        <ChatMessage direction="out" messageText="hi" />
      </div>
      <div className="chatDetailsFooter">
        <div className="messageInput">
          <input
            type="text"
            placeholder="Type Message Here"
            className="form-control"
          />
          <i className="fa-solid fa-paperclip"></i>
        </div>
        <div className="sendButton">
          <i className="fa-solid fa-circle-arrow-right"></i>
        </div>
      </div>
    </div>
  );
}

export default ChatDetails;

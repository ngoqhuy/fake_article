import { Configuration, OpenAIApi } from "openai"
import React, { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

function TextGen() {
  const [tags, setTags] = useState([])
  const [textoutput, setTextoutput] = useState("");


  function handleKeyDown(e) {
    if (e.key !== 'Enter') return
    const value = e.target.value 
    if (!value.trim()) return
    setTags([...tags, value])
    e.target.value = ''
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index))
  }


  let config = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY
  })
  delete config.baseOptions.headers['User-Agent'];
  let openai = new OpenAIApi(config)

  const genText = async tags => {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 50,
      messages: [{ role: "user", content: "write me a fake artical about" + tags }]
    })
    console.log(res)
    setTextoutput(res.data.choices[0].message.content)
  }

  return (
    <div >
      <div className="tags-input-container">
        {tags.map((tag, index) => (
          <div className="tag-item" key={index}>
            <span className="text">{tag}</span>
            <span className="close" onClick={() => removeTag(index)}>&times;</span>
          </div>
        ))}
        <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Type something..." />
        <br />
        </div>
        <button className="button-12" onClick={() => genText(tags)}>Gen Text</button><br />

        <TextareaAutosize style={{ width: "75%" }} value={textoutput} />
      
    </div>
  )
}

export default TextGen
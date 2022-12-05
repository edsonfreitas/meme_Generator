import React, {useState, useEffect} from "react";
import qs from 'qs'
import { Wrapper, Card, Template, Form, Button } from "./styles";
import meme from '../../assets/meme.svg'

export default function Home(){
    const [templates, setTemplates] = useState([])
    const [selectedTemplate, setSelectedTemplate] = useState([])
    const [boxes, setBoxes] = useState([]);
    const [generetedMeme, setGeneratedMeme] = useState(null)

    useEffect(() => {
        (async () =>{
            const resp = await fetch('https://api.imgflip.com/get_memes');
            const { data: { memes } } = await resp.json();
            setTemplates(memes);
        })();
    },[])
    //função que recebe outra função
    const handleInputChange = (index) =>(e) => {
        const newValues = boxes;
        newValues[index] = e.target.value;
        setBoxes(newValues)
    }

    function handleSelectTemplate(template){
        setSelectedTemplate(template);
        setBoxes([])
    }

   async function handleSubmit(e){
        e.preventDefault();

        const params = qs.stringify({
            template_id: selectedTemplate.id,
            username: 'vikayel543',
            password: 'vikayel543',
            boxes: boxes.map( text => ({ text })),
        })
        console.log(boxes)
        const resp = await fetch(`https://api.imgflip.com/caption_image?${params}`);
        const {data: { url }} = await resp.json();

        setGeneratedMeme(url)
    }

    function handleReset() {
        setSelectedTemplate(null);
        setBoxes([]);
        setGeneratedMeme(null)
    }

    return(
        <Wrapper>
            <img src={meme} alt="MemeMaker" />
            <Card>
                {generetedMeme && (
                    <>
                    <img src={generetedMeme} alt={generetedMeme} />
                    <Button type='button' onClick={handleReset}>Criar outro Meme</Button>
                    </>
                )}
                {!generetedMeme && (
                    <>
                    <h2>Selecione um  template</h2>
                <Template>
                  {templates.map((template) =>(
                      <button 
                      key={template.id}
                      type="button"
                      onClick={() => handleSelectTemplate(template)}
                      className={template.id === selectedTemplate?.id ? 'selected':''}
                      >
                      <img src={template.url} alt={template.name} />
                  </button>
                  ))}
                </Template>

                {selectedTemplate && (
                    <>
                    <h2>Textos das imagens</h2>
                    <Form onSubmit={handleSubmit}>
                        {(new Array(selectedTemplate.box_count)).fill('').map((_,index) =>(
                            <input 
                            key={String(Math.random())}
                            placeholder={`Texto #${index+1}`}
                            onChange={handleInputChange(index)}
                            />
                        ))}
                        <Button type="submit">MakeMyMeme</Button>
                    </Form>
                    </>
                )}
                    </>
                )}
            </Card>
        </Wrapper>
    )
}
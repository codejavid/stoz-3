import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function askAI(messages) {
    
    try{

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",{
                model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
                messages
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        )

       return response.data.choices[0].message;


    }catch(error){
        console.error(error);
    }

}
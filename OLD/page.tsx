"use client";
import { useState, useEffect, useRef } from "react";
import { StringMappingType } from "typescript";

type userInput = {
    input: string,
    correct: boolean
}

export default function Page() {
    const [count, setCount] = useState(0);
    const [sentance, setSentance] = useState("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum placeat asperiores quia, numquam dolorem totam vero!");
    const [userInput, setUserInput] = useState<any>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyPress = (event: any) => {
        console.log(event)
        console.log(event.target.value)

        if (event.target.value.length > sentance.length) return;

        // compare user input field to sentence and update count to matching chars
        // Array.from(event.target.value).forEach((letter, index) => {
        //     if (index > sentance.length) return;

        //     if (letter === sentance[index]) {
        //         setUserInput([...userInput, { letter: letter, correct: true }])
        //     } else {
        //         setUserInput([...userInput, { letter: letter, correct: false }])
        //     }
        // })
        // console.log(userInput)
        console.log("not out of range")
        if (event.target.value === sentance.slice(0, event.target.value.length)) {
            setCount(event.target.value.length)
        }

    }

    useEffect(() => {
        let cancel = false;
        fetch('/api/sentence')
            .then((res: any) => res.json())
            .then(({ data }) => {
                if (cancel) return;
                setSentance(data)
            })
        return () => { cancel = true };
    }, [])


    const selectInput = () => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    // force selecting input on page load
    useEffect(() => {
        selectInput()
    }, [])



    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         window.addEventListener('keypress', handleKeyPress)

    //         return () => {
    //             window.removeEventListener('keyup', handleKeyPress)
    //         }
    //     }
    // }, [])


    return (
        <div className="grid w-screen h-screen place-items-center" tabIndex={-1} onMouseUp={selectInput}>
            <input className="absolute top-0 left-0 opacity-0" type="text" ref={inputRef} onChange={handleKeyPress} />
            <div className="flex flex-col items-center justify-center w-screen">
                <div className="flex flex-row">
                    <p className="p-2">{count} / {sentance.length}</p>
                    <button className="p-2">reset</button>
                </div>
                <div className="flex flex-wrap w-1/2">
                    {sentance.split('').map((letter, index) => {

                        if (letter === ' ') {
                            return <span key={index} className={"text-3xl " + ((count > index) ? 'text-slate-600' : 'text-slate-300')}>&nbsp;</span>
                        }
                        return <span key={index} className={"text-3xl " + ((count > index) ? 'text-slate-600' : 'text-slate-300')}>{letter}</span>
                    })}
                </div>
            </div>
        </div >
    );
}
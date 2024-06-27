"use client";
import { useRef, useState } from "react";

export const SpeedTyper = ({ sentence }: {sentence:string}) => {
    // Keeps track of the current position in the sentence the user is at
    const [currentPosition, setCurrentPosistion] = useState(0);
    // wrong indexses
    const [wrong, setWrong] = useState<number[]>([]);
    // correct indexses
    const [correct, setCorrect] = useState<number[]>([]);

    const [_sentence, _setSentence] = useState(sentence);
    const [value, setValue] = useState(sentence);

    const inputRef = useRef<HTMLInputElement>(null);

    const keysToReactTo = "abcdefghijklmnopqrstuvwxyz ',.?!ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    const handleKeyPress = (event: any) => {
        event.preventDefault();

        // if backspace is pressed undo
        if (event.keyCode === 8 || event.keyCode === 46) {
            console.log("backspace")
            if (currentPosition >= 0) {
                setCurrentPosistion(prev => prev-1);
                // remove from arrays
                setCorrect(prev => prev.filter((index) => index !== currentPosition - 1));
                setWrong(prev => prev.filter((index) => index !== currentPosition - 1));
                return;
            }
        }

        if (!keysToReactTo.includes(event.key)) {
            return;
        }

        const currentLength = event.target.value.length;
        const currentLetter = sentence[currentPosition];
        console.log(event.target.value);
        console.log(currentLength)
        console.log(currentLetter)

        // if correct letter
        if (currentLetter === event.target.value[currentLength - 1]) {
            setCorrect(prev => [...prev, currentPosition]);
        } else {
            setWrong(prev => [...prev, currentPosition]);
        }

        setCurrentPosistion(prev => prev+1);
    }

    const selectInput = () => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    const handleReset = () => {
        setCorrect([]);
        setWrong([]);
        setCurrentPosistion(0);
    }

    return (
        <div className="grid w-screen h-screen place-items-center" tabIndex={-1} onMouseUp={selectInput}>
            <div className="flex flex-row">
                <p className="p-2">{correct.length} / {sentence.length}</p>
                <button className="p-2 bg-red-400 rounded-3xl font-bold" onClick={handleReset}>reset</button>
            </div>
            <div className="flex flex-wrap w-1/2">
                {/* // bg-green-600 bg-red-500 bg-slate-300 text-green-600 text-red-500 text-slate-300 */}
                {sentence.split('').map((letter, index) => {
                    const isCorrect = correct.includes(index);
                    const isWrong = wrong.includes(index);
                    const bg = isCorrect ? 'green-600' : isWrong ? 'red-500' : "";
                    const color = isCorrect ? 'green-600' : isWrong ? 'red-500' : 'slate-300';
                    const underline = currentPosition === index ? 'underline ' : '';
                    // logic for handling spaces correct and wrong
                    if (letter === ' ') {
                        return <span key={index} className={"text-3xl " + bg + " " + underline}>&nbsp;</span>
                    }

                    // logic for hadnling correct and wrong letters
                    return <span key={index} className={"text-3xl " + "text-" + color + " " + underline}>{letter}</span>
                })}
            </div>
            <input className="absolute top-0 left-0 opacity-0" type="text" ref={inputRef} value={value} onKeyDown={handleKeyPress} />
        </div>
    )

}



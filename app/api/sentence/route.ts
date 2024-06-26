import shit from "./beemovie";

const createSentence = (data: string): string => {
    let out: string = '';
    let arr: string[] = data.split(' ');
    let i: number = 0;
    let lastWord: string = '';
    while (i < 25) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        let word = arr[randomIndex];

        if (!word.startsWith('i')) { // if word doesn't start with i to prevent decapitalization of I
            word = word.toLowerCase(); // Lowercase all words
        }

        if (i == 0) {
            word = word[0].toUpperCase() + word.slice(1);
        }
        if (lastWord.endsWith('.') || lastWord.endsWith('!') || lastWord.endsWith('?')) {
            word = word[0].toUpperCase() + word.slice(1);
        }
        out += word + ' ';
        i++;
        lastWord = word;
    }
    return out;
}

export function GET(request: Request) {
    return Response.json(
        {sentence: createSentence(shit)},
        {status:200}
    )
    
}
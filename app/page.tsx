import { SpeedTyper } from "./Word";

const HOST_URL = process.env.HOST_URL || "http://localhost:3000";

const getSentence = async (): Promise<string> => {
    const res = await fetch(HOST_URL + "/api/sentence");
    const data = await res.json();
    return data.sentence;
}

export default async function Home() {
    const sentence = await getSentence();
    return (
        <SpeedTyper sentence={sentence} />
    );
}

import React, { FC, useEffect, useRef, useState } from 'react'
import { Song } from '../../editor/models/Song';
import { Tact } from '../../editor/models/Tact';
import { Note } from '../../editor/models/Note';
import EditorDrawer from '../../editor/components/EditorDrawer/EditorDrawer';
import { CMajorMap } from '../../editor/utils';

interface EditorProps {

}

const Editor: FC<EditorProps> = ({ }) => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    const incrementTakt = useRef(null)
    const incrementNotes = useRef(null)


    // const tacts: Tact[] = [new Tact([new Note(0, -1.5, 4), new Note(8, -1, 4), new Note(16, -0.5, 4), new Note(24, 0, 4), new Note(32, 0.5, 4), new Note(40, 1, 4), new Note(48, 1.5, 4), new Note(56, 2, 4)])]
    const tacts: Tact[] = [new Tact([new Note(0, -1, 4), new Note(0, 0, 4), new Note(0, 1, 4), new Note(16, 0.5, 4), new Note(16, 1.5, 4), new Note(16, 2.5, 4), new Note(32, -1.5, 4), new Note(32, -0.5, 4), new Note(32, 0.5, 4)])]


    const song = new Song(tacts, 80)

    useEffect(() => {
        if (isPlaying) {

            let iterratorTakt: number = 0;
            let iterratorNote: number = 0;

            let position: number = 0;

            iterratorTakt += 1;

            (incrementTakt.current as any) = setInterval(() => {
                iterratorTakt += 1
                if (iterratorTakt > 4) {
                    iterratorTakt = 1
                    position += 1
                }
                // (new Audio(require('../../editor/piano/key01.ogg'))).play()
            }, 60 * 60 * 60 / 4 / song['tempo']);


            (incrementNotes.current as any) = setInterval(() => {
                if (iterratorNote > 64) iterratorNote = 0
                if (position >= song['tacts'].length) {
                    clearInterval((incrementTakt.current as any))
                    clearInterval((incrementNotes.current as any))
                    setIsPlaying(false)
                    return
                }

                const currentNotes = song['tacts'][position]['notes'].filter((note: Note) => note.horizontalPosition === iterratorNote)
                if (currentNotes.length) {
                    for(let i = 0; i < currentNotes.length; i ++){
                        (new Audio(require(`../../editor/piano/key${CMajorMap[currentNotes[i]['verticalPosition'].toString()]}.ogg`))).play()
                    }
                }
                iterratorNote += 1



            }, 60 * 60 * 60 / 64 / song['tempo'])


        } else {
            clearInterval((incrementTakt.current as any))
            clearInterval((incrementNotes.current as any))
        }
    }, [isPlaying])

    return (
        <div>
            <button onClick={() => setIsPlaying(!isPlaying)} >Play/Stop</button>
            <EditorDrawer song={song} />
        </div>
    )
}

export default Editor;
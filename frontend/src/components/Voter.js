import React from 'react';

export default function Voter({...props}) {
    return (
        <div>
            <button onClick={() => props.downVote(props.item.id)}>DownVote-</button>
            <div data-text={props.item.voteScore}></div>
            <button onClick={() => props.upVote(props.item.id)}>+UpVote</button>
        </div>
    )
}
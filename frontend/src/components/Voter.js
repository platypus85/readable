import React from 'react';
import { Button } from 'reactstrap';

export default function Voter({...props}) {
    return (
        <span>
            <Button color="danger" onClick={() => props.downVote(props.item.id)}><i className="fa fa-thumbs-down" aria-hidden="true"></i></Button>{' '}
            <Button color="success"onClick={() => props.upVote(props.item.id)}><i className="fa fa-thumbs-up" aria-hidden="true"></i></Button>{' '}
            <p data-text={props.item.voteScore}>{props.item.voteScore}</p>
        </span>
    )
}
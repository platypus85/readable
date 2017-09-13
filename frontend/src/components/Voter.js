import React from 'react';
import { Button,Badge } from 'reactstrap';

export default function Voter({...props}) {
    return (
        <span>
            <p data-text={props.item.voteScore}>Votes: <Badge color={props.item.voteScore < 0 ? 'danger' : 'success'}>{props.item.voteScore}</Badge></p>
            <Button color="danger" onClick={() => props.downVote(props.item.id)}><i className="fa fa-thumbs-down" aria-hidden="true"></i></Button>{' '}
            <Button color="success"onClick={() => props.upVote(props.item.id)}><i className="fa fa-thumbs-up" aria-hidden="true"></i></Button>{' '}
        </span>
    )
}
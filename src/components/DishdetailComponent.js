import React from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle } from 'reactstrap';
    
    function RenderDish({dish}) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    function RenderComments({comments}) {
        if (comments !=null) {
            return (
                comments.map((comment) => {
                    var comment_day = new Date(Date.parse(comment.date));
                    var format_date = comment_day.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                    return(
                        <ul key={comment.id} className="list-unstyled">
                            <li>{comment.comment}</li>
                            <li>-- {comment.author}, {format_date}</li>
                        </ul>
                    );
                })
            );
        }
        else
            return (
                <div></div>
            );
    }

    const DishDetail = (props) => {
        if (props.selecteddish != null) {
            console.log(props.selecteddish);
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.selecteddish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <RenderComments comments={props.selecteddish.comments} />
                        </div>
                    </div>
                </div>
            );
        }
        else
            return (
                <div></div>
            );
    }

export default DishDetail;